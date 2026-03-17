-- ============================================
-- Voice Notes Seed Script
-- Run this in Supabase SQL Editor
-- ============================================

-- Clear existing voice notes
TRUNCATE TABLE voice_notes CASCADE;

-- Insert the 6 official voice notes
-- NOTE: After running this script, upload the .wav files to Supabase Storage:
--   Bucket: voice-notes → Folder: files/
--   Use the exact filenames below.
-- 
-- ALTERNATIVE: Use the Admin Voice Notes page to edit each entry
-- and upload the audio files directly through the browser.

INSERT INTO voice_notes (title, description, duration, audio_url, is_active, sort_order) VALUES
(
    'When You Feel Like Giving Up',
    'A reminder that rest is not the same as quitting. You''ve come further than you think.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/when-you-feel-like-giving-up.wav',
    true,
    1
),
(
    'You''re Not Behind',
    'Your timeline is yours. Stop measuring your chapter 3 against someone else''s chapter 20.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/youre-not-behind.wav',
    true,
    2
),
(
    'The Messy Middle',
    'Growth doesn''t always look pretty. This is for the in-between — when things feel uncertain.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/the-messy-middle.wav',
    true,
    3
),
(
    'Permission to Change',
    'You are allowed to outgrow who you were. This is not betrayal — it''s becoming.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/permission-to-change.wav',
    true,
    4
),
(
    'On Being Enough',
    'You don''t need to earn your place. You belong here exactly as you are.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/on-being-enough.wav',
    true,
    5
),
(
    'When Anxiety Visits',
    'Anxiety is not your enemy — it''s a signal. This message helps you meet it gently.',
    '',
    'https://vgzepwglrtaqzsfqfqdo.supabase.co/storage/v1/object/public/voice-notes/files/when-anxiety-visits.wav',
    true,
    6
);
