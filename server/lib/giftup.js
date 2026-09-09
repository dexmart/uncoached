// GiftUp gift cards → Uncoached membership lengths.
//
// Johanna sells fixed products in GiftUp ("1-Month Uncoached Membership",
// "3-Month ... Gift Card", ...). We turn a card into a number of months, and
// talk to GiftUp's REST API to look cards up and mark them redeemed.
// API reference: https://developer.giftup.com/api

const GIFTUP_BASE = "https://api.giftup.app";

// Price → months, for cards whose title doesn't say. Mirrors the Pricing page.
const MONTHS_BY_VALUE = { 22: 1, 62: 3, 120: 6, 220: 12 };

/** How many months of membership a card is worth, or null if it isn't one. */
export function membershipMonths(card) {
    const title = String(card?.title || "");

    const m = title.match(/(\d+)\s*-?\s*month/i);
    if (m) return Number(m[1]);
    if (/\b(year|annual)\b/i.test(title)) return 12;

    const value = Number(card?.initialValue);
    return MONTHS_BY_VALUE[value] ?? null;
}

/** Unix timestamp (seconds) `months` calendar months after `now`. */
export function trialEndFor(months, now = new Date()) {
    const d = new Date(now.getTime());
    const day = d.getUTCDate();
    d.setUTCDate(1);
    d.setUTCMonth(d.getUTCMonth() + months);
    // Clamp to the target month's last day (31 Jan + 1 month → 28 Feb).
    const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
    d.setUTCDate(Math.min(day, lastDay));
    return Math.floor(d.getTime() / 1000);
}

/** Plain-English reason a card can't be redeemed, or null if it can. */
export function redemptionProblem(card) {
    if (card.canBeRedeemed) return null;
    if (card.hasExpired) return "This gift card has expired.";
    if (card.isVoided) return "This gift card has been cancelled.";
    if (card.notYetValid) return "This gift card is not valid yet.";
    if (Number(card.remainingValue) === 0 || Number(card.remainingUnits) === 0) {
        return "This gift card has already been used.";
    }
    return "This gift card cannot be redeemed.";
}

const normaliseCode = (code) => String(code || "").trim().toUpperCase();

/**
 * Minimal GiftUp client. `fetchFn` is injectable for tests; `testMode` sends
 * the header that makes GiftUp use its test data instead of live cards.
 */
export function createGiftUpClient({ apiKey, testMode = false, fetchFn = fetch }) {
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(testMode ? { "x-giftup-testmode": "true" } : {})
    };

    async function request(method, path, body) {
        const res = await fetchFn(`${GIFTUP_BASE}${path}`, {
            method,
            headers,
            ...(body ? { body: JSON.stringify(body) } : {})
        });
        if (res.status === 404) return null;
        if (!res.ok) {
            const detail = await res.text().catch(() => "");
            throw new Error(`GiftUp ${method} ${path} failed: ${res.status} ${detail}`.trim());
        }
        return res.json();
    }

    return {
        /** The card object, or null if GiftUp has no card with that code. */
        lookup: (code) => request("GET", `/gift-cards/${encodeURIComponent(normaliseCode(code))}`),

        /** Mark the whole card as used. Returns GiftUp's transaction record. */
        redeemInFull: (code, { reason, metadata } = {}) =>
            request("POST", `/gift-cards/${encodeURIComponent(normaliseCode(code))}/redeem-in-full`, { reason, metadata })
    };
}
