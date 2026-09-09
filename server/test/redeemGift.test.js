import { test } from "node:test";
import assert from "node:assert/strict";
import { redeemGift, RedeemError } from "../lib/redeemGift.js";

// ── Fakes ───────────────────────────────────────────────────────────────

const monthlyPrice = { id: "price_m", active: true, recurring: { interval: "month", interval_count: 1 } };
const quarterlyPrice = { id: "price_q", active: true, recurring: { interval: "month", interval_count: 3 } };
const annualPrice = { id: "price_y", active: true, recurring: { interval: "year", interval_count: 1 } };

function makeDeps({ card, prices = [monthlyPrice, quarterlyPrice, annualPrice], existingCustomer = null, stripeSubs = [], dbRow = null, redeemFails = false } = {}) {
    const log = { created: [], cancelled: [], redeemed: [], upserts: [] };
    const giftup = {
        lookup: async () => card,
        redeemInFull: async (code, opts) => {
            if (redeemFails) throw new Error("GiftUp POST failed: 500");
            log.redeemed.push({ code, opts });
            return { transactionId: "t1" };
        }
    };
    const stripe = {
        customers: {
            list: async () => ({ data: existingCustomer ? [existingCustomer] : [] }),
            create: async ({ email }) => ({ id: "cus_new", email })
        },
        prices: { list: async () => ({ data: prices }) },
        subscriptions: {
            list: async ({ status }) => ({ data: stripeSubs.filter((s) => s.status === status) }),
            create: async (params) => {
                log.created.push(params);
                return { id: "sub_gift", status: "trialing", trial_end: params.trial_end, customer: params.customer };
            },
            cancel: async (id) => { log.cancelled.push(id); return { id, status: "canceled" }; }
        }
    };
    const db = {
        from: () => ({
            select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: dbRow, error: null }) }) }),
            upsert: async (row, opts) => { log.upserts.push({ row, opts }); return { error: null }; }
        })
    };
    return { deps: { giftup, stripe, db }, log };
}

const user = { id: "user_1", email: "jo@example.com" };
const goodCard = { code: "B4J24", title: "1-Month Uncoached Membership", canBeRedeemed: true, remainingValue: 22, initialValue: 22 };
const now = new Date("2026-09-08T12:00:00Z");

const expectError = async (promise, status, pattern) => {
    await assert.rejects(promise, (err) => {
        assert.ok(err instanceof RedeemError, `expected RedeemError, got ${err}`);
        assert.equal(err.status, status);
        assert.match(err.message, pattern);
        return true;
    });
};

// ── Refusals ────────────────────────────────────────────────────────────

test("unknown code → 404, nothing touched", async () => {
    const { deps, log } = makeDeps({ card: null });
    await expectError(redeemGift({ user, code: "NOPE", deps, now }), 404, /couldn't find/i);
    assert.equal(log.created.length, 0);
});

test("used card → 400 with the reason", async () => {
    const { deps } = makeDeps({ card: { ...goodCard, canBeRedeemed: false, remainingValue: 0 } });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 400, /already been used/i);
});

test("card that isn't a membership → 400", async () => {
    const { deps } = makeDeps({ card: { ...goodCard, title: "Mystery card", initialValue: 50 } });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 400, /isn't a membership/i);
});

test("account already has an active membership in the database → 409", async () => {
    const { deps, log } = makeDeps({ card: goodCard, dbRow: { status: "active" } });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 409, /already has an active membership/i);
    assert.equal(log.created.length, 0);
});

test("account already has a live Stripe subscription → 409", async () => {
    const { deps, log } = makeDeps({
        card: goodCard,
        existingCustomer: { id: "cus_1", email: user.email },
        stripeSubs: [{ id: "sub_live", status: "trialing" }]
    });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 409, /already has an active membership/i);
    assert.equal(log.created.length, 0);
});

test("no Stripe price matches the length → 500, card untouched", async () => {
    const { deps, log } = makeDeps({ card: { ...goodCard, title: "6-Month Uncoached Membership" }, prices: [monthlyPrice] });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 500, /no membership plan/i);
    assert.equal(log.redeemed.length, 0);
});

// ── The happy path ──────────────────────────────────────────────────────

test("grants a trial subscription for the card's length and marks the card used", async () => {
    const { deps, log } = makeDeps({ card: goodCard });
    const result = await redeemGift({ user, code: "b4j24", deps, now });

    assert.equal(log.created.length, 1);
    const params = log.created[0];
    assert.equal(params.customer, "cus_new");
    assert.deepEqual(params.items, [{ price: "price_m" }]);
    assert.equal(params.trial_end, Date.UTC(2026, 9, 8, 12) / 1000);
    assert.equal(params.trial_settings.end_behavior.missing_payment_method, "cancel");
    assert.equal(params.metadata.giftup_code, "B4J24");
    assert.equal(params.metadata.user_id, "user_1");

    assert.equal(log.redeemed.length, 1);
    assert.equal(log.redeemed[0].opts.metadata.stripeSubscriptionId, "sub_gift");

    assert.equal(log.upserts.length, 1);
    const { row, opts } = log.upserts[0];
    assert.equal(row.user_id, "user_1");
    assert.equal(row.stripe_subscription_id, "sub_gift");
    assert.equal(row.status, "trialing");
    assert.equal(row.plan, "gift-1-month");
    assert.equal(row.current_period_end, "2026-10-08T12:00:00.000Z");
    assert.equal(opts.onConflict, "user_id");

    assert.deepEqual(result, { months: 1, title: "1-Month Uncoached Membership", endsOn: "2026-10-08T12:00:00.000Z" });
});

test("reuses an existing Stripe customer and picks the annual price for a year", async () => {
    const { deps, log } = makeDeps({ card: { ...goodCard, title: "1 Year of Uncoached" }, existingCustomer: { id: "cus_1" } });
    const result = await redeemGift({ user, code: "B4J24", deps, now });
    assert.equal(log.created[0].customer, "cus_1");
    assert.deepEqual(log.created[0].items, [{ price: "price_y" }]);
    assert.equal(result.months, 12);
    assert.equal(log.upserts[0].row.plan, "gift-12-months");
});

test("if GiftUp refuses the redemption, the Stripe subscription is cancelled and nothing is saved", async () => {
    const { deps, log } = makeDeps({ card: goodCard, redeemFails: true });
    await expectError(redeemGift({ user, code: "B4J24", deps, now }), 502, /try again/i);
    assert.deepEqual(log.cancelled, ["sub_gift"]);
    assert.equal(log.upserts.length, 0);
});
