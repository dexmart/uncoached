-- ============================================
-- Night Unraveling Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Body Drop
UPDATE public.guided_shifts
SET
    intro = 'Sleep begins when the body is allowed to let go.',
    description = 'The Body Drop helps the nervous system transition out of holding patterns accumulated throughout the day. It invites physical release through awareness and gravity, allowing tension to dissolve without scanning for problems or revisiting events. This meditation prepares the body for rest by moving downward into support.',
    approach = NULL,
    use_when = '["In bed before sleep", "When the body feels wired or tense", "When the day is still held physically", "When your mind won''t quiet because your body hasn''t settled", "When sleep feels close but not available yet"]'::jsonb,
    field_integration_prompt = E'I completed The Body Drop meditation last night. Please help me process and integrate this experience by:\n\n1. Helping me notice where my body holds tension at night.\n2. Identifying what shifts when I allow gravity to support me.\n3. Exploring how physical settling affects my mental state before sleep.\n4. Supporting me in creating a consistent wind-down routine.\n\nAsk me clarifying questions and help me integrate body-based rest.\n\n_Real-Life Integration: When sleep feels distant, let the body settle first. The mind follows weight._',
    science_text = 'Allowing the body to feel fully supported activates parasympathetic nervous system responses associated with rest and recovery. Research shows that downward attention and physical settling reduce muscle tone and lower physiological arousal, creating conditions that support sleep onset and deeper rest.',
    science_source = 'Porges, S. (2011). The Polyvagal Theory. Norton. / Winbush, N. et al. (2007). Body scan and relaxation. Journal of Behavioral Medicine.',
    spiritual_text = E'Somatic-based contemplative practices emphasize yielding to gravity as a way of releasing control. Thich Nhat Hanh taught that rest begins when the body is allowed to be carried rather than held upright by effort.\n\nWhen weight is given back to the earth, the mind naturally quiets.',
    spiritual_source = 'Thich Nhat Hanh. The Art of Living. HarperOne.'
WHERE id = 'the-body-drop';

-- 2. The Thought Softener
UPDATE public.guided_shifts
SET
    intro = 'At night, thoughts often sharpen. They repeat. They stack. They refuse to resolve.',
    description = 'The Thought Softener does not try to stop thinking. It changes the texture of thought so the mind can loosen its grip and drift toward rest. This meditation helps mental activity become less insistent, less sticky, and easier to release. This is not problem-solving. It is easing.',
    approach = NULL,
    use_when = '["When thoughts loop at bedtime", "When the mind feels busy but tired", "When mental effort keeps sleep away", "When you want quiet without control", "When thinking needs to soften, not disappear"]'::jsonb,
    field_integration_prompt = E'I completed The Thought Softener meditation last night. Please help me process and integrate this experience by:\n\n1. Helping me notice how my thoughts change in texture at night.\n2. Identifying patterns of mental looping before sleep.\n3. Exploring how softening thought differs from stopping thought.\n4. Supporting me in easing mental activity without effort.\n\nAsk me clarifying questions and help me integrate mental quiet.\n\n_Real-Life Integration: When thoughts sharpen at night, soften them instead of answering them. Sleep follows ease._',
    science_text = 'Cognitive arousal is a major contributor to insomnia. Research shows that reducing the intensity and emotional charge of thoughts, rather than suppressing them, decreases nighttime rumination and supports sleep onset. Allowing thoughts to become less vivid and less urgent reduces sympathetic activation and promotes mental quiet.',
    science_source = 'Harvey, A. (2002). Cognitive model of insomnia. Behaviour Research and Therapy. / Espie, C. (2007). Psychophysiological insomnia. Sleep Medicine Reviews.',
    spiritual_text = E'Eckhart Tolle teaches that awareness can observe thought without becoming entangled in it. When attention rests behind thinking rather than inside it, thoughts lose their authority.\n\nAs identification softens, the mind naturally settles into stillness, creating space for rest.',
    spiritual_source = 'Tolle, E. (1999). The Power of Now. New World Library.'
WHERE id = 'the-thought-softener';

-- 3. The Slow Melt
UPDATE public.guided_shifts
SET
    intro = 'At night, the nervous system needs permission to release in layers.',
    description = 'The Slow Melt guides the body into rest by allowing tension to dissolve gradually, without scanning for problems or directing effort. It supports the natural unwinding process that happens just before sleep, when holding patterns finally let go. This meditation encourages softening over time, so sleep can arrive without being chased.',
    approach = NULL,
    use_when = '["When your body feels tense but tired", "When sleep feels close but not accessible", "When you want to unwind without effort", "When rest needs to come slowly", "When letting go feels safer than switching off"]'::jsonb,
    field_integration_prompt = E'I completed The Slow Melt meditation last night. Please help me process and integrate this experience by:\n\n1. Helping me notice how tension releases gradually at night.\n2. Identifying areas where my body holds the day.\n3. Exploring how slow release supports sleep readiness.\n4. Supporting me in allowing rest to arrive without effort.\n\nAsk me clarifying questions and help me integrate physical unwinding.\n\n_Real-Life Integration: When your body feels tense at night, give it time to melt. Sleep follows softness._',
    science_text = 'Gradual muscle relaxation and thermal comfort support parasympathetic activation and reduce physiological arousal. Research shows that slow, passive softening of muscle tone lowers heart rate and promotes sleep onset by signaling safety to the nervous system.',
    science_source = 'Jacobson, E. (1938). Progressive relaxation. University of Chicago Press. / Kräuchi, K. (2007). Thermoregulation and sleep. Sleep Medicine Reviews.',
    spiritual_text = E'Donald Winnicott taught that the nervous system settles when it senses reliable holding. In his work, warmth, containment, and physical support were not comforts but prerequisites for rest.\n\nBeing held, or simulating being held through blankets or pressure, allows the body to release vigilance and return to a basic sense of safety. This kind of holding does not soothe the mind directly. It reassures the body first.',
    spiritual_source = 'Winnicott, D. W. (1965). The Maturational Processes and the Facilitating Environment. Hogarth Press.'
