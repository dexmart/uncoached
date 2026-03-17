-- ============================================
-- Pattern Breaker Series - Full Content Seed
-- Run this in Supabase SQL Editor
-- NOTE: This series has 6 shifts (not 5).
--       "The Emotional Intensity Shift" is added as a new entry.
-- ============================================

-- 1. The Identity Interrupt
UPDATE public.guided_shifts
SET
    intro = 'People often act from temporary identity states without recognizing them — the overwhelmed self, the reactive self, the perfectionistic self, the tired self, the caretaker self. These states feel like "me" in the moment, but they are not permanent and not the whole truth.',
    description = 'The Identity Interrupt teaches you to recognize the state you are currently in, create a pause between state and action, step into a more aligned identity, and choose how you want to show up next.',
    approach = NULL,
    use_when = '["You feel stuck in a reactive state", "You hear yourself saying I always do this", "You feel swept away by emotion", "You want to show up differently in the next moment"]'::jsonb,
    field_integration_prompt = E'I just finished the Identity Interrupt meditation. Help me clarify what shifted by exploring these things:\n\n1. What temporary identity I noticed myself acting from.\n2. What changed when I created space between myself and that state.\n3. Who I chose to become for the next moment and why that feels meaningful.\n\nAsk me clarifying questions so I can translate this identity shift into something I can apply in real life today.\n\n_Real-Life Integration: Later today, pause once and ask yourself "Which version of me is here right now, and is that who I choose."_',
    science_text = 'Emotional and cognitive states are supported by specific neural patterns in the brain. When a person pauses to notice and name a current state instead of reacting from it, activity shifts from the limbic system into the prefrontal cortex, increasing regulation and choice. Research on cognitive decentering shows that creating even a small distance from a temporary identity reduces emotional intensity and restores agency, allowing the nervous system to reorient toward a more intentional state.',
    science_source = 'Kross, E. et al. (2014). Journal of Personality and Social Psychology. / Farb, N. et al. (2012). Social Cognitive and Affective Neuroscience.',
    spiritual_text = E'Neville Goddard taught that identity is not fixed. It is assumed. He emphasized that every experience flows from the state you occupy, not from effort or circumstance. In his words, "You are not changing the world. You are selecting the state from which you view it."\n\nThis meditation reflects that principle. By separating awareness from the temporary version of yourself, you reclaim authorship. Choosing the next state, even for one moment, becomes an act of creation rather than control. The interrupt reminds you that you are not your mood, your fatigue, or your pressure. You are the one who steps into states, and steps out of them.',
    spiritual_source = 'Goddard, N. (1954). Awakened Imagination. Public domain lectures.'
WHERE id = 'the-identity-interrupt';

-- 2. The Emotional Label Switch
UPDATE public.guided_shifts
SET
    intro = 'Your brain does not feel emotions first. It feels sensations first. Then it chooses a label. A racing heart might be labeled as anxiety. The same sensation might be labeled as excitement. The sensation never changed. Only the interpretation did.',
    description = 'The Emotional Label Switch is a rapid pattern-interrupt tool that rewires how someone names what they feel. By shifting the label, the emotional intensity drops and the mind becomes clear enough to reorient.',
    approach = NULL,
    use_when = '["You feel overtaken by an emotion", "You know your reaction is amplified by your story", "Your body feels uncomfortable but you cannot pinpoint why", "You need a fast, clean emotional redirect"]'::jsonb,
    field_integration_prompt = E'I just finished the Emotional Label Switch meditation. Help me clarify what shifted by exploring these three things:\n\n1. What physical sensation I noticed underneath the emotion.\n2. How the emotion changed when I removed the original label.\n3. What new interpretation or meaning opened up when I chose a different label.\n\nAsk me clarifying questions so I can translate this insight into something I can use today.\n\n_Real-Life Integration: Later today, when you feel triggered or overwhelmed, pause and ask "What is the raw sensation underneath this, and what else could it be."_',
    science_text = 'Emotions are constructed from bodily sensations combined with cognitive interpretation. Research shows that when a sensation is relabeled in a neutral or non-threatening way, activity in the amygdala decreases while prefrontal regulation increases. This process, known as affective reappraisal, reduces emotional intensity by changing meaning rather than suppressing sensation.',
    science_source = 'Barrett, L. F. (2017). How Emotions Are Made. Houghton Mifflin Harcourt. / Ochsner, K. N. et al. (2012). Cognitive Reappraisal. Annual Review of Psychology.',
    spiritual_text = E'Viktor Frankl taught that meaning, not circumstance, determines our inner freedom. He wrote that when we change the meaning we assign to an experience, we change how we relate to it.\n\nThis meditation reflects that truth. The sensation remains. What changes is the story attached to it. By choosing a softer, truer label, you reclaim agency over how the moment shapes you. The switch is not denial. It is authorship.',
    spiritual_source = 'Frankl, V. (1959). Man''s Search for Meaning. Beacon Press.'
WHERE id = 'the-emotional-label-switch';

