-- ============================================
-- Energy Recalibration Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Residual Energy Release
UPDATE public.guided_shifts
SET
    intro = 'Residual energy is what remains after an experience has ended but the body has not fully let go — a conversation, a demand, an emotional moment, a role you were in for too long.',
    description = 'This meditation helps the system discharge what no longer belongs to the present moment, without reliving or analyzing the source. It restores internal neutrality and clears the baseline.',
    approach = NULL,
    use_when = '["After emotionally charged interactions", "When you feel off without knowing why", "When a moment has passed but still feels present", "When your body feels crowded or unsettled", "When you want to reset without revisiting the story"]'::jsonb,
    field_integration_prompt = E'I just completed Residual Energy Release. Please help me process and integrate this experience by:\n\n1. Helping me identify what I was still carrying that didn''t belong to now.\n2. Noticing how my body signals when something is ready to release.\n3. Exploring how to reset my internal baseline after experiences.\n4. Supporting me in maintaining energetic neutrality throughout the day.\n\nAsk me clarifying questions and help me integrate this release.\n\n_Real-Life Integration: When something feels over but still present, pause and ask: "Does this belong to now?"_',
    science_text = 'Emotional residue is associated with prolonged activation of stress and memory networks after an event has ended. Research shows that allowing the body to register completion helps downregulate lingering arousal and restores baseline nervous system functioning. Release without reactivation supports emotional regulation and recovery.',
    science_source = 'Porges, S. (2011). Polyvagal Theory. Norton. / Van der Kolk, B. (2014). The Body Keeps the Score. Viking.',
    spiritual_text = E'Ram Dass taught that much of suffering comes from identifying with what is passing through us rather than resting in the awareness that witnesses it. In his teachings, freedom begins when we recognize that sensations, emotions, and energies can be experienced without becoming who we are.\n\nBy gently separating awareness from what is being carried, the system naturally releases what no longer belongs. The letting go is not forced. It happens as identification loosens.',
    spiritual_source = 'Dass, R. (1971). Be Here Now. Crown Publishing.'
WHERE id = 'residual-energy-release';

-- 2. Call Back Your Energy
UPDATE public.guided_shifts
SET
    intro = 'After energy has been released, there is often an empty or neutral space. This space is not a problem. It is an opportunity.',
    description = 'The Embodied Reclaim is about consciously calling your own energy back into yourself after it has been scattered, given away, or pulled outward through responsibility, caretaking, performance, or prolonged attention to others. This is not about protection or withdrawal. It is about ownership.',
    approach = NULL,
    use_when = '["You feel depleted or spread thin", "You notice parts of yourself left behind in conversations or roles", "Your energy feels externalized or diffuse", "You want to return fully to yourself", "You feel present but not fully inhabited"]'::jsonb,
    field_integration_prompt = E'I just completed Call Back My Energy meditation. Please help me process and integrate this experience by:\n\n1. Helping me identify where my energy tends to become scattered or externalized.\n2. Exploring what roles, interactions, or expectations draw me out of myself most often.\n3. Noticing how my body felt before and after reclaiming my energy.\n4. Helping me develop awareness of when I need to consciously call myself back.\n\nAsk me clarifying questions and help me integrate embodied ownership into daily life.\n\n_Real-Life Integration: After giving time, attention, or emotional energy, pause and ask: "Am I fully here, or did I leave something behind." Invite yourself back._',
    science_text = 'Sustained outward attention, especially in caregiving or high-responsibility roles, is associated with cognitive and emotional fatigue. Research shows that consciously redirecting attention inward restores self-referential processing and improves emotional regulation. Reclaiming attentional resources helps reduce burnout, increases vitality, and supports a stable sense of self.',
    science_source = 'Kaplan, S. and Kaplan, R. (1989). The Experience of Nature. Cambridge University Press. / Maslach, C. et al. (2001). Job Burnout. Annual Review of Psychology.',
    spiritual_text = E'In yogic philosophy, particularly within the teachings of Patanjali, there is an emphasis on pratyahara — the withdrawal of energy from external objects back toward the self. This practice is not avoidance, but restoration. Patanjali taught that when attention is reclaimed from what pulls it outward, the practitioner returns to inner steadiness and clarity.\n\nBy consciously reclaiming your energy, you restore sovereignty over where your life force resides, allowing presence to return without strain.',
    spiritual_source = 'Patanjali. The Yoga Sutras, Book II, Sutra 54, translations by Swami Satchidananda.'
