const AboutGap = () => {
    const gaps = [
        {
            icon: (
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            text: "When emotions rise unexpectedly."
        },
        {
            icon: (
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
            ),
            text: "When old patterns return."
        },
        {
            icon: (
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ),
            text: "When something feels good and you want to stay with it."
        },
        {
            icon: (
                <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                </svg>
            ),
            text: "When something feels heavy and you don't want it to derail your life."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S2 The Gap - about.png"}
                    alt="The Gap Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-bone/30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-4xl mb-6 text-text-dark">The Gap No One Talks About</h2>
                    <p className="text-xl text-text-muted mb-4">
                        Most personal growth focuses on understanding. <br />
                        But understanding alone does not create change.
                    </p>
                    <p className="text-2xl font-serif text-golden-deep italic">
                        Change happens in ordinary moments.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
                    {gaps.map((gap, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all flex flex-col items-center gap-4">
                            {gap.icon}
                            <p className="text-text-dark font-medium text-lg">{gap.text}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto bg-sage/5 p-8 rounded-3xl border border-sage/10 mb-12">
                    <p className="text-lg text-text-muted leading-relaxed">
                        Without support in those moments, even the deepest insights fade. <br />
                        <span className="font-semibold text-text-dark">Not because you're failing. But because integration was never built into the process.</span>
                    </p>
                </div>

                <p className="text-xl text-text-dark font-bold text-center">
                    You don't need more advice, you need something that helps you come back to yourself in the moment.
                </p>
            </div>
        </section>
    );
};

export default AboutGap;
