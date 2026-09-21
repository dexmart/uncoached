// Sending transactional email through Resend.
//
// Transactional only — confirmations and the member welcome. Marketing lives in
// Kit and only reaches people who opted in to the newsletter.
const FROM = process.env.MAIL_FROM || "Uncoached <hello@uncoached.space>";

export async function sendEmail({ to, subject, html, replyTo }) {
    const key = (process.env.RESEND_API_KEY || "").trim();
    if (!key) return { ok: false, reason: "no_api_key" };
    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({ from: FROM, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
        });
        if (!res.ok) {
            // Status only — never the body, which quotes the message back.
            console.error("Resend rejected an email:", res.status);
            return { ok: false, reason: `resend_${res.status}` };
        }
        return { ok: true };
    } catch (err) {
        console.error("Email send failed:", err?.message || "unknown");
        return { ok: false, reason: "exception" };
    }
}

/** The friendliest name we hold for someone, or null. */
export function displayNameOf(user) {
    const m = user?.user_metadata || {};
    return m.display_name || m.full_name || m.name || null;
}
