-- ============================================================================
-- Adds an optional "Uncoached Resource" to a practitioner's profile.
--
-- Johanna fills this in when she edits someone in Admin > Practitioners, and it
-- shows on their card in the public directory, so visitors can see what that
-- practitioner contributed to the Library.
--
-- Optional: a profile with nothing in it simply doesn't show the line.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

alter table practitioner_applications
    add column if not exists uncoached_resource text;

-- The public directory reads through this view rather than the table, so the
-- new column has to be added here too or it will never reach the website.
-- (CREATE OR REPLACE allows new columns on the end, which is what this is.)
create or replace view public_practitioners as
select
    id,
    full_name,
    credentials,
    photo_url,
    bio,
    areas_of_focus,
    countries,
    delivery,
    languages,
    website_url,
    social_url,
    created_at,
    uncoached_resource
from practitioner_applications
where status = 'approved';

grant select on public_practitioners to anon, authenticated;

-- Verify: the new column should be listed, empty for everyone so far.
-- select full_name, uncoached_resource from public_practitioners;
