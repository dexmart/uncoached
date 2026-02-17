const AboutHero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S1 Hero - about.png"}
                    alt="About Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                <div className="max-w-3xl text-center mx-auto">
                    {/* Logo */}
                    <img
                        src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.png"}
                        alt="Uncoached Logo"
                        className="h-24 w-auto mb-12 mx-auto drop-shadow-md"
                    />

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-bone mb-6 leading-tight">
                        It's not about what you know. <br />
                        <span className="italic">It's about how you live.</span>
                    </h1>

                    <div className="text-bone/90 text-lg md:text-xl leading-relaxed space-y-4 mb-8 font-light">
                        <p>
                            Uncoached is for people who have <em>genuinely</em> tried:
                        </p>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-2 justify-center max-w-md mx-auto text-sm md:text-base">
                            <li className="flex items-center gap-2">
                                <span className="text-golden-light text-xl font-bold">✓</span>
                                <span>The therapy.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-golden-light text-xl font-bold">✓</span>
                                <span>The books.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-golden-light text-xl font-bold">✓</span>
                                <span>The courses.</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-golden-light text-xl font-bold">✓</span>
                                <span>The podcasts.</span>
                            </li>
                        </ul>
                        <p className="font-medium text-lg md:text-xl">
                            And yet, in the middle of real life, it often feels hard to actually live them.
                        </p>
                    </div>

                    <button className="px-8 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all shadow-lg text-lg">
                        Start Your Journey
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
