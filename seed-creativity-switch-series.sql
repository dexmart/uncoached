-- ============================================
-- Creativity Switch Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Mental Fog Lift
UPDATE public.guided_shifts
SET
    intro = 'Mental fog is not a lack of intelligence or insight. It is a sign of overload.',
    description = 'The Mental Fog Lift helps the nervous system reduce cognitive congestion so clarity can re-emerge naturally. It does not demand answers. It creates the internal conditions where insight becomes possible again.',
    approach = NULL,
    use_when = '["When your mind feels cloudy or dull", "When decisions feel hard to access", "When you''re thinking but not arriving anywhere", "When clarity feels just out of reach", "When rest hasn''t fully restored focus"]'::jsonb,
    field_integration_prompt = E'I just completed The Mental Fog Lift. Please help me process and integrate this experience by:\n\n1. Helping me describe the quality of my mental fog.\n2. Identifying what contributes to cognitive overload for me.\n3. Exploring what shifts when I stop forcing clarity.\n4. Supporting me in recognizing clarity as a state, not a task.\n\nAsk me clarifying questions and help me integrate mental spaciousness.\n\n_Real-Life Integration: When clarity fades, reduce load before seeking answers._',
    science_text = 'Mental fog is linked to cognitive overload and sustained stress activation, which impair working memory and attentional flexibility. Research shows that reducing mental effort and restoring attentional space improves clarity and executive function. Clarity often returns when cognitive demand decreases.',
    science_source = 'McEwen, B. (2017). Neurobiology of stress and cognition. Neuropsychopharmacology. / Arnsten, A. (2009). Stress signaling and prefrontal cortex function. Nature Reviews Neuroscience.',
    spiritual_text = E'Simone Weil wrote that clarity comes not from effort but from attention that is patient and unforced. She described true understanding as something that appears when the mind stops grasping and allows space for perception to settle.\n\nIn that openness, knowing arrives quietly rather than being manufactured.',
    spiritual_source = 'Weil, S. (1952). Gravity and Grace. Routledge.'
WHERE id = 'the-mental-fog-lift';

-- 2. The Signal From the Noise
UPDATE public.guided_shifts
SET
    intro = 'When the mind feels noisy, clarity is not missing. It is buried under excess input.',
    description = 'The Signal From the Noise helps the nervous system distinguish what actually matters from everything competing for attention. This meditation does not sort problems or make decisions. It restores discrimination — the ability to sense what is relevant right now.',
    approach = NULL,
    use_when = '["When your mind feels crowded or overstimulated", "When everything feels equally important", "When decision-making feels muddy", "When external input overwhelms inner knowing", "When you need clarity without analysis"]'::jsonb,
    field_integration_prompt = E'I just completed The Signal From the Noise. Please help me process and integrate this experience by:\n\n1. Helping me notice how noise shows up in my thinking.\n2. Identifying what signals feel steady versus urgent.\n3. Exploring how my body responds to true signals.\n4. Supporting me in trusting recognition over analysis.\n\nAsk me clarifying questions and help me integrate discernment.\n\n_Real-Life Integration: When everything feels loud, listen for what feels steady._',
    science_text = 'Cognitive noise increases when attentional systems are overloaded by competing stimuli. Research shows that shifting attention from active problem-solving to interoceptive awareness improves signal detection and decision quality. The brain identifies relevance more accurately when cognitive effort is reduced and bodily cues are included.',
    science_source = 'Pessoa, L. (2008). Emotion and cognition. Nature Reviews Neuroscience. / Damasio, A. (1994). Somatic marker hypothesis. Descartes'' Error.',
    spiritual_text = E'William James wrote that attention determines experience, and that clarity arises when awareness selects what matters instead of reacting to everything.\n\nHe emphasized that meaning is not created by force, but revealed through careful noticing. Discernment, in this view, is the art of recognizing what deserves presence.',
    spiritual_source = 'James, W. (1890). The Principles of Psychology. Henry Holt.'
WHERE id = 'the-signal-from-the-noise';

-- 3. The Clear Channel
UPDATE public.guided_shifts
SET
    intro = 'Clarity isn''t always about choosing. Sometimes it''s about removing interference.',
    description = 'The Clear Channel helps the system align so information can move cleanly through awareness. It reduces internal static, emotional residue, and mental overlap that distort perception. This meditation supports clarity as flow, not control.',
    approach = NULL,
    use_when = '["When insight feels blocked or distorted", "When emotions blur perception", "When clarity feels close but inaccessible", "When intuition feels muffled", "When you want clean reception, not analysis"]'::jsonb,
    field_integration_prompt = E'I just completed The Clear Channel. Please help me process and integrate this experience by:\n\n1. Helping me notice where clarity feels blocked for me.\n2. Identifying what interferes with clean perception.\n3. Exploring how alignment changes my thinking.\n4. Supporting me in recognizing clarity as flow.\n\nAsk me clarifying questions and help me integrate this experience.\n\n_Real-Life Integration: When clarity feels blocked, check alignment before thinking harder._',
    science_text = 'Perceptual clarity improves when emotional and cognitive interference are reduced. Research shows that coherence between bodily signals and cognitive processing supports accurate perception and decision-making. Alignment across neural systems improves signal transmission and reduces distortion.',
    science_source = 'Thayer, J. & Lane, R. (2000). Neurovisceral integration. Biological Psychology. / Critchley, H. (2005). Interoception and awareness. Nature Neuroscience.',
    spiritual_text = E'Pierre Teilhard de Chardin wrote that clarity emerges when inner alignment allows consciousness to move without obstruction. He described perception as something that becomes truer when inner resistance dissolves.\n\nIn this state, knowing is received rather than forced.',
    spiritual_source = 'Teilhard de Chardin, P. (1959). The Phenomenon of Man. Harper.'
