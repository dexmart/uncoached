-- ============================================
-- Identity Leap Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Step Into the Room
UPDATE public.guided_shifts
SET
    intro = 'Every identity lives in a state — a way of standing, a way of breathing, a way of occupying space. This meditation helps you step into a future version of yourself not by imagining details, but by entering the state that version already lives in.',
    description = 'There is no forcing. No pretending. No fixing the past. The shift happens through posture, breath, and presence.',
    approach = NULL,
    use_when = '["You are about to enter a conversation, room, or decision", "You feel ready to grow but unsure how", "You want to move from insight into embodiment", "You want to act as the person you are becoming"]'::jsonb,
    field_integration_prompt = E'I just completed the Step Into the Room meditation. Help me reflect on:\n\n1. How my body shifted when I stepped into the new version of myself.\n2. What felt different about my posture, breath, or presence.\n3. Where in my life I am being invited to enter as this version of me.\n\nAsk me clarifying questions so I can anchor this identity in real situations.\n\n_Real-Life Integration: Before your next conversation or decision, pause and ask, "How does the version of me I am becoming enter this room." Then let your body answer before your mind does._',
    science_text = 'Identity is encoded through state-dependent neural patterns involving posture, breath, and motor planning. Research shows that subtle changes in body position and breathing directly influence confidence, decision making, and emotional regulation by altering prefrontal and limbic activity. Practicing embodied states strengthens neural pathways associated with that identity, making the state easier to access over time.',
    science_source = 'Niedenthal, P. (2007). Embodiment and Emotion. Emotion Review. / Carney, D. et al. (2010). Power Posing. Psychological Science.',
    spiritual_text = E'Neville Goddard taught that transformation happens when you enter the state of the wish fulfilled. He emphasized that you do not wait to become the person you want to be. You occupy the state first, and life reorganizes around it.\n\nThis meditation reflects that teaching. Stepping into the room is not imagination. It is assumption. When the body enters the state, the identity follows. And when the identity shifts, behaviour becomes natural rather than forced.',
    spiritual_source = 'Goddard, N. (1954). The Power of Awareness. Public domain lectures.'
WHERE id = 'step-into-the-room';

-- 2. The Micro Yes
UPDATE public.guided_shifts
SET
    intro = 'Identity does not change through force. It changes through agreement. Every time you say a small yes to what feels true, the nervous system learns that movement forward is safe.',
    description = 'This meditation helps you reconnect with your capacity to choose in tiny, embodied ways. Not life-altering decisions. Not bold leaps. Just honest micro agreements.',
    approach = NULL,
    use_when = '["You feel hesitant or unsure", "You want to move forward without overwhelm", "You are rebuilding trust with yourself", "You sense readiness but not certainty"]'::jsonb,
    field_integration_prompt = E'I just completed The Micro Yes meditation. Help me explore:\n\n1. What situation or choice my body responded to.\n2. How yes felt physically compared to no.\n3. What one small action could honour this yes today.\n\nAsk me clarifying questions so I can act on this without pressure or overthinking.\n\n_Real-Life Integration: Later today, pause and ask, "What would a gentle yes look like right now." Then act on the smallest version of that answer._',
    science_text = 'Decision making is influenced by interoceptive signals that register safety or threat before conscious reasoning occurs. Research shows that tuning into subtle bodily responses improves decision confidence and reduces avoidance. Small actions aligned with internal signals increase dopamine and reinforce neural pathways associated with agency and follow through.',
    science_source = 'Bechara, A. et al. (1997). Deciding Advantageously Before Knowing Why. Science. / Gollwitzer, P. (1999). Implementation Intentions. American Psychologist.',
    spiritual_text = E'Søren Kierkegaard wrote that becoming happens through choice, and that even the smallest decision shapes who we are becoming. He believed that courage is not found in dramatic leaps, but in the willingness to choose oneself again and again in ordinary moments.\n\nThis meditation reflects that truth. The micro yes is not about certainty. It is about sincerity. Each small agreement becomes a quiet act of self-authorship.',
    spiritual_source = 'Kierkegaard, S. (1843). Either/Or.'
WHERE id = 'the-micro-yes';

