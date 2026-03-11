-- Guided Shift Seeds Extracted From Previous Hardcoded Data
-- Execute to populate categories and empty shifts

-- Category 1: The Downshift Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000001', 'The Downshift Series', 'Slow the system when everything feels sharp, loud, or fast.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></svg>', 0)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-centering-drop', '00000000-0000-0000-0000-000000000001', 'The Centering Drop', true, 0),
('dialing-it-down', '00000000-0000-0000-0000-000000000001', 'Dialing it Down', true, 1),
('the-exhale-stretch', '00000000-0000-0000-0000-000000000001', 'The Exhale Stretch', false, 2),
('from-head-to-heart', '00000000-0000-0000-0000-000000000001', 'From Head to Heart', false, 3),
('the-micro-let-go', '00000000-0000-0000-0000-000000000001', 'The Micro Let-Go', false, 4)
ON CONFLICT DO NOTHING;

-- Category 2: The Nervous System Reset Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000002', 'The Nervous System Reset Series', 'Interrupt spirals and regulate fast.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z" /><circle cx="12" cy="12" r="3" /></svg>', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('vagus-nerve-switch', '00000000-0000-0000-0000-000000000002', 'Vagus Nerve Switch', true, 0),
('the-jaw-melt', '00000000-0000-0000-0000-000000000002', 'The Jaw Melt', true, 1),
('the-shoulder-gate', '00000000-0000-0000-0000-000000000002', 'The Shoulder Gate', false, 2),
('the-forehead-lift', '00000000-0000-0000-0000-000000000002', 'The Forehead Lift', false, 3),
('the-solar-plexus-unwind', '00000000-0000-0000-0000-000000000002', 'The Solar Plexus Unwind', false, 4)
ON CONFLICT DO NOTHING;

-- Category 3: The Body Return Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000003', 'The Body Return Series', 'Anchor into the present moment through sensation.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('hands-as-home', '00000000-0000-0000-0000-000000000003', 'Hands-as-Home', true, 0),
('the-spine-scan', '00000000-0000-0000-0000-000000000003', 'The Spine Scan', true, 1),
('the-rib-cage-expansion', '00000000-0000-0000-0000-000000000003', 'The Rib Cage Expansion', false, 2),
('feet-in-the-now', '00000000-0000-0000-0000-000000000003', 'Feet-in-the-Now', false, 3),
('the-breathprint-check', '00000000-0000-0000-0000-000000000003', 'The Breathprint Check', false, 4)
ON CONFLICT DO NOTHING;

-- Category 4: The Pattern Breaker Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000004', 'The Pattern Breaker Series', 'Shift a behaviour loop or mental loop in under 60 seconds.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9 9 0 1 1 0-18c1.5 0 2.8.6 4 1.5L18.5 7" /><path d="M18.5 3v4h-4" /></svg>', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('the-identity-interrupt', '00000000-0000-0000-0000-000000000004', 'The Identity Interrupt', true, 0),
('the-emotional-intensity-shift', '00000000-0000-0000-0000-000000000004', 'The Emotional Intensity Shift', true, 1),
('the-this-isnt-mine-reset', '00000000-0000-0000-0000-000000000004', 'The ''This Isn''t Mine'' Reset', false, 2),
('the-right-next-move', '00000000-0000-0000-0000-000000000004', 'The Right Next Move', false, 3),
('stop-the-spiral', '00000000-0000-0000-0000-000000000004', 'Stop the Spiral', false, 4)
ON CONFLICT DO NOTHING;

-- Category 5: The Identity Leap Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000005', 'The Identity Leap Series', 'Call in the future self and anchor a new identity.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('step-into-the-room', '00000000-0000-0000-0000-000000000005', 'Step Into the Room', true, 0),
('the-micro-yes', '00000000-0000-0000-0000-000000000005', 'The Micro Yes', true, 1),
('the-courage-breath', '00000000-0000-0000-0000-000000000005', 'The Courage Breath', false, 2),
('the-embodied-permission', '00000000-0000-0000-0000-000000000005', 'The Embodied Permission', false, 3),
('the-one-degree-shift', '00000000-0000-0000-0000-000000000005', 'The One Degree Shift', false, 4)
ON CONFLICT DO NOTHING;

-- Category 6: The Self-Permission Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000006', 'The Self-Permission Series', 'Dismantle shame and pressure.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('permission-to-pause', '00000000-0000-0000-0000-000000000006', 'Permission to Pause', true, 0),
('permission-to-not-know', '00000000-0000-0000-0000-000000000006', 'Permission to Not Know', true, 1),
('permission-to-improve-slowly', '00000000-0000-0000-0000-000000000006', 'Permission to Improve Slowly', false, 2),
('permission-to-be-enough-today', '00000000-0000-0000-0000-000000000006', 'Permission to Be Enough Today', false, 3),
('permission-to-want-more', '00000000-0000-0000-0000-000000000006', 'Permission to Want More', false, 4)
ON CONFLICT DO NOTHING;

-- Category 7: The Energy Recalibration Series
INSERT INTO public.guided_shift_categories (id, title, purpose, icon, sort_order)
VALUES ('00000000-0000-0000-0000-000000000007', 'The Energy Recalibration Series', 'Reset your energetic field and emotional tone.', '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.guided_shifts (id, category_id, title, is_active, sort_order) VALUES
('residual-energy-release', '00000000-0000-0000-0000-000000000007', 'Residual Energy Release', true, 0),
('call-back-your-energy', '00000000-0000-0000-0000-000000000007', 'Call Back Your Energy', true, 1),
('the-emotional-detox', '00000000-0000-0000-0000-000000000007', 'The Emotional Detox', false, 2),
('clearing-the-internal-clutter', '00000000-0000-0000-0000-000000000007', 'Clearing the Internal Clutter', false, 3),
('the-nervous-soothe', '00000000-0000-0000-0000-000000000007', 'The Nervous Soothe', false, 4)
ON CONFLICT DO NOTHING;

