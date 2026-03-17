-- ============================================
-- Morning Re-entry Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. First Breath Back
UPDATE public.guided_shifts
SET
    intro = 'Waking up is a transition, not a switch.',
    description = 'First Breath Back supports the moment between sleep and movement. It helps the nervous system come online gently, without rushing the mind or forcing energy. This meditation establishes presence before momentum, so the day begins from steadiness rather than reaction. This is not motivation. It is arrival.',
    approach = NULL,
    use_when = '["Immediately after waking", "Before checking your phone", "When mornings feel disorienting or heavy", "When you want to start the day grounded", "When you want clarity without urgency"]'::jsonb,
    field_integration_prompt = E'I just completed First Breath Back. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body transitions from sleep into wakefulness.\n2. Identifying what supports a grounded morning start for me.\n3. Exploring how presence before action affects my day.\n4. Supporting me in creating a calm morning rhythm.\n\nAsk me clarifying questions and help me integrate presence into my mornings.\n\n_Real-Life Integration: Before checking your phone, take one moment to arrive. Let the day meet you after you meet yourself._',
    science_text = 'The transition from sleep to wakefulness involves shifts in autonomic activity and cortical arousal. Research shows that gentle awareness during this transition improves emotional regulation, reduces morning stress responses, and supports cognitive clarity throughout the day.',
    science_source = 'Walker, M. (2017). Why We Sleep. Scribner. / Cajochen, C. (2007). Alertness and circadian rhythms. Journal of Biological Rhythms.',
    spiritual_text = E'Zen teachings emphasize beginning the day with direct presence before engagement. Thich Nhat Hanh described waking as a moment to recognize life returning, meeting the day with awareness rather than haste.\n\nThis first conscious breath becomes a quiet act of gratitude and grounding.',
    spiritual_source = 'Thich Nhat Hanh. Peace Is Every Step. Bantam.'
WHERE id = 'first-breath-back';

-- 2. The Grounded Start
UPDATE public.guided_shifts
SET
    intro = 'Mornings often begin in the mind — lists appear, decisions queue up, attention jumps ahead.',
    description = 'The Grounded Start brings awareness into the lower body so the day begins with stability and direction. It helps the nervous system orient to support, creating a sense of being here before doing anything out there. This meditation builds forward readiness rooted in the body.',
    approach = NULL,
    use_when = '["After waking and light movement", "Before starting tasks or conversations", "When mornings feel scattered", "When you want a steady pace", "When you want your day to move from presence"]'::jsonb,
    field_integration_prompt = E'I just completed The Grounded Start. Please help me process and integrate this experience by:\n\n1. Helping me notice how grounding affects my clarity and pace.\n2. Identifying moments when I lose connection to my body during the day.\n3. Exploring ways to return to physical grounding during stress.\n4. Supporting me in starting my mornings from steadiness rather than urgency.\n\nAsk me clarifying questions and help me integrate grounding into my daily routine.\n\n_Real-Life Integration: When the day feels rushed, return attention to your feet. Let your next step come from the ground._',
    science_text = 'Grounding attention in the lower body increases proprioceptive input and supports autonomic regulation. Research shows that physical orientation to support improves balance, reduces anxiety, and enhances cognitive stability by reinforcing sensory feedback loops between the body and brain.',
    science_source = 'Payne, P., Levine, P., & Crane-Godreau, M. (2015). Somatic experiencing. Frontiers in Psychology. / Horak, F. (2006). Postural orientation. Journal of Neurophysiology.',
    spiritual_text = E'In embodied contemplative practice, stability is cultivated from the ground upward. Zen walking meditation emphasizes beginning each step from contact with the earth, allowing awareness to rise from support rather than effort.\n\nWhen the body knows where it stands, the mind follows.',
    spiritual_source = 'Thich Nhat Hanh. The Long Road Turns to Joy. Parallax Press.'
WHERE id = 'the-grounded-start';

-- 3. The Wakeful Stretch
UPDATE public.guided_shifts
SET
    intro = 'The body wakes in layers. Movement helps each layer arrive.',
    description = 'The Wakeful Stretch supports the transition from stillness into gentle motion. It helps the nervous system move from the inward state of sleep into outward readiness through slow, intentional physical engagement. This is not exercise. It is a conversation between awareness and the body.',
    approach = NULL,
    use_when = '["When the body feels stiff or heavy upon waking", "When energy feels trapped or sluggish", "When you want to wake your body before your mind takes over", "When movement feels more accessible than stillness", "When you want to bridge rest and readiness"]'::jsonb,
    field_integration_prompt = E'I just completed The Wakeful Stretch. Please help me process and integrate this experience by:\n\n1. Helping me notice how gentle movement changes my state upon waking.\n2. Identifying where my body holds overnight stillness or tension.\n3. Exploring how slow motion supports wakefulness without urgency.\n4. Supporting me in using physical movement as a morning transition.\n\nAsk me clarifying questions and help me integrate embodied waking.\n\n_Real-Life Integration: When the body feels heavy in the morning, move slowly before moving fast. Let the body lead the waking._',
    science_text = 'Gentle movement upon waking supports proprioceptive reactivation and increases blood flow to muscles and the brain. Research shows that slow, intentional stretching reduces morning cortisol spikes, improves joint mobility, and transitions the nervous system from parasympathetic rest dominance into balanced arousal. Movement-based waking supports sustained energy and emotional regulation throughout the day.',
    science_source = 'Behm, D. & Chaouachi, A. (2011). Effects of stretching on performance. Applied Physiology, Nutrition, and Metabolism. / Tseng, B. et al. (2013). Exercise and morning cortisol. Psychoneuroendocrinology.',
    spiritual_text = E'Zen practice treats every movement as an opportunity for presence. In kinhin, or walking meditation, each step is a complete act of awareness. Morning stretching, approached this way, becomes a form of embodied prayer.\n\nThe body does not need to be conquered into wakefulness. It needs to be invited. When movement is offered gently, the body responds with trust rather than resistance.',
    spiritual_source = 'Thich Nhat Hanh. The Long Road Turns to Joy. Parallax Press.'
