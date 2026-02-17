const DeeperWorkSection = () => {
    return (
        <section className="py-24 relative overflow-hidden" id="deeper-work">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <img src={import.meta.env.BASE_URL + "bg/S3_ Deeper work, on your own timing - homepage.png"} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/60 to-bone"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Empty for background visibility */}
                    <div className="order-2 lg:order-1 hidden lg:block">
                        {/* Image removed to show background */}
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4 leading-tight">
                            Deeper work, on your<br />own timing
                        </h2>
                        <p className="text-text-muted text-lg mb-6">
                            Because insight matters most when it becomes part of how you live.
                        </p>
                        <p className="text-text-muted leading-relaxed mb-4">
                            Uncoached offers a quiet, supportive space for integrating therapy, coaching, and personal work into specific moments in everyday life.
                        </p>
                        <p className="text-text-muted leading-relaxed mb-8">
                            No rushing. No fixing. Just tools that help awareness take root gently, privately, and at your own pace.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="text-sage text-lg">✓</span>
                                <span className="text-text-muted">Building emotional resilience for real life.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-sage text-lg">✓</span>
                                <span className="text-text-muted">Grounded tools for everyday regulation and clarity.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-sage text-lg">✓</span>
                                <span className="text-text-muted">A judgment-free space for honest self-connection.</span>
                            </li>
                        </ul>

                        <a
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300"
                        >
                            Our Approach
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeeperWorkSection;
