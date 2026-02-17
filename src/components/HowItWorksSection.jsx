const steps = [
    {
        number: '1',
        title: 'Tap Into Your Timing',
        description: "Use Field, your AI companion, to get unstuck or get clear, fast. No appointments needed.",
        image: 'https://techtomister.ca/mockup/sites/1/tap.jpg',
        hasButton: true,
        offset: ''
    },
    {
        number: '2',
        title: 'Pick Your Tool',
        description: 'Clarity cards, audio breaths, journaling prompts, somatic rituals, and more.',
        image: 'https://techtomister.ca/mockup/sites/1/Pick.jpeg',
        hasProgress: true,
        offset: 'md:col-span-1 lg:col-span-1 md:mt-24'
    },
    {
        number: '3',
        title: 'Make It Yours',
        description: 'Your nervous system will know what it needs. Create a routine that sticks.',
        image: 'https://techtomister.ca/mockup/sites/1/makeityours.jpg',
        hasIcons: true,
        offset: 'md:col-span-2 lg:col-span-1 -mt-16 lg:mt-0'
    }
];

const HowItWorksSection = () => {
    return (
        <section className="py-24 relative overflow-hidden" id="how-it-works">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="https://techtomister.ca/mockup/sites/1/bg/S4.png" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-background-light/30 via-transparent to-background-light/30 dark:from-background-dark/40 dark:via-background-dark/10 dark:to-background-dark/40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <h2 className="font-display text-4xl md:text-5xl text-text-main-light dark:text-white">
                        How It Works
                    </h2>
                    <p className="max-w-md text-text-muted-light dark:text-gray-400 text-left md:text-right">
                        Here are the 3 steps to know how exactly we work to bring you back to yourself.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`group relative h-[450px] rounded-3xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-500 ${step.offset}`}
                        >
                            <img
                                alt={step.title}
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                src={step.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-10"></div>

                            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                                <span className="font-display font-bold text-7xl text-white/20 mb-2 leading-none block">{step.number}</span>
                                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-200 leading-relaxed mb-6">{step.description}</p>

                                {step.hasButton && (
                                    <button className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-full font-medium text-sm transition-colors">
                                        Get Started
                                    </button>
                                )}

                                {step.hasProgress && (
                                    <div className="w-full h-2 bg-gray-400/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-2/3"></div>
                                    </div>
                                )}

                                {step.hasIcons && (
                                    <div className="flex gap-2">
                                        <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-base">favorite</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-base">share</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tl from-background-dark/50 to-transparent blur-3xl opacity-30"></div>
        </section>
    );
};

export default HowItWorksSection;
