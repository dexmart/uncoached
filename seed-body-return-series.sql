-- ============================================
-- Body Return Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Hands-as-Home
UPDATE public.guided_shifts
SET
    intro = 'Hands as Home is a grounding meditation that uses the warmth and weight of your own hands to signal safety to the nervous system. Touch is one of the most direct ways to shift out of thought and into presence.',
    description = 'This practice helps your system remember that you are here, in your body, and not alone inside your mind.',
    approach = NULL,
    use_when = '["You feel disconnected or floaty", "Your mind is racing", "You need a fast path back into the body", "You feel overwhelmed and need steadiness"]'::jsonb,
    field_integration_prompt = E'I just finished the Hands as Home meditation. Help me understand what shifted by exploring these three things:\n\n1. What I felt when my hands made contact with my chest or abdomen.\n2. How my breath or emotional state changed as I stayed with the sensation.\n3. How I can use this grounding gesture later today in a real moment.\n\nAsk me gentle clarifying questions so I can turn this physical experience into a clear insight I can apply.\n\n_Real-Life Integration: Later today, place one hand on your chest or stomach for a single breath and let that moment bring you back to yourself._',
    science_text = E'Placing the hands on the body activates interoceptive networks in the insula and anterior cingulate cortex, regions involved in emotional regulation and safety. Warmth and steady pressure stimulate mechanoreceptors that signal the nervous system to lower sympathetic arousal and increase parasympathetic tone, which slows heart rate and relaxes muscles.\n\nThis self-contact also increases oxytocin release, which enhances feelings of grounding, comfort, and embodied presence. Even light touch can shift the body out of vigilance and into a regulated state by reminding the system that it is safe.',
    science_source = 'Coan, J. A. et al. (2006). Lending a Hand: Social Regulation of the Neural Response to Threat. Psychological Science. / McGlone, F. et al. (2014). The Role of C Tactile Afferents in Affective Touch. Neuron.',
    spiritual_text = E'Mary Oliver often wrote that the body is a place of devotion, a quiet doorway back to presence. Her poems remind us that the simplest contact can awaken steadiness, and that returning to our own physicality is an act of belonging.\n\nThis meditation reflects that spirit. The hands become a sanctuary, a soft reminder that you carry your own grounding wherever you go. In her view, the body is not a problem to solve but a place to come home to. Your hands, resting on yourself with honesty and warmth, become a small prayer of return.',
    spiritual_source = 'Oliver, M. (1992). New and Selected Poems. Beacon Press.'
WHERE id = 'hands-as-home';

-- 2. The Spine Scan
UPDATE public.guided_shifts
SET
    intro = 'The spine is one of the most reliable pathways back into the body. It carries both physical sensation and emotional history. When attention moves along this central column, the mind slows down, the body reorganizes, and internal presence increases.',
    description = 'The Spine Scan is not about fixing posture. It is about sensing the spine as the structure that holds you, supports you, and brings you back into alignment with yourself.',
    approach = NULL,
    use_when = '["You feel disconnected from your body", "You need grounding and structure", "Your thoughts feel scattered", "You want to return to steady presence"]'::jsonb,
    field_integration_prompt = E'I just finished the Spine Scan meditation. Help me clarify what shifted by exploring these three things:\n\n1. What I noticed in different parts of my spine as my awareness moved downward.\n2. How my emotional or mental state changed as I connected with this central column.\n3. How this sense of internal support can guide my next actions or choices today.\n\nAsk gentle clarifying questions so I can turn this awareness into a meaningful insight I can use.\n\n_Real-Life Integration: Later today, pause once and sense the full length of your spine for a single breath._',
    science_text = E'Scanning the spine activates interoceptive awareness in the insula and somatosensory cortex, which helps regulate the stress response by shifting the system out of cognitive overdrive and into embodied presence.\n\nSlow attention along the spine also reduces activity in the amygdala and increases parasympathetic tone, improving relaxation and lowering muscular tension. Research on somatic tracking shows that noticing sensation without trying to fix it helps reduce pain signalling and decreases defensive bracing patterns in the lower back.',
    science_source = 'Farb, N. et al. (2013). Interoception, Contemplative Practice, and Health. Frontiers in Psychology. / Schweinhardt, P. et al. (2006). Anatomy of the Emotional Pain System. NeuroImage.',
    spiritual_text = E'Mooji often teaches that awareness can move through the body like a soft light, revealing the stillness that has always been present. He suggests that when we bring gentle attention down the spine, we reconnect with the quiet centre beneath our thoughts.\n\nThis meditation echoes that guidance. The downward glide of awareness softens the places that have been gripping. The upward breath restores inner steadiness. The spine becomes more than structure. It becomes a column of presence, a reminder that you are held from within.',
    spiritual_source = 'Mooji. Vaster Than Sky, Greater Than Space. 2016.'
