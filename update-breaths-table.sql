-- Run this in the Supabase SQL Editor.
-- We need to completely drop and recreate the audio_breaths table 
-- because the 'id' column was accidentally created as a UUID type instead of TEXT in your existing DB.

DROP TABLE IF EXISTS audio_breaths CASCADE;

CREATE TABLE audio_breaths (
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

CREATE POLICY "Public Read Access for Audio Breaths" ON audio_breaths FOR SELECT USING (true);
CREATE POLICY "Admin Write Access for Audio Breaths" ON audio_breaths FOR ALL USING (
    EXISTS (SELECT 1 FROM user_roles WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin')
);
