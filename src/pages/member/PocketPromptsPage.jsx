import { useState } from 'react';
import { Link } from 'react-router-dom';

const PocketPromptsPage = () => {
    const [copiedId, setCopiedId] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Prompts' },
        { id: 'self-reflection', name: 'Self-Reflection' },
        { id: 'relationships', name: 'Relationships' },
        { id: 'decisions', name: 'Decisions' },
        { id: 'emotions', name: 'Emotions' }
    ];

    // Sample prompts - will be loaded from Supabase
    const prompts = [
        {
            id: 1,
            title: 'The Real Question',
            prompt: 'What am I really asking myself right now?',
            category: 'self-reflection'
        },
        {
            id: 2,
            title: 'Fear vs Wisdom',
            prompt: 'Is this fear talking, or is this wisdom?',
            category: 'decisions'
        },
        {
            id: 3,
            title: 'The Unspoken',
            prompt: 'What am I not saying that needs to be said?',
            category: 'relationships'
        },
        {
            id: 4,
            title: 'Body Wisdom',
            prompt: 'What is my body trying to tell me right now?',
            category: 'emotions'
        },
        {
            id: 5,
            title: 'Permission Slip',
            prompt: 'What do I need to give myself permission to do?',
            category: 'self-reflection'
        },
        {
            id: 6,
            title: 'The Pattern',
            prompt: 'Have I been here before? What pattern am I in?',
            category: 'self-reflection'
        },
        {
            id: 7,
            title: 'Worst Case',
            prompt: 'What is the worst that could happen, and could I survive it?',
            category: 'decisions'
        },
        {
            id: 8,
            title: 'The Other Side',
            prompt: 'What might they be feeling that I haven\'t considered?',
            category: 'relationships'
        },
        {
            id: 9,
            title: 'The Need',
            prompt: 'What do I actually need right now?',
            category: 'emotions'
        },
        {
            id: 10,
            title: 'Future Self',
            prompt: 'What would my future self thank me for doing today?',
            category: 'decisions'
        }
    ];

    const filteredPrompts = activeCategory === 'all'
        ? prompts
        : prompts.filter(p => p.category === activeCategory);

    const handleCopy = async (prompt) => {
        try {
            await navigator.clipboard.writeText(prompt.prompt);
            setCopiedId(prompt.id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen bg-bone">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-sage/30 to-clay/20"></div>

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
                        Pocket Prompts
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
                        Clarity through questions. Sometimes, the right question is all you need.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-text-muted text-lg leading-relaxed">
                        These prompts are designed to help you cut through the noise and get to what matters.
                        Copy them to your notes, journal with them, or just sit with them for a moment.
                        You don't need to answer right away—sometimes just holding the question is enough.
                    </p>
                </div>
            </section>

            {/* Prompts Library */}
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

                    {/* Prompts List */}
                    <div className="space-y-4">
                        {filteredPrompts.map(prompt => (
                            <div
                                key={prompt.id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-clay/20 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="text-sage text-xs font-medium uppercase tracking-wider">
                                            {prompt.category.replace('-', ' ')}
                                        </span>
                                        <h3 className="font-display text-lg text-text-dark mt-1 mb-2">
                                            {prompt.title}
                                        </h3>
                                        <p className="text-text-muted text-lg italic">
                                            "{prompt.prompt}"
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(prompt)}
                                        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${copiedId === prompt.id
                                                ? 'bg-sage text-bone'
                                                : 'bg-clay/10 text-text-muted hover:bg-sage hover:text-bone'
                                            }`}
                                    >
                                        {copiedId === prompt.id ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Copied!
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PocketPromptsPage;
