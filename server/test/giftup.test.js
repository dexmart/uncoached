import { test } from "node:test";
import assert from "node:assert/strict";
import {
    membershipMonths,
    trialEndFor,
    redemptionProblem,
    createGiftUpClient
} from "../lib/giftup.js";

// ── membershipMonths ────────────────────────────────────────────────────

test("reads the length from a '1-Month' title", () => {
    assert.equal(membershipMonths({ title: "1-Month Uncoached Membership" }), 1);
});

test("reads '3 Month' and '6-Month' titles", () => {
    assert.equal(membershipMonths({ title: "3 Month Uncoached Membership Gift Card" }), 3);
    assert.equal(membershipMonths({ title: "6-Month Uncoached Membership Gift Card" }), 6);
});

test("treats 'year' or 'annual' titles as 12 months", () => {
    assert.equal(membershipMonths({ title: "1 Year of Uncoached" }), 12);
    assert.equal(membershipMonths({ title: "Annual Uncoached Membership" }), 12);
});

test("falls back to the card's initial value when the title gives no length", () => {
    assert.equal(membershipMonths({ title: "Uncoached Gift Card", initialValue: 62 }), 3);
    assert.equal(membershipMonths({ title: "Uncoached Gift Card", initialValue: 220 }), 12);
});

test("returns null for a card that is neither a known length nor a known value", () => {
    assert.equal(membershipMonths({ title: "Uncoached Gift Card", initialValue: 50 }), null);
    assert.equal(membershipMonths({}), null);
});

// ── trialEndFor ─────────────────────────────────────────────────────────

test("trial ends the given number of calendar months later, as unix seconds", () => {
    const now = new Date("2026-09-08T12:00:00Z");
    assert.equal(trialEndFor(1, now), Date.UTC(2026, 9, 8, 12) / 1000);
    assert.equal(trialEndFor(12, now), Date.UTC(2027, 8, 8, 12) / 1000);
});

test("trial end does not overflow into the following month", () => {
    // 31 Jan + 1 month: February has no 31st, so land on the last day of Feb.
    const now = new Date("2026-01-31T12:00:00Z");
    assert.equal(trialEndFor(1, now), Date.UTC(2026, 1, 28, 12) / 1000);
});

// ── redemptionProblem ───────────────────────────────────────────────────

test("a redeemable card has no problem", () => {
    assert.equal(redemptionProblem({ canBeRedeemed: true, remainingValue: 22 }), null);
});

test("explains why a card cannot be redeemed", () => {
    assert.match(redemptionProblem({ canBeRedeemed: false, hasExpired: true }), /expired/i);
    assert.match(redemptionProblem({ canBeRedeemed: false, isVoided: true }), /cancelled/i);
    assert.match(redemptionProblem({ canBeRedeemed: false, notYetValid: true }), /not valid yet/i);
    assert.match(redemptionProblem({ canBeRedeemed: false, remainingValue: 0 }), /already been used/i);
    assert.match(redemptionProblem({ canBeRedeemed: false }), /cannot be redeemed/i);
});

// ── createGiftUpClient ──────────────────────────────────────────────────

const fakeFetch = (status, body) => {
    const calls = [];
    const fetchFn = async (url, init) => {
        calls.push({ url, init });
        return { ok: status >= 200 && status < 300, status, json: async () => body, text: async () => JSON.stringify(body) };
    };
    return { fetchFn, calls };
};

test("lookup hits GET /gift-cards/{code} with the bearer key", async () => {
    const { fetchFn, calls } = fakeFetch(200, { code: "B4J24", title: "1-Month Uncoached Membership" });
    const client = createGiftUpClient({ apiKey: "k123", fetchFn });
    const card = await client.lookup("b4j24");
    assert.equal(card.title, "1-Month Uncoached Membership");
    assert.equal(calls[0].url, "https://api.giftup.app/gift-cards/B4J24");
    assert.equal(calls[0].init.headers.Authorization, "Bearer k123");
    assert.equal(calls[0].init.headers["x-giftup-testmode"], undefined);
});

test("lookup returns null when GiftUp does not know the code", async () => {
    const { fetchFn } = fakeFetch(404, {});
    const client = createGiftUpClient({ apiKey: "k", fetchFn });
    assert.equal(await client.lookup("NOPE"), null);
});

test("lookup throws on any other failure", async () => {
    const { fetchFn } = fakeFetch(401, { message: "bad key" });
    const client = createGiftUpClient({ apiKey: "k", fetchFn });
    await assert.rejects(client.lookup("B4J24"), /401/);
});

test("test mode adds the x-giftup-testmode header", async () => {
    const { fetchFn, calls } = fakeFetch(200, {});
    const client = createGiftUpClient({ apiKey: "k", testMode: true, fetchFn });
    await client.lookup("B4J24");
    assert.equal(calls[0].init.headers["x-giftup-testmode"], "true");
});

test("redeemInFull posts the reason and metadata", async () => {
    const { fetchFn, calls } = fakeFetch(200, { transactionId: "t1", remainingCredit: 0 });
    const client = createGiftUpClient({ apiKey: "k", fetchFn });
    const result = await client.redeemInFull("B4J24", { reason: "Uncoached membership", metadata: { email: "a@b.c" } });
    assert.equal(result.transactionId, "t1");
    assert.equal(calls[0].url, "https://api.giftup.app/gift-cards/B4J24/redeem-in-full");
    assert.equal(calls[0].init.method, "POST");
    assert.deepEqual(JSON.parse(calls[0].init.body), { reason: "Uncoached membership", metadata: { email: "a@b.c" } });
});

test("codes are trimmed and upper-cased before use", async () => {
    const { fetchFn, calls } = fakeFetch(200, {});
    const client = createGiftUpClient({ apiKey: "k", fetchFn });
    await client.lookup("  b4j-24 ");
    assert.equal(calls[0].url, "https://api.giftup.app/gift-cards/B4J-24");
});
