// Single source of truth for practitioner focus areas.
//
// The application form offers exactly these as choices, and the public
// directory filters on exactly these — so a practitioner who picks a category
// is guaranteed to appear under that filter. Add a category here and it shows
// up in both places automatically.
export const PRACTITIONER_CATEGORIES = [
    'Trauma Therapy',
    'Somatic Practice',
    'Nervous System Regulation',
    'Hormone & Functional Health',
    'Relationship Therapy',
    'Integration Coaching',
    'Spiritual Direction',
    'EMDR / Trauma Processing',
];

/** Focus areas are stored as a comma-separated list. */
export const parseFocusAreas = (value) =>
    (value || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
