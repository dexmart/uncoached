import { Link } from 'react-router-dom';

const GuidedShiftsPage = () => {
    // Shift Families Data
    const shiftFamilies = [
        {
            id: 1,
            title: "The Downshift Series",
            purpose: "Slow the system when everything feels sharp, loud, or fast.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M19 12l-7 7-7-7" />
                </svg>
            ),
            shifts: [
                { name: "The Centering Drop", status: "active" },
                { name: "Dialing it Down", status: "active" },
                { name: "The Exhale Stretch", status: "coming-soon" },
                { name: "From Head to Heart", status: "coming-soon" },
                { name: "The Micro Let-Go", status: "coming-soon" }
            ]
        },
        {
            id: 2,
            title: "The Nervous System Reset Series",
            purpose: "Interrupt spirals and regulate fast.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
            shifts: [
                { name: "Vagus Nerve Switch", status: "active" },
                { name: "The Jaw Melt", status: "active" },
                { name: "The Shoulder Gate", status: "coming-soon" },
                { name: "The Forehead Lift", status: "coming-soon" },
                { name: "The Solar Plexus Unwind", status: "coming-soon" }
            ]
        },
        {
            id: 3,
            title: "The Body Return Series",
            purpose: "Anchor into the present moment through sensation.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
            ),
            shifts: [
                { name: "Hands-as-Home", status: "active" },
                { name: "The Spine Scan", status: "active" },
                { name: "The Rib Cage Expansion", status: "coming-soon" },
                { name: "Feet-in-the-Now", status: "coming-soon" },
                { name: "The Breathprint Check", status: "coming-soon" }
            ]
        },
        {
            id: 4,
            title: "The Pattern Breaker Series",
            purpose: "Shift a behaviour loop or mental loop in under 60 seconds.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21a9 9 0 1 1 0-18c1.5 0 2.8.6 4 1.5L18.5 7" />
                    <path d="M18.5 3v4h-4" />
                </svg>
            ),
            shifts: [
                { name: "The Identity Interrupt", status: "active" },
                { name: "The Emotional Intensity Shift", status: "active" },
                { name: "The \"This Isn't Mine\" Reset", status: "coming-soon" },
                { name: "The Right Next Move", status: "coming-soon" },
                { name: "Stop the Spiral", status: "coming-soon" }
            ]
        },
        {
            id: 5,
            title: "The Identity Leap Series",
            purpose: "Call in the future self and anchor a new identity.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
            ),
            shifts: [
                { name: "Step Into the Room", status: "active" },
                { name: "The Micro Yes", status: "active" },
                { name: "The Courage Breath", status: "coming-soon" },
                { name: "The Embodied Permission", status: "coming-soon" },
                { name: "The One Degree Shift", status: "coming-soon" }
            ]
        },
        {
            id: 6,
            title: "The Self-Permission Series",
            purpose: "Dismantle shame and pressure.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            shifts: [
                { name: "Permission to Pause", status: "active" },
                { name: "Permission to Not Know", status: "active" },
                { name: "Permission to Improve Slowly", status: "coming-soon" },
                { name: "Permission to Be Enough Today", status: "coming-soon" },
                { name: "Permission to Want More", status: "coming-soon" }
            ]
        },
        {
            id: 7,
            title: "The Energy Recalibration Series",
            purpose: "Reset your energetic field and emotional tone.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
            ),
            shifts: [
                { name: "Residual Energy Release", status: "active" },
                { name: "Call Back Your Energy", status: "active" },
                { name: "The Emotional Detox", status: "coming-soon" },
                { name: "Clearing the Internal Clutter", status: "coming-soon" },
                { name: "The Nervous Soothe", status: "coming-soon" }
            ]
        },
        {
            id: 8,
            title: "The Inner Child Repair Series",
            purpose: "Micro moments of re-parenting and repair.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    <path d="M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" opacity="0.5" />
                </svg>
            ),
            shifts: [
                { name: "The Safe Lap Moment", status: "active" },
                { name: "The Hand Squeeze", status: "active" },
                { name: "The \"I'm Not Leaving\" Breath", status: "coming-soon" },
                { name: "The Warm Blanket", status: "coming-soon" },
                { name: "The Fear Unhook", status: "coming-soon" }
            ]
        },
        {
            id: 9,
            title: "The Boundaries Series",
            purpose: "Strengthen inner boundaries with calm firmness.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            ),
            shifts: [
                { name: "The Nervous System Yes", status: "active" },
                { name: "The Nervous System No", status: "active" },
                { name: "The Space Creator", status: "coming-soon" },
                { name: "The Energy Filter", status: "coming-soon" },
                { name: "The \"Not Today\" Breath", status: "coming-soon" }
            ]
        },
        {
            id: 10,
            title: "The Between-Sessions Therapy Series",
            purpose: "Regulate, integrate, or prepare between therapy appointments.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                </svg>
            ),
            shifts: [
                { name: "The Post-Session Land", status: "active" },
                { name: "The Pre-Session Ground", status: "active" },
                { name: "The Emotional Spill", status: "coming-soon" },
                { name: "The Integration", status: "coming-soon" },
                { name: "The Softened Edges", status: "coming-soon" }
            ]
        },
        {
            id: 11,
            title: "The Loss-Softening Series",
            purpose: "Soothe grief waves without collapsing into them.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 12h17" />
                    <path d="M2 13s2.5-4 8-4s9 4 12 4" />
                </svg>
            ),
            shifts: [
                { name: "The Wave Pass", status: "active" },
                { name: "The Tender Hold", status: "active" },
                { name: "The \"Stay Here\" Breath", status: "coming-soon" },
                { name: "The Heart Pocket", status: "coming-soon" },
                { name: "The Soft Rest", status: "coming-soon" }
            ]
        },
        {
            id: 12,
            title: "The Morning Re-entry Series",
            purpose: "Wake up and re-enter the day with presence.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v2" />
                    <path d="M12 19v2" />
                    <path d="M4.22 4.22l1.42 1.42" />
                    <path d="M18.36 18.36l1.42 1.42" />
                    <path d="M1 12h2" />
                    <path d="M21 12h2" />
                    <path d="M4.22 19.78l1.42-1.42" />
                    <path d="M18.36 5.64l1.42-1.42" />
                    <circle cx="12" cy="12" r="5" />
                </svg>
            ),
            shifts: [
                { name: "First Breath Back", status: "active" },
                { name: "The Wakeful Stretch", status: "active" },
                { name: "The Grounded Start", status: "coming-soon" },
                { name: "The Gentle Ignite", status: "coming-soon" },
                { name: "The Slow Clarity", status: "coming-soon" }
            ]
        },
        {
            id: 13,
            title: "The Night Unraveling Series",
            purpose: "Dissolve tension and quiet the mind before sleep.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            ),
            shifts: [
                { name: "The Body Drop", status: "active" },
                { name: "The Thought Softener", status: "active" },
                { name: "The Slow Melt", status: "coming-soon" },
                { name: "The Blanket Sink", status: "coming-soon" },
                { name: "The Safe Drift", status: "coming-soon" }
            ]
        },
        {
            id: 14,
            title: "The Pressure Release Series",
            purpose: "Relieve pressure, perfectionism, and mental stacking.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                </svg>
            ),
            shifts: [
                { name: "The Unload Breath", status: "active" },
                { name: "The One Thing Now", status: "active" },
                { name: "The Release Valve", status: "coming-soon" },
                { name: "The Enoughness Reset", status: "coming-soon" },
                { name: "The Task Softener", status: "coming-soon" }
            ]
        },
        {
            id: 15,
            title: "The Creativity Switch Series",
            purpose: "Spark inspiration and unblock creativity.",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="opacity-80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3.3" />
                </svg>
            ),
            shifts: [
                { name: "The Creative Pulse", status: "active" },
                { name: "The Breath of Ideas", status: "active" },
                { name: "The Mind-Open Moment", status: "coming-soon" },
                { name: "The Spark Catch", status: "coming-soon" },
                { name: "The Imagination Stretch", status: "coming-soon" }
            ]
        }
    ];

    const scrollToFamilies = () => {
        document.getElementById('shift-families')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-bone">
            {/* Fixed Nav Link */}
            <Link
                to="/dashboard"
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-text-dark/60 hover:text-text-dark transition-colors group mix-blend-multiply"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-light tracking-wide">Back to Portal</span>
            </Link>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Hero Section.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bone/40 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content - Centered */}
                <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center md:max-w-lg md:ml-[20%] lg:ml-[25%]">
                    {/* Brand Mark */}
                    {/* Brand Mark REMOVED */}
                    {/* Main Headline */}
                    <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl text-text-dark mb-5 leading-[1.15]">
                        Shift your state.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-text-dark text-xl md:text-2xl leading-relaxed mb-8 italic">
                        In minutes. In real life.
                    </p>

                    {/* Description */}
                    <p className="text-text-dark text-base leading-relaxed mb-6">
                        Guided Shifts are short, precise audio experiences that help your nervous system settle, reset, or reorient when life feels loud, heavy, fast, or stuck.
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-2 mb-8 inline-block text-left mx-auto">
                        {['No long meditations.', 'No breath-counting.', 'No fixing yourself.'].map(item => (
                            <li key={item} className="flex items-center gap-2 text-text-dark/80">
                                <span className="text-clay">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Supporting Text */}
                    <p className="text-text-dark/70 text-sm mb-10 italic">
                        Just guided internal shifts you can use
                        <br />
                        when it actually matters.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToFamilies}
                        className="px-8 py-3.5 bg-clay text-white rounded-full shadow-md hover:shadow-lg hover:bg-clay/90 transition-all duration-300 mb-5"
                    >
                        Browse the Guided Shifts
                    </button>
                </div>
            </section>

            {/* Why This Works Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Why This Works.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-4">
                            Why This Works
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                Why these tiny shifts matter
                            </h3>
                            <div className="space-y-6 text-text-dark/80 text-base leading-relaxed text-center">
                                <p>
                                    Most tools talk to your mind.
                                    <br />
                                    Guided Shifts work with your body.
                                </p>
                                <p>
                                    They use sensation, attention, and subtle nervous system cues to help you move out of urgency, shutdown, or overwhelm and back into steadiness.
                                </p>
                                <ul className="text-left space-y-3 mt-6 inline-block">
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>The nervous system responds faster than thought</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>Small internal shifts create immediate relief</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>Regulation comes from safety, not effort</span>
                                    </li>
                                </ul>
                                <p className="italic font-medium pt-4">
                                    This isn't about going deeper.
                                    <br />
                                    It's about coming back online.
                                </p>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                What these shifts can do
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">When your state is dysregulated:</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>thinking gets narrow</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>emotions feel bigger than they are</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>decisions feel urgent or impossible</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="h-px bg-clay/10 my-4"></div>
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">A regulated state restores:</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>perspective</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>choice</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>access to your inner signals</span>
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-center text-text-dark/90 italic pt-4">
                                    These shifts help you meet the moment you're in without getting swallowed by it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built For Real Life Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Built For Real Life.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg md:mr-[5%] lg:mr-[10%] ml-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-6">
                        Built for real life moments
                    </h2>

                    <p className="font-semibold text-text-dark mb-4">Use them when:</p>
                    <ul className="space-y-3 mb-8">
                        {[
                            "you're spiralling before a conversation",
                            "you can't shut your mind off at night",
                            "therapy stirred something up",
                            "grief, pressure, or fear hits suddenly",
                            "you need to move forward but feel stuck"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-text-dark/90 text-sm md:text-base">
                                <span className="text-clay">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-4">
                        <p className="text-lg font-medium text-clay">Most are under 5 minutes.</p>
                        <p className="text-text-dark/80">
                            With practice, these learned techniques can land in your body in under 60 seconds.
                        </p>
                        <p className="text-text-dark/60 italic">No setup required.</p>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts How to Use Them.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg ml-[5%] lg:ml-[10%] mr-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-8">
                        How to Use Them
                    </h2>

                    <div className="space-y-6 mb-8">
                        {[
                            "Choose the series that matches what you're experiencing",
                            "Press play",
                            "Let the guidance do the work"
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-clay font-medium text-lg">✓</span>
                                <span className="text-text-dark text-lg">{step}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-text-dark/80 mb-4 leading-relaxed">
                        Use them seated, standing, in bed, between meetings, or in the car before you go inside.
                    </p>
                    <p className="text-text-dark italic">
                        Repeat as needed. There is no right way.
                    </p>
                </div>
            </section>

            {/* Shift Families Section */}
            <section id="shift-families" className="py-24 px-6 bg-bone relative">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Families.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                            Guided Shift Families
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Small, precise resets for your nervous system, built for real moments in real life.
                            <br />
                            <span className="text-sm opacity-70 italic">More coming soon.</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shiftFamilies.map((family) => (
                            <div
                                key={family.id}
                                className="bg-bone/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm flex flex-col h-full overflow-hidden hover:shadow-md transition-all group"
                            >
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-clay/80 p-3 bg-white/50 rounded-full">
                                            {family.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl text-text-dark leading-tight">
                                                {family.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-text-dark/70 text-sm mb-6 min-h-[40px]">
                                        {family.purpose}
                                    </p>

                                    <div className="space-y-2 mt-auto">
                                        {family.shifts.map((shift, idx) => (
                                            <div key={idx}>
                                                {shift.status === 'active' ? (
                                                    <Link
                                                        to={`/dashboard/guided-shifts/${shift.name.toLowerCase().replace(/ /g, '-')}`}
                                                        className="block w-full px-4 py-2.5 bg-white/60 hover:bg-white text-text-dark rounded-xl text-sm transition-all text-center border border-transparent hover:border-clay/20"
                                                    >
                                                        {shift.name}
                                                    </Link>
                                                ) : (
                                                    <div className="block w-full px-4 py-2.5 bg-white/20 text-text-dark/40 rounded-xl text-sm text-center border border-transparent cursor-default">
                                                        {shift.name} <span className="text-[10px] opacity-70 ml-1">(soon)</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GuidedShiftsPage;