WHERE id = 'the-spine-scan';

-- 3. The Rib Cage Expansion
UPDATE public.guided_shifts
SET
    intro = 'The rib cage often tightens during stress, anxiety, overwhelm, or long periods of overthinking. When the ribs contract, the breath becomes shallow and the nervous system interprets this as a sign of threat.',
    description = 'Gentle rib expansion naturally increases breath volume and restores the feeling of internal space.',
    approach = NULL,
    use_when = '["Your breath feels tight or high in the chest", "You feel emotionally compressed", "You experience tension around the ribs or sternum", "You want a quick pathway to openness and steadiness"]'::jsonb,
    field_integration_prompt = E'I just finished the Rib Cage Expansion meditation. Help me unpack what shifted by exploring these three things:\n\n1. What I noticed in the sides, front, or back of my rib cage as it expanded.\n2. How this new sense of space affected my breath or internal state.\n3. How I might return to this spacious feeling during a stressful moment later today.\n\nAsk gentle clarifying questions so I can turn this somatic shift into a practical insight.\n\n_Real-Life Integration: Later today, take one breath with a quiet widening of your ribs. Let the space support you._',
    science_text = E'Lateral and posterior rib expansion activates the diaphragm more fully and increases lung compliance, improving oxygen exchange while reducing tension in the scalenes and upper chest.\n\nThis kind of three-dimensional breathing also stimulates the parasympathetic nervous system through vagal pathways in the thoracic cavity, lowering heart rate and reducing overall sympathetic drive. Rib cage mobility is linked to reduced anxiety and lower perceived stress because improved intercostal movement decreases breath restriction signals sent to the brain.',
    science_source = 'Courtney, R. (2019). The Functions of Breathing and Its Dysfunctions. International Journal of Osteopathic Medicine. / Jerath, R. et al. (2006). Physiology of Long Pranayamic Breathing. Medical Hypotheses.',
    spiritual_text = E'Pema Chödrön teaches that spaciousness begins with softening the protective shell around the heart and ribs. She often describes breath as a way of "creating room for life as it is," rather than resisting what we feel.\n\nThis meditation echoes that wisdom. As the ribs widen and soften, the body remembers that it does not need to brace against the world. A little more space in the rib cage becomes a little more space in the mind. Breath becomes a gentle act of opening to yourself with compassion.',
    spiritual_source = 'Chödrön, P. (1991). The Wisdom of No Escape. Shambhala.'
WHERE id = 'the-rib-cage-expansion';

