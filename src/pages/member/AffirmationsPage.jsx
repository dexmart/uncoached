import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AffirmationsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [copiedId, setCopiedId] = useState(null);

    const [categories, setCategories] = useState([{ id: 'all', title: 'All', slug: 'all' }]);
    const [affirmations, setAffirmations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('affirmation_categories')
                .select('id, title, slug')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;

            if (categoriesData) {
                setCategories([{ id: 'all', title: 'All', slug: 'all' }, ...categoriesData]);
            }

            // Fetch active affirmations
            const { data: affirmationsData, error: affirmationsError } = await supabase
                .from('affirmations')
                .select(`
                    *,
                    affirmation_categories (
                        title,
                        slug
                    )
                `)
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (affirmationsError) throw affirmationsError;

            setAffirmations(affirmationsData || []);

        } catch (error) {
            console.error('Error fetching affirmations data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAffirmations = activeCategory === 'all'
        ? affirmations
        : affirmations.filter(a => a.category_id === activeCategory);

    const handleCopy = async (affirmation) => {
        try {
            await navigator.clipboard.writeText(affirmation.text);
            setCopiedId(affirmation.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bone">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-clay/20 to-golden/10"></div>

                <div className="relative z-10 text-center px-6">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-text-dark/70 hover:text-text-dark transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">Back to Portal</span>
                    </Link>

                    <h1 className="font-display text-5xl md:text-6xl text-text-dark mb-4">
                        Affirmations
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
                        Words to come back to. Simple truths for when you need a reminder.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-text-muted text-lg leading-relaxed">
                        These aren't meant to be toxic positivity or forced optimism. They're gentle reminders—truths you might
                        know deep down but have forgotten in the noise. Read them slowly. Let them land.
                    </p>
                </div>
            </section>

            {/* Affirmations Library */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Category Filters */}
                    {categories.length > 1 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                        ? 'bg-sage text-white shadow-sm'
                                        : 'bg-white text-text-muted hover:bg-clay/20 border border-clay/20'
                                        }`}
                                >
                                    {cat.title}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Affirmations Grid */}
                    {filteredAffirmations.length === 0 ? (
                        <div className="text-center py-16 bg-white/50 rounded-3xl border border-clay/10">
                            <p className="text-text-muted text-lg">No affirmations found in this category.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredAffirmations.map(affirmation => (
                                <div
                                    key={affirmation.id}
                                    className="group bg-white rounded-2xl p-6 shadow-sm border border-clay/20 hover:shadow-md transition-all relative"
                                >
                                    <p className="text-text-dark text-lg font-display leading-relaxed pr-10">
                                        "{affirmation.text}"
                                    </p>
                                    <span className="text-sage text-xs font-medium uppercase tracking-wider mt-3 block bg-sage/10 w-fit px-2 py-1 rounded">
                                        {affirmation.affirmation_categories?.title || 'Uncategorized'}
                                    </span>

                                    <button
                                        onClick={() => handleCopy(affirmation)}
                                        className={`absolute top-4 right-4 p-2 rounded-full transition-all ${copiedId === affirmation.id
                                            ? 'bg-sage text-white shadow-sm'
                                            : 'bg-clay/10 text-text-muted opacity-0 group-hover:opacity-100 hover:bg-sage hover:text-white'
                                            }`}
                                        title="Copy to clipboard"
                                    >
                                        {copiedId === affirmation.id ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AffirmationsPage;