WHERE id = 'the-wakeful-stretch';

-- 4. The Gentle Ignite (sort_order 3, replacing Wakeful Stretch position)
UPDATE public.guided_shifts
SET
    intro = 'Some mornings do not need more rest. They need a spark.',
    description = 'The Gentle Ignite supports the gradual return of motivation, curiosity, and forward energy without pressure. It helps the nervous system wake up its sense of engagement while staying grounded and calm. This meditation is about lighting the day from the inside, not forcing momentum.',
    approach = NULL,
    use_when = '["When you feel awake but flat", "When motivation feels distant", "When you want to move forward without rushing", "When the day needs warmth, not urgency", "When clarity feels close but quiet"]'::jsonb,
    field_integration_prompt = E'I just completed The Gentle Ignite. Please help me process and integrate this experience by:\n\n1. Helping me notice how energy returns without pressure.\n2. Identifying what helps me feel quietly motivated in the morning.\n3. Exploring how warmth and readiness show up in my body.\n4. Supporting me in beginning my day with engagement rather than urgency.\n\nAsk me clarifying questions and help me integrate gentle momentum.\n\n_Real-Life Integration: When motivation feels distant, look for warmth instead of force. Energy grows when it feels safe._',
    science_text = 'Morning energy emerges most sustainably when arousal increases gradually rather than abruptly. Neuroscience research shows that gentle activation supports optimal dopamine and norepinephrine levels, which enhance motivation and focus without triggering stress responses. When the body senses warmth, readiness, and safety first, the brain follows with clarity and engagement.',
    science_source = 'Arnsten, A. (2009). Stress signalling pathways. Nature Reviews Neuroscience. / Pessoa, L. (2017). Emotion and motivation. Current Opinion in Behavioral Sciences.',
    spiritual_text = E'Taoist teachings describe energy as something that responds to ease and timing rather than effort. Lao Tzu wrote that forcing movement creates resistance, while allowing energy to arise gently allows it to carry farther with less strain.\n\nWhen action begins from quiet readiness instead of willpower, it feels aligned and sustainable, reflecting a deeper intelligence that knows when and how to move.',
    spiritual_source = 'Lao Tzu. Tao Te Ching, translated by Stephen Mitchell.'
WHERE id = 'the-gentle-ignite';

-- 4. The Slow Clarity
UPDATE public.guided_shifts
SET
    intro = 'Clarity does not always arrive as an insight. Often it forms quietly, through orientation and presence.',
    description = 'The Slow Clarity meditation helps the mind organize itself after waking, allowing understanding, priorities, and direction to emerge gradually. It supports mental spaciousness without forcing decisions or plans. This meditation is about letting the day come into focus naturally.',
    approach = NULL,
    use_when = '["When your mind feels foggy in the morning", "When you want direction without pressure", "When clarity feels possible but not formed yet", "When you want to begin the day with steadiness", "When you trust clarity more than urgency"]'::jsonb,
    field_integration_prompt = E'I just completed The Slow Clarity meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how clarity forms without forcing it.\n2. Identifying what feels most important or oriented today.\n3. Exploring how mental spaciousness supports decision-making.\n4. Supporting me in beginning the day with calm focus.\n\nAsk me clarifying questions and help me integrate gentle clarity into my day.\n\n_Real-Life Integration: When the day feels unclear, pause instead of pushing. Let direction emerge through presence._',
    science_text = 'Mental clarity improves when cognitive load is reduced and attention is allowed to settle naturally. Research shows that spacious awareness supports executive function, prioritization, and flexible thinking. When the brain transitions from rest to focus gradually, it organizes information more effectively, leading to clearer decision-making throughout the day.',
    science_source = 'Smallwood, J., & Schooler, J. (2015). Mind-wandering and cognitive control. Annual Review of Psychology. / Raichle, M. (2015). The brain''s default mode network. Annual Review of Neuroscience.',
    spiritual_text = E'Zen teachings emphasize that clarity is revealed through still attention rather than effortful thinking. When the mind rests openly, understanding arranges itself without strain.\n\nClarity that arrives this way feels grounded and trustworthy, guiding action without urgency.',
    spiritual_source = 'Suzuki, S. (1970). Zen Mind, Beginner''s Mind. Weatherhill.'
WHERE id = 'the-slow-clarity';
