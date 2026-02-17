import { useState } from 'react';
import { Link } from 'react-router-dom';

const AffirmationsPage = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [copiedId, setCopiedId] = useState(null);

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'self-worth', name: 'Self-Worth' },
        { id: 'calm', name: 'Calm' },
        { id: 'strength', name: 'Strength' },
        { id: 'trust', name: 'Trust' }
    ];

    // Sample affirmations - will be loaded from Supabase
    const affirmations = [
        { id: 1, text: 'I am allowed to take up space.', category: 'self-worth' },
        { id: 2, text: 'My feelings are valid, even when they\'re uncomfortable.', category: 'self-worth' },
        { id: 3, text: 'I don\'t have to fix everything right now.', category: 'calm' },
        { id: 4, text: 'This moment will pass.', category: 'calm' },
        { id: 5, text: 'I have survived hard things before.', category: 'strength' },
        { id: 6, text: 'I am capable of handling what comes.', category: 'strength' },
        { id: 7, text: 'I can trust myself to figure this out.', category: 'trust' },
        { id: 8, text: 'I don\'t need to know everything to move forward.', category: 'trust' },
        { id: 9, text: 'My worth is not determined by my productivity.', category: 'self-worth' },
        { id: 10, text: 'I am doing the best I can with what I have.', category: 'strength' },
        { id: 11, text: 'It\'s okay to rest.', category: 'calm' },
        { id: 12, text: 'I trust the timing of my life.', category: 'trust' }
    ];

    const filteredAffirmations = activeCategory === 'all'
        ? affirmations
        : affirmations.filter(a => a.category === activeCategory);

    const handleCopy = async (affirmation) => {
        try {
            await navigator.clipboard.writeText(affirmation.text);
            setCopiedId(affirmation.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

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
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                        ? 'bg-sage text-bone'
                                        : 'bg-white text-text-muted hover:bg-clay/20 border border-clay/20'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Affirmations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredAffirmations.map(affirmation => (
                            <div
                                key={affirmation.id}
                                className="group bg-white rounded-2xl p-6 shadow-sm border border-clay/20 hover:shadow-md transition-all relative"
                            >
                                <p className="text-text-dark text-lg font-display leading-relaxed pr-10">
                                    "{affirmation.text}"
                                </p>
                                <span className="text-sage text-xs font-medium uppercase tracking-wider mt-3 block">
                                    {affirmation.category.replace('-', ' ')}
                                </span>

                                <button
                                    onClick={() => handleCopy(affirmation)}
                                    className={`absolute top-4 right-4 p-2 rounded-full transition-all ${copiedId === affirmation.id
                                            ? 'bg-sage text-bone'
                                            : 'bg-clay/10 text-text-muted opacity-0 group-hover:opacity-100 hover:bg-sage hover:text-bone'
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
                </div>
            </section>
        </div>
    );
};

export default AffirmationsPage;
