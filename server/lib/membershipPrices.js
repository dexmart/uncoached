// The membership prices Uncoached sells: monthly, quarterly, every 6 months,
// yearly. These are public Stripe IDs, not secrets (the website shows them too).
//
// The server only accepts these. Without the list, checkout would take any
// price the browser sent, so an active $0 price on the Stripe account would be
// a free membership, and a gift could land on the wrong price.
//
// If the prices ever change, set STRIPE_MEMBERSHIP_PRICE_IDS on Render
// (comma-separated) and update the matching VITE_STRIPE_*_PRICE_ID on Vercel.
export const DEFAULT_MEMBERSHIP_PRICE_IDS = [
    "price_1SwUUYEWs3ZowGgCtSYjSr5c", // monthly
    "price_1SwUVCEWs3ZowGgCrUbNGXRf", // quarterly
    "price_1SwUVdEWs3ZowGgCvw1HCCfO", // every 6 months
    "price_1SwUW5EWs3ZowGgCdezKGtTZ", // yearly
];

export function membershipPriceIds(env = process.env) {
    const fromEnv = String(env.STRIPE_MEMBERSHIP_PRICE_IDS || "")
        .split(",").map((s) => s.trim()).filter(Boolean);
    return fromEnv.length ? fromEnv : DEFAULT_MEMBERSHIP_PRICE_IDS;
}

export const isMembershipPrice = (priceId, env = process.env) =>
    membershipPriceIds(env).includes(priceId);