-- 3. The Emotional Intensity Shift (NEW — adding to the series)
INSERT INTO public.guided_shifts (id, category_id, title, intro, description, approach, use_when, field_integration_prompt, science_text, science_source, spiritual_text, spiritual_source, is_active, sort_order)
VALUES (
    'the-emotional-intensity-shift',
    '00000000-0000-0000-0000-000000000004',
    'The Emotional Intensity Shift',
    'When emotions run high, the body speaks in two ways — through intensity and through location. If either of these changes, the emotional loop breaks.',
    'The Internal Volume Shift gives the listener a fast, body-based way to interrupt spirals by turning the sensation down to a manageable level and moving it to a part of the body that feels neutral or safe.',
    NULL,
    '["You feel too activated", "Your chest or stomach is tight", "You are on the edge of spiraling", "You need a fast, body-led shift"]'::jsonb,
    E'I just finished the Internal Volume Shift meditation. Help me clarify what changed by exploring these three things:\n\n1. What sensation I lowered and how the volume shift felt in my body.\n2. How the emotion changed when I moved the sensation to a safer or more neutral area.\n3. How I can use this two-step method later today when I feel overwhelmed or activated.\n\nAsk me gentle clarifying questions so I can turn this shift into something I can use in real time.\n\n_Real-Life Integration: Later today, when something feels intense, quietly imagine turning the dial down two levels._',
    'Emotional intensity is amplified when sensations are interpreted as threatening and held in high-sensitivity regions like the chest or gut. Research shows that reducing perceived intensity and relocating attention to neutral body areas decreases amygdala activation and increases prefrontal regulation. This process lowers physiological arousal without suppressing sensation, allowing the nervous system to settle into a more manageable state.',
    'Ochsner, K. N. et al. (2012). Annual Review of Psychology. / Farb, N. et al. (2015). Frontiers in Psychology.',
    E'Epictetus taught that distress comes not from sensation itself, but from the meaning we give it. He emphasized that when we learn to soften our response, intensity loses its power.\n\nThis meditation reflects that wisdom. By lowering the volume and changing where the sensation lives, you are not denying the experience. You are changing your relationship to it. The feeling remains, but it no longer dominates. This is the practice of inner steadiness.',
    'Epictetus. Enchiridion, translated by Elizabeth Carter, 1758.',
    true,
    3
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    intro = EXCLUDED.intro,
    description = EXCLUDED.description,
    use_when = EXCLUDED.use_when,
    field_integration_prompt = EXCLUDED.field_integration_prompt,
    science_text = EXCLUDED.science_text,
    science_source = EXCLUDED.science_source,
    spiritual_text = EXCLUDED.spiritual_text,
    spiritual_source = EXCLUDED.spiritual_source,
    is_active = EXCLUDED.is_active;

-- 4. The "This Isn't Mine" Reset
UPDATE public.guided_shifts
SET
    title = 'The "This Is Not Mine" Reset',
    intro = 'Emotional weight does not always originate from within. Sometimes it enters — a comment, a tone, a memory, a responsibility handed to you that you never agreed to hold. Your system absorbs it fast, often before your mind understands what happened.',
    description = 'This meditation teaches you to identify the exact area where a foreign emotion settled, trace where it entered, evict it clearly and decisively, and reclaim the internal space that belongs only to you.',
    approach = NULL,
    use_when = '["Something hits you out of nowhere", "You feel heavy after interacting with someone", "You suddenly feel anxious, tight, or burdened", "Your body feels occupied by a mood that does not match you"]'::jsonb,
    field_integration_prompt = E'I just finished the Emotional Eviction version of the This Is Not Mine Reset. Help me understand what shifted by exploring these questions:\n\n1. What sensation or weight I identified that clearly did not belong to me.\n2. How it felt to trace where it entered.\n3. What changed when I evicted it through the same doorway.\n\nAsk me clarifying questions so I can use this practice in real situations where emotional weight is not mine.\n\n_Real-Life Integration: Later today, if something enters your system suddenly, pause and ask "Where did this come in" then release it through the same direction._',
    science_text = 'Emotional states can be unconsciously absorbed through social interaction, a process known as emotional contagion. Research shows that bringing awareness to bodily sensation and reassigning ownership reduces limbic activation and restores psychological boundaries. When the brain identifies a feeling as external rather than self-generated, stress responses decrease and regulation improves.',
    science_source = 'Hatfield, E. et al. (1993). Emotional Contagion. Current Directions in Psychological Science. / Farb, N. et al. (2015). Interoception and Emotional Regulation. Frontiers in Psychology.',
    spiritual_text = E'Carl Jung taught that we often carry emotions that do not originate within us, but are taken on through unconscious identification with others. He believed that clarity comes from separating what belongs to the self from what has been projected or absorbed.\n\nThis meditation reflects that insight. By recognizing and releasing what is not yours, you reclaim psychic energy and restore inner balance. The act of saying "this is not mine" is not rejection. It is differentiation. And differentiation is the foundation of wholeness.',
    spiritual_source = 'Jung, C. G. (1964). Man and His Symbols. Doubleday.'
WHERE id = 'the-this-isnt-mine-reset';

-- 5. The Right Next Move (renamed to "The Next Right Move")
UPDATE public.guided_shifts
SET
    title = 'The Next Right Move',
    intro = 'When the system is overwhelmed, stuck, spiraling, or emotionally compressed, the brain loses the ability to see forward. The future feels too big. The choices feel too many. The pressure feels too heavy.',
    description = 'But the nervous system does not need the whole plan. It needs only one next right move. A single shift breaks the loop. A single choice restores agency. A single action reopens possibility.',
    approach = NULL,
    use_when = '["Everything feels like too much", "You cannot choose", "You feel stuck in place", "Your mind is looping", "You need direction, not pressure"]'::jsonb,
    field_integration_prompt = E'I just finished The Next Right Move meditation. Help me explore what shifted by looking at these three things:\n\n1. What feeling or pattern was keeping me stuck or overwhelmed.\n2. What my body revealed as my next right move.\n3. How I can stay connected to this clarity throughout the rest of my day.\n\nAsk me gentle clarifying questions so I can apply this micro step in a meaningful way.\n\n_Real-Life Integration: Later today, pause once and ask "What is the next right move right now" and act on whatever comes first._',
    science_text = 'When people feel overwhelmed, the brain''s threat and planning systems compete, leading to paralysis. Research shows that narrowing focus to a single, achievable action reduces cognitive load and restores prefrontal functioning. Identifying one next step increases dopamine-related motivation signals and helps the nervous system shift out of freeze and into regulated action.',
    science_source = 'Baumeister, R. et al. (2018). Self Regulation and Decision Fatigue. Journal of Personality. / Gollwitzer, P. (1999). Implementation Intentions. American Psychologist.',
    spiritual_text = E'Marcus Aurelius wrote that peace comes from doing what the moment asks, not from solving the whole future. He emphasized directing attention toward what is within your control right now, and releasing the rest.\n\nThis meditation follows that philosophy. The next right move is not about certainty or perfection. It is about alignment with the present. By choosing one honest action, you restore dignity, momentum, and inner order. Right action, taken one moment at a time, becomes its own form of clarity.',
    spiritual_source = 'Marcus Aurelius. Meditations, Book II, translated by Gregory Hays.'
WHERE id = 'the-right-next-move';

-- 6. Stop the Spiral
UPDATE public.guided_shifts
SET
    intro = 'A spiral begins when the mind accelerates beyond what the body can regulate. Thoughts stack. Pace quickens. Breath shortens. The nervous system loses its sense of now.',
    description = 'This meditation does not soothe the spiral. It stops it. Fast. Clean. Without overthinking. The body is the only system powerful enough to interrupt a racing mind.',
    approach = NULL,
    use_when = '["Your mind is getting loud", "You feel emotionally flooded", "Thoughts loop without pause", "You cannot slow yourself down"]'::jsonb,
    field_integration_prompt = E'I just finished the Stop the Spiral meditation. Help me explore what shifted by looking at these things:\n\n1. What triggered the spiral or fast thinking.\n2. What I noticed when I connected my chest and feet.\n3. How naming the underlying feeling changed my internal pace.\n4. What my body told me I needed in that moment.\n\nAsk me gentle clarifying questions so I can use this technique in real situations where a spiral begins.\n\n_Real-Life Integration: Later today, if your mind speeds up, touch your chest, feel your feet, and quietly say "I am back."_',
    science_text = 'Spirals are driven by heightened sympathetic nervous system activity and narrowed attentional focus. Grounding attention in the chest and feet activates interoceptive and proprioceptive pathways that increase parasympathetic regulation. Naming the underlying feeling engages the prefrontal cortex and reduces limbic reactivity, allowing the nervous system to slow and stabilize before action is taken.',
    science_source = 'Farb, N. et al. (2015). Interoception and Emotional Regulation. Frontiers in Psychology. / Lieberman, M. et al. (2007). Putting Feelings into Words. Psychological Science.',
    spiritual_text = E'Thich Nhat Hanh taught that the most powerful practice in moments of distress is stopping. He wrote that when we pause and return to the body, we step out of the stream of agitation and back into life as it is happening now.\n\nThis meditation reflects that teaching. Touching the body. Feeling the ground. Naming what is present. Each step brings awareness home. Stopping the spiral is not about controlling the mind. It is about returning to the moment where calm and clarity already exist.',
    spiritual_source = 'Thich Nhat Hanh. (1991). Peace Is Every Step. Bantam.'
WHERE id = 'stop-the-spiral';

-- Update sort orders for the expanded series (now 6 shifts)
UPDATE public.guided_shifts SET sort_order = 1 WHERE id = 'the-identity-interrupt';
UPDATE public.guided_shifts SET sort_order = 2 WHERE id = 'the-emotional-label-switch';
UPDATE public.guided_shifts SET sort_order = 3 WHERE id = 'the-emotional-intensity-shift';
UPDATE public.guided_shifts SET sort_order = 4 WHERE id = 'the-this-isnt-mine-reset';
UPDATE public.guided_shifts SET sort_order = 5 WHERE id = 'the-right-next-move';
UPDATE public.guided_shifts SET sort_order = 6 WHERE id = 'stop-the-spiral';
