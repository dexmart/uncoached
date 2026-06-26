import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORIES = [
    'All',
    'Trauma Therapists',
    'Somatic Practitioners',
    'Nervous System Specialists',
    'Hormone & Functional Health',
    'Relationship Therapists',
    'Integration Coaches',
    'Spiritual Directors',
    'EMDR / Trauma Processing',
];

// Current featured practitioners from the spec. Specialty/location/website are
// placeholders until the owner supplies per-practitioner details and intro videos.
const PRACTITIONERS = [
    { name: 'Joanne Darlaston', category: 'Trauma Therapists' },
    { name: 'Andres Saborio', category: 'Somatic Practitioners' },
    { name: 'Melissa Huerta', category: 'Nervous System Specialists' },
    { name: 'Camila Zamora', category: 'Integration Coaches' },
    { name: 'Jennifer Olejarz', category: 'Relationship Therapists' },
    { name: 'Katharine Brayne', category: 'EMDR / Trauma Processing' },
    { name: 'Angela Forest', category: 'Somatic Practitioners' },
    { name: 'Erika Belenger', category: 'Hormone & Functional Health' },
    { name: 'Dora Praxedis', category: 'Spiritual Directors' },
    { name: 'Laura Wall', category: 'Trauma Therapists' },
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

const initials = (name) =>
    name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('');

const PractitionerCard = ({ practitioner }) => (
    <div className="flex flex-col bg-white rounded-2xl border border-clay/30 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Video introduction placeholder (2-5 min intro) */}
        <div className="relative aspect-video bg-charcoal/90 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-bone/70">
                <span className="material-symbols-outlined text-5xl">play_circle</span>
                <span className="text-xs uppercase tracking-widest">Intro video coming soon</span>
            </div>
        </div>

        <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-sage/15 text-sage flex items-center justify-center font-display text-lg flex-shrink-0">
                    {initials(practitioner.name)}
                </div>
                <div>
                    <h3 className="font-display text-lg text-text-dark leading-tight">
                        {practitioner.name}
                    </h3>
                    <p className="text-text-tertiary text-xs uppercase tracking-wide">
                        {practitioner.category}
                    </p>
                </div>
            </div>

            <dl className="space-y-2 text-sm text-text-muted mb-6">
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-golden-deep text-base">location_on</span>
                    <span>Online &amp; in-person availability</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-golden-deep text-base">favorite</span>
                    <span>{practitioner.category}</span>
                </div>
            </dl>

            <span className="mt-auto inline-flex items-center justify-center gap-1 text-sm font-medium text-sage cursor-default">
                Website link coming soon
            </span>
        </div>
    </div>
);

const PractitionersPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const visible =
        activeCategory === 'All'
            ? PRACTITIONERS
            : PRACTITIONERS.filter((p) => p.category === activeCategory);

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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visible.map((practitioner) => (
                            <PractitionerCard key={practitioner.name} practitioner={practitioner} />
                        ))}
                    </div>

                    {visible.length === 0 && (
                        <p className="text-center text-text-muted mt-10">
                            No practitioners in this category yet.
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
