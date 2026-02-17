const AboutShift = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S4 The Shift - about.png"}
                    alt="The Shift Background"
                    className="w-full h-full object-cover"
                />
                {/* Overlay might need adjustment depending on image dark/light */}
                <div className="absolute inset-0 bg-gradient-to-r from-bone via-bone/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                {/* Content on Left usually for alternation */}
                <div className="lg:col-span-6">
                    <h2 className="font-display text-4xl mb-6 text-text-dark">The Shift</h2>
                    <p className="text-xl text-text-muted mb-8 italic">
                        When support becomes available in real time, something changes.
                    </p>
                    <div className="space-y-4 text-text-dark text-lg md:text-xl">
                        <p>You stop treating “bad” moments as problems.</p>
                        <p>You stop chasing “good” moments for relief.</p>
                        <p>You learn how to meet whatever life brings with more steadiness, clarity, and self-trust.</p>
                    </div>
                    <div className="mt-8">
                        <a
                            className="inline-block px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                            href="/#journey"
                        >
                            Start Your Journey
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutShift;
