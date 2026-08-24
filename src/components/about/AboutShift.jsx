import { Link } from 'react-router-dom';
import { useCopy } from '../../context/SiteCopyContext';

const AboutShift = () => {
    const copy = useCopy();
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
                    <h2 className="font-display text-4xl mb-6 text-text-dark">{copy('about.shift.title')}</h2>
                    <p className="text-xl text-text-muted mb-8 italic">
                        {copy('about.shift.intro')}
                    </p>
                    <div className="space-y-4 text-text-dark text-lg md:text-xl">
                        <p>{copy('about.shift.point1')}</p>
                        <p>{copy('about.shift.point2')}</p>
                        <p>{copy('about.shift.point3')}</p>
                    </div>
                    <div className="mt-8">
                        <Link
                            className="inline-block px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                            to="/pricing"
                        >
                            {copy('about.hero.cta')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutShift;
