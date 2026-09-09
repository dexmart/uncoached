# GiftUp gift card redemption — design

Date: 2026-09-08. Approved in chat by Boye after Johanna's video showing a
GiftUp code ("B4J24") rejected by Stripe's promotion-code box.

## Problem

Johanna sells membership gift cards through GiftUp (1-month $22, 3-month $62,
6-month $120, 1-year). GiftUp emails the recipient a code. Nothing on the site
or in Stripe knows that code, so the recipient cannot use it.

## Solution

A `/redeem` page that checks the code with GiftUp's API and grants membership
as a Stripe subscription in a trial that ends when the gift runs out.

### Server (`server/routes/gift.js`, `server/lib/giftup.js`)

- `POST /gift/check { code }` — public. Looks the card up at GiftUp and returns
  `{ ok, title, months }` or `{ ok:false, error }`. Never redeems.
- `POST /gift/redeem { accessToken, code }` — the signed-in user (identity from
  the Supabase JWT, never from the body) redeems the card:
  1. Look up the card; refuse if it cannot be redeemed (expired, voided, used).
  2. Map the card to a membership length: `(\d+)[- ]month` / `year|annual` in
     the card title; fall back to its initial value (22→1, 62→3, 120→6, 220→12).
  3. Refuse if the account already has an active or trialing membership.
  4. Find or create the Stripe customer by email. Pick the active recurring
     price whose interval matches the length. Create a subscription with
     `trial_end` = now + months and `trial_settings.end_behavior.missing_payment_method = cancel`,
     with GiftUp code and title in its metadata.
  5. Redeem the card in full at GiftUp (reason "Uncoached membership",
     metadata: user email, subscription id). If that fails, cancel the Stripe
     subscription and report the error — the card stays usable.
  6. Upsert the `subscriptions` row (`status: trialing`, `plan: gift-N-months`).
- Env: `GIFTUP_API_KEY` (required). `GIFTUP_TEST_MODE=true` sends
  `x-giftup-testmode: true` so it can be tried against GiftUp's test data.
- No new table: Stripe metadata + GiftUp's own ledger are the audit trail.
- Existing webhooks keep the row in sync; when the trial ends Stripe cancels
  and `customer.subscription.deleted` marks the row cancelled.

### Frontend

- `src/pages/RedeemPage.jsx` at `/redeem`, code pre-filled from `?code=`.
  Shows what the card is worth (via `/gift/check`), then either sign-in /
  sign-up buttons or a Redeem button. On success, refreshes the auth
  context's subscription and goes to `/dashboard`.
- A pending code is kept in `localStorage` (`uncoached.giftCode`) so it
  survives sign-in, sign-up and Google OAuth. `ProtectedRoute` sends a
  non-subscriber with a pending code to `/redeem` instead of `/pricing`;
  sign-up does the same after account creation.
- `AuthContext`: accept `trialing` rows from Supabase (today only `active`
  counts, so a gifted member would depend on Render being awake) and expose
  `refreshSubscription`.
- Links: "Have a gift card?" on Pricing; "Received a gift card? Redeem it" on
  the Gift section. Page copy is editable through Site Copy (`redeem.*`).

### Decisions

- Recipient email is NOT enforced. The code is the secret and redemption is
  single-use; forcing an email match would only create support requests when
  someone signs up with a different address than the one the gift was sent to.
- Existing members cannot stack a gift; Johanna handles those by hand.

### Testing

- `node --test` over `server/lib/giftup.js` (title/value → months, trial end
  date, GiftUp error → message).
- Route validation paths run locally with placeholder keys.
- Live redemption needs Johanna's API key; first run against GiftUp test mode.