WHERE id = 'call-back-your-energy';

-- 3. The Emotional Detox
UPDATE public.guided_shifts
SET
    intro = 'Not all emotions need to be understood. Some simply need to move through.',
    description = 'The Emotional Detox is designed to help the system release emotional buildup that has accumulated over time through restraint, politeness, responsibility, or endurance. It allows emotion to discharge without story, analysis, or reliving.',
    approach = NULL,
    use_when = '["Emotions feel heavy but undefined", "You feel emotionally full or saturated", "Tears, irritability, or numbness come without context", "You sense old feeling states lingering in the body", "Processing feels exhausting rather than relieving"]'::jsonb,
    field_integration_prompt = E'I just completed The Emotional Detox meditation. Please help me process and integrate this experience by:\n\n1. Helping me describe what kind of emotional weight was present before the release.\n2. Exploring how my body responded as emotion was allowed to move without story.\n3. Identifying patterns where emotions tend to accumulate rather than complete.\n4. Helping me recognize when emotional detox is needed instead of analysis.\n\nAsk me clarifying questions and help me integrate emotional completion into daily life.\n\n_Real-Life Integration: When emotions feel heavy without explanation, pause and ask: "Does this need understanding, or does it need movement." Allow completion._',
    science_text = 'Emotions that are inhibited or delayed remain physiologically active in the body, contributing to increased muscle tension, autonomic arousal, and emotional fatigue. Research shows that allowing emotional sensation to move without cognitive elaboration supports completion of stress response cycles and reduces long-term emotional load. This process restores baseline regulation without retraumatization.',
    science_source = 'Levine, P. (2010). In an Unspoken Voice. North Atlantic Books. / Pennebaker, J. (1997). Emotional Expression and Health. Psychological Science.',
    spiritual_text = E'Ram Dass taught that emotions are visitors, not identities. In his work, suffering arises when awareness collapses into the passing experience and forgets its role as the witness. Healing happens not by eliminating emotional states, but by allowing them to move through awareness without resistance or attachment.\n\nWhen emotions are met with presence rather than suppression, they complete their natural cycle and release on their own. Emotional detox, in this sense, is not a purging, but a remembering. You are not what is moving through you. You are the space that allows it to pass.',
    spiritual_source = 'Dass, R. (1971). Be Here Now. Crown Publishing.'
WHERE id = 'the-emotional-detox';

