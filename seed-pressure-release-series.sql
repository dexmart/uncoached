-- ============================================
-- Pressure Release Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Unload Breath
UPDATE public.guided_shifts
SET
    intro = 'Pressure builds when too much is being carried at once — expectations, standards, unfinished thoughts.',
    description = 'The Unload Breath creates a moment where the system can set weight down without solving anything. It is not about calming completely. It is about reducing load so clarity can return. This meditation works best when pressure feels mental, internal, and cumulative.',
    approach = NULL,
    use_when = '["When perfectionism tightens your system", "When your mind feels stacked with tasks", "When urgency crowds out clarity", "When you feel compressed or braced", "When you need immediate relief without avoidance"]'::jsonb,
    field_integration_prompt = E'I just completed The Unload Breath. Please help me process and integrate this experience by:\n\n1. Helping me notice where pressure accumulates in my body.\n2. Identifying what I tend to carry that does not need immediate attention.\n3. Exploring how releasing small amounts of pressure affects my clarity.\n4. Supporting me in unloading mental weight throughout the day.\n\nAsk me clarifying questions and help me integrate pressure relief.\n\n_Real-Life Integration: When pressure stacks, unload a little before doing more. Relief creates capacity._',
    science_text = 'Mental pressure is associated with sustained sympathetic activation and increased cognitive load. Research shows that slow exhalation and partial release of muscular tension reduce perceived stress and restore prefrontal functioning. Even brief reductions in load improve decision-making and emotional regulation.',
    science_source = 'McEwen, B. (2007). Physiology and neurobiology of stress. Physiological Reviews. / Thayer, J. et al. (2012). Vagal tone and stress regulation. Biological Psychology.',
    spiritual_text = E'David Whyte writes that pressure often comes from trying to hold more than the moment requires. In his reflections on presence and enoughness, he emphasizes releasing the demand to carry the future all at once.\n\nWhen attention returns to what can be held now, the weight eases and meaning becomes clearer.',
    spiritual_source = 'Whyte, D. (2014). Consolations. Many Rivers Press.'
WHERE id = 'the-unload-breath';

-- 2. The One Thing Now
UPDATE public.guided_shifts
SET
    intro = 'Pressure multiplies when attention is divided.',
    description = 'The One Thing Now reduces overwhelm by helping the nervous system orient to a single, manageable focus. It does not prioritize productivity. It restores sequence, allowing the mind to move from stacking to presence. This meditation is about reducing the field, not choosing the perfect task.',
    approach = NULL,
    use_when = '["When everything feels urgent at once", "When decision fatigue sets in", "When your mind jumps between tasks", "When you feel scattered or frozen", "When pressure comes from too many shoulds"]'::jsonb,
    field_integration_prompt = E'I just completed The One Thing Now. Please help me process and integrate this experience by:\n\n1. Helping me notice how my attention behaves under pressure.\n2. Identifying what happens when I narrow my focus to one thing.\n3. Exploring how sequence reduces overwhelm for me.\n4. Supporting me in choosing one next step without urgency.\n\nAsk me clarifying questions and help me integrate focused presence.\n\n_Real-Life Integration: When everything feels urgent, pause and ask: "What is the one thing now." Let the rest wait._',
    science_text = 'Cognitive overload occurs when working memory is forced to hold multiple demands simultaneously. Research shows that narrowing attention to a single focus reduces stress, improves task initiation, and restores executive function. The brain operates more effectively when information is processed sequentially rather than in parallel under pressure.',
    science_source = 'Miller, G. (1956). The magical number seven. Psychological Review. / Baumeister, R. et al. (2018). Decision fatigue. Journal of Applied Psychology.',
    spiritual_text = E'Michael A. Singer teaches that peace emerges when attention returns to the immediacy of experience rather than the weight of future outcomes. By meeting what is directly in front of us, the mind releases its grip on everything else.\n\nPresence narrows the field, and pressure dissolves when the moment is allowed to be enough.',
    spiritual_source = 'Singer, M. A. (2007). The Untethered Soul. New Harbinger.'
WHERE id = 'the-one-thing-now';

-- 3. The Release Valve
UPDATE public.guided_shifts
SET
    intro = 'Pressure builds when there is no place for it to go.',
    description = 'The Release Valve gives the system a controlled way to let excess internal pressure escape without collapsing, quitting, or abandoning responsibility. It is not about blowing everything off. It is about preventing overload by allowing measured release. This meditation helps pressure move out instead of staying trapped inside.',
    approach = NULL,
    use_when = '["When you feel internally compressed", "When irritation or tension is building", "When pressure feels like it might spill sideways", "When you need relief without avoidance", "When holding feels unsustainable"]'::jsonb,
    field_integration_prompt = E'I just completed The Release Valve meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice where pressure builds in my body.\n2. Identifying early signals that pressure needs release.\n3. Exploring healthy ways to release pressure without avoidance.\n4. Supporting me in regulating internal load throughout the day.\n\nAsk me clarifying questions and help me integrate pressure regulation.\n\n_Real-Life Integration: Release pressure early, before it demands release later. Small adjustments prevent overload._',
    science_text = 'Internal pressure is associated with sustained sympathetic activation and increased muscle tone. Research shows that intentional partial release of tension reduces physiological stress markers and restores autonomic balance. Allowing pressure to dissipate gradually supports emotional regulation without triggering collapse or avoidance.',
    science_source = 'McEwen, B. (2007). Stress and allostatic load. Physiological Reviews. / Thayer, J. et al. (2012). Vagal tone and regulation. Biological Psychology.',
    spiritual_text = E'Parker J. Palmer writes about the importance of creating safe outlets for inner pressure rather than containing it indefinitely. He emphasizes that integrity requires release as much as responsibility.\n\nWhen pressure is acknowledged and given a place to go, it no longer distorts behavior or drains vitality.',
    spiritual_source = 'Palmer, P. J. (2004). A Hidden Wholeness. Jossey-Bass.'
