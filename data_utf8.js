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