-- ============================================================================
-- Johanna's final edits — Guided Shifts: mark "Soon" + Clarity Calibration
-- Run this in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).
-- Safe to run more than once (idempotent).
-- ============================================================================

-- 1) Mark the ENTIRE Creativity Switch Series as coming soon
UPDATE guided_shifts
SET is_active = false
WHERE category_id = '00000000-0000-0000-0000-000000000015';

-- 2) Mark "The Emotional Intensity Shift" as coming soon
UPDATE guided_shifts
SET is_active = false
WHERE id = 'the-emotional-intensity-shift';

-- 3) Mark the last 3 of the Self-Permission Series as coming soon
UPDATE guided_shifts
SET is_active = false
WHERE id IN (
    'permission-to-improve-slowly',
    'permission-to-be-enough-today',
    'permission-to-want-more'
);

-- 4) Rename the "Uncategorized" category -> "The Clarity Calibration Series"
UPDATE guided_shift_categories
SET title = 'The Clarity Calibration Series'
WHERE id = '00000000-0000-0000-0000-000000000016';

-- 5) Add the 3 coming-soon items to The Clarity Calibration Series
--    (no audio yet -> is_active = false shows them as "Soon")
INSERT INTO guided_shifts (id, category_id, title, is_active, sort_order)
VALUES
    ('the-clear-channel',     '00000000-0000-0000-0000-000000000016', 'The Clear Channel',     false, 1),
    ('knowing-without-words', '00000000-0000-0000-0000-000000000016', 'Knowing Without Words', false, 2),
    ('the-quiet-yes',         '00000000-0000-0000-0000-000000000016', 'The Quiet Yes',         false, 3)
ON CONFLICT (id) DO UPDATE
    SET category_id = EXCLUDED.category_id,
        title       = EXCLUDED.title,
        is_active   = EXCLUDED.is_active,
        sort_order  = EXCLUDED.sort_order;

-- ============================================================================
-- Verify (optional): should list all the above as is_active = false
-- SELECT g.title, c.title AS series, g.is_active
-- FROM guided_shifts g
-- JOIN guided_shift_categories c ON c.id = g.category_id
-- WHERE g.is_active = false
-- ORDER BY c.sort_order, g.sort_order;
-- ============================================================================