WHERE id = 'the-clear-channel';

-- 4. The Knowing Without Words
UPDATE public.guided_shifts
SET
    intro = 'Not all clarity arrives as language.',
    description = 'The Knowing Without Words supports moments when insight exists as a felt sense before it becomes thought. This meditation helps the nervous system trust non-verbal knowing and recognize understanding that does not yet need explanation. It strengthens confidence in intuition without turning it into urgency or certainty.',
    approach = NULL,
    use_when = '["When you sense clarity but can''t articulate it", "When answers feel present but unnamed", "When intuition precedes logic", "When overthinking blocks inner knowing", "When you want to trust what you feel without forcing meaning"]'::jsonb,
    field_integration_prompt = E'I just completed The Knowing Without Words. Please help me process and integrate this experience by:\n\n1. Helping me notice non-verbal knowing in my body.\n2. Identifying where intuition shows up before thought.\n3. Exploring how to trust felt clarity without forcing language.\n4. Supporting me in integrating intuition with reason.\n\nAsk me clarifying questions and help me integrate this experience.\n\n_Real-Life Integration: When clarity feels present but unnamed, let it stay that way for a while._',
    science_text = 'Non-verbal knowing is linked to interoceptive awareness and implicit processing systems. Research shows that the brain often forms accurate judgments before conscious reasoning engages. Allowing felt sense to guide awareness improves decision quality and reduces cognitive strain.',
    science_source = 'Bechara, A. et al. (1997). Somatic marker hypothesis. Science. / Kahneman, D. (2011). Thinking, Fast and Slow. Farrar, Straus and Giroux.',
    spiritual_text = E'Michael A. Singer teaches that beneath the constant activity of the mind exists a steady, observing presence that is not disturbed by thoughts, emotions, or circumstances. In The Untethered Soul, he describes freedom as learning to rest as the awareness that witnesses experience, rather than identifying with what passes through it.\n\nWhen attention settles into this observing presence, clarity and inner guidance arise naturally, without effort or control.',
    spiritual_source = 'Singer, M. A. (2007). The Untethered Soul. New Harbinger.'
WHERE id = 'the-knowing-without-words';

-- 5. The Quiet Yes
UPDATE public.guided_shifts
SET
    intro = 'Not all yeses arrive with confidence or excitement. Some arrive quietly, without urgency or explanation.',
    description = 'The Quiet Yes helps the nervous system recognize subtle alignment. It is not about decision-making or commitment. It is about sensing the moment when something inside gently agrees, even if the mind is still unsure. This meditation trains recognition over persuasion.',
    approach = NULL,
    use_when = '["When clarity feels subtle rather than decisive", "When logic and intuition feel out of sync", "When you sense alignment but can''t explain why", "When you''re waiting for certainty that never comes", "When you want to trust what feels right without forcing it"]'::jsonb,
    field_integration_prompt = E'I just completed The Quiet Yes. Please help me process and integrate this experience by:\n\n1. Helping me recognize how alignment feels in my body.\n2. Identifying differences between pressure and quiet agreement.\n3. Exploring where I tend to wait for certainty instead of recognition.\n4. Supporting me in trusting subtle clarity.\n\nAsk me clarifying questions and help me integrate this experience.\n\n_Real-Life Integration: When a decision feels heavy, listen for what feels quietly steady._',
    science_text = 'Subtle alignment is often registered through interoceptive signals before conscious reasoning engages. Research on decision-making shows that bodily cues frequently precede verbal certainty and guide accurate choices. Recognizing these signals improves confidence and reduces decision fatigue.',
    science_source = 'Bechara, A. et al. (1997). Somatic marker hypothesis. Science. / Damasio, A. (1994). Descartes'' Error. Putnam.',
    spiritual_text = E'Michael A. Singer teaches that inner guidance does not shout. In The Untethered Soul, he describes alignment as a natural easing that occurs when resistance drops away.\n\nWhen attention rests in openness rather than control, the quiet yes emerges on its own, without needing justification.',
    spiritual_source = 'Singer, M. A. (2007). The Untethered Soul. New Harbinger.'
WHERE id = 'the-quiet-yes';
