import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const AudioBreathPlayerPage = () => {
    const { id } = useParams();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // Icons mapping
    const familyIcons = {
        'calm-me-down': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M16 8v8" />
                <path d="M20 10v4" />
                <path d="M8 8v8" />
                <path d="M4 10v4" />
            </svg>
        ),
        'emotional-regulation': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        ),
        'motivate-me': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9a4 4 0 0 1 4 4" />
                <path d="M12 3v2" />
                <path d="M12 19v2" />
                <path d="M3 13h2" />
                <path d="M19 13h2" />
                <path d="M5.6 6.4l1.4 1.4" />
                <path d="M18.4 6.4l-1.4 1.4" />
                <path d="M5.6 19.6l1.4-1.4" />
                <path d="M18.4 19.6l-1.4-1.4" />
            </svg>
        ),
        'help-me-focus': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12h-4" />
            </svg>
        )
    };

    // Breath data - will be loaded from Supabase
    const breathData = {
        'anxiety-downshift': {
            title: 'Anxiety Downshift',
            family: 'Calm Me Down',
            familyId: 'calm-me-down',
            intro: 'Anxiety is the body moving into speed when it senses uncertainty, pressure, or threat.',
            description: '',
            approach: 'This breath meets the body in this state, slowing the exhale and softening tension so the nervous system can settle naturally.',
            useWhen: [
                'Your thoughts feel fast or spiralling',
                'Your chest feels tight or breathing feels shallow',
                'Your body feels restless, keyed up, or on edge',
                'You need relief without analysis or effort'
            ],
            science: {
                text: 'Slow exhales activate the vagus nerve, slowing the body\'s stress response, calming the mind, and bringing the body back to balance.',
                source: 'Porges, S. W. (2011). Polyvagal Theory. W.W. Norton & Company.'
            },
            spiritual: {
                text: 'The practice of breathing slowly out mirrors the spiritual concept of surrender — letting go of control and allowing the body to return to its natural rhythm. In this moment, we aren\'t trying to fix the anxiety, but simply allowing it to move through, creating space for calm.',
                source: 'Brach, T. (2003). Radical Acceptance. Bantam Books.'
            },
            audioUrl: ''
        },
        'emergency-grounding': {
            title: 'Emergency Grounding',
            family: 'Calm Me Down',
            familyId: 'calm-me-down',
            intro: 'When everything feels too fast.',
            description: 'A grounding breath for moments of overwhelm or panic.',
            approach: 'This breath uses tactile awareness and slow exhales to anchor you back to the present moment.',
            useWhen: [
                'You feel disconnected from your body',
                'Panic is rising',
                'You need to come back to the present quickly',
                'Thoughts are racing uncontrollably'
            ],
            science: {
                text: 'Grounding techniques activate the prefrontal cortex, helping to override the amygdala\'s fear response. Combined with slow breathing, this creates a powerful calming effect.',
                source: 'Van der Kolk, B. (2014). The Body Keeps the Score.'
            },
            spiritual: {
                text: 'In many traditions, the earth represents stability and support. Grounding is an act of remembering that we are held.',
                source: 'Levine, P. (2010). In an Unspoken Voice.'
            },
            audioUrl: ''
        },
        'social-nerves-reset': {
            title: 'Social Nerves Reset',
            family: 'Calm Me Down',
            familyId: 'calm-me-down',
            intro: 'Before you walk in.',
            description: 'A quick reset for social anxiety or performance nerves.',
            approach: 'This breath settles the nervous system before social situations without numbing your aliveness.',
            useWhen: [
                'Before a meeting or presentation',
                'Before entering a social gathering',
                'When you feel judged or watched',
                'Before a difficult conversation'
            ],
            science: {
                text: 'Social anxiety triggers the same fight-or-flight response as physical threats. Breath regulation helps the body distinguish between real danger and social discomfort.',
                source: 'Porges, S. W. (2011). Polyvagal Theory.'
            },
            spiritual: {
                text: 'You belong here. This breath is a reminder that your presence is enough.',
                source: 'Brown, B. (2010). The Gifts of Imperfection.'
            },
            audioUrl: ''
        },
        // Emotional Regulation family
        'before-you-react': {
            title: 'Before You React',
            family: 'Emotional Regulation',
            familyId: 'emotional-regulation',
            intro: 'A pause before action.',
            description: 'For when you feel the urge to say or do something you might regret.',
            approach: 'This breath creates a gap between stimulus and response, allowing wisdom to enter.',
            useWhen: [
                'You feel triggered or defensive',
                'Anger is rising',
                'You want to lash out',
                'You need to respond rather than react'
            ],
            science: {
                text: 'The pause created by conscious breathing allows the prefrontal cortex to engage, improving decision-making and reducing impulsive reactions.',
                source: 'Siegel, D. (2010). Mindsight.'
            },
            spiritual: {
                text: 'Between stimulus and response, there is a space. In that space is our power to choose.',
                source: 'Frankl, V. (1946). Man\'s Search for Meaning.'
            },
            audioUrl: ''
        },
        'overwhelm-unclench': {
            title: 'Overwhelm Unclench',
            family: 'Emotional Regulation',
            familyId: 'emotional-regulation',
            intro: 'When everything feels like too much.',
            description: 'A breath to release the grip of overwhelm.',
            approach: 'This breath helps you soften the physical tension that accompanies emotional overwhelm.',
            useWhen: [
                'You feel frozen by too many demands',
                'Your shoulders are up by your ears',
                'You don\'t know where to start',
                'Everything feels equally urgent'
            ],
            science: {
                text: 'Chronic overwhelm creates physical tension patterns. Conscious breathing interrupts this cycle and signals safety to the body.',
                source: 'Nagoski, E. (2019). Burnout.'
            },
            spiritual: {
                text: 'You cannot pour from an empty cup. This breath is an act of self-preservation.',
                source: 'Neff, K. (2011). Self-Compassion.'
            },
            audioUrl: ''
        },
        'shame-release': {
            title: 'Shame Release',
            family: 'Emotional Regulation',
            familyId: 'emotional-regulation',
            intro: 'Shame shrinks us. This breath expands.',
            description: 'A gentle breath for moments when shame feels consuming.',
            approach: 'This breath creates space around shame without trying to fix or analyze it.',
            useWhen: [
                'You feel small or unworthy',
                'You\'re replaying a mistake',
                'Self-criticism is loud',
                'You need to remember your wholeness'
            ],
            science: {
                text: 'Shame activates the freeze response. Breath work can help move the body out of immobility and back into connection.',
                source: 'Brown, B. (2012). Daring Greatly.'
            },
            spiritual: {
                text: 'You are not your mistakes. You are the awareness that notices them.',
                source: 'Tolle, E. (1999). The Power of Now.'
            },
            audioUrl: ''
        },
        'grief-companion': {
            title: 'Grief Companion',
            family: 'Emotional Regulation',
            familyId: 'emotional-regulation',
            intro: 'Grief needs presence, not fixing.',
            description: 'A breath to be with grief without being consumed by it.',
            approach: 'This breath offers gentle accompaniment through waves of grief.',
            useWhen: [
                'Grief feels overwhelming',
                'You need to cry but feel stuck',
                'You\'re missing someone or something',
                'You need permission to feel'
            ],
            science: {
                text: 'Suppressing grief creates physical and emotional strain. Breath work can facilitate healthy processing of loss.',
                source: 'Kessler, D. (2019). Finding Meaning.'
            },
            spiritual: {
                text: 'Grief is love with nowhere to go. This breath gives it space to flow.',
                source: 'Rumi'
            },
            audioUrl: ''
        },
        // Motivate Me family
        'morning-spark': {
            title: 'Morning Spark',
            family: 'Motivate Me',
            familyId: 'motivate-me',
            intro: 'Wake your body gently.',
            description: 'An energizing breath to start your day with intention.',
            approach: 'This breath gradually increases energy without jarring the system.',
            useWhen: [
                'You feel groggy upon waking',
                'You need motivation to start',
                'Energy feels flat or low',
                'You want to set an intentional tone for the day'
            ],
            science: {
                text: 'Controlled breathing with slightly longer inhales activates the sympathetic nervous system gently, promoting alertness.',
                source: 'Huberman, A. (2021). Huberman Lab Podcast.'
            },
            spiritual: {
                text: 'Each morning is a new beginning. This breath welcomes the day.',
                source: 'Thich Nhat Hanh'
            },
            audioUrl: ''
        },
        'confidence-charge-up': {
            title: 'Confidence Charge-Up',
            family: 'Motivate Me',
            familyId: 'motivate-me',
            intro: 'Stand a little taller.',
            description: 'A breath to access your natural confidence.',
            approach: 'This breath uses posture and breath to shift your internal state.',
            useWhen: [
                'You need a confidence boost',
                'Before an important moment',
                'You feel small or diminished',
                'You want to show up fully'
            ],
            science: {
                text: 'Research shows that embodied practices like breath work and posture changes can shift hormone levels and mood.',
                source: 'Cuddy, A. (2015). Presence.'
            },
            spiritual: {
                text: 'Your confidence is not arrogance. It is remembering who you really are.',
                source: 'Williamson, M. (1992). A Return to Love.'
            },
            audioUrl: ''
        },
        'joy-amplifier': {
            title: 'Joy Amplifier',
            family: 'Motivate Me',
            familyId: 'motivate-me',
            intro: 'Let the good stay longer.',
            description: 'A breath to extend and deepen positive feelings.',
            approach: 'This breath helps you savor good moments instead of rushing past them.',
            useWhen: [
                'Something good just happened',
                'You want to extend a positive feeling',
                'Gratitude is present',
                'You tend to rush past good moments'
            ],
            science: {
                text: 'The negativity bias means we must actively practice savoring positive experiences to rewire the brain for well-being.',
                source: 'Hanson, R. (2013). Hardwiring Happiness.'
            },
            spiritual: {
                text: 'Joy is your birthright. This breath helps you claim it.',
                source: 'Ruiz, D. M. (1997). The Four Agreements.'
            },
            audioUrl: ''
        },
        'creative-spark': {
            title: 'Creative Spark',
            family: 'Motivate Me',
            familyId: 'motivate-me',
            intro: 'Unlock what wants to flow.',
            description: 'A breath to open creative channels.',
            approach: 'This breath releases the tension that blocks creative flow.',
            useWhen: [
                'You feel creatively blocked',
                'Before writing, creating, or brainstorming',
                'Perfectionism is stopping you',
                'You need to access playfulness'
            ],
            science: {
                text: 'Relaxed alertness, achieved through breath work, is the optimal state for creative thinking.',
                source: 'Csikszentmihalyi, M. (1990). Flow.'
            },
            spiritual: {
                text: 'Creativity is not something you have. It is something you allow.',
                source: 'Gilbert, E. (2015). Big Magic.'
            },
            audioUrl: ''
        },
        // Help Me Focus family
        'single-task-focus': {
            title: 'Single-Task Focus',
            family: 'Help Me Focus',
            familyId: 'help-me-focus',
            intro: 'One thing at a time.',
            description: 'A breath to narrow attention to what matters now.',
            approach: 'This breath clears mental clutter and sharpens focus.',
            useWhen: [
                'Your attention is scattered',
                'You keep getting distracted',
                'You need to concentrate deeply',
                'Multiple things are pulling at you'
            ],
            science: {
                text: 'Focused attention breathing increases activity in the prefrontal cortex, improving concentration and working memory.',
                source: 'Goleman, D. (2013). Focus.'
            },
            spiritual: {
                text: 'Where attention goes, energy flows. This breath directs your life force.',
                source: 'Judith, A. (2004). Eastern Body, Western Mind.'
            },
            audioUrl: ''
        },
        'boundary-setting': {
            title: 'Boundary Setting',
            family: 'Help Me Focus',
            familyId: 'help-me-focus',
            intro: 'This is where I end and you begin.',
            description: 'A breath to strengthen your energetic boundaries.',
            approach: 'This breath helps you distinguish your energy from others\'.',
            useWhen: [
                'You\'ve absorbed others\' emotions',
                'You need to say no',
                'You feel depleted by others',
                'You need to reclaim your energy'
            ],
            science: {
                text: 'Breath awareness helps activate the body\'s sense of self, supporting healthy boundaries.',
                source: 'Pert, C. (1997). Molecules of Emotion.'
            },
            spiritual: {
                text: 'Boundaries are not walls. They are the fences that allow for healthy gardens.',
                source: 'Cloud, H. (1992). Boundaries.'
            },
            audioUrl: ''
        },
        'transition-support': {
            title: 'Transition Support',
            family: 'Help Me Focus',
            familyId: 'help-me-focus',
            intro: 'Between what was and what\'s next.',
            description: 'A breath for moving between roles, tasks, or moments.',
            approach: 'This breath creates a clear transition, allowing you to arrive fully.',
            useWhen: [
                'Between work and home',
                'After a difficult interaction',
                'Before entering a new space',
                'When switching between roles'
            ],
            science: {
                text: 'Transition rituals help the brain release one context and prepare for another, reducing cognitive residue.',
                source: 'Newport, C. (2016). Deep Work.'
            },
            spiritual: {
                text: 'Every ending is a beginning. This breath honors both.',
                source: 'Bridges, W. (1980). Transitions.'
            },
            audioUrl: ''
        }
    };

    const breath = breathData[id] || breathData['anxiety-downshift'];

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * duration;
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="min-h-screen bg-bone">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths Home Page.jpg"}
                    alt=""
                    className="w-full h-full object-cover opacity-100" // Changed opacity to 100 as per common pattern in other pages, handled by overlay if needed
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div> {/* Added light overlay to soften BG */}
            </div>

            <div className="relative z-10 min-h-screen">
                {/* Navigation */}
                <div className="sticky top-0 z-50 px-6 py-8 pointer-events-none">
                    <Link
                        to="/dashboard/audio-breaths"
                        className="inline-flex items-center gap-2 text-text-dark/60 hover:text-text-dark transition-colors pointer-events-auto mix-blend-multiply"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">Back to Audio Breaths</span>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-lg mx-auto px-6 pb-20">
                    {/* Audio Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-clay/20 backdrop-blur-sm rounded-full text-text-dark shadow-sm">
                            {familyIcons[breath.familyId]}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-4xl md:text-5xl text-text-dark text-center mb-10">
                        {breath.title}
                    </h1>

                    {/* Play Button Pill */}
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={togglePlay}
                            className="flex items-center gap-3 px-8 py-3 bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm rounded-full hover:bg-white/70 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center group-hover:bg-clay/90 transition-colors">
                                {isPlaying ? (
                                    <svg className="w-4 h-4 text-white ml-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-text-dark font-medium text-lg pr-2">Listen</span>
                        </button>
                    </div>

                    <audio ref={audioRef} src={breath.audioUrl} />

                    {/* Intro & Description */}
                    <div className="text-center mb-8">
                        <p className="text-text-dark text-lg md:text-xl leading-relaxed opacity-80">
                            {breath.intro}
                            <span className="block mt-2">{breath.description}</span>
                        </p>
                    </div>

                    {/* Approach Box - Highlighted */}
                    <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/30 shadow-sm text-center">
                        <p className="text-text-dark/90 text-lg leading-relaxed">
                            {breath.approach}
                        </p>
                    </div>

                    {/* Use This When */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-text-dark/10 flex-1"></div>
                            <h3 className="font-display text-2xl text-text-dark text-center">
                                Use this when:
                            </h3>
                            <div className="h-px bg-text-dark/10 flex-1"></div>
                        </div>

                        <div className="space-y-4">
                            {breath.useWhen.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-clay/30 flex items-center justify-center text-white">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Science Corner */}
                    <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                        <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                            Science Corner
                        </h4>
                        <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                            {breath.science.text}
                        </p>
                        <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                        <p className="text-text-dark/50 text-xs italic">
                            Source: {breath.science.source}
                        </p>
                    </div>

                    {/* Spiritual Corner - Added Back */}
                    <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                        <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                            Spiritual Corner
                        </h4>
                        <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                            {breath.spiritual.text}
                        </p>
                        <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                        <p className="text-text-dark/50 text-xs italic">
                            Source: {breath.spiritual.source}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AudioBreathPlayerPage;
