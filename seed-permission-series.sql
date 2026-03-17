-- ============================================
-- Permission Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- NOTE: Replaces 3 original "coming soon" placeholders
--       with new shifts from the owner.
-- ============================================

-- 1. Permission to Pause
UPDATE public.guided_shifts
SET
    intro = 'Most pressure is not created by reality. It is created by an internal rule that says stopping is dangerous.',
    description = 'This meditation helps you recognize urgency as a learned response rather than a truth, and reclaim pausing as an act of agency, not collapse.',
    approach = NULL,
    use_when = '["Urgency is constant", "Pausing brings guilt or fear", "Rest feels undeserved", "Productivity has replaced presence"]'::jsonb,
    field_integration_prompt = E'I just completed the Permission to Pause meditation. Please help me process and integrate this experience by:\n\n1. Identifying the belief that makes pausing feel unsafe or wrong for me.\n2. Exploring where that belief originated or who it belonged to.\n3. Noticing how my body responded when I paused without justification.\n4. Helping me interrupt urgency without guilt in real situations.\n\nAsk me clarifying questions and help me dismantle this pattern.\n\n_Real-Life Integration: Pause once today before responding or acting. Notice what does not actually require speed._',
    science_text = 'Chronic urgency is associated with prolonged sympathetic nervous system activation, elevated cortisol, and reduced prefrontal cortex regulation. Research shows that intentional pauses interrupt habitual threat responses, restore cognitive flexibility, and increase access to choice rather than compulsion. Pausing allows the nervous system to downshift without requiring full rest or disengagement.',
    science_source = 'McEwen, B. (2007). Stress and the Brain. Annals of the New York Academy of Sciences. / Farb, N. et al. (2015). Interoception and Emotional Regulation. Frontiers in Psychology.',
    spiritual_text = E'Thomas Merton wrote that much of human suffering comes from living outside ourselves, chasing demands that were never chosen. He believed stillness strips away false obligations and reveals what is real.\n\nPausing is not withdrawal. It is a return to truth.',
    spiritual_source = 'Merton, T. (1961). New Seeds of Contemplation.'
WHERE id = 'permission-to-pause';

-- 2. Permission to Not Know
UPDATE public.guided_shifts
SET
    intro = 'Much of shame is not loud. It hides inside the belief that you should already know — know what you want, know what to do next, know who you are becoming, know how this will turn out.',
    description = 'This meditation dismantles the internal rule that uncertainty is failure or incompetence. It restores not knowing as a valid, intelligent, and necessary state of becoming.',
    approach = NULL,
    use_when = '["You feel pressured to make a decision", "Clarity feels forced or premature", "Confusion triggers self-judgment", "You are between identities, chapters, or directions", "You feel behind because answers have not arrived yet"]'::jsonb,
    field_integration_prompt = E'I just completed the Permission to Not Know meditation. Please help me process and integrate this experience by:\n\n1. Identifying where I am pressuring myself to have clarity or answers before I am ready.\n2. Exploring how not knowing feels in my body when I stop resisting it.\n3. Noticing what beliefs surfaced about uncertainty, competence, or falling behind.\n4. Helping me stay present and grounded during this period of not knowing without forcing resolution.\n\nAsk me clarifying questions and help me integrate this state into real life.\n\n_Real-Life Integration: The next time you feel pressure to decide or explain, pause and ask: "Am I allowed to not know this yet." Notice what shifts when you do not rush to answer._',
    science_text = 'The brain is wired to seek certainty because ambiguity activates threat-related circuits, particularly in the amygdala. When uncertainty is perceived as dangerous, the nervous system pushes toward premature decisions to regain a sense of control. Research shows that allowing uncertainty without forcing closure reduces anxiety, improves emotional regulation, and prevents reactive decision making. Tolerating not knowing keeps the prefrontal cortex engaged and allows insight to emerge organically rather than defensively.',
    science_source = 'Carleton, R. (2016). Intolerance of Uncertainty. Journal of Anxiety Disorders. / Hirsh, J. et al. (2012). Psychological Entropy. Psychological Review.',
    spiritual_text = E'Rainer Maria Rilke wrote that we must learn to love the questions themselves and live into the answers over time. He believed that clarity is not something to be chased, but something that ripens through patience.\n\nNot knowing is not a flaw in the path. It is the space where becoming happens. When you stop demanding answers, life has room to respond.',
    spiritual_source = 'Rilke, R. M. (1903). Letters to a Young Poet.'
WHERE id = 'permission-to-not-know';

-- 3. Permission to Improve Slowly
UPDATE public.guided_shifts
SET
    title = 'Permission to Improve Slowly',
    intro = 'Shame compresses time. It creates an internal urgency that says healing should be faster, growth should be visible by now, and progress should look impressive in order to count.',
    description = 'This meditation dismantles the belief that speed equals worth. It restores slow improvement as intelligent, embodied, and sustainable.',
    approach = NULL,
    use_when = '["You feel behind compared to others", "Impatience turns inward as self-criticism", "Progress feels inadequate or invisible", "Healing feels like it should be further along", "You feel pressure to prove improvement"]'::jsonb,
    field_integration_prompt = E'I just completed the Permission to Improve Slowly meditation. Please help me process and integrate this experience by:\n\n1. Identifying where I am rushing my growth or measuring myself against unrealistic timelines.\n2. Exploring how shame or comparison has distorted my sense of progress.\n3. Noticing how my body responded when I released the demand to be further along.\n4. Helping me define what sustainable, honest improvement looks like for me right now.\n\nAsk me clarifying questions and help me integrate slow progress into my daily life.\n\n_Real-Life Integration: When you notice impatience today, ask: "What would change if I trusted this pace." Let your actions respond to steadiness, not urgency._',
    science_text = 'Lasting behavioural and emotional change requires time for neural integration. Research shows that gradual improvement strengthens neural pathways more reliably than rapid shifts, which often trigger stress responses and relapse. Slow change allows the nervous system to remain regulated, reduces cortisol spikes, and supports long-term consistency rather than short-term performance.',
    science_source = 'Lally, P. et al. (2010). Habit Formation and Behaviour Change. European Journal of Social Psychology. / McEwen, B. (2007). Stress and Neural Plasticity. Annals of the New York Academy of Sciences.',
    spiritual_text = E'Aristotle taught that we become what we repeatedly do, not what we intend. He believed character is shaped through steady practice rather than dramatic transformation.\n\nSlow improvement is not hesitation. It is devotion to what lasts. When you allow yourself to grow at the pace of integration, change becomes embodied instead of forced.',
    spiritual_source = 'Aristotle. Nicomachean Ethics, Book II.',
    is_active = true,
    sort_order = 3
