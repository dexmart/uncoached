// Field, the AI companion — talking to ChatBase without ChatBase keeping the
// conversation.
//
// The old embed logged every chat to Johanna's ChatBase dashboard, forever.
// Instead we call ChatBase's v1 chat API ourselves and NEVER send a
// conversationId: ChatBase's support confirmed that without one the exchange is
// answered in memory and not written to the dashboard or chat logs. The running
// conversation lives only in the member's browser and is resent with each turn,
// so Field still follows the thread. Nothing here is written to our database and
// nothing in this module logs message text.
//
// Privacy rules enforced here:
//   - only role + content are forwarded; any other field is dropped, so no name,
//     email or user id can ride along
//   - no conversationId, ever
//   - the request body is built from the sanitised messages only

const CHATBASE_CHAT_URL = "https://www.chatbase.co/api/v1/chat";
const DEFAULTS = { maxTurns: 30, maxChars: 4000 };

/** Keep only well-formed user/assistant turns, most recent first-in-order, capped. */
export function sanitiseMessages(messages, opts = {}) {
    const { maxTurns, maxChars } = { ...DEFAULTS, ...opts };
    const clean = (Array.isArray(messages) ? messages : [])
        .filter((m) => m && typeof m === "object" && (m.role === "user" || m.role === "assistant"))
        .filter((m) => typeof m.content === "string" && m.content.trim().length > 0)
        .map((m) => ({ role: m.role, content: m.content.trim().slice(0, maxChars) }));
    return clean.slice(-maxTurns);
}

/** The exact fetch to make to ChatBase. Throws if there is nothing to answer. */
export function buildChatbaseRequest({ messages, chatbotId, apiKey, stream = true, temperature = 0 }) {
    const turns = sanitiseMessages(messages);
    if (!turns.length || turns[turns.length - 1].role !== "user") {
        throw new Error("A message from the member is required.");
    }
    return {
        url: CHATBASE_CHAT_URL,
        init: {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ messages: turns, chatbotId, stream, temperature }),
        },
    };
}

/** Members with an active/trialing subscription, or admins, may use Field. */
export async function memberCanChat(user, db) {
    const { data: sub } = await db.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle();
    if (sub && (sub.status === "active" || sub.status === "trialing")) return true;
    const { data: role } = await db.from("user_roles").select("role").eq("id", user.id).maybeSingle();
    return role?.role === "admin";
}
