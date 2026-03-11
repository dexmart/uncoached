-- -----------------------------------------------------------------------------
-- ADMIN BACKEND SCHEMA & RLS POLICIES (Safe to re-run)
-- -----------------------------------------------------------------------------

-- 1. Create a table to track admin users securely
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely enable RLS and create policy for user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Users can read their own role'
    ) THEN
        CREATE POLICY "Users can read their own role" 
        ON user_roles FOR SELECT 
        USING (auth.uid() = id);
    END IF;
END $$;


-- 2. Create the Audio Families table
CREATE TABLE IF NOT EXISTS audio_families (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    use_when TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE audio_families ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'audio_families' AND policyname = 'Public Read Access for Audio Families') THEN
        CREATE POLICY "Public Read Access for Audio Families" ON audio_families FOR SELECT USING (true);
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'audio_families' AND policyname = 'Admin Write Access for Audio Families') THEN
        CREATE POLICY "Admin Write Access for Audio Families" ON audio_families FOR ALL USING (
            EXISTS (SELECT 1 FROM user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
        );
     END IF;
END $$;


-- 3. Create the Audio Breaths table
CREATE TABLE IF NOT EXISTS audio_breaths (
    id TEXT PRIMARY KEY,
    family_id TEXT REFERENCES audio_families(id) ON DELETE CASCADE NOT NULL,
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
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE audio_breaths ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'audio_breaths' AND policyname = 'Public Read Access for Audio Breaths') THEN
        CREATE POLICY "Public Read Access for Audio Breaths" ON audio_breaths FOR SELECT USING (true);
     END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'audio_breaths' AND policyname = 'Admin Write Access for Audio Breaths') THEN
        CREATE POLICY "Admin Write Access for Audio Breaths" ON audio_breaths FOR ALL USING (
            EXISTS (SELECT 1 FROM user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
        );
     END IF;
END $$;
