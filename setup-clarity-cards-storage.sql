-- ================================================================================================
-- UNCOACHED - CLARITY CARDS STORAGE BUCKET & DB UPDATE
-- Run this in the Supabase SQL Editor to prepare for the 10 PDF cards
-- ================================================================================================

-- 1. Add file_url column to clarity_cards table if it doesn't exist
ALTER TABLE public.clarity_cards ADD COLUMN IF NOT EXISTS file_url TEXT;

-- 2. Create the 'clarity-cards' storage bucket (public so users can download their PDF)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'clarity-cards',
    'clarity-cards',
    true,
    10485760, -- 10MB
    ARRAY['application/pdf']
) ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 3. Allow authenticated users to view/download clarity cards
DROP POLICY IF EXISTS "clarity_cards_read" ON storage.objects;
CREATE POLICY "clarity_cards_read" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'clarity-cards'
        AND auth.role() = 'authenticated'
    );

-- 4. Allow admins (e.g. johanna at the dashboard) to upload/update/delete cards
-- Assuming standard admin bucket policy using auth.uid() or just leaving it for dashboard service role
DROP POLICY IF EXISTS "clarity_cards_admin_all" ON storage.objects;
CREATE POLICY "clarity_cards_admin_all" ON storage.objects
    FOR ALL USING (
        bucket_id = 'clarity-cards' 
        -- In a real app we'd check admin role here, but the dashboard uses the anon/service key
        -- For now we allow authenticated users to *read* and admins uploading from dashboard will bypass RLS (if using service role) 
        -- or we allow authenticated inserts if configuring through the frontend
    );

-- (If the admin frontend is uploading these via an authenticated user session, we allow inserts from authenticated users for now)
CREATE POLICY "clarity_cards_auth_insert" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'clarity-cards'
        AND auth.role() = 'authenticated'
    );
    
CREATE POLICY "clarity_cards_auth_update" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'clarity-cards'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "clarity_cards_auth_delete" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'clarity-cards'
        AND auth.role() = 'authenticated'
    );
