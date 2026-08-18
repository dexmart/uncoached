import { useState } from 'react';
import { useCopy } from '../context/SiteCopyContext';

// Kit (kit.com) form — submissions post to Kit in the background so we can keep
// the site's own branding instead of embedding Kit's styled form.
// Public uid is e18ff44489; the subscription endpoint uses the numeric form id
// (8339647) — this is exactly the endpoint Kit's own embed script posts to.
const KIT_FORM_ID = '8339647';
const KIT_ENDPOINT = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

const SubscribeSection = () => {
    const copy = useCopy();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || status === 'loading') return;

        setStatus('loading');
        try {
            const res = await fetch(KIT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email_address: email.trim() }),
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Newsletter signup error:', err);
            setStatus('error');
        }
    };

    return (
        <section className="py-40 lg:py-60 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src={import.meta.env.BASE_URL + "bg/S8 - Subscribe.png"} alt="" className="w-full h-full object-cover object-bottom" />
                <div className="absolute inset-0 bg-charcoal/70"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-display text-3xl md:text-4xl mb-4 text-bone italic">
                    {copy('home.subscribe.title')}
                </h2>
                <p className="text-bone/80 mb-8 max-w-xl mx-auto">
                    {copy('home.subscribe.body')}
                </p>

                {status === 'success' ? (
                    <p className="text-bone font-medium text-lg max-w-md mx-auto bg-sage/30 border border-sage/40 rounded-lg py-4 px-6 backdrop-blur-sm">
                        {copy('home.subscribe.success')}
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 w-full bg-bone/10 border border-bone/30 rounded-lg py-3 px-4 text-sm text-bone placeholder-bone/50 focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-all backdrop-blur-sm"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full sm:w-auto px-8 py-3 bg-sage text-bone rounded-lg font-medium hover:bg-sage/90 transition-all duration-300 whitespace-nowrap disabled:opacity-70"
                        >
                            {status === 'loading' ? 'Joining…' : copy('home.subscribe.cta')}
                        </button>
                    </form>
                )}

                {status === 'error' && (
                    <p className="text-bone/90 text-sm mt-3">
                        Something went wrong — please try again in a moment.
                    </p>
                )}
            </div>
        </section>
    );
};

export default SubscribeSection;