-- 4. Clearing the Internal Clutter
UPDATE public.guided_shifts
SET
    intro = 'Internal clutter builds quietly — unfinished thoughts, information overload, mental residue from screens, conversations, decisions, and constant input.',
    description = 'This meditation clears excess mental and energetic buildup without analysing content or revisiting thoughts. It restores internal spaciousness by removing what is no longer needed for this moment. This is not relaxation. It is subtraction.',
    approach = NULL,
    use_when = '["Your mind feels crowded or noisy", "Focus feels scattered", "Mental fatigue lingers even after rest", "Your inner space feels cluttered rather than emotional", "You want a clean internal baseline before moving forward"]'::jsonb,
    field_integration_prompt = E'I just completed Clearing the Internal Clutter. Please help me process and integrate this experience by:\n\n1. Helping me describe the type of mental or energetic clutter I noticed before clearing.\n2. Identifying patterns or environments that contribute most to internal buildup.\n3. Noticing how clarity, focus, or internal quiet changed after the meditation.\n4. Helping me recognize when I need to clear internal clutter before continuing with tasks or decisions.\n\nAsk me clarifying questions and help me integrate this awareness into daily life.\n\n_Real-Life Integration: When your mind feels crowded, pause and ask: "What am I carrying that does not need to come with me." Clear before continuing._',
    science_text = 'Cognitive overload increases neural noise and reduces working memory capacity. Prolonged exposure to information and multitasking leads to mental fatigue and impaired executive function. Research shows that intentional clearing practices reduce cognitive load, restore attentional efficiency, and improve clarity by allowing the brain to return to baseline processing.',
    science_source = 'Boksem, M. et al. (2005). Mental fatigue and performance. Brain Research. / Kaplan, S. (1995). The restorative benefits of directed attention. Journal of Environmental Psychology.',
    spiritual_text = E'Eckhart Tolle teaches that mental clutter arises when awareness becomes entangled with thought rather than resting as the space in which thought appears. In his work, freedom is not found by stopping thinking, but by disidentifying from it.\n\nWhen thoughts are allowed to arise without being followed, judged, or resisted, they naturally lose their grip. Clarity is not the absence of thought, but the presence of awareness. Clearing internal clutter, in this sense, is not a mental effort, but a shift in relationship. Awareness steps back, and the mind reorganizes itself.',
    spiritual_source = 'Tolle, E. (1997). The Power of Now. New World Library.'
WHERE id = 'clearing-the-internal-clutter';

-- 5. The Nervous Soothe
UPDATE public.guided_shifts
SET
    intro = 'After release, reclaiming, detoxing, and clearing, the system does not need stimulation. It needs reassurance.',
    description = 'The Nervous Soothe is about communicating safety to the body without effort, analysis, or regulation techniques. It helps the nervous system settle into steadiness by orienting to support, containment, and enoughness in the present moment. This is not calming through control. It is calming through permission.',
    approach = NULL,
    use_when = '["Your body feels alert even when nothing is wrong", "You feel tired but wired", "Your system feels sensitive or easily startled", "You want to land gently rather than reset sharply", "You need softness without collapse"]'::jsonb,
    field_integration_prompt = E'I just completed The Nervous Soothe meditation. Please help me process and integrate this experience by:\n\n1. Helping me notice how my nervous system felt before and after the meditation.\n2. Identifying where my body holds alertness even when I am safe.\n3. Exploring what signals of safety my system responds to most easily.\n4. Helping me recognize when soothing is needed rather than stimulation or problem-solving.\n\nAsk me clarifying questions and help me integrate nervous system safety into daily life.\n\n_Real-Life Integration: When your body feels alert without reason, pause and say: "There is nothing required of me in this moment." Let your system settle on its own terms._',
    science_text = 'Nervous system regulation depends on perceived safety rather than effortful calming techniques. Research in polyvagal theory shows that cues of safety, such as environmental stability and absence of demand, allow the autonomic nervous system to shift out of heightened arousal. When the body senses it is supported and not required to act, regulation occurs naturally without forced relaxation.',
    science_source = 'Porges, S. (2011). The Polyvagal Theory. Norton. / Dana, D. (2018). The Polyvagal Theory in Therapy. Norton.',
    spiritual_text = E'Tara Brach teaches that true soothing happens when we meet experience with what she calls "radical compassion." In her work, the nervous system settles not through control or positive thinking, but through being met with presence and kindness.\n\nWhen sensations of fear, tension, or agitation are allowed to exist within a field of gentle awareness, the body receives the message that it no longer has to protect itself alone. Soothing is not something we do to the nervous system. It is something that happens when awareness stays close without trying to change what it finds. Safety emerges from being accompanied.',
    spiritual_source = 'Brach, T. (2003). Radical Acceptance. Bantam Books.'
WHERE id = 'the-nervous-soothe';
