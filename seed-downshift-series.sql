-- ============================================
-- Downshift Series - Full Content Seed
-- Run this in Supabase SQL Editor AFTER
-- running add-field-integration-prompt.sql
-- ============================================

-- 1. The Centering Drop
UPDATE public.guided_shifts
SET
    intro = 'A micro-reset designed to pull you out of reactivity and back into your internal centre point. Use it when everything feels loud, sharp, or overstimulating, and the simplest thing you need is to come home to yourself.',
    description = 'This meditation uses a single interoceptive anchor — a small point of awareness in the chest or ribs — to create a whole-system downshift in seconds.',
    approach = NULL,
    use_when = '["Your mind feels scattered", "You feel pulled in too many directions", "You''ve jumped into a reactive state", "You need to re-enter your body before responding to something", "You want to soften tension without doing a full meditation"]'::jsonb,
    field_integration_prompt = E'I just finished The Centering Drop meditation. Help me unpack what shifted for me internally by exploring these three things:\n\n1. What I noticed in my body when I focused on the point behind my sternum.\n2. What softened for me, even slightly.\n3. How this micro-shift could guide my next decision or moment today.\n\nAsk me gentle clarifying questions to help me turn this awareness into something I can use.\n\n_Real-Life Micro-Integration: Later today, touch the centre of your chest for one second. Let it remind you where to return._',
    science_text = 'Interoceptive awareness — tuning into internal sensations like the subtle feeling behind the sternum — activates brain regions responsible for emotional regulation, including the anterior insula and medial prefrontal cortex. This reduces reactivity by shifting neural activity away from threat-based patterns and toward reflective awareness. Research shows that even brief interoceptive attention can interrupt stress responses and restore a sense of grounded presence.',
    science_source = 'Farb, N. A. et al. "Interoception, Contemplative Practice, and Health." Frontiers in Psychology, 2015.',
    spiritual_text = E'Alan Watts often explained that presence is not something you achieve. It is what remains when you stop trying to control what comes next. He described this as "the art of allowing yourself to be."\n\nThis Centering Drop is exactly that.\nA tiny return to the part of you that is untouched by thought, fear, or urgency.',
    spiritual_source = 'Watts, A. (1973). The Wisdom of Insecurity. Vintage Books.'
WHERE id = 'the-centering-drop';

-- 2. Dialing it Down
UPDATE public.guided_shifts
SET
    intro = 'This meditation is designed for moments when everything feels sharp — sounds feel louder, thoughts feel faster, emotions feel on-edge, and the body feels like it''s holding a subtle electric buzz.',
    description = 'The Sharpness Softener teaches the nervous system to release intensity, slow sensory processing, drop internal noise, widen tolerance and soften the edges around the experience.',
    approach = NULL,
    use_when = '["Overstimulation is rising", "Your mind feels sharp or fast", "You''re emotionally prickly", "You need to soften before a conversation", "Your body feels tight or reactive"]'::jsonb,
    field_integration_prompt = E'I just finished the Dialing it Down meditation. Help me translate what softened for me into something I can use today by exploring these questions:\n\n1. Which part of my body or mind felt the biggest shift in softness or spaciousness?\n2. What sensations or thoughts became less sharp or intense?\n3. How can I carry this softened presence into the next moment of my day?\n\nPlease ask me clarifying questions to help me identify the one insight I want to keep with me.\n\n_Real-Life Integration: Later today, choose one interaction where you respond from softness, not speed._',
    science_text = 'Research on sensory gating shows that the brain can modulate the intensity of incoming sensory information by shifting attention inward and reducing cortical arousal. Practices that focus on softening internal awareness activate the thalamus and prefrontal cortex, which help regulate how strongly sounds, thoughts, and sensations register. This decreases perceived sharpness and reduces stress-driven hypervigilance.',
    science_source = 'Cromwell, H. C. et al. "Sensory Gating: A Neurophysiological Mechanism for Filtering Sensory Input." Journal of Neurophysiology, 2008.',
    spiritual_text = E'Pema Chödrön teaches that the real shift happens when we soften our resistance to the moment. She writes that when we stop bracing against our experience, "we create space for the tenderness of being human to come through."\n\nThis meditation follows that teaching. Every small unclenching, every tiny softening, becomes an act of courage rather than avoidance. A reminder that gentleness is strength, and presence grows wherever we stop pushing.',
    spiritual_source = 'Chödrön, P. (1997). When Things Fall Apart. Shambhala Publications.'
WHERE id = 'dialing-it-down';

