-- ============================================================================
-- ONLY RUN THIS IF "+ Add a practitioner" FAILS.
--
-- The existing admin policy is `for all ... using (...)` with no WITH CHECK.
-- Postgres reuses the USING expression as the check in that case, so adding a
-- practitioner from the admin should already work. If it doesn't — if you get a
-- row-level security error — run this to state the check explicitly.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

drop policy if exists "admins manage practitioner applications" on practitioner_applications;
create policy "admins manage practitioner applications"
    on practitioner_applications for all
    using      (exists (select 1 from user_roles r where r.id = auth.uid() and r.role = 'admin'))
    with check (exists (select 1 from user_roles r where r.id = auth.uid() and r.role = 'admin'));

-- Verify: as an admin, this should return your row.
-- select id, full_name, status from practitioner_applications limit 5;
