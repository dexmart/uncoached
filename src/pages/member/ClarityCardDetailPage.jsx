import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ClarityCardDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const { data, error } = await supabase
                    .from('clarity_cards')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (!data) {
                    navigate('/dashboard/clarity-cards');
                    return;
                }

                setCard(data);
            } catch (error) {
                console.error('Error fetching clarity card:', error);
                navigate('/dashboard/clarity-cards');
            } finally {
                setLoading(false);
            }
        };

        fetchCard();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!card) return null;

    return (
        <div className="min-h-screen bg-bone">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center -mb-20">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-clay/20 to-golden/10"></div>
                <div className="relative z-10 text-center px-6 -mt-10">
                    <Link
                        to="/dashboard/clarity-cards"
                        className="inline-flex items-center gap-2 text-text-dark/70 hover:text-text-dark transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">Back to Deck</span>
                    </Link>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative z-20 px-6 pb-24">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-clay/20 relative overflow-hidden">

                        {/* Decorative background elements */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-sage/5 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-clay/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-medium uppercase tracking-wider rounded-full mb-6">
                                    Clarity Card
                                </span>
                                <h1 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                                    {card.title}
                                </h1>
                                <div className="w-16 h-1 bg-gradient-to-r from-clay to-sage mx-auto rounded-full mt-6"></div>
                            </div>

                            {/* Prompt Typography */}
                            <div className="prose prose-lg mx-auto prose-p:text-text-dark/80 prose-p:leading-relaxed prose-headings:font-display prose-headings:text-text-dark prose-a:text-sage">
                                {card.description && (
                                    <div className="text-center text-xl md:text-2xl font-display leading-relaxed text-text-dark/90 mb-10">
                                        "{card.description}"
                                    </div>
                                )}

                                <div dangerouslySetInnerHTML={{ __html: card.content?.body || '<p>Take a few moments to journal or reflect on this.</p>' }} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClarityCardDetailPage;
