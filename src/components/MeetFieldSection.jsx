import { Link } from 'react-router-dom';

const MeetFieldSection = () => {
    return (
        <section className="py-24 px-6 lg:px-12 relative" id="chat">
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-bone">
                <img src={import.meta.env.BASE_URL + "bg/S5_ Meet Field - homepage.png"} alt="" className="w-full h-full object-cover object-left" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,_#F4F1EC_20%,_transparent_80%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left - Phone Mockup */}
                <div className="relative">
                    <img
                        src={import.meta.env.BASE_URL + "StructureImages/9b769083-9632-43ab-ba34-ef4350da1239-removebg-preview.png"}
                        alt="Start chatting with Field"
                        className="w-full max-w-xs mx-auto relative z-10 drop-shadow-2xl translate-x-36"
                    />
                </div>

                {/* Right - Content */}
                <div>
                    <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight text-text-dark">
                        Meet Field
                    </h2>
                    <p className="text-golden-deep text-xl mb-6 font-medium">
                        A different way to be with yourself.
                    </p>
                    <p className="text-text-muted text-lg mb-4 leading-relaxed">
                        Field is not here to coach, advise, or analyze you.
                    </p>
                    <p className="text-text-muted leading-relaxed mb-4">
                        It listens, reflects, and stays with what you bring, helping you slow down and hear yourself more clearly in moments that matter.
                    </p>
                    <p className="text-text-muted leading-relaxed mb-4">
                        You can talk things through, explore gentle prompts, try short grounding rituals, or simply pause and be with what is present.
                    </p>
                    <p className="text-text-muted leading-relaxed mb-8">
                        You decide how deep to go, when to pause, and what comes next. Field follows your lead.
                    </p>

                    <Link
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 transition-all duration-300 mb-8"
                        to="/pricing"
                    >
                        Enter Uncoached
                    </Link>

                    <p className="text-text-muted text-sm italic mb-8">
                        Field is an AI-powered companion designed to support self-led reflection, not replace human care.
                    </p>

                    <div className="flex flex-wrap gap-6 text-sm text-text-muted">
                        <div className="flex items-center gap-2">
                            <span className="text-sage">✧</span>
                            <span>No Advice. No Pressure.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sage">✧</span>
                            <span>Always Skip or Pause</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sage">🔒</span>
                            <span>Private and Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetFieldSection;
