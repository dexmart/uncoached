import { test } from "node:test";
import assert from "node:assert/strict";
import { reconcilePromptPurchases } from "../lib/reconcilePrompts.js";

const user = { id: "user_1", email: "jo@example.com" };

function makeDeps({ customers = [], sessionsByCustomer = {}, existingRows = [] } = {}) {
    const log = { upserts: [] };
    const stripe = {
        customers: { list: async ({ email }) => ({ data: customers.filter(c => c.email === email) }) },
        checkout: {
            sessions: {
                list: async ({ customer }) => ({ data: sessionsByCustomer[customer] || [] })
            }
        }
    };
    const db = {
        from: () => ({
            select: () => ({ eq: async () => ({ data: existingRows, error: null }) }),
            upsert: async (rows) => { log.upserts.push(rows); return { error: null }; }
        })
    };
    return { deps: { stripe, db }, log };
}

const paidPrompt = (promptId, userId = "user_1") => ({
    payment_status: "paid",
    metadata: { type: "prompt_purchase", userId, promptId }
});

test("no Stripe customer for the email → nothing unlocked, nothing written", async () => {
    const { deps, log } = makeDeps({ customers: [] });
    const unlocked = await reconcilePromptPurchases({ user, deps });
    assert.deepEqual(unlocked, []);
    assert.equal(log.upserts.length, 0);
});

test("a paid prompt session with no saved row is backfilled and returned", async () => {
    const { deps, log } = makeDeps({
        customers: [{ id: "cus_1", email: "jo@example.com" }],
        sessionsByCustomer: { cus_1: [paidPrompt("prompt_A")] }
    });
    const unlocked = await reconcilePromptPurchases({ user, deps });
    assert.deepEqual(unlocked, ["prompt_A"]);
    assert.equal(log.upserts.length, 1);
    assert.deepEqual(log.upserts[0][0], { user_id: "user_1", prompt_id: "prompt_A" });
});

test("ignores unpaid sessions, other users' sessions, and non-prompt sessions", async () => {
    const { deps, log } = makeDeps({
        customers: [{ id: "cus_1", email: "jo@example.com" }],
        sessionsByCustomer: { cus_1: [
            { payment_status: "unpaid", metadata: { type: "prompt_purchase", userId: "user_1", promptId: "X" } },
            paidPrompt("Y", "someone_else"),
            { payment_status: "paid", metadata: { type: "subscription" } },
            paidPrompt("Z")
        ] }
    });
    const unlocked = await reconcilePromptPurchases({ user, deps });
    assert.deepEqual(unlocked, ["Z"]);
    assert.equal(log.upserts.length, 1);
});

test("does not re-write a prompt that is already unlocked in the database", async () => {
    const { deps, log } = makeDeps({
        customers: [{ id: "cus_1", email: "jo@example.com" }],
        sessionsByCustomer: { cus_1: [paidPrompt("prompt_A"), paidPrompt("prompt_B")] },
        existingRows: [{ prompt_id: "prompt_A" }]
    });
    const unlocked = await reconcilePromptPurchases({ user, deps });
    assert.deepEqual(unlocked.sort(), ["prompt_A", "prompt_B"]); // returns full set the member owns
    // only the missing one is written
    assert.equal(log.upserts.length, 1);
    assert.deepEqual(log.upserts[0][0], { user_id: "user_1", prompt_id: "prompt_B" });
});

test("de-duplicates when the same prompt was paid twice", async () => {
    const { deps, log } = makeDeps({
        customers: [{ id: "cus_1", email: "jo@example.com" }],
        sessionsByCustomer: { cus_1: [paidPrompt("dup"), paidPrompt("dup")] }
    });
    const unlocked = await reconcilePromptPurchases({ user, deps });
    assert.deepEqual(unlocked, ["dup"]);
    assert.equal(log.upserts[0].length, 1);
});
