// Turn a GiftUp gift card into Uncoached membership.
//
// The membership is a Stripe subscription in a trial that ends when the gift
// runs out, with no card on file. Stripe cancels it at the end on its own
// (trial_settings.end_behavior), the existing webhooks keep the database in
// step, and the member gets Stripe's normal "add a card to continue" path.
//
// Everything external comes in through `deps` so this can be tested with fakes:
//   giftup — createGiftUpClient(); stripe — the Stripe SDK; db — supabaseAdmin.

import { membershipMonths, redemptionProblem, trialEndFor } from "./giftup.js";

export class RedeemError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

const ALREADY_MEMBER = "This account already has an active membership, so the gift card was not used. Sign in with a different account, or contact hello@uncoached.space.";

/** Stripe price whose billing interval matches `months`, or null. */
function priceForMonths(prices, months) {
    return prices.find((p) => {
        const r = p.recurring;
        if (!r) return false;
        if (r.interval === "month" && r.interval_count === months) return true;
        if (r.interval === "year" && r.interval_count * 12 === months) return true;
        return false;
    }) || null;
}

async function hasLiveStripeSubscription(stripe, customerId) {
    for (const status of ["active", "trialing"]) {
        const { data } = await stripe.subscriptions.list({ customer: customerId, status, limit: 1 });
        if (data.length) return true;
    }
    return false;
}

export async function redeemGift({ user, code, deps, now = new Date() }) {
    const { giftup, stripe, db } = deps;

    // 1. Is this a real, unused membership gift card?
    const card = await giftup.lookup(code);
    if (!card) throw new RedeemError(404, "We couldn't find a gift card with that code. Check it against the email GiftUp sent you.");

    const problem = redemptionProblem(card);
    if (problem) throw new RedeemError(400, problem);

    const months = membershipMonths(card);
    if (!months) throw new RedeemError(400, "This gift card isn't a membership card we recognise. Please contact hello@uncoached.space and we'll sort it out.");

    // 2. Don't stack a gift on top of a membership that's already running.
    const { data: existing } = await db.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle();
    if (existing && (existing.status === "active" || existing.status === "trialing")) {
        throw new RedeemError(409, ALREADY_MEMBER);
    }

    const found = await stripe.customers.list({ email: user.email, limit: 1 });
    let customer = found.data[0] || null;
    if (customer && await hasLiveStripeSubscription(stripe, customer.id)) {
        throw new RedeemError(409, ALREADY_MEMBER);
    }
    if (!customer) customer = await stripe.customers.create({ email: user.email, metadata: { user_id: user.id } });

    // 3. The plan the gift stands in for — so a member who adds a card later
    //    simply continues at that plan's price.
    const { data: prices } = await stripe.prices.list({ active: true, type: "recurring", limit: 100 });
    const price = priceForMonths(prices, months);
    if (!price) throw new RedeemError(500, `No membership plan matches a ${months}-month gift. Please contact hello@uncoached.space.`);

    const trialEnd = trialEndFor(months, now);
    const normalisedCode = String(code).trim().toUpperCase();

    const sub = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        trial_end: trialEnd,
        trial_settings: { end_behavior: { missing_payment_method: "cancel" } },
        metadata: { source: "giftup", giftup_code: normalisedCode, giftup_title: card.title || "", user_id: user.id }
    });

    // 4. Mark the card used. If GiftUp won't, undo the membership so the card
    //    can be tried again — never leave access granted on an unspent card.
    try {
        await giftup.redeemInFull(normalisedCode, {
            reason: "Uncoached membership",
            metadata: { userEmail: user.email, userId: user.id, stripeSubscriptionId: sub.id }
        });
    } catch (err) {
        console.error("GiftUp redeem failed, cancelling subscription", sub.id, err.message);
        await stripe.subscriptions.cancel(sub.id).catch((e) => console.error("Cancel after failed redeem also failed:", e.message));
        throw new RedeemError(502, "We couldn't mark the gift card as used, so nothing has changed. Please try again in a moment.");
    }

    // 5. The durable record the site reads on every visit.
    const endsOn = new Date(trialEnd * 1000).toISOString();
    const { error } = await db.from("subscriptions").upsert({
        user_id: user.id,
        stripe_subscription_id: sub.id,
        stripe_customer_id: customer.id,
        status: sub.status,
        plan: `gift-${months}-month${months === 1 ? "" : "s"}`,
        current_period_end: endsOn
    }, { onConflict: "user_id" });
    if (error) {
        // Access still works via Stripe; say so loudly so it can be repaired.
        console.error(`GIFT REDEEMED BUT NOT SAVED — ${normalisedCode} for ${user.id}:`, error.message);
    }

    return { months, title: card.title || "", endsOn };
}
