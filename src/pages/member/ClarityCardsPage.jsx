import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ClarityCardsPage = () => {
    const [clarityCards, setClarityCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('clarity_cards')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setClarityCards(data || []);
        } catch (error) {
            console.error('Error fetching clarity cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToCards = () => {
        document.getElementById('card-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F0EB] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#B8A99A] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F1EC] font-sans">
            {/* Fixed Nav Link */}
            <Link
                to="/dashboard"
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-medium tracking-wide">Back to Portal</span>
            </Link>

            {/* SECTION 1: HERO SECTION */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F4F1EC]">
                {/* Background Image - Full width with gradient to left */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Clarity Card Hero.jpg"}
                        alt="Woman journaling"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay to seamlessly blend the image into the linen background on the left, but leave right clear */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EC] via-[#F4F1EC]/90 to-transparent"></div>
                </div>

                {/* Hero Content — Left aligned */}
                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-20 md:pt-0">
                    <div className="max-w-[500px] animate-fade-in-up">
                        <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3rem] text-[#1F2422] mb-6 leading-[1.15] font-medium">
                            Clarity Cards
                        </h1>

                        <div className="space-y-6 text-[#5E6A65] text-[16px] md:text-[18px] leading-[1.7]">
                            <p>
                                Printable journaling cards designed to help you reflect, process, and notice patterns over time, or simply meet the moment you're in.
                            </p>
                            <p>
                                Each card includes thoughtful prompts and simple activities you can respond to in your own way. Use them once, revisit them often, or add them to a journal to track what's shifting.
                            </p>
                            <p>
                                There's no prescribed path. Just tools you can return to when it feels useful.
                            </p>
                        </div>

                        <button
                            onClick={scrollToCards}
                            className="mt-10 px-[28px] py-[12px] bg-[#C89A5B] hover:bg-[#b0854c] text-[#F4F1EC] font-serif rounded-[8px] text-[15px] transition-all duration-300 shadow-[0_4px_14px_rgba(200,154,91,0.25)] hover:shadow-[0_6px_20px_rgba(200,154,91,0.35)]"
                        >
                            Choose a Card
                        </button>
                    </div>
                </div>
            </section>

            {/* SECTION 2: HOW TO USE */}
            <section className="relative py-24 md:py-32 px-6 bg-[#F4F1EC]">
                {/* Subtle background image */}
                <div className="absolute inset-0 z-0 opacity-[0.03]">
                    <img
                        src={import.meta.env.BASE_URL + "images/Clarity Cards How to Use.jpg"}
                        alt=""
                        className="w-full h-full object-cover grayscale"
                    />
                </div>

                <div className="relative z-10 max-w-[680px] mx-auto text-center">
                    <h2 className="font-serif font-bold text-[28px] md:text-[32px] text-[#1F2422] mb-12">
                        How to use the Clarity Cards
                    </h2>

                    <div className="space-y-6 text-[#5E6A65] text-[16px] leading-[1.7] mb-10">
                        <p>
                            Some people print them and keep a small stack nearby.<br className="hidden md:block" />
                            Others add them to a journal or revisit the same card over time.
                        </p>
                    </div>

                    <p className="text-[#5E6A65] text-[16px] mb-6 text-center">You might use one to:</p>

                    <ul className="space-y-[14px] mb-12 inline-flex flex-col text-left mx-auto">
                        {[
                            "capture how you're feeling today",
                            "notice patterns across days or weeks",
                            "work through a moment that feels sticky",
                            "ground yourself before or after something meaningful"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-[#5E6A65] text-[16px]">
                                <span className="text-[#3F5D4D] font-bold text-[18px] leading-none mt-[-2px]">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-4 text-[#5E6A65] text-[16px] leading-[1.7]">
                        <p>
                            Use them <span className="italic underline decoration-[#D6C7B8] underline-offset-4">in whatever way</span> fits your life right now.
                        </p>
                        <p>
                            That's it. No rules. No pressure.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3: CARD GRID */}
            <section id="card-grid" className="relative py-24 md:py-28 px-6 bg-[#F4F1EC]">
                {/* Very subtle texture overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05]">
                    <img
                        src={import.meta.env.BASE_URL + "images/Clarity Cards Grid.jpg"}
                        alt=""
                        className="w-full h-full object-cover grayscale"
                    />
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto">
                    {clarityCards.length === 0 ? (
                        <div className="text-center py-16 bg-[#FFFFFF] rounded-[12px] border border-[#D6C7B8]">
                            <p className="text-[#8C857A] text-lg">No cards available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {clarityCards.map((card) => (
                                <Link
                                    key={card.id}
                                    to={`/dashboard/clarity-cards/${card.id}`}
                                    className="group bg-[#FFFFFF] rounded-[12px] p-8 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col min-h-[180px]"
                                >
                                    <h3 className="font-serif font-bold text-[18px] md:text-[20px] text-[#1F2422] mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-[#5E6A65] text-[14px] md:text-[15px] leading-relaxed flex-1">
                                        {card.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-[#8F6A3D] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="font-serif italic text-[#8F6A3D] font-medium">View Card</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* SECTION 4: GENTLE CLOSING */}
            <section className="relative py-[100px] md:py-[120px] px-6 bg-[#F4F1EC]">
                {/* Background Image overlay for the closing section */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths Home Page.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#F4F1EC]/80 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 max-w-[600px] mx-auto text-center">
                    <h2 className="font-serif font-bold text-[28px] md:text-[32px] text-[#1F2422] mb-8">
                        Use them your way
                    </h2>

                    <div className="space-y-6 text-[#5E6A65] text-[16px] leading-[1.7]">
                        <p>
                            There's no system to follow and no pressure to use them daily.<br />
                            These cards are here for the moments you need them.
                        </p>
                        <p>
                            Come back whenever you want to go deeper with a pen and paper.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClarityCardsPage;
