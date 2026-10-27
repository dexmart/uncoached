import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCancelEmail, isCancelScheduled, cancelJustScheduled, accessEndsIso } from "../lib/cancelEmail.js";

const PERIOD_END = 1795000000; // 18 Nov 2026
const sub = (extra = {}) => ({
    id: "sub_1", status: "active", cancel_at_period_end: false, cancel_at: null,
    items: { data: [{ current_period_end: PERIOD_END }] }, ...extra,
});

test("the email uses Johanna's wording and the date access ends", () => {
    const { subject, html } = buildCancelEmail({ endsOn: "2026-11-18T12:00:00.000Z", frontendUrl: "https://uncoached.space" });
    assert.equal(subject, "Your Uncoached membership cancellation is confirmed");
    assert.match(html, /Your membership has been cancelled, and you won.t be charged for another renewal\./);
    assert.match(html, /You.ll still have access to Uncoached until the end of your current paid period: <strong>18 November 2026<\/strong>\./);
    assert.match(html, /Thank you for spending time with us\./);
});

test("without a date the email still reads properly", () => {
    const { html } = buildCancelEmail({ endsOn: null });
    assert.equal(/undefined|null|Invalid/.test(html), false);
    assert.match(html, /until the end of your current paid period\./);
});

test("a cancellation is scheduled by cancel_at_period_end or by cancel_at", () => {
    assert.equal(isCancelScheduled(sub()), false);
    assert.equal(isCancelScheduled(sub({ cancel_at_period_end: true })), true);
    assert.equal(isCancelScheduled(sub({ cancel_at: PERIOD_END })), true);
    assert.equal(isCancelScheduled(sub({ cancel_at_period_end: true, status: "canceled" })), false);
    // Stripe puts a far-off cancel_at on test subscriptions; that is not the member cancelling.
    assert.equal(isCancelScheduled(sub({ cancel_at: PERIOD_END + 60 * 86400 })), false);
});

test("cancelling a test subscription that already had a far-off cancel_at still counts", () => {
    const now = sub({ cancel_at_period_end: true, cancel_at: PERIOD_END });
    assert.equal(cancelJustScheduled(now, { cancel_at_period_end: false, cancel_at: PERIOD_END + 60 * 86400 }), true);
    assert.equal(accessEndsIso(sub({ cancel_at_period_end: true, cancel_at: PERIOD_END + 60 * 86400 })),
        new Date(PERIOD_END * 1000).toISOString());
});

test("only the change from renewing to cancelling counts, so other updates send nothing", () => {
    assert.equal(cancelJustScheduled(sub({ cancel_at_period_end: true }), { cancel_at_period_end: false }), true);
    assert.equal(cancelJustScheduled(sub({ cancel_at: PERIOD_END }), { cancel_at: null }), true);
    // Already cancelling, something else changed (e.g. a card update).
    assert.equal(cancelJustScheduled(sub({ cancel_at_period_end: true }), { default_payment_method: "pm_x" }), false);
    // Member un-cancelled.
    assert.equal(cancelJustScheduled(sub(), { cancel_at_period_end: true }), false);
    assert.equal(cancelJustScheduled(sub({ cancel_at_period_end: true }), undefined), false);
});

test("access ends at cancel_at when set, else at the end of the paid period", () => {
    assert.equal(accessEndsIso(sub({ cancel_at_period_end: true })), new Date(PERIOD_END * 1000).toISOString());
    assert.equal(accessEndsIso(sub({ cancel_at: PERIOD_END - 86400 })), new Date((PERIOD_END - 86400) * 1000).toISOString());
});
