-- ============================================
-- Loss-Softening Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Wave Pass
UPDATE public.guided_shifts
SET
    intro = 'Grief does not move in a straight line. It arrives in waves.',
    description = 'The Wave Pass meditation helps the nervous system experience grief as movement rather than identity. It teaches the body how to remain present while emotion rises, peaks, and recedes, without being pulled under. This meditation does not eliminate grief. It helps you stay afloat.',
    approach = NULL,
    use_when = '["Grief comes suddenly and intensely", "Emotion feels overwhelming or destabilizing", "You fear being consumed by the feeling", "Waves arrive without warning", "You want steadiness without suppression"]'::jsonb,
    field_integration_prompt = E'I just completed The Wave Pass meditation. Please help me process and integrate this experience by:\n\n1. Helping me describe how grief showed up in my body as a wave.\n2. Identifying what helped me stay present as the intensity changed.\n3. Exploring how my body signals when a wave is cresting or easing.\n4. Helping me trust my ability to remain steady as grief moves through me.\n\nAsk me clarifying questions and help me integrate grief without overwhelm.\n\n_Real-Life Integration: When grief rises, remind yourself: "This is a wave." Stay until it passes._',
    science_text = 'Grief activates intense autonomic and limbic responses that rise and fall over time. Research shows that observing emotional sensations as dynamic processes rather than fixed states reduces distress and supports emotional regulation. Allowing emotional waves to complete their cycle prevents prolonged activation and reduces the risk of emotional flooding.',
    science_source = 'Bonanno, G. (2004). Loss, trauma, and resilience. American Psychologist. / Levine, P. (2010). In an Unspoken Voice. North Atlantic Books.',
    spiritual_text = E'In Buddhist psychology, suffering is understood as a passing condition rather than a permanent self. Pema Chödrön teaches that staying present with difficult emotions allows them to move and transform without solidifying into identity.\n\nWhen grief is allowed to flow, it carries wisdom rather than collapse.',
    spiritual_source = 'Chödrön, P. (2001). The Places That Scare You. Shambhala.'
WHERE id = 'the-wave-pass';

-- 2. The Tender Hold
UPDATE public.guided_shifts
SET
    intro = 'Grief does not always need movement. Sometimes it needs containment.',
    description = 'The Tender Hold offers a way to stay with grief gently, without amplifying it or turning away. It teaches the nervous system how to provide steady support when emotion feels fragile or close to the surface. This meditation does not process loss. It supports the part of you that is already carrying it.',
    approach = NULL,
    use_when = '["Grief feels tender rather than overwhelming", "Emotion feels close and easily stirred", "You want comfort without reopening pain", "You feel vulnerable or exposed", "You want to stay present without pushing through"]'::jsonb,
    field_integration_prompt = E'I just completed The Tender Hold meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body responds to gentle self-support.\n2. Identifying moments when tenderness feels safer than movement.\n3. Exploring ways to offer myself steady comfort without reopening pain.\n4. Helping me recognize when holding is more supportive than releasing.\n\nAsk me clarifying questions and help me integrate grief with care and steadiness.\n\n_Real-Life Integration: When grief feels close, offer yourself support before explanation. A gentle hold can be enough._',
    science_text = 'Supportive touch and steady presence activate neural pathways associated with safety and emotional regulation. Research shows that gentle containment reduces physiological stress responses and helps individuals remain present with difficult emotions without escalating intensity. This form of self-soothing supports emotional resilience during grief.',
    science_source = 'Field, T. (2014). Touch for socioemotional and physical well-being. Developmental Review. / Schore, A. (2012). The Science of the Art of Psychotherapy. Norton.',
    spiritual_text = E'Sharon Salzberg teaches that compassion is not about fixing pain, but about meeting it with steadiness and warmth. In her work on lovingkindness, she emphasizes staying present with suffering in a way that neither turns away nor overwhelms.\n\nWhen grief is held with this kind of care, it is allowed to exist without being pushed or prolonged, creating space for natural softening.',
    spiritual_source = 'Salzberg, S. (1995). Lovingkindness. Shambhala.'
WHERE id = 'the-tender-hold';

