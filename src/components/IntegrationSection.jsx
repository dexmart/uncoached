const pillars = [
    {
        title: 'Find Clarity',
        description: "Get oriented with what's actually going on, without overthinking.",
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        )
    },
    {
        title: 'Regulate Gently',
        description: 'Settle your body so your next step feels possible.',
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        )
    },
    {
        title: 'Turn Insight Into Action',
        description: 'Apply awareness to real decisions as they happen.',
        icon: (
            <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        )
    }
];

const IntegrationSection = () => {
    return (
        <section className="py-24 relative overflow-hidden" id="integrate">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S2_ How We Help You Integrate - homepage.png"}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-6">
                        How We Help You Integrate
                    </h2>
                    <p className="text-text-muted max-w-3xl mx-auto text-lg leading-relaxed">
                        Uncoached helps insight from therapy, coaching, and inner work settle into real choices and real life, right when you need it, so you can move on with your day.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-sm border border-clay/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="mb-4">
                                {pillar.icon}
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-3 text-text-dark">{pillar.title}</h3>
                            <p className="text-text-muted leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-text-tertiary text-sm italic mt-12">
                    Designed to complement therapy and coaching, not replace it.
                </p>
            </div>
        </section>
    );
};

export default IntegrationSection;