-- 4. Feet-in-the-Now (renamed to "Feet as Your Compass")
UPDATE public.guided_shifts
SET
    title = 'Feet as Your Compass',
    intro = 'Feet carry instinct. Even when the mind feels scattered or uncertain, the body often knows which direction it wants to move in next. This meditation teaches you to pay attention to micro-sensations in the feet as a way of rediscovering inner orientation.',
    description = 'Feet as Your Compass is not about grounding. It is about direction. It helps you sense where your energy naturally wants to shift, how your body cues clarity, and what it feels like to stand in alignment.',
    approach = NULL,
    use_when = '["You feel unsure what to do next", "You feel disconnected from your own instincts", "Your mind is looping but your body feels quiet", "You need a simple way to find your internal direction"]'::jsonb,
    field_integration_prompt = E'I just finished the Feet as Your Compass meditation. Help me understand what shifted by exploring these three things:\n\n1. What I noticed about the weight, energy, or subtle direction in my feet.\n2. How this sense of orientation affected my clarity or emotional state.\n3. How I can use this internal compass later today when I feel unsure or pulled in different directions.\n\nAsk me clarifying questions so I can translate this body sense into a usable insight.\n\n_Real-Life Integration: Later today, pause and feel which foot feels more ready to move. Let that sensation guide your next small step._',
    science_text = E'The soles of the feet contain a high density of mechanoreceptors that send continuous feedback to the brain about pressure, balance, and orientation. This sensory information is processed by the cerebellum, insula, and parietal cortex, which collectively regulate posture, interoception, and emotional stability.\n\nPaying attention to foot sensation increases parasympathetic activity and stabilizes proprioceptive networks, improving both calm and clarity. Research shows that grounding attention into the feet reduces rumination by shifting neural activity away from the default mode network and into somatosensory pathways associated with presence and decision making.',
    science_source = 'McGlone, F. et al. (2019). Discriminative and Affective Touch: Sensing and Feeling. Neuron. / Herwig, U. et al. (2010). Neural mechanisms of interoceptive awareness. Biological Psychology.',
    spiritual_text = E'Michael Singer teaches that the body often reveals truth before the mind has words for it. He describes subtle inner signals as invitations from the deeper self, guiding you toward alignment with less resistance and more clarity.\n\nThis meditation reflects that understanding. The quiet pull toward one foot, the lightness in the toes, the groundedness in the arches — these are not random sensations. They are the body''s way of orienting you toward what feels true. Singer teaches that when you stop fighting for certainty and start listening to the smallest signals inside you, life becomes clearer and more fluid. Your feet become more than support. They become direction.',
    spiritual_source = 'Singer, M. (2007). The Untethered Soul. New Harbinger.'
WHERE id = 'feet-in-the-now';

-- 5. The Breathprint Check
UPDATE public.guided_shifts
SET
    intro = 'Your breath leaves clues about the state of your nervous system. Its pace, shape, depth, and rhythm form a kind of internal fingerprint. This meditation teaches you to check your "breathprint" as a way of understanding how you feel without analysis or judgment.',
    description = 'This practice does not change the breath. It listens to it. The breathprint becomes a mirror that shows what is happening inside.',
    approach = NULL,
    use_when = '["You cannot tell what you are feeling", "You sense something is off but cannot name it", "Your breath feels irregular, shallow, or tight", "You want a quick snapshot of your internal state"]'::jsonb,
    field_integration_prompt = E'I just finished the Breathprint Check meditation. Help me clarify what I learned by exploring these three things:\n\n1. What I noticed about the rhythm, shape, or texture of my breath.\n2. What this breath pattern suggests about my emotional or physiological state.\n3. How I can use this awareness to support myself in a moment later today.\n\nAsk me gentle clarifying questions so I can translate this breath information into meaningful insight.\n\n_Real-Life Integration: Later today, pause once and notice the first inhale you take. Let it tell you something about where you are internally._',
    science_text = E'Breathing patterns reflect autonomic nervous system activity in real time. Variations in rhythm, depth, and pauses correspond directly to sympathetic or parasympathetic dominance.\n\nObserving the breath without attempting to change it increases interoceptive awareness through activation of the insula and anterior cingulate cortex. This kind of neutral observation reduces reactivity and improves emotional regulation by interrupting habitual effort to control internal states.',
    science_source = 'Critchley, H. D. et al. (2004). Neural systems supporting interoceptive awareness. Nature Neuroscience. / Farb, N. et al. (2015). Interoception, contemplative practice, and health. Frontiers in Psychology.',
    spiritual_text = E'Jiddu Krishnamurti taught that truth appears when observation is free of correction. He emphasized that awareness without judgement allows reality to reveal itself fully.\n\nThis meditation follows that principle. By observing the breath without altering it, you step out of control and into understanding. The breath becomes a mirror rather than a tool. In Krishnamurti''s view, insight arises not from effort, but from seeing clearly what is. Your breathprint is that clarity, moment by moment.',
    spiritual_source = 'Krishnamurti, J. (1969). Freedom from the Known. Harper & Row.'
WHERE id = 'the-breathprint-check';