-- 3. The Exhale Stretch
UPDATE public.guided_shifts
SET
    intro = 'The Exhale Stretch is designed for moments of tension, irritability, tightness, or mental congestion. Instead of teaching a specific breath pattern, it encourages a natural elongation of the exhale — just a few seconds longer — which signals to the brain that safety is increasing.',
    description = NULL,
    approach = NULL,
    use_when = '["You feel tight or compressed", "Stress is rising in the background", "You''re between meetings or tasks", "You need a quick reset", "Your breath feels shallow or quick"]'::jsonb,
    field_integration_prompt = E'I just finished the Exhale Stretch meditation. Help me understand what shifted by exploring these three things:\n\n1. What part of my body softened or released when my exhale lengthened.\n2. What changed in my mental or emotional state after slowing the exhale.\n3. How I can use this stretched-exhale moment in a real situation later today.\n\nAsk me clarifying questions so I can anchor what I felt into something I can carry forward.\n\n_Real-Life Integration: Later today, pause once and let one exhale be two seconds longer than usual. Notice what changes._',
    science_text = 'Extending the exhale increases parasympathetic activity by stimulating vagal pathways that slow heart rate and reduce sympathetic arousal. Even slight elongations of the exhale have been shown to improve emotional regulation, lower perceived stress, and create a measurable calming effect in the limbic system.',
    science_source = 'Strauss-Blasche, G. et al. "Effects of Slow Breathing on Autonomic Function." Journal of Psychophysiology, 2015.',
    spiritual_text = E'Thich Nhat Hanh taught that every exhale is a return to yourself. He often said, "Breathing out, I release. Breathing in, I come home."\n\nThis meditation reflects that teaching. Stretching the exhale even slightly creates room for tension to fall away, and for your awareness to settle where your body already is. In his view, the breath is not something to master, but something to follow with gentleness. Each exhale becomes a doorway that brings you back to presence.',
    spiritual_source = 'Thich Nhat Hanh. (1975). The Miracle of Mindfulness. Beacon Press.'
WHERE id = 'the-exhale-stretch';

-- 4. From Head to Heart
UPDATE public.guided_shifts
SET
    intro = 'From Head to Heart is for the moments when your mind feels too loud and too fast, and you need to come back into the core of your body. It''s a gentle landing, not an emotional excavation.',
    description = NULL,
    approach = NULL,
    use_when = '["You''re lost in your head", "You feel disconnected from yourself", "Emotions are buzzing but unclear", "Overwhelm is rising", "You need a deeper form of grounding"]'::jsonb,
    field_integration_prompt = E'I just finished the From Head to Heart meditation. Help me clarify what shifted by exploring:\n\n1. What I noticed when my awareness moved from the busyness of my mind into the centre of my chest.\n2. Whether anything widened, softened, or became more spacious.\n3. How this grounded feeling could guide my next moment or decision today.\n\nAsk gentle clarifying questions so I can identify one insight I want to carry forward.\n\n_Real-Life Integration: Later today, rest your hand on your chest for one breath and let that be your reminder to return._',
    science_text = E'Shifting attention from the head (a cognitive centre) into the chest (an interoceptive centre) reduces activation of the default mode network, which fuels rumination. Heart-focused breathing increases vagal tone and improves heart rate variability, which enhances calm and emotional regulation. Research shows that when awareness drops into the chest, neural coherence improves, leading to clearer thinking and less overwhelm.',
    science_source = 'McCraty, R. et al. (2009). Coherence and Heart Focused Attention. HeartMath Institute. / Khalsa, S. S. et al. (2018). Interoception and Mental Health. Biological Psychiatry.',
    spiritual_text = E'Eckhart Tolle teaches that most suffering begins when awareness gets trapped in the busy activity of the mind. He writes that presence lives below the neck, in the felt sense of the body, and that when you bring awareness into the chest, "the mind loses its compulsive quality and a deeper stillness becomes available."\n\nThis meditation follows that path. By acknowledging the mind''s weight and then guiding awareness downward, you move from mental noise into embodied presence. From thinking into being. From head into heart.',
    spiritual_source = 'Tolle, E. (1999). The Power of Now. New World Library.'
WHERE id = 'from-head-to-heart';

-- 5. The Micro Let-Go
UPDATE public.guided_shifts
SET
    intro = 'The Micro Let-Go is a tiny ritual for the moments when the body is holding something — jaw tension, shoulder tightness, chest pressure, a mental grip — but you don''t have the capacity for a long meditation.',
    description = 'This teaches the body how to release in small, safe, repeatable doses.',
    approach = NULL,
    use_when = '["Something inside feels tight", "You''re stuck in a small loop of tension", "Emotions feel slightly jammed", "You want to soften without going deep"]'::jsonb,
    field_integration_prompt = E'I just finished the Micro Let-Go meditation. Help me understand what shifted by exploring:\n\n1. What part of my body I chose to soften.\n2. Whether anything changed, even in the smallest way.\n3. How this micro-release could help me approach the rest of my day with more ease.\n\nAsk gentle clarifying questions so I can turn this tiny shift into a clear insight I can use.\n\n_Real-Life Integration: Later today, pause once and release something by one percent — nothing more._',
    science_text = 'Research shows that small, incremental releases of muscle tension activate relaxation pathways without triggering the body''s threat response. Micro-relaxation reduces sympathetic arousal by shifting activity in the motor cortex and lowering baseline muscle tone, which helps interrupt stress feedback loops. Small releases accumulate and create larger reductions in tension over time.',
    science_source = 'Conrad, A. et al. "The Effects of Progressive Muscle Relaxation on Stress and Anxiety." Applied Psychophysiology and Biofeedback, 2007.',
    spiritual_text = E'Jon Kabat-Zinn teaches that you do not need a dramatic release for change to occur. Presence itself is a softening. He writes that when we bring gentle awareness to a place of tension without demanding it change, "the body often lets go in its own time."\n\nThis meditation follows that wisdom. A one percent release becomes a doorway into spaciousness. A micro let-go becomes a reminder that relief comes from allowing, not forcing.',
    spiritual_source = 'Kabat-Zinn, J. (1994). Wherever You Go, There You Are. Hyperion.'
WHERE id = 'the-micro-let-go';
