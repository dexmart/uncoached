const TrustBar = () => {
    const partners = ['Calm', 'headspace', 'Breathwrk', 'InsightTimer', 'SMILING MIND'];

    return (
        <section className="py-12 border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 relative z-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-medium tracking-widest text-text-muted-light dark:text-gray-500 uppercase mb-8">
                    Trusted by leading self-care and wellness platforms
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <h3 key={index} className="font-display text-2xl font-bold">{partner}</h3>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
