-- Clean up previous attempts to avoid column mismatches like 'is_active'
DROP TABLE IF EXISTS public.guided_shifts CASCADE;
DROP TABLE IF EXISTS public.guided_shift_categories CASCADE;

-- Create Guided Shift Categories Table
CREATE TABLE IF NOT EXISTS public.guided_shift_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    purpose TEXT NOT NULL,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Categories
ALTER TABLE public.guided_shift_categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories
DROP POLICY IF EXISTS "Public can view guided shift categories" ON public.guided_shift_categories;
CREATE POLICY "Public can view guided shift categories" ON public.guided_shift_categories
    FOR SELECT USING (true);

-- Allow admin full access to categories
DROP POLICY IF EXISTS "Admins can manage guided shift categories" ON public.guided_shift_categories;
CREATE POLICY "Admins can manage guided shift categories" ON public.guided_shift_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );

-- Create Guided Shifts Table
CREATE TABLE IF NOT EXISTS public.guided_shifts (
    id TEXT PRIMARY KEY, -- e.g., 'the-centering-drop'
    category_id UUID REFERENCES public.guided_shift_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    intro TEXT,
    description TEXT,
    approach TEXT,
    use_when JSONB DEFAULT '[]'::jsonb,
    science_text TEXT,
    science_source TEXT,
    spiritual_text TEXT,
    spiritual_source TEXT,
    audio_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Shifts
ALTER TABLE public.guided_shifts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active shifts
DROP POLICY IF EXISTS "Public can view active guided shifts" ON public.guided_shifts;
CREATE POLICY "Public can view active guided shifts" ON public.guided_shifts
    FOR SELECT USING (is_active = true);

-- Allow admin full access to shifts
DROP POLICY IF EXISTS "Admins can manage guided shifts" ON public.guided_shifts;
CREATE POLICY "Admins can manage guided shifts" ON public.guided_shifts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );

-- Create 'guided-shifts' Storage Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'guided-shifts', 
    'guided-shifts', 
    true, 
    524288000, -- 500MB
    ARRAY['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/x-m4a', 'audio/aac', 'audio/ogg', 'audio/x-wav']
) ON CONFLICT (id) DO UPDATE 
SET file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Storage Policies for 'guided-shifts' bucket
DROP POLICY IF EXISTS "guided_shifts_public_read" ON storage.objects;
CREATE POLICY "guided_shifts_public_read" ON storage.objects
    FOR SELECT USING (bucket_id = 'guided-shifts');

DROP POLICY IF EXISTS "guided_shifts_admin_insert" ON storage.objects;
CREATE POLICY "guided_shifts_admin_insert" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'guided-shifts' AND 
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );

DROP POLICY IF EXISTS "guided_shifts_admin_update" ON storage.objects;
CREATE POLICY "guided_shifts_admin_update" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'guided-shifts' AND 
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );

DROP POLICY IF EXISTS "guided_shifts_admin_delete" ON storage.objects;
CREATE POLICY "guided_shifts_admin_delete" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'guided-shifts' AND 
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );
