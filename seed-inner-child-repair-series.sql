-- ============================================
-- Inner Child Repair Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. The Safe Lap Moment
UPDATE public.guided_shifts
SET
    intro = 'Repair does not require revisiting the past. It requires presence in the present.',
    description = 'The Safe Lap Moment creates a felt sense of being held, supported, and stayed with during moments of vulnerability. It offers the nervous system an experience of safety that may not have been consistently available earlier, without asking the mind to remember or relive anything. This is not regression. It is re-patterning.',
    approach = NULL,
    use_when = '["You feel emotionally young, tender, or easily overwhelmed", "Reassurance feels needed but unavailable externally", "You notice self-criticism where comfort would help", "Fear or sadness arises without a clear adult context", "You want to offer care without analysis"]'::jsonb,
    field_integration_prompt = E'I just completed The Safe Lap Moment meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my body responded to the sense of being held.\n2. Identifying situations where I crave reassurance or containment.\n3. Exploring how I can offer myself this kind of support without needing external validation.\n4. Helping me recognize when inner repair is needed instead of problem-solving.\n\nAsk me clarifying questions and help me integrate self-soothing through presence.\n\n_Real-Life Integration: When you feel emotionally small or unsteady, pause and ask: "How can I support and soothe myself right now?" Offer support before explanation._',
    science_text = 'From a neuroscience and attachment perspective, this practice supports what is known as co-regulation. Early in life, a child''s nervous system relies on a safe other to regulate stress and emotion. When that experience is inconsistent or missing, the nervous system often learns to stay hypervigilant or self-contained. Research in attachment theory and affective neuroscience shows that imagined relational safety can activate many of the same neural pathways as real, present-moment support. Gentle self-touch combined with imagery of safety helps engage the parasympathetic nervous system, particularly through vagal pathways, signalling to the body that threat has passed. Over time, repeated experiences of internal safety can reduce baseline stress responses and increase emotional resilience.',
    science_source = 'Schore, A. N. (2012). The Science of the Art of Psychotherapy. W. W. Norton & Company.',
    spiritual_text = E'John Bradshaw taught that the inner child carries unmet needs for safety, attunement, and belonging. In his work, healing begins when the adult self learns to show up as a stable, compassionate presence rather than abandoning the vulnerable parts within.\n\nRepair does not come from reliving the past or assigning blame, but from creating new experiences of safety in the present. When the inner child is met consistently with care, the nervous system begins to trust that protection is no longer a solo task. Integration happens as the adult self becomes a reliable place to rest.',
    spiritual_source = 'Bradshaw, J. (1990). Homecoming: Reclaiming and Championing Your Inner Child. Bantam Books.'
WHERE id = 'the-safe-lap-moment';

-- 2. The Hand Squeeze
UPDATE public.guided_shifts
SET
    intro = 'Repair often begins with contact.',
    description = 'The Hand Squeeze creates a clear, physical signal of reassurance and continuity. It teaches the nervous system what it feels like to be met consistently, without words, promises, or explanations. This is not comfort through distraction. It is reassurance through presence.',
    approach = NULL,
    use_when = '["You feel anxious, shaky, or unsure", "Reassurance feels needed but unavailable externally", "You notice a pull toward seeking validation", "Fear shows up as restlessness or urgency", "You want grounding without analysis"]'::jsonb,
    field_integration_prompt = E'I just completed The Hand Squeeze meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how consistent physical contact affected my nervous system.\n2. Identifying moments when reassurance feels urgent or externally focused.\n3. Exploring how repetition and predictability support my sense of safety.\n4. Helping me use simple physical signals to ground myself during stress.\n\nAsk me clarifying questions and help me integrate embodied reassurance into daily life.\n\n_Real-Life Integration: When anxiety spikes, place one hand around the other and squeeze gently. Let consistency speak before words._',
    science_text = 'Gentle pressure and self-touch activate the body''s calming systems. Research in somatic psychology and neuroscience shows that steady, non-threatening touch stimulates mechanoreceptors in the skin, sending signals of safety to the brain. This input helps reduce amygdala activation and supports parasympathetic nervous system response through vagal pathways. Even simple bilateral touch, such as holding one hand with the other, can lower stress hormones and increase a sense of containment. The nervous system reads this pressure as reassurance, helping interrupt threat responses without suppression or dissociation.',
    science_source = 'Porges, S. W. (2011). The Polyvagal Theory. W. W. Norton & Company.',
    spiritual_text = E'Ram Dass taught that learning to offer ourselves presence is a form of remembering. When attention meets the body with kindness, the heart recognizes itself as both the one who comforts and the one being comforted.\n\nThe hand squeeze becomes a quiet act of devotion, a simple way of saying "I am here" without words. In this presence, separation softens. What once felt alone is held within awareness, and presence itself becomes the refuge.',
    spiritual_source = 'Dass, R. (1978). The Only Dance There Is. Anchor Books.'
WHERE id = 'the-hand-squeeze';

-- 3. The "I'm Not Leaving" Breath
UPDATE public.guided_shifts
SET
    intro = 'One of the deepest wounds the nervous system carries is not fear itself. It is the expectation of abandonment during fear.',
    description = 'The "I''m Not Leaving" Breath is not about changing how you breathe. It is about pairing breath with continuity and presence, teaching the system that distress does not mean disappearance. This meditation offers a direct repair experience: staying.',
    approach = NULL,
    use_when = '["Fear escalates quickly", "Reassurance feels fragile or short-lived", "Self-soothing feels inconsistent", "Anxiety includes a sense of being alone with it", "You want to practice staying rather than fixing"]'::jsonb,
    field_integration_prompt = E'I just completed The "I''m Not Leaving" Breath meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my system responded to staying present during discomfort.\n2. Identifying situations where fear is paired with a sense of being alone.\n3. Exploring how continuity of attention affects my emotional regulation.\n4. Helping me practice staying with myself during moments of activation.\n\nAsk me clarifying questions and help me integrate presence without abandonment.\n\n_Real-Life Integration: When discomfort arises, quietly say: "I''m here. I''m not leaving." Stay before solving._',
    science_text = 'Fear responses intensify when the nervous system anticipates abandonment or lack of support. Research in attachment and affect regulation shows that consistent internal presence reduces amygdala reactivity and supports emotional regulation. Pairing awareness with continuity teaches the nervous system that distress does not require withdrawal, interrupting panic and avoidance patterns.',
    science_source = 'Siegel, D. (2012). The Developing Mind. Guilford Press. / Mikulincer, M. and Shaver, P. (2007). Attachment in Adulthood. Guilford Press.',
    spiritual_text = E'Julian of Norwich taught that at the deepest level of experience, we are held continuously by a love that does not withdraw. In her revelations, suffering did not mean abandonment, but a misunderstanding of how close support already was.\n\nShe emphasized that fear arises when we believe we have been left to endure alone. When presence remains steady through distress, the illusion of separation begins to soften. The breath becomes a reminder of this unbroken holding. Even in pain, even in uncertainty, there is no moment where we are not accompanied.',
    spiritual_source = 'Julian of Norwich. (c. 1373). Revelations of Divine Love.'
WHERE id = 'the-im-not-leaving-breath';