WHERE id = 'the-release-valve';

-- 4. The Enoughness Reset
UPDATE public.guided_shifts
SET
    intro = 'Much of the pressure people feel is not about tasks. It''s about an internal sense of not being enough yet.',
    description = 'The Enoughness Reset helps the nervous system step out of comparison, self-measurement, and constant self-improvement. It restores a felt sense of sufficiency in the present moment, without dismissing growth or responsibility. This meditation does not say "you''re done." It says "this moment is allowed to be complete."',
    approach = NULL,
    use_when = '["When perfectionism tightens your system", "When you feel behind or inadequate", "When self-judgment fuels urgency", "When rest feels undeserved", "When pressure comes from internal standards"]'::jsonb,
    field_integration_prompt = E'I just completed The Enoughness Reset. Please help me process and integrate this experience by:\n\n1. Helping me notice how self-measurement shows up in my body.\n2. Identifying situations where I feel pressure to be more than I am.\n3. Exploring what changes when I allow enoughness in the present moment.\n4. Supporting me in separating growth from self-judgment.\n\nAsk me clarifying questions and help me integrate enoughness into daily life.\n\n_Real-Life Integration: When pressure comes from comparison, pause and ask: "What if this moment doesn''t need improvement."_',
    science_text = 'Perceived inadequacy activates stress responses linked to performance monitoring and self-criticism. Research shows that reducing self-evaluative pressure improves emotional regulation and restores access to executive function. Allowing moments of sufficiency reduces cortisol and supports resilience without diminishing motivation.',
    science_source = 'Gilbert, P. (2009). Compassion-focused therapy. Clinical Psychology Review. / Neff, K. (2011). Self-compassion and well-being. Self and Identity.',
    spiritual_text = E'Thomas Merton wrote that much suffering comes from confusing worth with productivity. He emphasized learning to rest in being rather than striving to justify existence.\n\nWhen enoughness is recognized internally, action becomes cleaner and less driven by fear.',
    spiritual_source = 'Merton, T. (1961). New Seeds of Contemplation. New Directions.'
WHERE id = 'the-enoughness-reset';

-- 5. The Task Softener
UPDATE public.guided_shifts
SET
    intro = 'Tasks themselves are rarely the problem. The pressure comes from how tightly they are held.',
    description = 'The Task Softener helps the nervous system loosen its grip on responsibility without dropping it. It shifts tasks out of urgency and into proportion, allowing action to feel steadier and more humane. This meditation does not remove tasks. It changes the relationship to them.',
    approach = NULL,
    use_when = '["When tasks feel heavy or looming", "When responsibility turns into pressure", "When procrastination comes from overwhelm", "When productivity feels rigid or harsh", "When you want to act without strain"]'::jsonb,
    field_integration_prompt = E'I just completed The Task Softener. Please help me process and integrate this experience by:\n\n1. Helping me notice how tasks live in my body.\n2. Identifying which tasks I tend to hold too closely or urgently.\n3. Exploring how creating space changes my relationship to responsibility.\n4. Supporting me in approaching tasks with steadiness instead of pressure.\n\nAsk me clarifying questions and help me integrate this shift into daily life.\n\n_Real-Life Integration: When tasks feel heavy, create space before taking action. Softening changes everything._',
    science_text = 'Task-related stress activates anticipatory threat responses in the nervous system, increasing muscle tension and cognitive rigidity. Research shows that changing spatial perception and reducing urgency cues lowers stress responses and improves task engagement. Creating psychological distance restores flexibility and decision-making capacity.',
    science_source = 'Gross, J. (2015). Emotion regulation. Annual Review of Psychology. / Trope, Y. & Liberman, N. (2010). Construal level theory. Psychological Review.',
    spiritual_text = E'Brother David Steindl-Rast writes that work becomes oppressive when it is driven by fear rather than presence. He teaches that approaching tasks with gratitude and spaciousness transforms effort into participation rather than strain.\n\nWhen responsibility is met with openness instead of force, action becomes lighter and more sustainable.',
    spiritual_source = 'Steindl-Rast, D. (2013). Gratefulness, the Heart of Prayer. Paulist Press.'
WHERE id = 'the-task-softener';
