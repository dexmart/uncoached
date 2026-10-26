// The email a member gets when they cancel their membership.
//
// Cancelling in Stripe's portal does not end the membership at once: it stops
// the next renewal, and access lasts until the end of the paid period. Stripe
// tells us with a customer.subscription.updated event, and this confirms it in
// writing so the member has a record. Transactional, so it goes through Resend.
// Wording from Johanna, 26 Oct 2026.

const prettyDate = (iso) => {
    const d = new Date(iso);
    return isNaN(d) ? null : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

/** True while a subscription is set to stop at a future date. */
export function isCancelScheduled(sub) {
    if (!sub || sub.status === "canceled") return false;
    return Boolean(sub.cancel_at_period_end || sub.cancel_at);
}

/** True when this update is the moment the member cancelled. `previous` is the event's previous_attributes. */
export function cancelJustScheduled(sub, previous) {
    if (!previous || !isCancelScheduled(sub)) return false;
    const touched = "cancel_at_period_end" in previous || "cancel_at" in previous;
    return touched && !isCancelScheduled({ ...sub, ...previous });
}

/** When access ends, as an ISO date (or null). */
export function accessEndsIso(sub) {
    const secs = sub?.cancel_at ?? sub?.current_period_end ?? sub?.items?.data?.[0]?.current_period_end;
    return secs ? new Date(secs * 1000).toISOString() : null;
}

const P = (inner) =>
    `<p style="margin:0 0 16px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#5E6A65;">${inner}</p>`;

/** Subject + HTML for the cancellation email. Pure, so it can be checked in tests. */
export function buildCancelEmail({ endsOn, frontendUrl = "https://uncoached.space" }) {
    const site = frontendUrl.replace(/\/$/, "");
    const ends = endsOn ? prettyDate(endsOn) : null;

    const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F1EC;">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="width:520px;max-width:100%;background:#ffffff;border:1px solid #E4DACE;border-radius:16px;">
        <tr><td style="padding:40px 40px 0;text-align:center;">
          <img src="${site}/logo/logo-sage-on-light.png" width="150" alt="Uncoached" style="width:150px;max-width:60%;height:auto;">
        </td></tr>
        <tr><td style="padding:28px 40px 12px;">
          ${P("Your membership has been cancelled, and you won't be charged for another renewal.")}
          ${P(ends
              ? `You'll still have access to Uncoached until the end of your current paid period: <strong>${ends}</strong>.`
              : "You'll still have access to Uncoached until the end of your current paid period.")}
          ${P("Thank you for spending time with us.")}
        </td></tr>
        <tr><td style="padding:20px 40px;background:#0F1110;border-radius:0 0 16px 16px;text-align:center;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#F4F1EC;opacity:0.7;">A quiet space for reflection &middot; &copy; 2026 Emergyng Energy Inc.</p>
        </td></tr>
      </table>
    </td>
  </tr>
</table>`;

    return { subject: "Your Uncoached membership cancellation is confirmed", html };
}
