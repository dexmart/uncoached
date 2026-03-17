-- ============================================
-- Boundaries Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Nervous System Yes
UPDATE public.guided_shifts
SET
    intro = 'A true yes is not mental agreement. It is bodily alignment.',
    description = 'The Nervous System Yes trains awareness to recognize when the body feels open, settled, and willing. It helps distinguish between conditioned compliance and genuine consent. This meditation strengthens inner boundaries by teaching the system what a real yes feels like, so no becomes clearer without effort. This is not about pleasing. It is about coherence.',
    approach = NULL,
    use_when = '["You say yes automatically", "You struggle to feel what you want", "Decisions feel confusing or pressured", "Resentment follows agreement", "You want clarity without justification"]'::jsonb,
    field_integration_prompt = E'I just completed The Nervous System Yes meditation. Please help me process and integrate this experience by:\n\n1. Helping me describe what a true yes feels like in my body.\n2. Identifying how this differs from compliance or obligation.\n3. Exploring situations where I say yes without bodily alignment.\n4. Helping me practice checking for this sensation before agreeing to things.\n\nAsk me clarifying questions and help me integrate embodied consent into daily life.\n\n_Real-Life Integration: Before agreeing to anything today, pause and ask: "Does my body feel open or tight." Let the body answer first._',
    science_text = 'A nervous system yes is rooted in interoceptive safety rather than conscious decision-making. Research shows the body signals openness or protection before thought forms. Ease, steady breath, and lack of bracing reflect parasympathetic engagement, indicating the system does not perceive threat. This state is neutral rather than energized. It supports orientation, not urgency. When openness remains, the yes stays true. When contraction appears, the signal has changed. Learning to track these shifts allows decisions to emerge from regulation instead of pressure.',
    science_source = 'Craig, A. D. (2009). How do you feel? Interoception, the sense of the physiological condition of the body. Nature Reviews Neuroscience.',
    spiritual_text = E'Parker Palmer teaches that a true yes is quiet, grounded, and patient. An authentic yes does not rush toward demand or approval. It waits for alignment.\n\nWhen we listen beneath obligation, truth appears not as an argument, but as a settled inner posture. This kind of yes does not chase or defend itself. It remains open until it no longer can. Integrity is not consistency of action, but consistency of listening.',
    spiritual_source = 'Palmer, P. J. (2000). Let Your Life Speak. Jossey-Bass.'
WHERE id = 'the-nervous-system-yes';

-- 2. The Nervous System No
UPDATE public.guided_shifts
SET
    intro = 'A true no is not rejection. It is self-protection without aggression.',
    description = 'The Nervous System No teaches the body how to recognize misalignment early, before resentment, collapse, or justification appear. It helps separate calm refusal from fear-based avoidance or reactive shutdown. This is not about pushing away. It is about preserving integrity.',
    approach = NULL,
    use_when = '["You agree and regret it later", "No feels harsh or unavailable", "Boundaries appear only after overwhelm", "You freeze instead of responding", "You want firmness without guilt"]'::jsonb,
    field_integration_prompt = E'I just completed The Nervous System No meditation. Please help me process and integrate this experience by:\n\n1. Helping me identify how a true no shows up in my body.\n2. Exploring how this differs from fear, shutdown, or avoidance.\n3. Identifying situations where I override this signal.\n4. Helping me practice honoring no without justification or guilt.\n\nAsk me clarifying questions and help me integrate embodied refusal into daily life.\n\n_Real-Life Integration: When something approaches you today, pause and ask: "Is my body drawing back or opening." Let the direction guide you._',
    science_text = 'From a neuroscience perspective, a nervous system no reflects protective activation rather than indecision or resistance. Research shows that contraction, withdrawal, and bracing are signals of perceived threat processed before conscious thought. These responses are mediated by subcortical brain structures that prioritize safety. When individuals learn to recognize and respect these signals, stress decreases and boundary violations lessen. Ignoring or overriding protective responses increases nervous system load and contributes to burnout. Honouring a somatic no allows protection to occur without escalation, creating boundaries that are stable rather than reactive.',
    science_source = 'Porges, S. W. (2011). The Polyvagal Theory. W. W. Norton & Company.',
    spiritual_text = E'Clarissa Pinkola Estés teaches that the soul has an instinctual boundary that must be honoured for life force to remain intact. In her work, the word no is not a rejection of others, but an act of self-preservation.\n\nWhen this instinct is ignored, vitality drains. When it is honoured, strength returns. A true no does not harden the heart. It protects it. Saying no from the body restores inner authority and returns the self to its natural rhythm. Protection, in this sense, is sacred.',
    spiritual_source = 'Estés, C. P. (1992). Women Who Run With the Wolves. Ballantine Books.'
WHERE id = 'the-nervous-system-no';

