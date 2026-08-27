import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';

const MeetFieldSection = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line py-16 lg:py-24 px-6 lg:px-12 relative bg-bone" id="chat">
            {/* Background — desktop only; on mobile the phone mockup stacks above the text */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-bone hidden lg:block">
                <img src={import.meta.env.BASE_URL + "bg/S5_ Meet Field - homepage.png"} alt="" className="w-full h-full object-cover object-left" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,_#F4F1EC_20%,_transparent_80%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left - Phone Mockup */}
                <div className="relative">
                    <img
                        src={import.meta.env.BASE_URL + "images/field-chat-interface.png"}
                        alt="Start chatting with Field"
                        className="w-full max-w-xs mx-auto relative z-10 drop-shadow-2xl lg:translate-x-36"
                    />
                </div>

                {/* Right - Content */}
                <div>
                    <h2 className="font-display text-4xl md:text-5xl mb-4 leading-tight text-text-dark">
                        {copy('home.field.title')}
                    </h2>
                    <p className="text-golden-deep text-xl mb-6 font-medium">
                        {copy('home.field.subtitle')}
                    </p>
                    <p className="text-text-muted text-lg mb-4 leading-relaxed">
                        {copy('home.field.body1')}
                    </p>
                    <p className="text-text-muted leading-relaxed mb-4">
                        {copy('home.field.body2')}
                    </p>
                    <p className="text-text-muted leading-relaxed mb-4">
                        {copy('home.field.body3')}
                    </p>
                    <p className="text-text-muted leading-relaxed mb-8">
                        {copy('home.field.body4')}
                    </p>

                    <Link
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 transition-all duration-300 mb-8"
                        to="/pricing"
                    >
                        {copy('home.field.cta')}
                    </Link>

                    <p className="text-text-muted text-sm italic mb-8">
                        {copy('home.field.disclaimer')}
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
