// The one email a new member gets after paying (or redeeming a gift).
//
// This is transactional, not marketing: it confirms what they just got and
// shows them the way in. Every member gets it, which is why it goes through
// Resend and NOT through Kit — Kit is only ever for people who opted in to the
// newsletter. Keeping the two apart is also what we told Johanna's lawyer.

const esc = (s) =>
    String(s ?? "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** A plan name a person would recognise. */
export function planLabel(plan) {
    if (!plan) return "Membership";
    const gift = String(plan).match(/^gift-(\d+)-month/);
    if (gift) return gift[1] === "12" ? "1 year gift" : `${gift[1]} month gift`;
    const map = { monthly: "Monthly", quarterly: "3 months", biannual: "6 months", annual: "Annual" };
    const key = String(plan).toLowerCase();
    return map[key] || (plan.charAt(0).toUpperCase() + plan.slice(1));
}

const prettyDate = (iso) => {
    const d = new Date(iso);
    return isNaN(d) ? null : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

/** Subject + HTML for the welcome email. Pure, so it can be checked in tests. */
export function buildWelcomeEmail({ name, plan, isGift = false, endsOn = null, frontendUrl = "https://uncoached.space" }) {
    // First word only, and capped — a display name is user-supplied.
    const first = String(name || "").trim().split(/\s+/)[0].slice(0, 40);
    const greeting = first ? `Welcome, ${esc(first)}.` : "Welcome to Uncoached.";
    const site = frontendUrl.replace(/\/$/, "");
    const ends = endsOn ? prettyDate(endsOn) : null;

    const planLine = isGift
        ? `<p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5E6A65;">
             Your <strong>${esc(planLabel(plan))}</strong> is active${ends ? ` until <strong>${ends}</strong>` : ""}.
             It ends by itself on that date — it does not renew, and you will <strong>not be charged</strong>.
             If you'd like to carry on afterwards, you can choose a plan then.
           </p>`
        : `<p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5E6A65;">
             Your <strong>${esc(planLabel(plan))}</strong> membership is active. You can view invoices, change
             your payment method or cancel at any time from
             <a href="${site}/dashboard/billing" style="color:#3F5D4D;">billing</a> — if you cancel, you keep
             access until the end of the period you've paid for.
           </p>`;

    const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EC;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px;max-width:100%;background:#ffffff;border:1px solid #E4DACE;border-radius:16px;">
        <tr><td style="padding:40px 40px 0;text-align:center;">
          <img src="${site}/logo/logo-sage-on-light.png" width="150" alt="Uncoached" style="width:150px;max-width:60%;height:auto;">
        </td></tr>
        <tr><td style="padding:28px 40px 8px;text-align:center;">
          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:normal;color:#1F2422;">${greeting}</h1>
        </td></tr>
        <tr><td style="padding:0 40px;">
          <p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5E6A65;">
            You're in. Uncoached is a quiet, self-guided space — there's no course to keep up with and
            nothing you're behind on. Come when you need it, take what helps, and leave the rest.
          </p>
          ${planLine}
          <p style="margin:0 0 8px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5E6A65;">
            A gentle place to start: open <strong>Field</strong> and say whatever's on your mind, or try a
            short <strong>Audio Breath</strong> if you'd rather begin with your body.
          </p>
        </td></tr>
        <tr><td style="padding:28px 40px;text-align:center;">
          <a href="${site}/dashboard" style="display:inline-block;background:#3F5D4D;color:#F4F1EC;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 34px;border-radius:999px;">Open your space</a>
        </td></tr>
        <tr><td style="padding:0 40px 36px;text-align:center;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#8C857A;">
            Uncoached is designed to support reflection between sessions, not to replace therapy or coaching.
            If anything isn't working, just reply to this email.
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;background:#0F1110;border-radius:0 0 16px 16px;text-align:center;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#F4F1EC;opacity:0.7;">A quiet space for reflection &middot; &copy; 2026 Emergyng Energy Inc.</p>
        </td></tr>
      </table>
    </td>
  </tr>
</table>`;

    return { subject: first ? `Welcome to Uncoached, ${first}` : "Welcome to Uncoached", html };
}
