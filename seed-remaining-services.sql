-- ================================================================================================
-- UNCOACHED - REMAINING SERVICES DATA SEED
-- Tables: Pocket Prompts, Clarity Cards, Affirmations, Voice Notes
-- Details: Populates the tables with the original hardcoded dummy data to ensure safe migration
-- ================================================================================================

-- 1. Pocket Prompts
------------------------------------------------------------------------------------------------
-- Seeding Categories
INSERT INTO public.pocket_prompt_categories (id, title, slug, sort_order) VALUES 
('00000000-0000-0000-0001-000000000000', 'Self-Reflection', 'self-reflection', 0),
('00000000-0000-0000-0001-000000000001', 'Relationships', 'relationships', 1),
('00000000-0000-0000-0001-000000000002', 'Decisions', 'decisions', 2),
('00000000-0000-0000-0001-000000000003', 'Emotions', 'emotions', 3)
ON CONFLICT (id) DO NOTHING;

-- Seeding Prompts
INSERT INTO public.pocket_prompts (category_id, title, prompt, is_active, sort_order) VALUES
('00000000-0000-0000-0001-000000000000', 'The Real Question', 'What am I really asking myself right now?', true, 0),
('00000000-0000-0000-0001-000000000000', 'Permission Slip', 'What do I need to give myself permission to do?', true, 1),
('00000000-0000-0000-0001-000000000000', 'The Pattern', 'Have I been here before? What pattern am I in?', true, 2),

('00000000-0000-0000-0001-000000000001', 'The Unspoken', 'What am I not saying that needs to be said?', true, 0),
('00000000-0000-0000-0001-000000000001', 'The Other Side', 'What might they be feeling that I haven''t considered?', true, 1),

('00000000-0000-0000-0001-000000000002', 'Fear vs Wisdom', 'Is this fear talking, or is this wisdom?', true, 0),
('00000000-0000-0000-0001-000000000002', 'Worst Case', 'What is the worst that could happen, and could I survive it?', true, 1),
('00000000-0000-0000-0001-000000000002', 'Future Self', 'What would my future self thank me for doing today?', true, 2),

('00000000-0000-0000-0001-000000000003', 'Body Wisdom', 'What is my body trying to tell me right now?', true, 0),
('00000000-0000-0000-0001-000000000003', 'The Need', 'What do I actually need right now?', true, 1);

-- 2. Clarity Cards
------------------------------------------------------------------------------------------------
INSERT INTO public.clarity_cards (title, description, is_active, sort_order) VALUES
('A Tiny Win to Celebrate', 'Catch the progress you usually gloss over and let it count.', true, 0),
('A Thought I Want to Let Go Of', 'Name the thought that''s been looping so it doesn''t keep running the day.', true, 1),
('After the Spiral', 'Come back to yourself after emotional overload or mental chaos.', true, 2),
('How I''m Feeling', 'Get honest about what''s present without needing to explain it.', true, 3),
('Mini Ritual Moment', 'Create a small, intentional pause that shifts your state.', true, 4),
('My Gentle Next Step', 'Find a next move that feels doable instead of overwhelming.', true, 5),
('What I Need Right Now', 'Listen for what your system is actually asking for.', true, 6),
('What I Want to Remember', 'Anchor a truth, insight, or reminder you don''t want to lose.', true, 7),
('When Everything Feels Like Too Much', 'Meet overwhelm without fixing or pushing through it.', true, 8),
('Before I Begin My Day', 'Set an inner tone before the day starts asking things of you.', true, 9);

-- 3. Affirmations
------------------------------------------------------------------------------------------------
-- Seeding Categories
INSERT INTO public.affirmation_categories (id, title, slug, sort_order) VALUES
('00000000-0000-0000-0003-000000000000', 'Self-Worth', 'self-worth', 0),
('00000000-0000-0000-0003-000000000001', 'Calm', 'calm', 1),
('00000000-0000-0000-0003-000000000002', 'Strength', 'strength', 2),
('00000000-0000-0000-0003-000000000003', 'Trust', 'trust', 3)
ON CONFLICT (id) DO NOTHING;

-- Seeding Affirmations
INSERT INTO public.affirmations (category_id, text, is_active, sort_order) VALUES
('00000000-0000-0000-0003-000000000000', 'I am allowed to take up space.', true, 0),
('00000000-0000-0000-0003-000000000000', 'My feelings are valid, even when they''re uncomfortable.', true, 1),
('00000000-0000-0000-0003-000000000000', 'My worth is not determined by my productivity.', true, 2),

('00000000-0000-0000-0003-000000000001', 'I don''t have to fix everything right now.', true, 0),
('00000000-0000-0000-0003-000000000001', 'This moment will pass.', true, 1),
('00000000-0000-0000-0003-000000000001', 'It''s okay to rest.', true, 2),

('00000000-0000-0000-0003-000000000002', 'I have survived hard things before.', true, 0),
('00000000-0000-0000-0003-000000000002', 'I am capable of handling what comes.', true, 1),
('00000000-0000-0000-0003-000000000002', 'I am doing the best I can with what I have.', true, 2),

('00000000-0000-0000-0003-000000000003', 'I can trust myself to figure this out.', true, 0),
('00000000-0000-0000-0003-000000000003', 'I don''t need to know everything to move forward.', true, 1),
('00000000-0000-0000-0003-000000000003', 'I trust the timing of my life.', true, 2);

-- 4. Voice Notes
------------------------------------------------------------------------------------------------
INSERT INTO public.voice_notes (title, description, duration, audio_url, is_active, sort_order) VALUES
('When You Feel Like Giving Up', 'A reminder that rest is not the same as quitting.', '3:24', '', true, 0),
('You''re Not Behind', 'On letting go of the timeline you thought you needed.', '4:12', '', true, 1),
('The Messy Middle', 'For when you''re in the middle of something hard.', '2:58', '', true, 2),
('Permission to Change', 'You''re allowed to outgrow who you were.', '3:45', '', true, 3),
('On Being Enough', 'A gentle reminder that you already are.', '4:30', '', true, 4),
('When Anxiety Visits', 'For those moments when your mind won''t quiet.', '3:15', '', true, 5);
