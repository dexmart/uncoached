-- ============================================
-- Between-Sessions Therapy Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Post-Session Land
UPDATE public.guided_shifts
SET
    intro = 'Therapy sessions often open deep internal territory. Insight moves faster than the nervous system can integrate.',
    description = 'The Post-Session Land helps the body absorb what was touched, without analysing or revisiting content. It stabilizes the system after emotional exposure, allowing insight to settle rather than spill into overwhelm. This is not processing. It is landing.',
    approach = NULL,
    use_when = '["Immediately after a therapy session", "When you feel open, tender, or uncontained afterward", "When insight feels sharp but the body feels unsteady", "When emotions linger without words", "Before returning to daily life"]'::jsonb,
    field_integration_prompt = E'I just completed The Post-Session Land meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body felt immediately after my session and after landing.\n2. Identifying where I tend to feel most open or vulnerable post-session.\n3. Supporting me in integrating insight without overthinking it.\n4. Helping me transition back into daily life with steadiness.\n\nAsk me clarifying questions and help me integrate therapy work gently.\n\n_Real-Life Integration: After therapy, pause before moving on. Let your body land before you re-enter your day._',
    science_text = 'Therapeutic sessions activate emotional memory and self-referential processing, which can leave the nervous system temporarily heightened. Research shows that post-session grounding and integration practices reduce emotional flooding, support memory consolidation, and help insights integrate into embodied awareness rather than remaining cognitively isolated.',
    science_source = 'Siegel, D. (2012). The Developing Mind. Guilford Press. / Lane, R. et al. (2015). Memory reconsolidation in psychotherapy. Behavioural and Brain Sciences.',
    spiritual_text = E'In contemplative traditions, integration is considered as important as revelation. The Zen teacher Dogen emphasized that insight must be embodied through stillness and return, not chased or amplified.\n\nWhen experience is allowed to settle, understanding deepens naturally without effort.',
    spiritual_source = 'Dogen. Shobogenzo, translated by Kazuaki Tanahashi.'
WHERE id = 'the-post-session-land';

-- 2. The Pre-Session Ground
UPDATE public.guided_shifts
SET
    intro = 'Before a therapy session, the mind often rushes ahead — what to say, what to remember, what to work on.',
    description = 'The Pre-Session Ground helps the body arrive first, so the session begins from regulation rather than urgency. It creates enough internal stability for truth to surface naturally, without forcing insight or performance. This is not preparation through planning. It is preparation through presence.',
    approach = NULL,
    use_when = '["Just before a therapy session", "When you feel anxious or scattered beforehand", "When you want to be honest without overthinking", "When you fear forgetting something important", "When you want to enter grounded, not guarded"]'::jsonb,
    field_integration_prompt = E'I just completed The Pre-Session Ground meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body felt before and after grounding.\n2. Identifying patterns of anxiety or pressure before therapy sessions.\n3. Supporting me in trusting presence over preparation.\n4. Helping me enter sessions with honesty rather than performance.\n\nAsk me clarifying questions and help me integrate grounded readiness.\n\n_Real-Life Integration: Before therapy, pause and remind yourself: "I don''t need to know yet." Let the session meet you where you are._',
    science_text = 'Anticipatory anxiety activates threat-based neural pathways that reduce access to emotional insight. Research shows that grounding practices before emotionally focused conversations increase nervous system regulation, improve recall accuracy, and enhance therapeutic engagement by restoring prefrontal functioning.',
    science_source = 'Siegel, D. (2012). The Developing Mind. Guilford Press. / Arnsten, A. (2009). Stress signalling pathways. Nature Reviews Neuroscience.',
    spiritual_text = E'In contemplative practice, arrival is valued over readiness. Zen teachings emphasize showing up without expectation, allowing what is true to arise on its own.\n\nWhen effort drops away, clarity becomes available through presence rather than control.',
    spiritual_source = 'Suzuki, S. (1970). Zen Mind, Beginner''s Mind. Weatherhill.'
WHERE id = 'the-pre-session-ground';

-- 3. The Emotional Spill
UPDATE public.guided_shifts
SET
    intro = 'Therapy can loosen emotion faster than life can absorb it.',
    description = 'The Emotional Spill creates a safe, intentional window for feelings that surface after a session, so they do not leak into work, relationships, or self-judgment. It gives emotion permission to move without turning into rumination or overwhelm. This is not catharsis. It is containment with release.',
    approach = NULL,
    use_when = '["When emotions spill after therapy", "When tears or irritability appear without warning", "When feelings feel too big to carry quietly", "When you want release without losing steadiness", "When emotion needs space, not interpretation"]'::jsonb,
    field_integration_prompt = E'I just completed The Emotional Spill meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how emotion moved when it was contained rather than suppressed.\n2. Identifying patterns where emotion spills into daily life unintentionally.\n3. Exploring how I can create safe windows for emotional release.\n4. Helping me distinguish between emotional expression and emotional flooding.\n\nAsk me clarifying questions and help me integrate emotional release with stability.\n\n_Real-Life Integration: When emotion rises unexpectedly, ask: "Does this need a container before it needs expression." Choose timing consciously._',
    science_text = 'Emotions that are activated without containment can overwhelm cognitive regulation systems, leading to emotional flooding. Research shows that structured emotional expression within safe boundaries reduces physiological arousal and improves emotional recovery. Containment allows emotional processing without dysregulation.',
    science_source = 'Greenberg, L. (2011). Emotion-Focused Therapy. APA. / Gross, J. (2015). Emotion regulation. Handbook of Emotion Regulation.',
    spiritual_text = E'In many contemplative traditions, emotion is respected as energy that needs a place to move. Sufi teachings describe the heart as a vessel that must be strong enough to hold feeling without breaking open.\n\nWhen emotion is given form and boundary, it refines rather than overwhelms.',
    spiritual_source = 'Helminski, C. (2000). The Knowing Heart. Shambhala.'
