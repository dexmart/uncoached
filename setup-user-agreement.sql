-- ============================================================================
-- User Agreement acceptance records (final audit, item 7)
--
-- What this is for: reliable evidence of exactly WHICH VERSION of each document
-- a member accepted, and when — not merely that their account exists.
--
-- How it works:
--   * A member is asked to accept the first time they enter the members area.
--   * One row is written at that moment, recording the version of every
--     document as it stood right then.
--   * Rows are insert-only. Nobody — not even an admin — can edit or delete
--     them from the website, which is what makes them evidence.
--   * If Johanna later publishes a new User Agreement version, members are
--     asked to accept again, and a NEW row is written. The old row stays, so
--     the history of who accepted what is preserved.
--
-- The version numbers themselves live in Website Text in the admin, next to
-- each document, so Johanna bumps a version when her lawyer changes wording.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

create table if not exists public.document_acceptances (
    id                      uuid primary key default gen_random_uuid(),
    user_id                 uuid not null references auth.users(id) on delete cascade,
    accepted                boolean not null default true,
    accepted_at             timestamptz not null default now(),
    -- The version of each document AT THE MOMENT OF ACCEPTANCE.
    user_agreement_version  text not null,
    terms_version           text,
    privacy_version         text,
    billing_version         text
);

create index if not exists document_acceptances_user_idx
    on public.document_acceptances (user_id, accepted_at desc);

alter table public.document_acceptances enable row level security;

drop policy if exists "members record their own acceptance" on public.document_acceptances;
drop policy if exists "members read their own acceptance"   on public.document_acceptances;
drop policy if exists "admins read all acceptances"         on public.document_acceptances;

-- A member may write their own record, and read their own back.
create policy "members record their own acceptance"
    on public.document_acceptances for insert
    with check (auth.uid() = user_id);

create policy "members read their own acceptance"
    on public.document_acceptances for select
    using (auth.uid() = user_id);

-- Admins can read everything, for evidence. Note there is deliberately NO
-- update or delete policy for anyone: these records cannot be altered from the
-- website once written.
create policy "admins read all acceptances"
    on public.document_acceptances for select
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));


-- ── Evidence query ──────────────────────────────────────────────────────────
-- Who accepted what, and when. Run this any time you need the record.
--
-- select u.email,
--        a.accepted,
--        a.accepted_at,
--        a.user_agreement_version,
--        a.terms_version,
--        a.privacy_version,
--        a.billing_version
--   from public.document_acceptances a
--   join auth.users u on u.id = a.user_id
--  order by a.accepted_at desc;
