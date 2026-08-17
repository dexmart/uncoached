import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

// Filter chips. A practitioner matches when the category words appear anywhere
// in their (free-text) areas of focus, so Johanna doesn't have to police wording.
const CATEGORIES = [
    'All',
    'Trauma',
    'Somatic',
    'Nervous System',
    'Hormone & Functional Health',
    'Relationship',
    'Integration',
    'Spiritual',
    'EMDR',
];

const STEPS = [
    {
        title: 'Initial Contact',
        body: 'A short introduction and a website or professional profile is shared.',
    },
    {
        title: 'Connection Conversation',
        body: 'If aligned, we schedule a brief conversation or sample session to experience the work directly.',
    },
    {
        title: 'Alignment Review',
        body: "Practitioners are selected based on alignment with Uncoached's spirit and values — not payment.",
    },
    {
        title: 'Curated Listing',
        body: 'Not everyone who reaches out is included. The list stays intentionally small and curated.',
    },
];

const initials = (name = '') =>
    name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

const Detail = ({ icon, children }) => (
    <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-golden-deep text-base leading-6">{icon}</span>
        <span>{children}</span>
    </div>
);

const PractitionerCard = ({ p }) => (
    <div className="flex flex-col bg-white rounded-2xl border border-clay/30 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {p.photo_url ? (
            <img src={p.photo_url} alt={p.full_name} className="w-full aspect-[4/3] object-cover" />
        ) : (
            <div className="w-full aspect-[4/3] bg-sage/10 flex items-center justify-center">
                <span className="font-display text-4xl text-sage/60">{initials(p.full_name)}</span>
            </div>
        )}

        <div className="flex flex-col flex-1 p-6">
            <h3 className="font-display text-lg text-text-dark leading-tight">
                {p.full_name}
                {p.credentials && (
                    <span className="text-text-muted text-sm font-body"> · {p.credentials}</span>
                )}
            </h3>
            {p.areas_of_focus && (
                <p className="text-text-tertiary text-xs uppercase tracking-wide mt-1">{p.areas_of_focus}</p>
            )}

            {p.bio && (
                <p className="text-sm text-text-muted leading-relaxed mt-3">{p.bio}</p>
            )}

            <dl className="space-y-2 text-sm text-text-muted mt-4 mb-6">
                {p.countries && <Detail icon="location_on">{p.countries}</Detail>}
                {p.delivery && <Detail icon="videocam">{p.delivery}</Detail>}
                {p.languages && <Detail icon="translate">{p.languages}</Detail>}
            </dl>

            <div className="mt-auto flex flex-wrap items-center gap-4">
                {p.website_url && (
                    <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-sage hover:underline">
                        Visit website
                        <span className="material-symbols-outlined text-base">arrow_outward</span>
                    </a>
                )}
                {p.social_url && (
                    <a href={/^https?:\/\//i.test(p.social_url) ? p.social_url : undefined}
                        target="_blank" rel="noopener noreferrer"
                        className={`text-sm ${/^https?:\/\//i.test(p.social_url) ? 'text-sage hover:underline' : 'text-text-tertiary cursor-default'}`}>
                        {p.social_url}
                    </a>
                )}
            </div>
        </div>
    </div>
);

const PractitionersPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [practitioners, setPractitioners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Approved applications are published through a view that exposes only the
    // fields the Partnership guide promises will be shown publicly.
    useEffect(() => {
        let active = true;
        supabase
            .from('public_practitioners')
            .select('*')
            .order('created_at', { ascending: true })
            .then(({ data, error }) => {
                if (error) console.error('Load practitioners failed:', error);
                if (active) {
                    setPractitioners(data || []);
                    setLoading(false);
                }
            });
        return () => { active = false; };
    }, []);

    const visible =
        activeCategory === 'All'
            ? practitioners
            : practitioners.filter((p) =>
                (p.areas_of_focus || '').toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0])
            );

    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-sage/90" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-golden-light uppercase tracking-[0.2em] text-xs md:text-sm mb-5">
                        Trusted Practitioners Around the World
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-bone leading-tight mb-6">
                        Find someone whose approach <span className="italic">resonates</span>.
                    </h1>
                    <p className="text-bone/85 text-base md:text-lg leading-relaxed font-light">
                        The professionals listed here are people personally trusted or worked with.
                        There are no affiliate links and no commissions. This page exists simply to
                        help you find practitioners whose approach may resonate with you.
                    </p>
                </div>
            </section>

            {/* Core principles */}
            <section className="px-6 lg:px-12 py-16 md:py-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { icon: 'link_off', title: 'No affiliate links', body: 'Nothing here is a paid placement.' },
                        { icon: 'payments', title: 'No commissions or kickbacks', body: 'We never earn from a referral.' },
                        { icon: 'verified', title: 'Included on trust, not payment', body: 'Listed only when the work aligns.' },
                    ].map((item) => (
                        <div key={item.title} className="bg-white rounded-2xl border border-clay/30 p-6 text-center">
                            <span className="material-symbols-outlined text-golden-deep text-3xl mb-3">{item.icon}</span>
                            <h3 className="font-display text-lg text-text-dark mb-2">{item.title}</h3>
                            <p className="text-text-muted text-sm">{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Directory */}
            <section className="px-6 lg:px-12 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto">
                    {/* Category filters */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCategory === category
                                        ? 'bg-sage text-bone'
                                        : 'bg-white text-text-muted border border-clay/40 hover:border-sage/40'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-16">
                            <div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visible.map((p) => (
                                <PractitionerCard key={p.id} p={p} />
                            ))}
                        </div>
                    )}

                    {!loading && visible.length === 0 && (
                        <p className="text-center text-text-muted mt-10">
                            {practitioners.length === 0
                                ? 'Our first practitioners are being welcomed in. Check back soon.'
                                : 'No practitioners in this category yet.'}
                        </p>
                    )}
                </div>
            </section>

            {/* Selection process */}
            <section className="bg-clay/30 px-6 lg:px-12 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-3">
                            How practitioners are chosen
                        </h2>
                        <p className="text-text-muted max-w-xl mx-auto">
                            A small, intentional process to keep this list trustworthy.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map((step, idx) => (
                            <div key={step.title} className="bg-bone rounded-2xl p-6 border border-clay/40">
                                <div className="h-9 w-9 rounded-full bg-sage text-bone flex items-center justify-center font-display mb-4">
                                    {idx + 1}
                                </div>
                                <h3 className="font-display text-lg text-text-dark mb-2">{step.title}</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Be featured CTA */}
            <section className="px-6 lg:px-12 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-5">
                        Interested in being featured?
                    </h2>
                    <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
                        Uncoached occasionally adds new practitioners to this list when their work
                        aligns with the values and approach of the platform. If you are a therapist,
                        counselor, somatic practitioner, nervous system specialist, or other
                        wellbeing professional and feel your work may be a good fit, you're welcome
                        to reach out.
                    </p>
                    <a
                        href="mailto:hello@uncoached.space"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all shadow-lg"
                    >
                        <span className="material-symbols-outlined text-base">mail</span>
                        hello@uncoached.space
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PractitionersPage;