-- 3. The Space Creator
UPDATE public.guided_shifts
SET
    intro = 'Boundaries are not always spoken. Often, they are spatial.',
    description = 'The Space Creator teaches the nervous system how to create internal room without confrontation, explanation, or withdrawal. It helps the body reclaim personal space when energy feels crowded, encroached upon, or overextended. This is not distancing. It is differentiation.',
    approach = NULL,
    use_when = '["You feel energetically crowded", "Others'' emotions or needs feel too close", "You lose yourself in interactions", "You need space without cutting off connection", "You want to reset proximity calmly"]'::jsonb,
    field_integration_prompt = E'I just completed The Space Creator meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body feels when I give myself space.\n2. Identifying situations where my space feels invaded or collapsed.\n3. Exploring how I can maintain internal space during interaction.\n4. Helping me practice non-verbal boundary setting.\n\nAsk me clarifying questions and help me integrate spatial boundaries into daily life.\n\n_Real-Life Integration: When you feel crowded, pause and imagine creating one inch of space around you. Let your body settle before responding._',
    science_text = 'From a nervous system perspective, creating space interrupts automatic threat responses. Research shows that perceived lack of space increases sympathetic activation and urgency, narrowing cognitive flexibility. When the body senses room, even symbolically, the prefrontal cortex regains influence, allowing for choice rather than reflex. This internal spacing reduces emotional flooding and supports boundary formation without escalation.',
    science_source = 'Siegel, D. J. (2010). Mindsight: The New Science of Personal Transformation. Bantam Books.',
    spiritual_text = E'Viktor Frankl taught that freedom lives in the space between stimulus and response. In his work, this space is where dignity, choice, and self-respect reside.\n\nWhen we learn to pause rather than react, we reclaim authorship of our lives. Creating space does not mean disengaging from life. It means meeting life without being overtaken by it. In this pause, we remember that we are not required to answer immediately. Presence creates room. And in that room, freedom lives.',
    spiritual_source = 'Frankl, V. E. (1959). Man''s Search for Meaning. Beacon Press.'
WHERE id = 'the-space-creator';

-- 4. The Energy Filter
UPDATE public.guided_shifts
SET
    intro = 'Not everything that reaches you needs to enter you.',
    description = 'The Energy Filter teaches the nervous system how to distinguish between what can pass through and what should be stopped, without vigilance or rigidity. It helps the body remain open while selectively receiving. This is not shielding. It is discernment.',
    approach = NULL,
    use_when = '["You absorb others'' moods or stress", "Interactions leave you drained", "Emotional boundaries feel porous", "You want openness without overwhelm", "You need clarity without hardness"]'::jsonb,
    field_integration_prompt = E'I just completed The Energy Filter meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body feels when I am selectively open.\n2. Identifying situations where I tend to absorb energy automatically.\n3. Exploring what signals tell me something does not need to enter.\n4. Helping me practice discernment without emotional shutdown.\n\nAsk me clarifying questions and help me integrate energetic discernment into daily life.\n\n_Real-Life Integration: Before responding to others today, pause and ask: "Does this need to come in." Let discernment guide you._',
    science_text = 'From a neuroscience perspective, healthy boundaries depend on the nervous system''s ability to distinguish between relevant and irrelevant stimuli. Sensory gating allows the brain to filter incoming information, preventing overload. When this system is compromised by stress or trauma, individuals may absorb emotional input excessively or become hypervigilant. Practices that support internal filtering help restore regulation by reducing unnecessary arousal.',
    science_source = 'McGhie, A., & Chapman, J. (1961). Disorders of attention and perception in early schizophrenia. British Journal of Medical Psychology.',
    spiritual_text = E'Buddhist teachings on mindfulness emphasize wise discernment rather than avoidance. Awareness is trained to notice what arises without grasping or rejecting. In this way, experience is met, but not all of it is taken in.\n\nThe practitioner learns to let what is unhelpful pass through without becoming entangled. This discernment preserves clarity and compassion at the same time. Filtering is not a withdrawal from life, but a skillful way of staying present without being consumed by what does not belong.',
    spiritual_source = 'Goldstein, J. (2002). One Dharma. HarperCollins.'
WHERE id = 'the-energy-filter';

-- 5. The "Not Today" Breath
UPDATE public.guided_shifts
SET
    intro = 'Some boundaries are not permanent. They are temporal.',
    description = 'The "Not Today" Breath teaches the nervous system how to delay engagement without guilt, explanation, or shutdown. It gives the body a way to say not now instead of defaulting to yes, avoidance, or overwhelm. This is not refusal. It is pacing.',
    approach = NULL,
    use_when = '["You feel pressured to respond immediately", "You need time but default to agreement", "Urgency overrides clarity", "You feel rushed into decisions", "You want firmness without finality"]'::jsonb,
    field_integration_prompt = E'I just completed The "Not Today" Breath meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body reacts to urgency and pressure.\n2. Identifying situations where I benefit from delaying response.\n3. Exploring how time boundaries support clearer decisions.\n4. Helping me practice calm postponement without guilt.\n\nAsk me clarifying questions and help me integrate temporal boundaries into daily life.\n\n_Real-Life Integration: When something demands immediate response, pause and think: "Not today." Let time work for you._',
    science_text = 'From a nervous system perspective, urgency increases sympathetic activation and narrows cognitive flexibility. Research shows that when individuals feel forced to respond immediately, stress responses escalate and decision quality declines. Pausing engagement, even briefly, allows the nervous system to downshift and restores access to executive functioning. Naming a delay helps interrupt threat-based urgency without suppressing emotion.',
    science_source = 'Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience.',
    spiritual_text = E'Parker Palmer teaches that discernment requires patience and respect for timing. In his work, truth does not rush to meet demand. It waits until it can be spoken honestly.\n\nChoosing "not today" is not avoidance, but a form of self-trust. It acknowledges that wisdom unfolds in its own rhythm. When we allow ourselves to pause rather than perform, we honour the integrity of our inner life. Time becomes an ally rather than an enemy. And in that allowance, clarity grows.',
    spiritual_source = 'Palmer, P. J. (2000). Let Your Life Speak. Jossey-Bass.'
WHERE id = 'the-not-today-breath';
