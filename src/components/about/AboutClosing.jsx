const AboutClosing = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S7 This is not for everyone_Quiet invitation.png"}
                    alt="Looking out window"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-24 text-bone/90">

                {/* Column 1: Not For Everyone */}
                <div>
                    <h3 className="font-display text-3xl mb-6 text-bone">This Is Not For Everyone</h3>
                    <div className="space-y-4 leading-relaxed font-light text-lg">
                        <p>
                            Uncoached is not for people looking for quick fixes or answers outside themselves.
                        </p>
                        <p className="font-medium text-white">There is no magic pill here.</p>
                        <p>
                            It is for those who are willing to practice, stay present, and integrate what they already know into daily life until it becomes automatic.
                        </p>
                        <p>
                            It is for people who are ready to live their growth, not just understand it.
                        </p>
                    </div>
                </div>

                {/* Column 2: Quiet Invitation */}
                <div className="border-l border-white/10 pl-8 lg:pl-12">
                    <h3 className="font-display text-3xl mb-6 text-bone">A Quiet Invitation</h3>
                    <div className="space-y-4 leading-relaxed font-light text-lg">
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>If you feel tired of consuming and ready to embody.</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>If you want support that meets you in real life, not just in theory.</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>If you are ready to become your own most trusted guide.</span>
                        </p>
                        <p className="text-2xl font-display text-golden-light mt-8">Uncoached is here.</p>
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

export default AboutClosing;
