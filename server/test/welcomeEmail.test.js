import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWelcomeEmail, planLabel } from "../lib/welcomeEmail.js";

const base = { name: "Johanna", plan: "monthly", frontendUrl: "https://uncoached.space" };

test("plan labels read like a person wrote them", () => {
    assert.equal(planLabel("monthly"), "Monthly");
    assert.equal(planLabel("quarterly"), "3 months");
    assert.equal(planLabel("biannual"), "6 months");
    assert.equal(planLabel("annual"), "Annual");
    assert.equal(planLabel("gift-3-months"), "3 month gift");
    assert.equal(planLabel("gift-12-months"), "1 year gift");
    assert.equal(planLabel(null), "Membership");
});

test("a paid member is welcomed by name, with a way in and a way to manage billing", () => {
    const { subject, html } = buildWelcomeEmail(base);
    assert.match(subject, /welcome/i);
    assert.match(html, /Johanna/);
    assert.match(html, /https:\/\/uncoached\.space\/dashboard/);
    assert.match(html, /https:\/\/uncoached\.space\/dashboard\/billing/);
    assert.equal(/gift/i.test(html), false, "a paid member should not be told about gifts");
});

test("a gifted member is told it's a gift, when it ends, and that nothing will be charged", () => {
    const { html } = buildWelcomeEmail({
        ...base, plan: "gift-3-months", isGift: true, endsOn: "2026-12-20T12:00:00.000Z",
    });
    assert.match(html, /gift/i);
    assert.match(html, /20 December 2026/);
    assert.match(html, /not be charged|no charge/i);
    assert.equal(/renews on/i.test(html), false);
});

test("no name still reads properly, never 'undefined'", () => {
    const { html } = buildWelcomeEmail({ ...base, name: null });
    assert.equal(/undefined|null/.test(html), false);
    assert.match(html, /Hello|Welcome/i);
});

test("a name with HTML in it is escaped, not rendered", () => {
    // Only the first word is used as the greeting, so the nasty characters
    // all have to live in that first token.
    const { html } = buildWelcomeEmail({ ...base, name: '<script>alert(1)</script>&"x"' });
    assert.equal(html.includes("<script>"), false);
    assert.match(html, /&lt;script&gt;/);
    assert.match(html, /&amp;/);
    assert.match(html, /&quot;/);
});

test("an absurdly long name can't blow up the greeting or the subject", () => {
    const { subject, html } = buildWelcomeEmail({ ...base, name: "A".repeat(500) });
    assert.ok(subject.length < 120, `subject was ${subject.length} chars`);
    assert.equal(html.includes("A".repeat(100)), false);
});

test("the email is self-contained HTML with the brand footer", () => {
    const { html } = buildWelcomeEmail(base);
    assert.match(html, /Emergyng Energy Inc/);
    assert.match(html, /uncoached\.space\/logo\//);
});