-- 4. The Warm Blanket
UPDATE public.guided_shifts
SET
    intro = 'Safety is often communicated through warmth, containment, and softness. Not through words.',
    description = 'The Warm Blanket meditation creates a felt sense of being covered, protected, and insulated from overwhelm. It offers the nervous system an experience of gentle containment, especially useful when vulnerability feels exposed or unsupported. This is not imagining comfort. It is allowing the body to receive it.',
    approach = NULL,
    use_when = '["You feel emotionally exposed or raw", "Vulnerability feels unsafe", "Your system feels thin-skinned or overstimulated", "You want comfort without explanation", "Reassurance needs to be physical, not verbal"]'::jsonb,
    field_integration_prompt = E'I just completed The Warm Blanket meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how warmth and containment affected my sense of safety.\n2. Identifying moments when I resist comfort or protection.\n3. Exploring what kinds of support my nervous system responds to most.\n4. Helping me practice receiving comfort without self-judgment.\n\nAsk me clarifying questions and help me integrate physical safety into daily life.\n\n_Real-Life Integration: When you feel exposed, imagine wrapping yourself in warmth. Protection can be internal._',
    science_text = 'Research in affective neuroscience shows that warmth is closely associated with feelings of safety and social connection. Physical warmth activates the parasympathetic nervous system and can reduce stress responses by signalling protection and containment. Studies suggest that imagined warmth can engage similar neural pathways as physical warmth, helping lower cortisol levels and ease emotional distress. This is especially relevant for individuals with attachment wounds, where comfort was inconsistent.',
    science_source = 'Coan, J. A., & Sbarra, D. A. (2015). Social Baseline Theory: The Social Regulation of Risk and Effort. Current Opinion in Psychology.',
    spiritual_text = E'Sharon Salzberg teaches that loving-kindness begins not as an idea, but as a felt sense of warmth and care in the body. In her work, healing happens when the nervous system experiences gentleness without demand.\n\nWarmth becomes a language of safety, communicating care before the mind needs to understand it. When we allow ourselves to receive this kind of softness, even symbolically, the body learns that comfort does not have to be earned or brief. Being held in warmth repairs the belief that closeness is unreliable.',
    spiritual_source = 'Salzberg, S. (1995). Lovingkindness: The Revolutionary Art of Happiness. Shambhala Publications.'
WHERE id = 'the-warm-blanket';

-- 5. The Fear Unhook
UPDATE public.guided_shifts
SET
    intro = 'Fear becomes overwhelming when it fuses with identity. "I am afraid" quietly turns into "I am unsafe," "I am small," "I cannot handle this."',
    description = 'The Fear Unhook teaches the nervous system that fear can be present without being in charge. It creates a small but powerful separation between sensation and self, allowing repair without suppression. This is not fear removal. It is fear relocation.',
    approach = NULL,
    use_when = '["Fear feels consuming or personal", "Anxiety defines how you see yourself", "You feel hijacked by emotional responses", "Reassurance does not stick", "You want to stay present without collapsing"]'::jsonb,
    field_integration_prompt = E'I just completed The Fear Unhook meditation. Please help me process and integrate this experience by:\n\n1. Helping me describe how fear felt before and after unhooking it from my identity.\n2. Identifying situations where fear tends to fuse with my sense of self.\n3. Exploring how I can relate to fear without letting it take control.\n4. Helping me practice staying present while fear exists nearby.\n\nAsk me clarifying questions and help me integrate fear without identification.\n\n_Real-Life Integration: When fear appears, pause and say: "This is fear. I am still here." Let fear accompany, not lead._',
    science_text = 'Fear responses originate in subcortical brain regions that activate faster than conscious thought. When fear becomes associated with identity, it increases emotional reactivity and reduces regulatory capacity. Research shows that creating cognitive and somatic distance from fear sensations reduces amygdala activation and restores prefrontal engagement, allowing fear to be experienced without overwhelm.',
    science_source = 'LeDoux, J. (2015). Anxious: Using the Brain to Understand and Treat Fear. Viking. / Hölzel, B. et al. (2011). Mindfulness practice leads to increases in regional brain gray matter density. Psychiatry Research.',
    spiritual_text = E'Pema Chödrön teaches that fear loses its grip when we stop treating it as an authority. In her work, liberation comes not from eliminating fear, but from refusing to follow it blindly.\n\nWhen fear is met with steady awareness rather than obedience, it begins to loosen. This practice reflects her teaching that fear is energy without instruction until we give it one. By staying present without acting, we learn that fear can arise and pass without defining who we are or what we must do. Freedom begins when fear is allowed, but not obeyed.',
    spiritual_source = 'Chödrön, P. (2001). The Places That Scare You. Shambhala Publications.'
WHERE id = 'the-fear-unhook';
