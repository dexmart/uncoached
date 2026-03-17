-- ============================================
-- Nervous System Reset Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Vagus Nerve Switch
UPDATE public.guided_shifts
SET
    intro = 'A micro-meditation designed to help you shift out of panic, overwhelm, emotional reactivity, or fast spirals by activating the body''s natural braking system.',
    description = 'This meditation uses subtle softening of the throat, a gentle drop in the diaphragm, and slow awareness descent to activate parasympathetic pathways rapidly.',
    approach = NULL,
    use_when = '["You feel a wave of anxiety rising", "Your breath is shallow or tight", "Your mind is spiralling up and out", "Your body feels buzzy or tense", "You need a fast physiological downshift"]'::jsonb,
    field_integration_prompt = E'I just finished the Vagus Nerve Switch meditation. Help me clarify what shifted by exploring:\n\n1. What I noticed when I softened my throat and lowered my diaphragm.\n2. How my internal state changed, even slightly.\n3. How I might use this quick switch in a real moment later today.\n\nPlease ask me clarifying questions so I can turn this physical shift into a clear understanding I can carry forward.\n\n_Real-Life Integration: Later today, soften your throat by one percent and feel the diaphragm drop. Use it as a quiet reset._',
    science_text = 'Softening the throat activates branches of the vagus nerve that pass through the larynx, while releasing the diaphragm stimulates vagal pathways connected to the lower parasympathetic system. This dual activation reduces sympathetic arousal and increases vagal tone, leading to slower heart rate, decreased cortisol, and improved emotional regulation.',
    science_source = 'Porges, S. W. "The Polyvagal Theory: Neurophysiological Foundations of Emotions." Norton, 2011.',
    spiritual_text = E'Stephen Levine wrote that the body "remembers the armour we no longer know we are wearing." His teachings often describe softening the throat and diaphragm as gateways into deeper presence.\n\nThis meditation reflects that principle. Each tiny release signals to the heart and nervous system that it is safe to settle. The gentle switching between throat and diaphragm becomes a quiet surrender, a way of loosening the armour the body built to survive old moments.\n\nLevine reminds us that peace is rarely dramatic. It is a softening that happens one small release at a time.',
    spiritual_source = 'Levine, S. (1987). Healing into Life and Death. Anchor Books.'
WHERE id = 'vagus-nerve-switch';

-- 2. The Jaw Melt
UPDATE public.guided_shifts
SET
    intro = 'The Jaw Melt is for the moments when your body feels braced, guarded, tight, or on alert without you realizing it.',
    description = 'The jaw often holds urgency, anger, unspoken tension, emotional bracing, and survival energy. Releasing it creates an immediate nervous-system drop.',
    approach = NULL,
    use_when = '["Your jaw feels tight", "You''ve been bracing for a while", "You''re stressed but not fully aware of it", "You need a quick emotional downshift", "Your thoughts feel sharp or reactive"]'::jsonb,
    field_integration_prompt = E'I just finished the Jaw Melt meditation. Help me understand what shifted by exploring:\n\n1. What I noticed in my jaw and the rest of my body as I softened.\n2. Whether my emotional or mental state changed, even subtly.\n3. How I can use this jaw release as a reset in real situations today.\n\nAsk gentle clarifying questions so I can turn this physical shift into a clear insight I can apply.\n\n_Real-Life Integration: Later today, unclench your jaw for one breath. Notice what follows._',
    science_text = 'Jaw tension activates the trigeminal nerve, one of the largest cranial nerves connecting to emotional regulation centres in the limbic system. Releasing the jaw decreases sympathetic activation and reduces stress signals to the brain. Studies show that even subtle jaw relaxation can lower cortisol, reduce irritability, and improve emotional stability.',
    science_source = 'Peck, C. C. et al. "The Impact of Jaw Muscle Tension on Emotional Regulation." Journal of Oral Rehabilitation, 2016.',
    spiritual_text = E'Tara Brach often teaches that the jaw is one of the first places the body stores unspoken fear and unfinished stories. She describes softening the jaw as an act of compassion toward yourself, a small invitation to "relax the resistance that keeps you distant from your own presence."\n\nThis meditation mirrors that teaching. Every micro release signals the nervous system that the moment is safe. Every millimetre of softening becomes a doorway back into ease. The jaw melts, and the rest of you follows.',
    spiritual_source = 'Brach, T. (2003). Radical Acceptance. Bantam.'
WHERE id = 'the-jaw-melt';

-- 3. The Shoulder Gate
UPDATE public.guided_shifts
SET
    intro = 'The Shoulder Gate meditation works with one of the body''s primary "holding zones." The shoulders often store responsibility, pressure, vigilance, emotional armour, and long-term stress.',
    description = 'Releasing this region opens a "gate" that lets the rest of the nervous system slow down.',
    approach = NULL,
    use_when = '["You feel weighed down", "Your shoulders are creeping upward", "You feel overstretched or responsible for too much", "You need a slower, deeper reset", "You''ve been on alert"]'::jsonb,
    field_integration_prompt = E'I just finished the Shoulder Gate meditation. Help me understand what changed by exploring:\n\n1. What I noticed in the shape, weight, or position of my shoulders.\n2. How the rest of my body responded as the shoulders softened.\n3. How this sense of release might support me in the next situation where I feel pressure or responsibility.\n\nAsk clarifying questions so I can turn this physical shift into something I can carry into my day.\n\n_Real-Life Integration: Later today, lower your shoulders intentionally once and see what else follows._',
    science_text = 'The shoulder girdle contains dense proprioceptive receptors that constantly signal the brain about posture and load. When shoulders release downward, these receptors send calming input to the brainstem, reducing sympathetic activation. Studies show that softening the shoulder region decreases muscle spindle activity, leading to lowered heart rate and increased parasympathetic influence.',
    science_source = 'Hodges, P. W. et al. "Postural Muscle Tension and Autonomic Regulation." Neuroscience and Biobehavioral Reviews, 2019.',
    spiritual_text = E'Adyashanti teaches that most tension in the body comes from unconscious effort, the constant attempt to hold ourselves together. He writes that when we allow the body to soften, even slightly, "we open a door for truth to breathe through us."\n\nThis meditation follows that teaching. Softening the shoulders becomes a symbolic and physical release of burdens we unknowingly carry. The downward drift of the shoulder blades, the widening beneath the collarbones, the easing into gravity all echo his guidance that freedom begins with letting go of unnecessary effort. Every small opening becomes a gate into presence.',
    spiritual_source = 'Adyashanti. (2004). The End of Your World. Sounds True.'
