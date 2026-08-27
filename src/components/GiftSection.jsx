import { useCopy } from '../context/SiteCopyContext';

/* GiftSection renders the homepage "Give the Gift of Calm" block. */
// GiftUp hosted gift-card order page (Stripe-backed).
const GIFTUP_ORDER_URL =
    'https://giftup.app/place-order/6157e06a-4e78-4d12-2a9f-08de0740f89c?platform=hosted';

const GiftSection = () => {
    const copy = useCopy();
    return (
        <section id="gift" className="whitespace-pre-line py-16 lg:py-48 relative overflow-hidden scroll-mt-24 bg-bone">
            {/* Background — desktop only; on mobile the image is stacked above the text */}
            <div className="absolute inset-0 z-0 hidden lg:block">
                <img src={import.meta.env.BASE_URL + "bg/S7_ Give The Gift of Calm.png"} alt="" className="w-full h-full object-cover object-left" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bone/30 to-bone/90"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Mobile image */}
                <img
                    src={import.meta.env.BASE_URL + "bg/S7_ Give The Gift of Calm.png"}
                    alt="Uncoached gift card"
                    className="lg:hidden w-full h-56 object-cover object-center rounded-2xl mb-8 shadow-md"
                />

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left - Empty for background visibility */}
                    <div className="hidden lg:block lg:col-span-7">
                        {/* Images removed to show background */}
                    </div>

                    {/* Right - Content */}
                    <div className="lg:col-span-5">
                        <h2 className="font-display text-4xl md:text-5xl mb-4 text-text-dark">
                            {copy('home.gift.title')}
                        </h2>
                        <p className="text-text-muted text-xl mb-6">
                            {copy('home.gift.subtitle')}
                        </p>
                        <p className="text-text-muted leading-relaxed mb-8">
                            {copy('home.gift.body')}
                        </p>

                        <a
                            className="inline-flex items-center gap-2 px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 transition-all duration-300 mb-8"
                            href={GIFTUP_ORDER_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {copy('home.gift.cta')}
                        </a>

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
