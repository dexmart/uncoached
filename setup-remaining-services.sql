-- ================================================================================================
-- UNCOACHED - REMAINING SERVICES SCHEMA SETUP (UPDATED & BULLETPROOF)
-- Details: Creates tables, correctly adds new columns if tables already existed,
--          and fixes RLS policies to successfully reference `user_roles.id`.
-- ================================================================================================

-- 1. Pocket Prompts
------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pocket_prompt_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pocket_prompts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.pocket_prompt_categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    prompt TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Force add missing columns just in case the tables already existed from an older version
ALTER TABLE public.pocket_prompts ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.pocket_prompts ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE public.pocket_prompt_categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 2. Clarity Cards
------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clarity_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.clarity_cards ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.clarity_cards ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 3. Affirmations
------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.affirmation_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.affirmations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES public.affirmation_categories(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.affirmations ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.affirmations ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
ALTER TABLE public.affirmation_categories ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 4. Voice Notes
------------------------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.voice_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    audio_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.voice_notes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.voice_notes ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- ================================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================================================

-- Enable RLS on all tables
ALTER TABLE public.pocket_prompt_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pocket_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clarity_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affirmation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_notes ENABLE ROW LEVEL SECURITY;

-- Drop potentially conflicting old policies first
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.pocket_prompt_categories;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.pocket_prompts;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.clarity_cards;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.affirmation_categories;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.affirmations;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.voice_notes;

DROP POLICY IF EXISTS "Admins can insert" ON public.pocket_prompt_categories;
DROP POLICY IF EXISTS "Admins can update" ON public.pocket_prompt_categories;
DROP POLICY IF EXISTS "Admins can delete" ON public.pocket_prompt_categories;
DROP POLICY IF EXISTS "Admins can insert" ON public.pocket_prompts;
DROP POLICY IF EXISTS "Admins can update" ON public.pocket_prompts;
DROP POLICY IF EXISTS "Admins can delete" ON public.pocket_prompts;
DROP POLICY IF EXISTS "Admins can insert" ON public.clarity_cards;
DROP POLICY IF EXISTS "Admins can update" ON public.clarity_cards;
DROP POLICY IF EXISTS "Admins can delete" ON public.clarity_cards;
DROP POLICY IF EXISTS "Admins can insert" ON public.affirmation_categories;
DROP POLICY IF EXISTS "Admins can update" ON public.affirmation_categories;
DROP POLICY IF EXISTS "Admins can delete" ON public.affirmation_categories;
DROP POLICY IF EXISTS "Admins can insert" ON public.affirmations;
DROP POLICY IF EXISTS "Admins can update" ON public.affirmations;
DROP POLICY IF EXISTS "Admins can delete" ON public.affirmations;
DROP POLICY IF EXISTS "Admins can insert" ON public.voice_notes;
DROP POLICY IF EXISTS "Admins can update" ON public.voice_notes;
DROP POLICY IF EXISTS "Admins can delete" ON public.voice_notes;


-- Reading Policies (Public/Member)
CREATE POLICY "Public profiles are viewable by everyone." ON public.pocket_prompt_categories FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON public.pocket_prompts FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Public profiles are viewable by everyone." ON public.clarity_cards FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Public profiles are viewable by everyone." ON public.affirmation_categories FOR SELECT USING (true);
CREATE POLICY "Public profiles are viewable by everyone." ON public.affirmations FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Public profiles are viewable by everyone." ON public.voice_notes FOR SELECT USING (is_active = true OR EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

-- Admin Management Policies (Write Access)
CREATE POLICY "Admins can insert" ON public.pocket_prompt_categories FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.pocket_prompt_categories FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.pocket_prompt_categories FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

CREATE POLICY "Admins can insert" ON public.pocket_prompts FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.pocket_prompts FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.pocket_prompts FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

CREATE POLICY "Admins can insert" ON public.clarity_cards FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.clarity_cards FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.clarity_cards FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

CREATE POLICY "Admins can insert" ON public.affirmation_categories FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.affirmation_categories FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.affirmation_categories FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

CREATE POLICY "Admins can insert" ON public.affirmations FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.affirmations FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.affirmations FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

CREATE POLICY "Admins can insert" ON public.voice_notes FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can update" ON public.voice_notes FOR UPDATE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));
CREATE POLICY "Admins can delete" ON public.voice_notes FOR DELETE USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'));

-- ================================================================================================
-- STORAGE BUCKET FOR VOICE NOTES
-- ================================================================================================

-- Create general audio bucket via SQL is usually restricted; use the Dashboard to create it
-- if it does not already exist, but we will seed the bucket config row if needed:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('voice-notes', 'voice-notes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'voice-notes' (Drop old ones first to prevent duplicates)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

CREATE POLICY "Public Access" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'voice-notes');

CREATE POLICY "Admin Upload Access" 
    ON storage.objects FOR INSERT 
    WITH CHECK (
        bucket_id = 'voice-notes' 
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
    );

CREATE POLICY "Admin Update Access" 
    ON storage.objects FOR UPDATE 
    USING (
        bucket_id = 'voice-notes' 
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
    );

CREATE POLICY "Admin Delete Access" 
    ON storage.objects FOR DELETE 
    USING (
        bucket_id = 'voice-notes' 
        AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
    );
