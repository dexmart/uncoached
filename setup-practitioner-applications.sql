-- ============================================================================
-- Practitioner Partnership applications (from /partnership/apply)
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

create table if not exists practitioner_applications (
    id                  uuid primary key default gen_random_uuid(),
    -- Who they are
    full_name           text not null,
    credentials         text,
    email               text not null,
    photo_url           text,
    bio                 text,
    -- Practice details
    areas_of_focus      text,
    countries           text,
    delivery            text,          -- virtual / in-person / both
    languages           text,
    website_url         text,
    social_url          text,
    -- Contribution
    expertise_area      text,
    resource_ideas      text,
    consent             boolean not null default false,
    -- Review workflow
    status              text not null default 'pending',  -- pending | approved | declined
    admin_notes         text,
    created_at          timestamptz not null default now()
);

create index if not exists practitioner_applications_status_idx
    on practitioner_applications (status, created_at desc);

alter table practitioner_applications enable row level security;

-- Only admins can read/manage applications. Inserts happen server-side via the
-- service-role key (which bypasses RLS), so applicants never read this table.
drop policy if exists "admins manage practitioner applications" on practitioner_applications;
create policy "admins manage practitioner applications"
    on practitioner_applications for all
    using (exists (select 1 from user_roles r where r.id = auth.uid() and r.role = 'admin'));

-- Approved applications are what the public /practitioners page will show.
drop policy if exists "public can view approved practitioners" on practitioner_applications;
create policy "public can view approved practitioners"
    on practitioner_applications for select
    using (status = 'approved');

-- ── Storage bucket for the professional photos ──────────────────────────────
insert into storage.buckets (id, name, public)
values ('practitioner-photos', 'practitioner-photos', true)
on conflict (id) do update set public = true;

-- Anyone can view a photo, and applicants (not signed in) can upload theirs.
drop policy if exists "practitioner photos public read" on storage.objects;
create policy "practitioner photos public read" on storage.objects
    for select using (bucket_id = 'practitioner-photos');

drop policy if exists "practitioner photos public upload" on storage.objects;
create policy "practitioner photos public upload" on storage.objects
    for insert with check (bucket_id = 'practitioner-photos');
