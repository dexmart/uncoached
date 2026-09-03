-- ============================================================================
-- Fix: "infinite recursion detected in policy for relation profiles"
--
-- Reading the subscriptions table from the website fails with that error, for
-- everyone. One of its row-level security policies looks up profiles, and a
-- policy on profiles loops back on itself, so Postgres gives up. The website
-- has been coping by asking Stripe directly on every page load instead — which
-- works, but only while the Render server is awake.
--
-- Those policies were created in the Supabase dashboard, not from this repo, so
-- this script replaces whatever is there with a plain, standard set:
--
--   subscriptions  members read their own row; admins read all.
--                  Writes are server-side only (Stripe webhook + verify), via
--                  the service-role key, which is not subject to these rules.
--   profiles       users read/insert/update their own row; admins read all.
--
-- Admin checks go through user_roles, the same as every other table here, so
-- nothing refers back to itself.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

-- Optional: see what is there now, before it is replaced.
-- select tablename, policyname, cmd, qual, with_check
--   from pg_policies where schemaname = 'public'
--    and tablename in ('subscriptions', 'profiles');


-- ── subscriptions ───────────────────────────────────────────────────────────
do $$
declare p record;
begin
    for p in
        select policyname from pg_policies
         where schemaname = 'public' and tablename = 'subscriptions'
    loop
        execute format('drop policy if exists %I on public.subscriptions', p.policyname);
    end loop;
end $$;

alter table public.subscriptions enable row level security;

create policy "members read own subscription"
    on public.subscriptions for select
    using (auth.uid() = user_id);

create policy "admins read all subscriptions"
    on public.subscriptions for select
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));


-- ── profiles ────────────────────────────────────────────────────────────────
do $$
declare p record;
begin
    for p in
        select policyname from pg_policies
         where schemaname = 'public' and tablename = 'profiles'
    loop
        execute format('drop policy if exists %I on public.profiles', p.policyname);
    end loop;
end $$;

alter table public.profiles enable row level security;

create policy "users read own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "users insert own profile"
    on public.profiles for insert
    with check (auth.uid() = id);

create policy "users update own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "admins read all profiles"
    on public.profiles for select
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));


-- Verify: both should now return rows (or an empty list) instead of an error.
-- select count(*) from public.subscriptions;
-- select count(*) from public.profiles;
