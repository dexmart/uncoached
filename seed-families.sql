-- Run this in the Supabase SQL Editor to quickly migrate your hardcoded families over!
INSERT INTO audio_families (id, title, icon, description, use_when, sort_order) VALUES 
('calm-me-down', 'Calm Me Down', '💗', 'For anxiety, nervous system overload, or high activation.', 'Your system is braced or scanning for threat and needs to settle first.', 1),
('emotional-regulation', 'Emotional Regulation', '🤍', 'For strong emotions that need space, not suppression.', 'Feelings are intense, heavy, or consuming and you want to stay connected.', 2),
('motivate-me', 'Motivate Me', '🌅', 'For gently bringing energy or confidence online.', 'Energy feels low, flat, or tight, or when you want to amplify a good state.', 3),
('help-me-focus', 'Help Me Focus', '🎯', 'For clarity, presence, and steadiness.', 'Attention is scattered or you''re moving between roles or moments.', 4)
ON CONFLICT (id) DO NOTHING;
