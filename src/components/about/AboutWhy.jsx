import { useCopy } from '../../context/SiteCopyContext';

const AboutWhy = () => {
    const copy = useCopy();
    return (
        <section className="py-24 relative overflow-hidden -mt-8">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/about/S3 Why Uncoached Exists - about.png"}
                    alt="Why Uncoached Exists Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-bone via-bone/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Right Content - based on image layout typically having image on one side, but BG is full. text on right? */}
                {/* Checking standard layout. Usually alternated. Let's maximize readability. */}
                {/* Design ref S3 image usually has visual on left. Let's put text on right. */}
                <div className="lg:col-start-2">
                    <h2 className="font-display text-4xl mb-6 text-text-dark">{copy('about.why.title')}</h2>
                    <div className="text-lg text-text-muted leading-relaxed space-y-6">
                        <p>
                            {copy('about.why.body1')}
                        </p>
                        <p>
                            {copy('about.why.body2')}
                        </p>
                        <p className="font-medium text-text-dark">
                            {copy('about.why.emphasis')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutWhy;
