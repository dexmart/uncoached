const AboutQuote = () => {
    // Requirements: "wide and short"
    return (
        <section className="py-20 relative overflow-hidden flex items-center justify-center text-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {/* This likely needs to be dark text on light, or light on dark. S5 name implies quote. */}
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S5 Uncoached Exists Quote - about.png"}
                    alt="Quote Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/60"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-bone leading-normal">
                    Uncoached exists to turn insight into lived experience by helping people build self-trust, repetition, and support in real time.
                </h3>
            </div>
        </section>
    );
};

export default AboutQuote;
