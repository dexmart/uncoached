-- ============================================
-- Guided Shifts FULL Seed Script (15 Categories, 75 Shifts)
-- Run this in Supabase SQL Editor
-- ============================================
-- WARNING: This will delete ALL existing guided shifts and categories!
-- Make sure you have backups of any uploaded audio files.

-- Clear existing data
TRUNCATE TABLE public.guided_shifts CASCADE;
TRUNCATE TABLE public.guided_shift_categories CASCADE;

-- ============================================
-- CATEGORY 1: The Downshift Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000001', 'The Downshift Series', 'Slow the system when everything feels sharp, loud, or fast.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></svg>', 1);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-centering-drop', '00000000-0000-0000-0000-000000000001', 'The Centering Drop', true, 1),
('dialing-it-down', '00000000-0000-0000-0000-000000000001', 'Dialing it Down', true, 2),
('the-exhale-stretch', '00000000-0000-0000-0000-000000000001', 'The Exhale Stretch', false, 3),
('from-head-to-heart', '00000000-0000-0000-0000-000000000001', 'From Head to Heart', false, 4),
('the-micro-let-go', '00000000-0000-0000-0000-000000000001', 'The Micro Let-Go', false, 5);

-- ============================================
-- CATEGORY 2: The Nervous System Reset Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000002', 'The Nervous System Reset Series', 'Interrupt spirals and regulate fast.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z" /><circle cx="12" cy="12" r="3" /></svg>', 2);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('vagus-nerve-switch', '00000000-0000-0000-0000-000000000002', 'Vagus Nerve Switch', true, 1),
('the-jaw-melt', '00000000-0000-0000-0000-000000000002', 'The Jaw Melt', true, 2),
('the-shoulder-gate', '00000000-0000-0000-0000-000000000002', 'The Shoulder Gate', false, 3),
('the-forehead-lift', '00000000-0000-0000-0000-000000000002', 'The Forehead Lift', false, 4),
('the-solar-plexus-unwind', '00000000-0000-0000-0000-000000000002', 'The Solar Plexus Unwind', false, 5);

-- ============================================
-- CATEGORY 3: The Body Return Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000003', 'The Body Return Series', 'Anchor into the present moment through sensation.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>', 3);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('hands-as-home', '00000000-0000-0000-0000-000000000003', 'Hands-as-Home', true, 1),
('the-spine-scan', '00000000-0000-0000-0000-000000000003', 'The Spine Scan', true, 2),
('the-rib-cage-expansion', '00000000-0000-0000-0000-000000000003', 'The Rib Cage Expansion', false, 3),
('feet-in-the-now', '00000000-0000-0000-0000-000000000003', 'Feet-in-the-Now', false, 4),
('the-breathprint-check', '00000000-0000-0000-0000-000000000003', 'The Breathprint Check', false, 5);

-- ============================================
-- CATEGORY 4: The Pattern Breaker Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000004', 'The Pattern Breaker Series', 'Shift a behaviour loop or mental loop in under 60 seconds.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 0-18c1.5 0 2.8.6 4 1.5L18.5 7" /><path d="M18.5 3v4h-4" /></svg>', 4);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-identity-interrupt', '00000000-0000-0000-0000-000000000004', 'The Identity Interrupt', true, 1),
('the-emotional-label-switch', '00000000-0000-0000-0000-000000000004', 'The Emotional Label Switch', true, 2),
('the-this-isnt-mine-reset', '00000000-0000-0000-0000-000000000004', 'The "This Isn''t Mine" Reset', false, 3),
('the-right-next-move', '00000000-0000-0000-0000-000000000004', 'The Right Next Move', false, 4),
('stop-the-spiral', '00000000-0000-0000-0000-000000000004', 'Stop the Spiral', false, 5);

-- ============================================
-- CATEGORY 5: The Identity Leap Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000005', 'The Identity Leap Series', 'Call in the future self and anchor a new identity.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>', 5);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('step-into-the-room', '00000000-0000-0000-0000-000000000005', 'Step Into the Room', true, 1),
('the-micro-yes', '00000000-0000-0000-0000-000000000005', 'The Micro Yes', true, 2),
('the-courage-breath', '00000000-0000-0000-0000-000000000005', 'The Courage Breath', false, 3),
('the-embodied-permission', '00000000-0000-0000-0000-000000000005', 'The Embodied Permission', false, 4),
('the-one-degree-shift', '00000000-0000-0000-0000-000000000005', 'The One Degree Shift', false, 5);

