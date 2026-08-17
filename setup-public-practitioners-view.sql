-- ============================================================================
-- Publish APPROVED practitioners to the public site — safely.
--
-- practitioner_applications holds private data (email, resource ideas, admin
-- notes). Rather than let the public read that table, expose a view containing
-- only the fields Johanna's guide promises will be shown publicly.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

-- The public must not read the applications table directly any more.
drop policy if exists "public can view approved practitioners" on practitioner_applications;

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
    created_at
from practitioner_applications
where status = 'approved';

-- The view runs with its owner's rights, so it can read approved rows without
-- opening up the underlying table.
grant select on public_practitioners to anon, authenticated;

-- Verify: should list only approved practitioners, and no email column.
-- select * from public_practitioners;