WHERE id = 'permission-to-improve-slowly';

-- 4. Permission to Be Enough Today
UPDATE public.guided_shifts
SET
    title = 'Permission to Be Enough Today',
    intro = 'Shame rarely says you are not enough outright. It says, not yet. It postpones worth until you are calmer, healed, more productive, more disciplined, more impressive.',
    description = 'This meditation dismantles the belief that worth must be earned over time. It restores enoughness to the present moment, without negotiation or improvement.',
    approach = NULL,
    use_when = '["Self-criticism is active", "You feel behind or inadequate", "Rest feels undeserved", "Worth feels tied to output or progress", "Exhaustion is layered with judgment"]'::jsonb,
    field_integration_prompt = E'I just completed the Permission to Be Enough Today meditation. Please help me process and integrate this experience by:\n\n1. Identifying the conditions I place on my own worth or acceptance.\n2. Exploring how enoughness feels in my body when it is no longer delayed.\n3. Noticing what resistance or beliefs surfaced around being enough today.\n4. Helping me live this day without tying worth to productivity or improvement.\n\nAsk me clarifying questions and help me anchor enoughness into real moments.\n\n_Real-Life Integration: When self-judgment appears today, ask: "Am I allowed to be enough right now?" Notice how behaviour changes when worth is not on trial._',
    science_text = 'Chronic self-criticism activates threat-based neural circuits and increases cortisol, contributing to anxiety and emotional exhaustion. Research shows that self-acceptance stabilizes the nervous system by reducing limbic reactivity and strengthening prefrontal regulation. Feeling enough supports resilience and improves motivation by removing shame-based pressure.',
    science_source = 'Neff, K. (2011). Self-Compassion. HarperCollins. / Gilbert, P. (2010). Compassion Focused Therapy. Routledge.',
    spiritual_text = E'Ram Dass taught that worth is not something we arrive at through becoming, but something we remember by being present. He emphasized that the belief in insufficiency is part of the illusion that keeps us seeking externally what is already here.\n\nEnoughness is not earned. It is recognized. When you stop postponing worth, you meet yourself where life is actually happening.',
    spiritual_source = 'Dass, R. (1971). Be Here Now.',
    is_active = true,
    sort_order = 4
WHERE id = 'permission-to-be-enough-today';

-- 5. Permission to Want More
UPDATE public.guided_shifts
SET
    title = 'Permission to Want More',
    intro = 'Shame often disguises itself as virtue. It says you should be grateful instead of wanting more. That desire means dissatisfaction. That expansion is greedy, selfish, or immature.',
    description = 'This meditation dismantles the belief that wanting more is a flaw. It restores desire as a clean signal of direction, not a judgment of what already exists.',
    approach = NULL,
    use_when = '["You feel guilty for wanting more", "Desire is immediately followed by self-judgment", "Ambition feels conflicted or restrained", "Contentment feels quietly constraining", "You sense a pull forward but keep suppressing it"]'::jsonb,
    field_integration_prompt = E'I just completed the Permission to Want More meditation. Please help me process and integrate this experience by:\n\n1. Identifying the desire that surfaced when I stopped censoring myself.\n2. Exploring what beliefs or shame responses arose around wanting more.\n3. Helping me distinguish between genuine desire and pressure to become.\n4. Clarifying how this desire points toward direction rather than deficiency.\n\nAsk me clarifying questions and help me integrate this desire without urgency or self-judgment.\n\n_Real-Life Integration: When desire appears today, pause before judging it. Ask: "Is this pointing me somewhere." Let it inform direction, not criticism._',
    science_text = 'Desire activates dopaminergic motivation systems associated with curiosity, engagement, and forward orientation. When desire is suppressed or moralized, it often converts into anxiety, restlessness, or self-criticism. Research shows that acknowledging intrinsic desire supports psychological well-being, increases vitality, and improves goal clarity without increasing stress when not paired with pressure or comparison.',
    science_source = 'Berridge, K. (2007). The Neuroscience of Desire. Psychopharmacology. / Ryan, R. and Deci, E. (2000). Intrinsic Motivation and Self-Determination. American Psychologist.',
    spiritual_text = E'Neville Goddard taught that desire is life seeking expression through you. He believed that wanting is not evidence of lack, but a signal of movement already underway. When desire is accepted rather than resisted, it becomes a quiet guide rather than a source of conflict.\n\nWanting more does not mean something is missing. It means something is calling forward. When you allow desire without shame, you align with growth rather than fight it.',
    spiritual_source = 'Goddard, N. (1954). The Power of Awareness.',
    is_active = true,
    sort_order = 5
WHERE id = 'permission-to-want-more';