-- ============================================
-- CATEGORY 6: The Self-Permission Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000006', 'The Self-Permission Series', 'Dismantle shame and pressure.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>', 6);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('permission-to-pause', '00000000-0000-0000-0000-000000000006', 'Permission to Pause', true, 1),
('permission-to-not-know', '00000000-0000-0000-0000-000000000006', 'Permission to Not Know', true, 2),
('permission-to-improve-slowly', '00000000-0000-0000-0000-000000000006', 'Permission to Improve Slowly', false, 3),
('permission-to-be-enough-today', '00000000-0000-0000-0000-000000000006', 'Permission to Be Enough Today', false, 4),
('permission-to-want-more', '00000000-0000-0000-0000-000000000006', 'Permission to Want More', false, 5);

-- ============================================
-- CATEGORY 7: The Energy Recalibration Series
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000007', 'The Energy Recalibration Series', 'Reset your energetic field and emotional tone.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>', 7);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('residual-energy-release', '00000000-0000-0000-0000-000000000007', 'Residual Energy Release', true, 1),
('call-back-your-energy', '00000000-0000-0000-0000-000000000007', 'Call Back Your Energy', true, 2),
('the-emotional-detox', '00000000-0000-0000-0000-000000000007', 'The Emotional Detox', false, 3),
('clearing-the-internal-clutter', '00000000-0000-0000-0000-000000000007', 'Clearing the Internal Clutter', false, 4),
('the-nervous-soothe', '00000000-0000-0000-0000-000000000007', 'The Nervous Soothe', false, 5);

-- ============================================
-- CATEGORY 8: The Inner Child Repair Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000008', 'The Inner Child Repair Series', 'Micro moments of re-parenting and repair.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>', 8);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-safe-lap-moment', '00000000-0000-0000-0000-000000000008', 'The Safe Lap Moment', true, 1),
('the-hand-squeeze', '00000000-0000-0000-0000-000000000008', 'The Hand Squeeze', true, 2),
('the-im-not-leaving-breath', '00000000-0000-0000-0000-000000000008', 'The "I''m Not Leaving" Breath', false, 3),
('the-warm-blanket', '00000000-0000-0000-0000-000000000008', 'The Warm Blanket', false, 4),
('the-fear-unhook', '00000000-0000-0000-0000-000000000008', 'The Fear Unhook', false, 5);

-- ============================================
-- CATEGORY 9: The Boundaries Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000009', 'The Boundaries Series', 'Strengthen inner boundaries with calm firmness.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18" /></svg>', 9);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-nervous-system-yes', '00000000-0000-0000-0000-000000000009', 'The Nervous System Yes', true, 1),
('the-nervous-system-no', '00000000-0000-0000-0000-000000000009', 'The Nervous System No', true, 2),
('the-space-creator', '00000000-0000-0000-0000-000000000009', 'The Space Creator', false, 3),
('the-energy-filter', '00000000-0000-0000-0000-000000000009', 'The Energy Filter', false, 4),
('the-not-today-breath', '00000000-0000-0000-0000-000000000009', 'The "Not Today" Breath', false, 5);

-- ============================================
-- CATEGORY 10: The Between-Sessions Therapy Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000010', 'The Between-Sessions Therapy Series', 'Regulate, integrate, or prepare between therapy appointments.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></svg>', 10);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-post-session-land', '00000000-0000-0000-0000-000000000010', 'The Post-Session Land', true, 1),
('the-pre-session-ground', '00000000-0000-0000-0000-000000000010', 'The Pre-Session Ground', true, 2),
('the-emotional-spill', '00000000-0000-0000-0000-000000000010', 'The Emotional Spill', false, 3),
('the-integration', '00000000-0000-0000-0000-000000000010', 'The Integration', false, 4),
('the-softened-edges', '00000000-0000-0000-0000-000000000010', 'The Softened Edges', false, 5);

