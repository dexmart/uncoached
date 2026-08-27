import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';

const DeeperWorkSection = () => {
    const copy = useCopy();
    return (
        <section className="whitespace-pre-line py-16 lg:py-24 relative overflow-hidden bg-bone" id="deeper-work">
            {/* Background with overlay — desktop only; on mobile the image is stacked above the text */}
            <div className="absolute inset-0 z-0 hidden lg:block">
                <img src={import.meta.env.BASE_URL + "bg/S3-deeper-work-v2.jpg"} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/60 to-bone"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Mobile image. The desktop banner is 2.36:1 with the subject on the
                    left and deliberately empty light space on the right for the text to
                    sit over. Cropped to a portrait-friendly frame here, so phones get
                    the scene rather than the empty half. */}
                <img
                    src={import.meta.env.BASE_URL + "bg/S3-deeper-work-mobile.jpg"}
                    alt="Deeper work, on your own timing"
                    className="lg:hidden w-full aspect-[745/570] object-cover rounded-2xl mb-8 shadow-md"
                />

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Empty for background visibility */}
                    <div className="order-2 lg:order-1 hidden lg:block">
                        {/* Image removed to show background */}
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4 leading-tight whitespace-pre-line">
                            {copy('home.deeper.title')}
                        </h2>
                        <p className="text-text-muted text-lg mb-6">
                            {copy('home.deeper.subtitle')}
                        </p>
                        <p className="text-text-muted leading-relaxed mb-4">
                            {copy('home.deeper.body1')}
                        </p>
                        <p className="text-text-muted leading-relaxed mb-8">
                            {copy('home.deeper.body2')}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {['home.deeper.bullet1', 'home.deeper.bullet2', 'home.deeper.bullet3'].map((k) => (
                                <li key={k} className="flex items-center gap-3">
                                    <span className="text-sage text-lg">✓</span>
                                    <span className="text-text-muted">{copy(k)}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300"
                        >
                            {copy('home.deeper.cta')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeeperWorkSection;
