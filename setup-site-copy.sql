-- ============================================================================
-- Site Copy — lets Johanna edit the wording on the marketing pages herself.
--
-- This table only stores OVERRIDES. Every field's original wording lives in the
-- code as a fallback, so a missing row (or a field she clears) simply shows the
-- original text. Nothing can end up blank.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

create table if not exists site_copy (
    key        text primary key,
    value      text,
    updated_at timestamptz not null default now()
);

alter table site_copy enable row level security;

-- Anyone viewing the site needs to read the copy.
drop policy if exists "public can read site copy" on site_copy;
create policy "public can read site copy"
    on site_copy for select
    using (true);

-- Only admins can change it.
drop policy if exists "admins manage site copy" on site_copy;
create policy "admins manage site copy"
    on site_copy for all
    using (exists (select 1 from user_roles r where r.id = auth.uid() and r.role = 'admin'))
    with check (exists (select 1 from user_roles r where r.id = auth.uid() and r.role = 'admin'));
