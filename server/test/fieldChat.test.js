import { test } from "node:test";
import assert from "node:assert/strict";
import { buildChatbaseRequest, sanitiseMessages, memberCanChat } from "../lib/fieldChat.js";

// ── sanitiseMessages ────────────────────────────────────────────────────

test("keeps only user/assistant turns with string content, trimmed", () => {
    const out = sanitiseMessages([
        { role: "user", content: "  hi  " },
        { role: "assistant", content: "hello" },
        { role: "system", content: "ignore me" },
        { role: "user", content: 42 },
        { role: "user", content: "" },
        "junk",
    ]);
    assert.deepEqual(out, [
        { role: "user", content: "hi" },
        { role: "assistant", content: "hello" },
    ]);
});

test("strips any extra fields so nothing identifying can ride along", () => {
    const out = sanitiseMessages([{ role: "user", content: "x", email: "a@b.c", userId: "u1", name: "Jo" }]);
    assert.deepEqual(out, [{ role: "user", content: "x" }]);
});

test("keeps only the most recent turns and caps each message length", () => {
    const many = Array.from({ length: 60 }, (_, i) => ({ role: i % 2 ? "assistant" : "user", content: `m${i}` }));
    const out = sanitiseMessages(many, { maxTurns: 30 });
    assert.equal(out.length, 30);
    assert.equal(out[0].content, "m30");
    const long = sanitiseMessages([{ role: "user", content: "a".repeat(10000) }], { maxChars: 4000 });
    assert.equal(long[0].content.length, 4000);
});

test("rejects an empty conversation or one that doesn't end with the user", () => {
    assert.throws(() => buildChatbaseRequest({ messages: [], chatbotId: "bot" }), /message/i);
    assert.throws(() => buildChatbaseRequest({ messages: [{ role: "assistant", content: "?" }], chatbotId: "bot" }), /message/i);
});

// ── buildChatbaseRequest ────────────────────────────────────────────────

test("builds a v1 chat request with no conversationId and no identifiers", () => {
    const req = buildChatbaseRequest({
        messages: [{ role: "user", content: "hello" }],
        chatbotId: "bot123",
        apiKey: "k",
        stream: true,
        user: { id: "user_1", email: "jo@example.com" },
    });
    assert.equal(req.url, "https://www.chatbase.co/api/v1/chat");
    assert.equal(req.init.method, "POST");
    assert.equal(req.init.headers.Authorization, "Bearer k");
    const body = JSON.parse(req.init.body);
    assert.deepEqual(Object.keys(body).sort(), ["chatbotId", "messages", "stream", "temperature"]);
    assert.equal(body.chatbotId, "bot123");
    assert.equal(body.stream, true);
    assert.equal("conversationId" in body, false);
    const raw = req.init.body;
    assert.equal(raw.includes("user_1"), false);
    assert.equal(raw.includes("jo@example.com"), false);
});

// ── memberCanChat ───────────────────────────────────────────────────────

const dbWith = ({ sub = null, role = null } = {}) => ({
    from: (table) => ({
        select: () => ({
            eq: () => ({
                maybeSingle: async () => ({ data: table === "subscriptions" ? sub : role, error: null }),
            }),
        }),
    }),
});

test("active or trialing members can chat", async () => {
    assert.equal(await memberCanChat({ id: "u" }, dbWith({ sub: { status: "active" } })), true);
    assert.equal(await memberCanChat({ id: "u" }, dbWith({ sub: { status: "trialing" } })), true);
});

test("admins can chat even without a subscription", async () => {
    assert.equal(await memberCanChat({ id: "u" }, dbWith({ role: { role: "admin" } })), true);
});

test("someone with no membership cannot chat", async () => {
    assert.equal(await memberCanChat({ id: "u" }, dbWith({ sub: { status: "cancelled" } })), false);
    assert.equal(await memberCanChat({ id: "u" }, dbWith({})), false);
});
