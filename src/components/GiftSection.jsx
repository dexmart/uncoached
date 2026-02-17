import { Link } from 'react-router-dom';

const GiftSection = () => {
    return (
        <section className="py-32 lg:py-48 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-bone">
                <img src={import.meta.env.BASE_URL + "bg/S7_ Give The Gift of Calm.png"} alt="" className="w-full h-full object-cover object-left" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/30 to-bone/90"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left - Empty for background visibility */}
                    <div className="hidden lg:block lg:col-span-7">
                        {/* Images removed to show background */}
                    </div>

                    {/* Right - Content */}
                    <div className="lg:col-span-5">
                        <h2 className="font-display text-4xl md:text-5xl mb-4 text-text-dark">
                            Give the Gift of Calm
                        </h2>
                        <p className="text-text-muted text-xl mb-6">
                            Send a thoughtful gift card and support someone in their journey.
                        </p>
                        <p className="text-text-muted leading-relaxed mb-8">
                            Choose a stress-free, meaningful gift for the ones in your life who crave more self-connection.
                        </p>

                        <Link
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 transition-all duration-300 mb-8"
                            to="/pricing"
                        >
                            Send a Gift Card Now
                        </Link>

                        <div className="flex flex-wrap gap-6 text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <span className="text-sage">✓</span>
                                <span>Send instantly</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sage">💳</span>
                                <span>Flexible amounts</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sage">🔒</span>
                                <span>Digital & secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiftSection;
