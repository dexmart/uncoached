-- ============================================================================
-- High-Level Pocket Prompts — $2 one-time unlocks
-- Records which high-level prompts each member has purchased.
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

create table if not exists prompt_purchases (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references auth.users(id) on delete cascade,
    prompt_id   uuid not null references pocket_prompts(id) on delete cascade,
    created_at  timestamptz not null default now(),
    unique (user_id, prompt_id)
);

alter table prompt_purchases enable row level security;

-- Members can read their own purchases (the frontend uses this to unlock).
drop policy if exists "read own prompt purchases" on prompt_purchases;
create policy "read own prompt purchases"
    on prompt_purchases for select
    using (auth.uid() = user_id);

-- Inserts happen server-side (Stripe webhook) via the service-role key,
-- which bypasses RLS — so no insert policy is needed for clients.
