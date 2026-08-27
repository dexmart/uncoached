import { useCopy } from '../../context/SiteCopyContext';

const AboutPhilosophy = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S6 A Philosophy - about.png"}
                    alt="Philosophy Background"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 items-center">
                <div className="lg:col-span-6 lg:col-start-7 bg-white/40 backdrop-blur-md p-8 lg:p-12 rounded-3xl border border-white/20 shadow-sm">
                    <h2 className="font-display text-4xl mb-6 text-text-dark">{copy('about.philosophy.title')}</h2>
                    <div className="space-y-6 text-lg text-text-muted leading-relaxed">
                        <p>
                            Uncoached is built on the belief that <span className="text-text-dark font-medium">you are the only one who truly understands your life</span>, your timing, and your inner landscape.
                        </p>
                        <p>
                            The work is not about becoming someone else. <br />
                            <span className="italic font-serif text-golden-deep text-xl">{copy('about.philosophy.emphasis')}</span>
                        </p>
                        <p>
                            {copy('about.philosophy.intro')}
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-sage mt-1">●</span>
                                <span>{copy('about.philosophy.point1')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-sage mt-1">●</span>
                                <span>You stop waiting to be fixed.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-sage mt-1 flex-shrink-0">●</span>
                                <span>{copy('about.philosophy.point2')}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutPhilosophy;