-- ============================================
-- CATEGORY 11: The Loss-Softening Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000011', 'The Loss-Softening Series', 'Soothe grief waves without collapsing into them.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-4.97 0-9-2.24-9-5v-1c0-2.76 4.03-5 9-5s9 2.24 9 5v1c0 2.76-4.03 5-9 5z" /><path d="M12 2a4 4 0 0 0-4 4c0 2.76 1.79 6 4 6s4-3.24 4-6a4 4 0 0 0-4-4z" /></svg>', 11);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-wave-pass', '00000000-0000-0000-0000-000000000011', 'The Wave Pass', true, 1),
('the-tender-hold', '00000000-0000-0000-0000-000000000011', 'The Tender Hold', true, 2),
('the-stay-here-breath', '00000000-0000-0000-0000-000000000011', 'The "Stay Here" Breath', false, 3),
('the-heart-pocket', '00000000-0000-0000-0000-000000000011', 'The Heart Pocket', false, 4),
('the-soft-rest', '00000000-0000-0000-0000-000000000011', 'The Soft Rest', false, 5);

-- ============================================
-- CATEGORY 12: The Morning Re-entry Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000012', 'The Morning Re-entry Series', 'Wake up and re-enter the day with presence.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>', 12);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('first-breath-back', '00000000-0000-0000-0000-000000000012', 'First Breath Back', true, 1),
('the-grounded-start', '00000000-0000-0000-0000-000000000012', 'The Grounded Start', true, 2),
('the-wakeful-stretch', '00000000-0000-0000-0000-000000000012', 'The Wakeful Stretch', false, 3),
('the-gentle-ignite', '00000000-0000-0000-0000-000000000012', 'The Gentle Ignite', false, 4),
('the-slow-clarity', '00000000-0000-0000-0000-000000000012', 'The Slow Clarity', false, 5);

-- ============================================
-- CATEGORY 13: The Night Unraveling Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000013', 'The Night Unraveling Series', 'Dissolve tension and quiet the mind before sleep.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>', 13);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-body-drop', '00000000-0000-0000-0000-000000000013', 'The Body Drop', true, 1),
('the-thought-softener', '00000000-0000-0000-0000-000000000013', 'The Thought Softener', true, 2),
('the-slow-melt', '00000000-0000-0000-0000-000000000013', 'The Slow Melt', false, 3),
('the-blanket-sink', '00000000-0000-0000-0000-000000000013', 'The Blanket Sink', false, 4),
('the-safe-drift', '00000000-0000-0000-0000-000000000013', 'The Safe Drift', false, 5);

-- ============================================
-- CATEGORY 14: The Pressure Release Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000014', 'The Pressure Release Series', 'Relieve pressure, perfectionism, and mental stacking.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>', 14);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-unload-breath', '00000000-0000-0000-0000-000000000014', 'The Unload Breath', true, 1),
('the-one-thing-now', '00000000-0000-0000-0000-000000000014', 'The One Thing Now', true, 2),
('the-release-valve', '00000000-0000-0000-0000-000000000014', 'The Release Valve', false, 3),
('the-enoughness-reset', '00000000-0000-0000-0000-000000000014', 'The Enoughness Reset', false, 4),
('the-task-softener', '00000000-0000-0000-0000-000000000014', 'The Task Softener', false, 5);

-- ============================================
-- CATEGORY 15: The Creativity Switch Series (NEW)
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000015', 'The Creativity Switch Series', 'Spark inspiration and unblock creativity.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></svg>', 15);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-creative-pulse', '00000000-0000-0000-0000-000000000015', 'The Creative Pulse', true, 1),
('the-breath-of-ideas', '00000000-0000-0000-0000-000000000015', 'The Breath of Ideas', true, 2),
('the-mind-open-moment', '00000000-0000-0000-0000-000000000015', 'The Mind-Open Moment', false, 3),
('the-spark-catch', '00000000-0000-0000-0000-000000000015', 'The Spark Catch', false, 4),
('the-imagination-stretch', '00000000-0000-0000-0000-000000000015', 'The Imagination Stretch', false, 5);

-- ============================================
-- CATEGORY 16: Uncategorized (NEW)
-- Admin will move these to the correct categories later
-- ============================================
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000016', 'Uncategorized', 'Shifts pending category assignment.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>', 16);

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-mental-fog-lift', '00000000-0000-0000-0000-000000000016', 'The Mental Fog Lift', true, 1),
('the-signal-from-the-noise', '00000000-0000-0000-0000-000000000016', 'The Signal From The Noise', true, 2);