WHERE id = 'the-slow-melt';

-- 4. The Blanket Sink
UPDATE public.guided_shifts
SET
    intro = 'You''ll need your blanket for this one! Sleep deepens when the body feels contained.',
    description = 'The Blanket Sink uses warmth, weight, and contact to signal safety to the nervous system. It allows the body to release vigilance and settle downward, making rest feel permitted rather than earned. This meditation is about being held, not letting go.',
    approach = NULL,
    use_when = '["Once you are already in bed", "When your body feels tired but alert", "When warmth helps you feel safe", "When sleep needs reassurance rather than quiet", "When you want rest to feel supported"]'::jsonb,
    field_integration_prompt = E'I just completed The Blanket Sink meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how warmth and weight affect my body at night.\n2. Identifying sensations that signal safety for me before sleep.\n3. Exploring how physical containment supports emotional rest.\n4. Supporting me in creating a sleep environment that feels holding.\n\nAsk me clarifying questions and help me integrate body-based safety.\n\n_Real-Life Integration: When sleep feels distant, add warmth and weight before effort. Let your body feel held._',
    science_text = 'Thermal comfort and gentle pressure activate parasympathetic nervous system responses associated with safety and rest. Research shows that warmth and deep pressure stimulation reduce cortisol levels, slow heart rate, and support sleep onset by signaling containment and predictability to the nervous system.',
    science_source = 'Kräuchi, K. (2007). Thermoregulation and sleep. Sleep Medicine Reviews. / Champagne, T., & Stromberg, N. (2004). Sensory approaches to self-regulation. OT Practice.',
    spiritual_text = E'Donald Winnicott described rest as emerging from reliable holding rather than internal effort. When the body senses warmth and containment, vigilance dissolves and trust returns at a physiological level.\n\nBeing held, even by something as simple as a blanket, allows the nervous system to relinquish control and move naturally toward sleep.',
    spiritual_source = 'Winnicott, D. W. (1965). The Maturational Processes and the Facilitating Environment. Hogarth Press.'
WHERE id = 'the-blanket-sink';

-- 5. The Safe Drift
UPDATE public.guided_shifts
SET
    intro = 'Sleep arrives most easily when the nervous system feels safe enough to let awareness loosen.',
    description = 'The Safe Drift supports the transition from wakefulness into sleep by allowing attention to soften and wander without losing a sense of safety. It reassures the system that nothing needs monitoring, deciding, or holding on to. This meditation does not aim to induce sleep. It creates the conditions where sleep can take over naturally.',
    approach = NULL,
    use_when = '["When you feel sleepy but still alert", "When awareness feels reluctant to let go", "When drifting feels uncertain or unsafe", "When you want rest without disappearance", "When sleep needs permission rather than effort"]'::jsonb,
    field_integration_prompt = E'I completed The Safe Drift meditation last night. Please help me process and integrate this experience by:\n\n1. Helping me notice what allows me to drift safely toward sleep.\n2. Identifying any vigilance that shows up before rest.\n3. Exploring what helps me feel safe enough to let awareness loosen.\n4. Supporting me in trusting sleep to arrive on its own.\n\nAsk me clarifying questions and help me integrate safe rest.\n\n_Real-Life Integration: When you feel sleepy but alert, let attention wander instead of holding it. Sleep follows drift._',
    science_text = 'Sleep onset involves a gradual disengagement of attentional control and monitoring systems. Research shows that allowing awareness to become diffuse, rather than focused, supports the transition into sleep by reducing cortical vigilance and cognitive arousal. Safety cues and reduced monitoring help the brain shift into sleep-ready states.',
    science_source = 'Espie, C. (2007). Psychophysiological insomnia. Sleep Medicine Reviews. / Perlis, M. et al. (2011). Cognitive arousal and insomnia. Sleep Medicine.',
    spiritual_text = E'Jiddu Krishnamurti spoke about rest as something that happens when attention no longer grips experience. He taught that when the mind stops watching itself and relinquishes control, a natural quiet takes over.\n\nIn that quiet, awareness softens and rest emerges without effort.',
    spiritual_source = 'Krishnamurti, J. (1969). Freedom from the Known. Harper.'
WHERE id = 'the-safe-drift';
