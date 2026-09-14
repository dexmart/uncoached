// Self-heal a member's high-level Pocket Prompt unlocks.
//
// A $2 prompt unlock is recorded in prompt_purchases. If that write was ever
// missed — a webhook that didn't land, a purchase made before the table
// existed, a buyer who closed the tab before the return check ran — the prompt
// stays locked even though they paid. This re-derives the truth from Stripe:
// every paid prompt-purchase checkout the member made, and backfills any row
// that's missing. Called on the Pocket Prompts page, so it fixes itself.
//
// `deps` is injectable for tests: stripe (the SDK) and db (supabaseAdmin).

export async function reconcilePromptPurchases({ user, deps }) {
    const { stripe, db } = deps;

    // The prompt they already own, so we only write what's missing.
    const { data: existing } = await db.from("prompt_purchases").select("prompt_id").eq("user_id", user.id);
    const already = new Set((existing || []).map((r) => r.prompt_id));

    // Every Stripe customer under this email, and every checkout they made.
    const { data: customers } = await stripe.customers.list({ email: user.email, limit: 10 });
    const owned = new Set();
    for (const customer of customers) {
        const { data: sessions } = await stripe.checkout.sessions.list({ customer: customer.id, limit: 100 });
        for (const s of sessions) {
            if (s.payment_status !== "paid") continue;
            if (s.metadata?.type !== "prompt_purchase") continue;
            if (s.metadata?.userId !== user.id) continue;   // never unlock from someone else's payment
            if (s.metadata?.promptId) owned.add(s.metadata.promptId);
        }
    }

    const missing = [...owned].filter((id) => !already.has(id));
    if (missing.length) {
        await db.from("prompt_purchases").upsert(
            missing.map((prompt_id) => ({ user_id: user.id, prompt_id })),
            { onConflict: "user_id,prompt_id" }
        );
    }

    // The full set the member is entitled to (already-owned plus newly restored).
    return [...new Set([...already, ...owned])];
}