-- 3. The Courage Breath
UPDATE public.guided_shifts
SET
    intro = 'Courage is not the absence of fear. It is the willingness to stay present when fear appears.',
    description = 'This meditation teaches the body how to breathe with uncertainty instead of bracing against it. The breath becomes a signal of safety that allows expansion without overwhelm.',
    approach = NULL,
    use_when = '["You are about to do something that matters", "Fear or hesitation is present", "You feel exposed or stretched", "You want to meet the moment rather than avoid it"]'::jsonb,
    field_integration_prompt = E'I just completed The Courage Breath meditation. Help me reflect on:\n\n1. What situation or edge came to mind.\n2. Where I felt fear or tension in my body.\n3. How the breath changed my relationship to that feeling.\n\nAsk me clarifying questions so I can use this breath in real moments that require courage.\n\n_Real-Life Integration: Before your next stretch moment, take one slow inhale into the place you want to avoid, then exhale fully and stay present. Repeat once._',
    science_text = 'Slow, intentional breathing reduces amygdala activation and increases parasympathetic regulation through vagal pathways. Breathing into areas of tension while maintaining a long exhale teaches the nervous system that expansion does not equal danger. Over time, this retrains threat responses and increases tolerance for uncertainty.',
    science_source = 'Jerath, R. et al. (2006). Physiology of Long Breathing. Medical Hypotheses. / Porges, S. (2011). Polyvagal Theory. Norton.',
    spiritual_text = E'Pema Chödrön teaches that courage arises when we stop trying to escape discomfort and instead remain present with it. She writes that staying open in the face of fear allows wisdom and compassion to emerge naturally.\n\nThis meditation reflects that teaching. The breath becomes a bridge between fear and steadiness. Courage is not something you summon. It is something that appears when you stay.',
    spiritual_source = 'Chödrön, P. (2001). The Places That Scare You. Shambhala.'
WHERE id = 'the-courage-breath';

-- 4. The Embodied Permission
UPDATE public.guided_shifts
SET
    intro = 'Many people know what they want, but their body is still waiting to be allowed. Allowed to speak. Allowed to choose. Allowed to take up space.',
    description = 'This meditation helps you move permission out of the mind and into the body. Not as confidence. As felt authorization.',
    approach = NULL,
    use_when = '["You are holding back despite clarity", "You feel ready but restrained", "You are waiting for a sign or approval", "You want to move as yourself, not a version that fits"]'::jsonb,
    field_integration_prompt = E'I just completed The Embodied Permission meditation. Help me explore:\n\n1. Where in my body I was holding back or waiting.\n2. What shifted when I allowed permission to move through my body.\n3. Where in my life I am being invited to act without asking first.\n\nAsk me clarifying questions so I can embody this permission in real situations.\n\n_Real-Life Integration: Before acting today, pause and ask, "Am I waiting for permission, or am I ready to move." Then let your body answer._',
    science_text = 'Feelings of self-permission are associated with increased prefrontal cortex activity and reduced threat responses in the amygdala. Research shows that adopting upright posture and grounded stance increases confidence-related neural patterns and decreases inhibition. When the body signals readiness, behaviour aligns more naturally without reliance on external validation.',
    science_source = 'Carney, D. et al. (2010). Power and Posture. Psychological Science. / Kross, E. et al. (2014). Self Distancing and Agency. Journal of Personality and Social Psychology.',
    spiritual_text = E'Audre Lorde wrote that self-definition is a radical act. She taught that waiting for permission keeps people small, while embodied truth creates freedom.\n\nThis meditation reflects that wisdom. Permission is not a concept. It is a posture. A breath. A way of standing in your own life without apology. When permission lives in the body, action becomes honest and inevitable.',
    spiritual_source = 'Lorde, A. (1984). Sister Outsider. Crossing Press.'
WHERE id = 'the-embodied-permission';

-- 5. The One Degree Shift
UPDATE public.guided_shifts
SET
    intro = 'Identity rarely changes through dramatic moments. It changes through direction. A one degree shift may feel insignificant in the moment, but over time it leads somewhere entirely different.',
    description = 'This meditation teaches you how to locate and embody the smallest possible shift toward the person you are becoming. Not a leap. A turn.',
    approach = NULL,
    use_when = '["You want change but feel overwhelmed", "You are tempted to overcorrect or force growth", "You want progress that lasts", "You are ready to become someone new without abandoning yourself"]'::jsonb,
    field_integration_prompt = E'I just completed The One Degree Shift meditation. Help me explore:\n\n1. What small physical or internal shift I made.\n2. How this shift connects to the person I am becoming.\n3. What one small action today could reinforce this direction.\n\nAsk me clarifying questions so I can integrate this shift into my daily life.\n\n_Real-Life Integration: At any point today, pause and ask, "What is the one degree shift available right now." Then make it without waiting._',
    science_text = 'Behavioural change is most sustainable when it occurs through small, repeatable adjustments rather than large efforts. Research shows that tiny changes in posture, breath, or behaviour compound over time by reinforcing neural pathways associated with identity and habit formation. These micro shifts reduce resistance and increase consistency, making long-term change more likely to stick.',
    science_source = 'Lally, P. et al. (2010). How Habits Are Formed. European Journal of Social Psychology. / Wood, W. et al. (2002). Habits and Identity. Psychological Review.',
    spiritual_text = E'Aristotle taught that we become what we repeatedly do. He believed that character is shaped not by intention, but by action taken again and again.\n\nThis meditation reflects that philosophy. A one degree shift may seem small, but direction determines destination. Each quiet adjustment is a vote for the person you are becoming. Identity is not claimed in a moment. It is practiced.',
    spiritual_source = 'Aristotle. Nicomachean Ethics, Book II.'
WHERE id = 'the-one-degree-shift';
