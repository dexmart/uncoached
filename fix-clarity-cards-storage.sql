-- ================================================================================================
-- UNCOACHED - lock down the Clarity Card PDFs
--
-- The original setup gave the 'clarity-cards' storage folder a catch-all rule
-- ("clarity_cards_admin_all", FOR ALL with no role check) plus insert/update/
-- delete rules for any signed-in account. Together that meant anyone could
-- replace or delete the card PDFs. This puts it in line with the audio folders:
-- signed-in people can read, only admins can upload, replace or delete.
--
-- Safe to run more than once. It doesn't touch any files.
-- ================================================================================================

-- Make sure the folder exists (PDFs only, up to 10 MB).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('clarity-cards', 'clarity-cards', true, 10485760, array['application/pdf'])
on conflict (id) do update
set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "clarity_cards_admin_all" on storage.objects;
drop policy if exists "clarity_cards_auth_insert" on storage.objects;
drop policy if exists "clarity_cards_auth_update" on storage.objects;
drop policy if exists "clarity_cards_auth_delete" on storage.objects;
drop policy if exists "clarity_cards_read" on storage.objects;
drop policy if exists "clarity_cards_admin_insert" on storage.objects;
drop policy if exists "clarity_cards_admin_update" on storage.objects;
drop policy if exists "clarity_cards_admin_delete" on storage.objects;

create policy "clarity_cards_read" on storage.objects
    for select using (bucket_id = 'clarity-cards' and auth.role() = 'authenticated');

create policy "clarity_cards_admin_insert" on storage.objects
    for insert with check (
        bucket_id = 'clarity-cards'
        and exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin')
    );

create policy "clarity_cards_admin_update" on storage.objects
    for update using (
        bucket_id = 'clarity-cards'
        and exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin')
    );

create policy "clarity_cards_admin_delete" on storage.objects
    for delete using (
        bucket_id = 'clarity-cards'
        and exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin')
    );

-- Check: should list exactly the four clarity_cards_* rules above.
select policyname, cmd from pg_policies
where schemaname = 'storage' and tablename = 'objects' and policyname ilike 'clarity%'
order by policyname;