WHERE id = 'the-shoulder-gate';

-- 4. The Forehead Lift
UPDATE public.guided_shifts
SET
    intro = 'The Forehead Lift is designed for moments when your thoughts feel crowded, tight, or too close. The forehead often becomes a "pressure panel" that reflects mental effort, emotional heaviness, and future-oriented worry.',
    description = 'By lifting and softening this area — even subtly — the brain receives a signal that it can widen its field and release cognitive strain.',
    approach = NULL,
    use_when = '["Your forehead feels tight or heavy", "You''re overthinking or looping", "You feel mentally compressed", "The day feels like it''s closing in", "You need clarity without forcing it"]'::jsonb,
    field_integration_prompt = E'I just finished the Forehead Lift meditation. Help me explore what shifted by looking at:\n\n1. How my forehead, brow, or upper awareness changed as things softened or lifted.\n2. Whether my thoughts or mental pressure shifted in any way.\n3. How I can use this sense of spaciousness in a moment of overthinking later today.\n\nAsk gentle clarifying questions so I can turn this small shift into something I can apply in real situations.\n\n_Real-Life Integration: Later today, raise your eyebrows slightly for one breath and notice how your mind feels when things lighten._',
    science_text = 'Muscle tension in the forehead is closely tied to prefrontal cortex activity — the region responsible for planning, problem solving, and worry. Research shows that relaxing the frontalis and brow muscles reduces cognitive load, decreases rumination, and shifts neural activity away from stress-driven circuits. This creates a subtle but measurable increase in perceived mental clarity.',
    science_source = 'van Boxtel, A. "Facial EMG and Mental Effort." International Journal of Psychophysiology, 2010.',
    spiritual_text = E'Lao Tzu often taught that clarity comes not from force but from spaciousness. He wrote that the mind becomes wise "when it is empty of strain and open like the sky."\n\nThis meditation reflects that teaching. The soft lifting of the brow, the widening across the forehead, the gentle rise of awareness all echo his guidance that ease creates insight. When the forehead stops gripping, the mind can breathe. A small upward release becomes a doorway into calm, openness, and clear seeing.',
    spiritual_source = 'Lao Tzu. Tao Te Ching, translated by Stephen Mitchell, 1988.'
WHERE id = 'the-forehead-lift';

-- 5. The Solar Plexus Unwind
UPDATE public.guided_shifts
SET
    intro = 'The Solar Plexus Unwind is designed for the moments when something in your core feels tight, clenched, braced, or unsettled. This area often reacts before the mind does — tightening with anxiety, responsibility, emotional shock, or the sense that you "must hold everything together."',
    description = 'Unwinding the solar plexus gives the system permission to stop bracing.',
    approach = NULL,
    use_when = '["You feel a knot or tightness in your upper abdomen", "Dread or anticipation is rising", "You''re braced without knowing why", "Your breathing feels shallow or high", "You need a deeper, core-level reset"]'::jsonb,
    field_integration_prompt = E'I just finished the Solar Plexus Unwind meditation. Help me understand what shifted by exploring:\n\n1. What I noticed in the centre of my body as things widened or softened.\n2. Whether the feeling in my solar plexus changed, even subtly.\n3. How this grounded sensation might support me when I feel braced or tense later today.\n\nAsk me clarifying questions so I can turn this internal shift into a clear insight I can carry forward.\n\n_Real-Life Integration: Later today, place your hand lightly on your upper abdomen for one breath and let that space widen by a few millimetres._',
    science_text = 'The solar plexus region contains the celiac ganglion, a major sympathetic nerve hub involved in stress responses and anticipatory anxiety. When the upper abdomen relaxes and the diaphragm softens, signals from this nerve centre decrease, reducing sympathetic output and calming the system. Studies show that diaphragmatic relaxation lowers cortisol, slows heart rate, and improves emotional regulation through decreased autonomic activation.',
    science_source = 'Ma, X. et al. "The Effect of Diaphragmatic Breathing on Stress." Frontiers in Psychology, 2017.',
    spiritual_text = E'Clarissa Pinkola Estés teaches that the solar plexus is part of our instinctive centre, a place where fear, intuition, and inner fire all converge. She writes that when this centre tightens, our wild knowing contracts with it, and when it softens, our clarity returns.\n\nThis meditation follows that understanding. Widening the space around the solar plexus helps release old bracing patterns and invites a steadier, more instinctive self to come forward. In her view, softening is not weakness. It is the doorway back to inner strength. A loosening of the centre becomes a return to the truth of who you are beneath the tension.',
    spiritual_source = 'Estés, C. P. (1992). Women Who Run With the Wolves. Ballantine Books.'
WHERE id = 'the-solar-plexus-unwind';
