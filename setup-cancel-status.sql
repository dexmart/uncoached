-- ============================================================================
-- Cancellation status on memberships.
--
-- When a member cancels in Stripe's portal, the membership stays active until
-- the end of the paid period, then ends. This column records that it is set to
-- end, so the Billing page says "Access ends on" instead of "Renews on", and
-- the server sends the cancellation confirmation email (server/lib/cancelEmail.js).
--
-- Run in the Supabase SQL editor BEFORE the server update goes live.
-- Safe to run more than once.
-- ============================================================================

alter table public.subscriptions
    add column if not exists cancel_at_period_end boolean not null default false;
