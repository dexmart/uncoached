import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { parseFocusAreas } from '../lib/practitionerCategories';
import { useCopy } from '../context/SiteCopyContext';

const STEP_KEYS = [1, 2, 3, 4];
const PROMISE_KEYS = [1, 2, 3];
const PROMISE_ICONS = ['link_off', 'payments', 'verified'];

// The directory grows as practitioners are added, so only a first page is shown
// and the rest are revealed on request. Six fills two rows of three on desktop;
// on a phone the cards stack, so six is a lot of scrolling and three is plenty.
const PAGE_DESKTOP = 6;
const PAGE_MOBILE = 3;
const WIDE = '(min-width: 640px)';

const usePageSize = () => {
    const [size, setSize] = useState(() =>
        (typeof window !== 'undefined' && window.matchMedia(WIDE).matches ? PAGE_DESKTOP : PAGE_MOBILE));

    useEffect(() => {
        const mq = window.matchMedia(WIDE);
        const onChange = () => setSize(mq.matches ? PAGE_DESKTOP : PAGE_MOBILE);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    return size;
};

const initials = (name = '') =>
    name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

const Detail = ({ icon, children }) => (
    <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-golden-deep text-base leading-6">{icon}</span>
        <span>{children}</span>
    </div>
);

const PractitionerCard = ({ p, copy }) => (
    <div className="flex flex-col bg-white rounded-2xl border border-clay/30 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {p.photo_url ? (
            <img src={p.photo_url} alt={p.full_name} className="w-full aspect-[4/3] object-cover" />
        ) : (
            <div className="w-full aspect-[4/3] bg-sage/10 flex items-center justify-center">
                <span className="font-display text-4xl text-sage/60">{initials(p.full_name)}</span>
            </div>
        )}

        <div className="flex flex-col flex-1 p-6">
            {/* Name, credentials and focus areas each on their own line. Run
                together they crowded the top of the card, and the separator
                dot was left dangling whenever the credentials wrapped. */}
            <h3 className="font-display text-xl text-text-dark leading-snug">{p.full_name}</h3>

            {p.credentials && (
                <p className="text-sm text-text-muted leading-snug mt-1.5">{p.credentials}</p>
            )}

            {p.areas_of_focus && (
                <p className="text-[11px] uppercase tracking-[0.11em] text-text-tertiary leading-relaxed mt-3">
                    {p.areas_of_focus}
                </p>
            )}

            {p.bio && (
                <p className="text-sm text-text-muted leading-relaxed mt-4 pt-4 border-t border-clay/25">{p.bio}</p>
            )}

            <dl className="space-y-2 text-sm text-text-muted mt-5 mb-6">
                {p.countries && <Detail icon="location_on">{p.countries}</Detail>}
                {p.delivery && <Detail icon="videocam">{p.delivery}</Detail>}
                {p.languages && <Detail icon="translate">{p.languages}</Detail>}
            </dl>

            {p.uncoached_resource && (
                <div className="mb-5 rounded-xl bg-sage/8 border border-sage/15 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-sage font-semibold mb-1">
                        {copy('practitioners.directory.resource_label')}
                    </p>
                    <p className="text-sm text-text-dark leading-snug">{p.uncoached_resource}</p>
                </div>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-4">
                {p.website_url && (
                    <a href={p.website_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-sage hover:underline">
                        {copy('practitioners.directory.link_website')}
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
    const copy = useCopy();
    const [activeCategory, setActiveCategory] = useState('All');
    const [practitioners, setPractitioners] = useState([]);
    const [loading, setLoading] = useState(true);
    // Counted in pages, not cards, so turning a phone sideways re-flows to the
    // wider page size instead of stranding a half-filled row.
    const [pages, setPages] = useState(1);
    const pageSize = usePageSize();

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
            : practitioners.filter((p) => parseFocusAreas(p.areas_of_focus).includes(activeCategory));

    const onPage = visible.slice(0, pages * pageSize);
    const remaining = visible.length - onPage.length;

    // Focus areas are free text, so build the filters from what practitioners
    // actually wrote. Every chip is therefore guaranteed to return someone.
    const available = [
        'All',
        ...Array.from(
            new Set(practitioners.flatMap((p) => parseFocusAreas(p.areas_of_focus)))
        ).sort((a, b) => a.localeCompare(b)),
    ];

    return (
        <div className="whitespace-pre-line bg-bone text-text-dark font-body antialiased min-h-screen">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-20 px-6 lg:px-12 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-sage/90" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-golden-light uppercase tracking-[0.2em] text-xs md:text-sm mb-5">
                        {copy('practitioners.hero.eyebrow')}
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-bone leading-tight mb-6">
                        {copy('practitioners.hero.title')}{' '}
                        <span className="italic">{copy('practitioners.hero.title_emphasis')}</span>
                    </h1>
                    <p className="text-bone/85 text-base md:text-lg leading-relaxed font-light">
                        {copy('practitioners.hero.intro')}
                    </p>
                </div>
            </section>

            {/* Core principles */}
            <section className="px-6 lg:px-12 py-16 md:py-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {PROMISE_KEYS.map((n, i) => (
                        <div key={n} className="bg-white rounded-2xl border border-clay/30 p-6 text-center">
                            <span className="material-symbols-outlined text-golden-deep text-3xl mb-3">{PROMISE_ICONS[i]}</span>
                            <h3 className="font-display text-lg text-text-dark mb-2">{copy(`practitioners.promise.card${n}_title`)}</h3>
                            <p className="text-text-muted text-sm">{copy(`practitioners.promise.card${n}_body`)}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Directory */}
            <section className="px-6 lg:px-12 pb-16 md:pb-24">
                <div className="max-w-6xl mx-auto">
                    {/* Category filters */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
                        {available.map((category) => (
                            <button
                                key={category}
                                onClick={() => { setActiveCategory(category); setPages(1); }}
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
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                                {onPage.map((p) => (
                                    <PractitionerCard key={p.id} p={p} copy={copy} />
                                ))}
                            </div>

                            {visible.length > pageSize && (
                                <div className="flex flex-col items-center gap-3 mt-12">
                                    <p className="text-sm text-text-muted">
                                        Showing {onPage.length} of {visible.length}
                                    </p>
                                    {remaining > 0 ? (
                                        <button onClick={() => setPages((n) => n + 1)}
                                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sage text-bone font-medium hover:bg-sage/90 transition-colors shadow-sm">
                                            {copy('practitioners.directory.show_more')}
                                            <span className="text-bone/70 text-sm">({remaining})</span>
                                        </button>
                                    ) : (
                                        <button onClick={() => setPages(1)}
                                            className="px-6 py-2.5 rounded-full border border-clay/50 text-text-muted text-sm hover:border-sage/40 hover:text-text-dark transition-colors">
                                            {copy('practitioners.directory.show_fewer')}
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {!loading && visible.length === 0 && (
                        <p className="text-center text-text-muted mt-10">
                            {practitioners.length === 0
                                ? copy('practitioners.directory.empty')
                                : copy('practitioners.directory.empty_category')}
                        </p>
                    )}

                    {/* Independence disclaimer. Links to the Practitioner Disclaimer
                        section of the Terms, matched by its heading. */}
                    <p className="max-w-3xl mx-auto mt-14 text-center text-sm md:text-[15px] italic text-text-muted leading-relaxed">
                        {copy('practitioners.disclaimer.body')}{' '}
                        <Link to="/terms#practitioner-disclaimer"
                            className="text-sage not-italic font-medium hover:underline">
                            {copy('practitioners.disclaimer.link')}
                        </Link>
                    </p>
                </div>
            </section>

            {/* Selection process */}
            <section className="bg-clay/30 px-6 lg:px-12 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-3">
                            {copy('practitioners.process.title')}
                        </h2>
                        <p className="text-text-muted max-w-xl mx-auto">
                            {copy('practitioners.process.intro')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEP_KEYS.map((n) => (
                            <div key={n} className="bg-bone rounded-2xl p-6 border border-clay/40">
                                <div className="h-9 w-9 rounded-full bg-sage text-bone flex items-center justify-center font-display mb-4">
                                    {n}
                                </div>
                                <h3 className="font-display text-lg text-text-dark mb-2">{copy(`practitioners.process.step${n}_title`)}</h3>
                                <p className="text-text-muted text-sm leading-relaxed">{copy(`practitioners.process.step${n}_body`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Be featured CTA */}
            <section className="px-6 lg:px-12 py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-5">
                        {copy('practitioners.featured.title')}
                    </h2>
                    <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
                        {copy('practitioners.featured.body')}
                    </p>
                    <Link
                        to="/partnership"
                        className="inline-flex items-center gap-2 px-9 py-3.5 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all shadow-lg text-lg"
                    >
                        {copy('practitioners.featured.cta')}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PractitionersPage;
