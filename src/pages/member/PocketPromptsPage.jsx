import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const PocketPromptsPage = () => {
    const { isSubscribed } = useAuth();
    const [copiedId, setCopiedId] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const [categories, setCategories] = useState([{ id: 'all', title: 'All Prompts', slug: 'all' }]);
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('pocket_prompt_categories')
                .select('id, title, slug')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;

            if (categoriesData) {
                setCategories([{ id: 'all', title: 'All Prompts', slug: 'all' }, ...categoriesData]);
            }

            // Fetch active prompts
            const { data: promptsData, error: promptsError } = await supabase
                .from('pocket_prompts')
                .select(`
                    *,
                    pocket_prompt_categories (
                        title,
                        slug
                    )
                `)
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (promptsError) throw promptsError;

            setPrompts(promptsData || []);

        } catch (error) {
            console.error('Error fetching pocket prompts data:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrompts = activeCategory === 'all'
        ? prompts
        : prompts.filter(p => p.category_id === activeCategory);

    const handleCopy = async (prompt) => {
        try {
            const textToCopy = isSubscribed && prompt.content_premium
                ? `${prompt.content_free}\n\n${prompt.content_premium}`
                : prompt.content_free;

            await navigator.clipboard.writeText(textToCopy);
            setCopiedId(prompt.id);
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
            {/* Fixed Nav Link */}
            <Link
                to="/dashboard"
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D]/80 hover:text-[#3F5D4D] transition-colors group mix-blend-multiply"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium tracking-wide">Back to Portal</span>
            </Link>

            {/* SECTION 1: INTRO / HERO AREA */}
            <section className="relative px-6 py-[80px] md:py-[120px] flex items-center justify-center border-b border-[#D6C7B8]/30 overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Extra Backgrounds 3.jpg"}
                        alt=""
                        className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                    />
                    {/* Gradient to blend seamlessly with the rest of the page */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F4F1EC]/60 via-[#F4F1EC]/80 to-[#F4F1EC]"></div>
                </div>

                <div className="relative z-10 w-full max-w-[700px] mx-auto text-center animate-fade-in-up">
                    <h1 className="font-serif text-[40px] md:text-[48px] text-[#1F2422] font-medium mb-6">
                        Pocket Prompts
                    </h1>

                    <h2 className="text-[18px] md:text-[20px] text-[#5E6A65] leading-[1.6] mb-8 font-sans">
                        Clarity through questions. Sometimes, the right question is all you need.
                    </h2>

                    <p className="text-[16px] text-[#5E6A65] leading-[1.7] max-w-[680px] mx-auto mb-10">
                        These prompts are designed to help you cut through the noise and get to what matters.
                        Copy them to your notes, journal with them, or just sit with them for a moment.
                    </p>

                    <p className="text-[16px] md:text-[17px] text-[#5E6A65] italic leading-relaxed">
                        You don't need to answer right away—sometimes just holding the question is enough.
                    </p>
                </div>
            </section>

            {/* Prompts Library */}
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

                    {/* Prompts List */}
                    {filteredPrompts.length === 0 ? (
                        <div className="text-center py-16 bg-white/50 rounded-3xl border border-clay/10">
                            <p className="text-text-muted text-lg">No prompts found in this category.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredPrompts.map(prompt => (
                                <div
                                    key={prompt.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-clay/20 hover:shadow-md transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                                        <div className="flex-1">
                                            <span className="text-sage text-xs font-medium uppercase tracking-wider bg-sage/10 px-2 py-1 rounded inline-block mb-2">
                                                {prompt.pocket_prompt_categories?.title || 'Uncategorized'}
                                            </span>
                                            <h3 className="font-display text-xl text-text-dark mb-2">
                                                {prompt.title}
                                            </h3>
                                            <p className="text-text-muted text-lg italic leading-relaxed">
                                                "{prompt.content_free}"
                                            </p>

                                            {/* Premium Content Area */}
                                            {prompt.content_premium && (
                                                <div className="mt-8 pt-6 border-t border-clay/20">
                                                    {isSubscribed ? (
                                                        <div className="animate-fade-in">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <svg className="w-4 h-4 text-golden" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                                </svg>
                                                                <span className="text-xs font-bold text-golden uppercase tracking-wider">Deep Reflection</span>
                                                            </div>
                                                            <p className="text-text-dark/80 whitespace-pre-wrap leading-relaxed">
                                                                {prompt.content_premium}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-clay/10 to-bone border border-clay/20 p-6 text-center">
                                                            {/* Blurred preview text effect */}
                                                            <div className="absolute inset-0 blur-[4px] opacity-40 select-none pointer-events-none p-6 text-left">
                                                                <p className="text-text-dark/40 whitespace-pre-wrap leading-relaxed">
                                                                    {prompt.content_premium.substring(0, 150)}...
                                                                </p>
                                                            </div>

                                                            <div className="relative z-10 flex flex-col items-center">
                                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-sage">
                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                    </svg>
                                                                </div>
                                                                <h4 className="font-display text-lg text-text-dark mb-2">Unlock the Deep Dive</h4>
                                                                <p className="text-sm text-text-muted mb-4 max-w-sm">
                                                                    Subscribe to access the high-level guided reflection for this prompt and all other premium features.
                                                                </p>
                                                                <Link
                                                                    to="/pricing"
                                                                    className="inline-block px-6 py-2.5 bg-sage text-white text-sm font-medium rounded-full hover:bg-sage/90 transition-colors shadow-sm"
                                                                >
                                                                    Upgrade to Access
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleCopy(prompt)}
                                            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all self-start ${copiedId === prompt.id
                                                ? 'bg-sage text-white shadow-sm'
                                                : 'bg-bone text-text-dark/70 hover:bg-sage hover:text-white'
                                                }`}
                                        >
                                            {copiedId === prompt.id ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Copied!
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    Copy Prompt
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default PocketPromptsPage;
