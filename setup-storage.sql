-- Run this in your Supabase SQL Editor.
-- This script is completely safe to run multiple times (idempotent).
-- It creates the "audio-breaths" storage bucket using unique policy names to avoid conflicts.

-- 1. Create the bucket (ignores if it already exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-breaths', 'audio-breaths', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Drop specific policies if they exist so we can cleanly recreate them
DROP POLICY IF EXISTS "audio_breaths_public_read" ON storage.objects;
DROP POLICY IF EXISTS "audio_breaths_admin_insert" ON storage.objects;
DROP POLICY IF EXISTS "audio_breaths_admin_update" ON storage.objects;
DROP POLICY IF EXISTS "audio_breaths_admin_delete" ON storage.objects;

-- 3. Allow public read access to the bucket
CREATE POLICY "audio_breaths_public_read"
ON storage.objects FOR SELECT
USING ( bucket_id = 'audio-breaths' );

-- 4. Allow Admins to upload new files
CREATE POLICY "audio_breaths_admin_insert"
ON storage.objects FOR INSERT
WITH CHECK ( 
    bucket_id = 'audio-breaths' 
    AND (SELECT role FROM public.user_roles WHERE id = auth.uid()) = 'admin' 
);

-- 5. Allow Admins to update files
CREATE POLICY "audio_breaths_admin_update"
ON storage.objects FOR UPDATE
USING ( 
    bucket_id = 'audio-breaths' 
    AND (SELECT role FROM public.user_roles WHERE id = auth.uid()) = 'admin' 
);

-- 6. Allow Admins to delete files
CREATE POLICY "audio_breaths_admin_delete"
ON storage.objects FOR DELETE
USING ( 
    bucket_id = 'audio-breaths' 
    AND (SELECT role FROM public.user_roles WHERE id = auth.uid()) = 'admin' 
);