WHERE id = 'the-emotional-spill';

-- 4. The Integration Pause (title updated from "The Integration")
UPDATE public.guided_shifts
SET
    title = 'The Integration Pause',
    intro = 'After insight, the system needs time to reorganize.',
    description = 'This meditation supports integration by giving the body and mind a shared moment of quiet coherence. Nothing is sorted manually. Nothing is revisited. The pause itself becomes the organizing force. Integration is a background process, not a task.',
    approach = NULL,
    use_when = '["When your system feels active after therapy", "When insight feels present but unsettled", "When you sense things rearranging internally", "When you want to let understanding land naturally", "When doing less is the most skillful choice"]'::jsonb,
    field_integration_prompt = E'I just completed The Integration Pause meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice what feels more settled or coherent now.\n2. Identifying where I tend to overthink instead of allowing integration.\n3. Supporting me in trusting that insight does not need constant attention.\n4. Helping me recognize when pause is more useful than reflection.\n\nAsk me clarifying questions and help me integrate therapy work gently over time.\n\n_Real-Life Integration: When thoughts loop after therapy, pause and ask: "Can I let this settle without touching it." Integration happens in stillness._',
    science_text = 'Memory consolidation and emotional integration occur during periods of rest and reduced cognitive engagement. Research shows that pausing after emotionally salient experiences allows neural networks to reorganize and stabilize insight. Over-engagement can interrupt this process, while stillness supports coherence and learning.',
    science_source = 'Stickgold, R. (2005). Sleep-dependent memory consolidation. Nature. / Lane, R. et al. (2015). Memory reconsolidation in psychotherapy. Behavioural and Brain Sciences.',
    spiritual_text = E'In contemplative traditions, wisdom is said to ripen in silence. Taoist philosophy teaches that when action stops, understanding completes itself.\n\nStillness allows life to arrange what effort cannot. Integration arises not from grasping insight, but from allowing it to settle.',
    spiritual_source = 'Lao Tzu. Tao Te Ching, translated by Stephen Mitchell.'
WHERE id = 'the-integration';

-- 5. The Softened Edges
UPDATE public.guided_shifts
SET
    intro = 'After therapy, the inner world can feel exposed. Emotions are closer to the surface. Perception feels sharper. Boundaries feel thinner.',
    description = 'The Softened Edges meditation helps the nervous system regain a sense of permeability that feels safe. It restores gentle buffering between inner experience and the outer world, allowing sensitivity without overwhelm. This meditation does not dull awareness. It rounds it.',
    approach = NULL,
    use_when = '["After therapy when you feel tender or porous", "When the world feels too close", "When emotions linger near the surface", "When you want to re-enter life gently", "When sensitivity needs support rather than analysis"]'::jsonb,
    field_integration_prompt = E'I just completed The Softened Edges meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my sensitivity feels when my edges are supported.\n2. Identifying situations where my boundaries feel thin or reactive.\n3. Exploring how I can maintain gentleness without withdrawing.\n4. Helping me re-enter daily life after therapy with steadiness and care.\n\nAsk me clarifying questions and help me integrate supported sensitivity.\n\n_Real-Life Integration: After therapy, move slowly back into your day. Let your sensitivity arrive with protection, not pressure._',
    science_text = 'Heightened emotional awareness can temporarily reduce perceived boundaries between internal experience and external stimuli. Research shows that practices which support somatic containment improve emotional regulation and reduce sensory overload. Softening muscular and perceptual boundaries helps the nervous system recalibrate without suppressing sensitivity.',
    science_source = 'Ogden, P. et al. (2006). Trauma and the Body. Norton. / Schore, A. (2012). The Science of the Art of Psychotherapy. Norton.',
    spiritual_text = E'In contemplative psychology, maturity is described as the ability to remain open without being unprotected. Buddhist teachings speak of equanimity as a soft strength that allows contact without reactivity.\n\nWhen the edges of experience are rounded, awareness stays present while the heart remains safe.',
    spiritual_source = 'Goldstein, J. (2002). One Dharma. HarperCollins.'
WHERE id = 'the-softened-edges';