-- 3. The "Stay Here" Breath
UPDATE public.guided_shifts
SET
    intro = 'Grief can pull attention away from the present moment — into memory, into anticipation, into absence.',
    description = 'The "Stay Here" Breath supports presence without effort. It helps the nervous system remain anchored when grief tugs awareness elsewhere. This is not breathing for regulation. It is breathing as orientation.',
    approach = NULL,
    use_when = '["When grief pulls you into memories", "When your body feels here but your mind feels elsewhere", "When staying present feels difficult", "When you want grounding without emotional activation", "When you need a steady thread to hold"]'::jsonb,
    field_integration_prompt = E'I just completed The "Stay Here" Breath meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my attention shifts when grief pulls me away.\n2. Identifying what helps me stay oriented to the present moment.\n3. Exploring how breath can act as an anchor without becoming a task.\n4. Supporting me in practicing presence during moments of emotional pull.\n\nAsk me clarifying questions and help me integrate presence with grief.\n\n_Real-Life Integration: When grief pulls you into memory, return to the breath you are already taking. Let it remind you where you are._',
    science_text = 'Breath awareness without manipulation supports interoceptive orientation and present-moment awareness. Research shows that using breath as a passive anchor helps stabilize attention during emotional distress and reduces dissociation, allowing individuals to remain grounded while emotions move through the system.',
    science_source = 'Farb, N. et al. (2015). Interoception and emotional regulation. Social Cognitive and Affective Neuroscience. / Mehling, W. et al. (2012). Body awareness. PLoS ONE.',
    spiritual_text = E'Thich Nhat Hanh described the breath as a place to come home to the present moment. Rather than using it to change experience, he taught noticing breathing as a way of recognizing that life is happening now.\n\nWhen awareness returns to the breath without effort, attention naturally settles back into the body, allowing difficult emotions to be held without being carried away by them.',
    spiritual_source = 'Thich Nhat Hanh. Peace Is Every Step. Bantam.'
WHERE id = 'the-stay-here-breath';

-- 4. The Heart Pocket
UPDATE public.guided_shifts
SET
    intro = 'Grief often needs a place to be carried, not processed.',
    description = 'The Heart Pocket creates an inner space where tenderness can rest without being exposed to the world. It helps the nervous system feel that something precious is being protected rather than hidden or pushed away. This meditation is about containment with care, not release.',
    approach = NULL,
    use_when = '["When grief feels close and personal", "When you want to carry feeling without sharing it", "When vulnerability feels tender", "When you need privacy inside yourself", "When holding feels safer than opening"]'::jsonb,
    field_integration_prompt = E'I just completed The Heart Pocket meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how it feels to hold tenderness without exposure.\n2. Identifying moments when I need internal privacy rather than expression.\n3. Exploring how containment can feel supportive rather than restrictive.\n4. Helping me carry grief gently while staying present in daily life.\n\nAsk me clarifying questions and support integration through inner safety.\n\n_Real-Life Integration: When grief feels too personal to share, return to the heart pocket. Let it carry what matters quietly._',
    science_text = 'Emotional containment supports regulation by reducing threat perception and sensory overload. Research in somatic and attachment-based therapies shows that creating internal representations of safety allows individuals to remain emotionally present without escalating distress. Containment strengthens resilience by providing a sense of internal protection.',
    science_source = 'Ogden, P., Minton, K., & Pain, C. (2006). Trauma and the Body. Norton. / Schore, A. (2012). The Science of the Art of Psychotherapy. Norton.',
    spiritual_text = E'Tara Brach teaches that tenderness needs a place of refuge within awareness. In her work on radical acceptance, she describes offering the heart a safe inner space where pain can rest without being pushed away or acted upon.\n\nWhen tenderness is given refuge, it remains connected to love rather than fear.',
    spiritual_source = 'Brach, T. (2003). Radical Acceptance. Bantam.'
WHERE id = 'the-heart-pocket';

-- 5. The Soft Rest
UPDATE public.guided_shifts
SET
    intro = 'Grief is exhausting, even when it is quiet.',
    description = 'The Soft Rest meditation gives the nervous system a place to pause without processing, remembering, or holding anything. It is a deliberate step out of effort. Nothing needs to be carried here. This meditation supports the body when grief has already taken enough.',
    approach = NULL,
    use_when = '["When grief feels draining rather than sharp", "When you feel emotionally tired or heavy", "When you need restoration instead of insight", "When you want to rest without collapsing", "When doing nothing is the most supportive choice"]'::jsonb,
    field_integration_prompt = E'I just completed The Soft Rest meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body responds to intentional rest.\n2. Identifying where I tend to push instead of pausing during grief.\n3. Supporting me in allowing rest without guilt or urgency.\n4. Helping me recognize rest as a form of emotional care.\n\nAsk me clarifying questions and help me integrate rest into my daily life.\n\n_Real-Life Integration: When grief feels heavy, choose rest before reflection. Let your body recover first._',
    science_text = 'Emotional fatigue during grief is linked to prolonged autonomic activation. Research shows that intentional rest supports parasympathetic nervous system engagement, allowing physiological recovery and reducing cumulative stress load. Rest without cognitive effort improves emotional resilience and supports long-term regulation.',
    science_source = 'McEwen, B. (2007). Physiology and neurobiology of stress. Physiological Reviews. / Porges, S. (2011). The Polyvagal Theory. Norton.',
    spiritual_text = E'Thich Nhat Hanh taught that rest is not a reward but a necessity for healing. In his teachings on deep rest, he emphasized allowing the body to settle without intention or striving.\n\nWhen effort pauses, the body naturally begins to restore balance.',
    spiritual_source = 'Thich Nhat Hanh. The Art of Living. HarperOne.'
WHERE id = 'the-soft-rest';
