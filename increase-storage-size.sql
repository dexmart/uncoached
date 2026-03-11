-- Run this in the Supabase SQL Editor.
-- This will increase the maximum allowed file size for the 'audio-breaths' bucket 
-- to 100MB (104857600 bytes) to explicitly allow large .wav and .mp3 files.

UPDATE storage.buckets
SET file_size_limit = 104857600, -- 100MB in bytes
    allowed_mime_types = ARRAY['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/x-m4a', 'audio/aac', 'audio/ogg', 'audio/x-wav']
WHERE id = 'audio-breaths';
