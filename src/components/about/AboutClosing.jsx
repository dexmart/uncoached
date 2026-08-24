import { Link } from 'react-router-dom';
import { useCopy } from '../../context/SiteCopyContext';

const AboutClosing = () => {
    const copy = useCopy();
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
                    <h3 className="font-display text-3xl mb-6 text-bone">{copy('about.closing.title1')}</h3>
                    <div className="space-y-4 leading-relaxed font-light text-lg">
                        <p>
                            {copy('about.closing.body1')}
                        </p>
                        <p className="font-medium text-white">There is no magic pill here.</p>
                        <p>
                            {copy('about.closing.body2')}
                        </p>
                        <p>
                            {copy('about.closing.body3')}
                        </p>
                    </div>
                </div>

                {/* Column 2: Quiet Invitation */}
                <div className="border-l border-white/10 pl-8 lg:pl-12">
                    <h3 className="font-display text-3xl mb-6 text-bone">{copy('about.closing.title2')}</h3>
                    <div className="space-y-4 leading-relaxed font-light text-lg">
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>{copy('about.closing.invite1')}</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>{copy('about.closing.invite2')}</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-golden-light text-xl font-bold flex-shrink-0">✓</span>
                            <span>{copy('about.closing.invite3')}</span>
                        </p>
                        <p className="text-2xl font-display text-golden-light mt-8">Uncoached is here.</p>
                    </div>

                    <div className="mt-8">
                        <Link
                            className="inline-block px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                            to="/pricing"
                        >
                            {copy('about.closing.cta')}
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutClosing;
