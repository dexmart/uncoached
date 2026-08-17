-- Remove the diagnostic rows created while testing the practitioner form.
-- Run in the Supabase SQL editor. Safe: only touches rows named 'ZZ ...'.

delete from practitioner_applications
where full_name like 'ZZ %';

-- Check what's left (should only be real applications):
-- select full_name, email, status, created_at
-- from practitioner_applications order by created_at desc;
