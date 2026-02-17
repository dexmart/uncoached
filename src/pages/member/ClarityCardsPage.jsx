import { Link } from 'react-router-dom';

const ClarityCardsPage = () => {
    // All 10 Clarity Cards
    const clarityCards = [
        {
            id: 1,
            title: "A Tiny Win to Celebrate",
            description: "Catch the progress you usually gloss over and let it count."
        },
        {
            id: 2,
            title: "A Thought I Want to Let Go Of",
            description: "Name the thought that's been looping so it doesn't keep running the day."
        },
        {
            id: 3,
            title: "After the Spiral",
            description: "Come back to yourself after emotional overload or mental chaos."
        },
        {
            id: 4,
            title: "How I'm Feeling",
            description: "Get honest about what's present without needing to explain it."
        },
        {
            id: 5,
            title: "Mini Ritual Moment",
            description: "Create a small, intentional pause that shifts your state."
        },
        {
            id: 6,
            title: "My Gentle Next Step",
            description: "Find a next move that feels doable instead of overwhelming."
        },
        {
            id: 7,
            title: "What I Need Right Now",
            description: "Listen for what your system is actually asking for."
        },
        {
            id: 8,
            title: "What I Want to Remember",
            description: "Anchor a truth, insight, or reminder you don't want to lose."
        },
        {
            id: 9,
            title: "When Everything Feels Like Too Much",
            description: "Meet overwhelm without fixing or pushing through it."
        },
        {
            id: 10,
            title: "Before I Begin My Day",
            description: "Set an inner tone before the day starts asking things of you."
        }
    ];

    const scrollToCards = () => {
        document.getElementById('card-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#F5F0EB]">
            {/* Fixed Nav Link */}
            <Link
                to="/dashboard"
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3D3530]/60 hover:text-[#3D3530] transition-colors group mix-blend-multiply"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-light tracking-wide">Back to Portal</span>
            </Link>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 1: Hero                            */}
            {/* ═══════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Clarity Card Hero.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Warm gradient overlay from left for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB]/90 via-[#F5F0EB]/50 to-transparent"></div>
                </div>

                {/* Hero Content — Left aligned */}
                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10">
                    <div className="max-w-[540px]">
                        <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-[3.5rem] text-[#3D3530] mb-7 leading-[1.15]">
                            Clarity Cards
                        </h1>

                        <div className="space-y-5 text-[#5C524A] text-base md:text-[17px] leading-[1.65]">
                            <p>
                                Printable journaling cards designed to help you reflect, process, and notice patterns over time, or simply meet the moment you're in.
                            </p>
                            <p>
                                Each card includes thoughtful prompts and simple activities you can respond to in your own way. Use them once, revisit them often, or add them to a journal to track what's shifting.
                            </p>
                            <p>
                                There's no prescribed path. Just tools you can return to when it feels useful.
                            </p>
                        </div>

                        <button
                            onClick={scrollToCards}
                            className="mt-10 px-8 py-3.5 bg-[#B8A99A] hover:bg-[#A6957F] text-white rounded-lg text-sm uppercase tracking-[0.08em] transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            Choose a Card
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 2: How to Use                      */}
            {/* ═══════════════════════════════════════════ */}
            <section className="relative py-24 md:py-28 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Clarity Cards How to Use.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#FAFAF8]/70"></div>
                </div>

                <div className="relative z-10 max-w-[760px] mx-auto">
                    {/* Section Heading */}
                    <h2 className="font-display text-3xl md:text-4xl text-[#3D3530] text-center mb-10">
                        How to use the Clarity Cards
                    </h2>

                    {/* Introductory */}
                    <div className="space-y-5 text-[#5C524A] text-base leading-[1.65] mb-8">
                        <p>Some people print them and keep a small stack nearby.</p>
                        <p>Others add them to a journal or revisit the same card over time.</p>
                    </div>

                    {/* Lead-in */}
                    <p className="text-[#5C524A] text-base mb-5 font-medium">You might use one to:</p>

                    {/* Checkmark List */}
                    <ul className="space-y-4 mb-10">
                        {[
                            "capture how you're feeling today",
                            "notice patterns across days or weeks",
                            "work through a moment that feels sticky",
                            "ground yourself before or after something meaningful"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-[#5C524A] text-base">
                                <svg className="w-5 h-5 text-[#7A6E64] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Closing Lines */}
                    <div className="space-y-4 text-[#5C524A] text-base leading-[1.65]">
                        <p>Use them in whatever way fits your life right now.</p>
                        <p className="italic font-medium text-[#3D3530]">That's it. No rules. No pressure.</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 3: Card Grid                       */}
            {/* ═══════════════════════════════════════════ */}
            <section id="card-grid" className="relative py-24 md:py-28 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Clarity Cards Grid.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#F5F0EB]/60"></div>
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {clarityCards.map((card) => (
                            <Link
                                key={card.id}
                                to={`/dashboard/clarity-cards/${card.title.toLowerCase().replace(/ /g, '-')}`}
                                className="group bg-white rounded-xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)] hover:-translate-y-[2px] transition-all duration-200 cursor-pointer border border-[#E8E2DC]/60 min-h-[170px] flex flex-col"
                                tabIndex={0}
                            >
                                <h3 className="font-display text-lg md:text-xl text-[#3D3530] mb-3">
                                    {card.title}
                                </h3>
                                <p className="text-[#6B5E54] text-sm md:text-[15px] leading-relaxed flex-1">
                                    {card.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════ */}
            {/* Section 4: Gentle Closing                  */}
            {/* ═══════════════════════════════════════════ */}
            <section className="relative py-28 md:py-32 px-6">
                {/* Same background as grid for continuity */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Clarity Cards Grid.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#FAFAF8]/75"></div>
                </div>

                <div className="relative z-10 max-w-[760px] mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-4xl text-[#3D3530] mb-10">
                        Use them your way
                    </h2>

                    <div className="space-y-5 text-[#5C524A] text-base md:text-[17px] leading-[1.65]">
                        <p>There's no system to follow and no pressure to use them daily.</p>
                        <p>These cards are here for the moments you need them.</p>
                        <p>Come back whenever you want to go deeper with a pen and paper.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClarityCardsPage;
