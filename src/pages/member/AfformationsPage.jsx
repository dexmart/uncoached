import { useState } from 'react';
import { Link } from 'react-router-dom';

const AFFORMATIONS_DATA = [
    {
        id: '1',
        title: 'When Anxiety Shows Up',
        categories: ['Calm', 'Regulation'],
        questions: [
            'Why does my body know how to return to calm so naturally?',
            'Why am I becoming so good at settling my nervous system?',
            'How is calm becoming my natural response more and more?'
        ]
    },
    {
        id: '2',
        title: "When You're Waiting for an Answer",
        categories: ['Trust'],
        questions: [
            'Why do things tend to work out in my favour?',
            'Why am I so good at trusting the timing of my life?',
            'Why does patience come more easily to me now?'
        ]
    },
    {
        id: '3',
        title: 'When You Feel Invisible',
        categories: ['Self-Worth'],
        questions: [
            'Why am I allowed to take up space exactly as I am?',
            'Why do people naturally appreciate what I bring to a room?',
            'Why does my presence matter more than I realize?'
        ]
    },
    {
        id: '4',
        title: 'When You Feel Like You Messed Something Up',
        categories: ['Strength', 'Self-Trust'],
        questions: [
            'Why am I so good at learning and growing from mistakes?',
            'Why do challenges keep making me stronger?',
            'Why do I bounce back more easily than I expect?'
        ]
    },
    {
        id: '5',
        title: "When You're Comparing Yourself",
        categories: ['Self-Worth'],
        questions: [
            'Why is my path unfolding in exactly the right way for me?',
            'Why do I trust my own timeline more every year?',
            'Why are my gifts so uniquely valuable?'
        ]
    },
    {
        id: '6',
        title: 'When You Need Permission to Rest',
        categories: ['Calm', 'Permission'],
        questions: [
            'Why is it becoming easier for me to honour my need for rest?',
            'Why does slowing down actually help me thrive?',
            'Why do I respect my energy more and more?'
        ]
    },
    {
        id: '7',
        title: "When You're Overthinking a Decision",
        categories: ['Trust'],
        questions: [
            'Why does clarity always find me when I give it space?',
            'Why do I trust myself to make the right choice for me right now?',
            'Why is it safe for me to move forward, even without all the answers?'
        ]
    },
    {
        id: '8',
        title: "When You're Afraid to Take a Risk",
        categories: ['Strength', 'Resilience'],
        questions: [
            'Why am I so capable of handling whatever comes next?',
            'Why does stepping into the unknown keep expanding my life beautifully?',
            'Why do I believe in my ability to figure things out along the way?'
        ]
    }
];

const AfformationsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedCardId, setExpandedCardId] = useState('1'); // Match mockup which has card 1 open

    // Extract unique categories dynamically
    const uniqueCategories = ['All', ...new Set(AFFORMATIONS_DATA.flatMap(card => card.categories))];

    const filteredCards = activeFilter === 'All'
        ? AFFORMATIONS_DATA
        : AFFORMATIONS_DATA.filter(card => card.categories.includes(activeFilter));

    const toggleCard = (id) => {
        setExpandedCardId(prev => (prev === id ? null : id));
    };

    return (
        <div className="min-h-screen relative font-sans">
            {/* Global Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Extra Backgrounds.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Main Scrolling Content */}
            <div className="relative z-10 pb-32">
                {/* Fixed Nav Link */}
                <Link
                    to="/dashboard"
                    className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-[#F4F1EC] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">Back to Portal</span>
                </Link>

                {/* SECTION 1: INTRO / HERO AREA */}
                <section className="px-6 pt-[120px] pb-[60px] md:pt-[160px] md:pb-[80px] flex items-center justify-center">
                    <div className="w-full max-w-[700px] mx-auto text-center animate-fade-in-up bg-[#F4F1EC]/85 backdrop-blur-md p-8 md:p-12 rounded-[32px] shadow-sm border border-white/40">
                        <h1 className="font-serif text-[40px] md:text-[48px] text-[#1F2422] font-medium mb-6">
                            Af<span className="italic text-[#3F5D4D]">for</span>mations
                        </h1>

                        <h2 className="text-[18px] md:text-[20px] text-[#5E6A65] leading-[1.6] mb-8 font-sans">
                            Afformations are empowering questions you ask yourself, designed to guide your brain toward supportive answers.
                        </h2>

                        <p className="text-[16px] text-[#5E6A65] leading-[1.7] max-w-[680px] mx-auto mb-8">
                            When the brain hears a question, it naturally begins searching for an answer. This simple shift invites your mind to notice evidence that supports growth, possibility, and self-trust. Instead of forcing yourself to believe something new, afformations gently guide your brain to explore the possibility that the belief may already be true. Over time, these small questions reshape what your mind pays attention to, helping you build new patterns of thinking and identity.
                        </p>

                        <p className="text-[16px] md:text-[17px] text-[#5E6A65] italic leading-relaxed">
                            Sit with one of these questions for a moment and notice what answers your mind begins to offer.
                        </p>
                    </div>
                </section>

                {/* SECTION 2: CATEGORY FILTER BAR */}
                <section className="relative z-20 pt-[32px] md:pt-[48px] px-6 max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 hide-scrollbar justify-start lg:justify-center">
                        {uniqueCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`whitespace-nowrap rounded-full px-5 py-2 text-[13px] md:text-[14px] font-medium transition-all duration-300 ${activeFilter === category
                                    ? 'bg-[#3F5D4D] text-[#F4F1EC] border border-[#3F5D4D] shadow-sm'
                                    : 'bg-white/90 backdrop-blur-md text-[#5E6A65] border border-[#D6C7B8] hover:bg-white hover:text-[#1F2422] shadow-sm'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>

                {/* SECTION 3: AFFORMATION CARD GRID */}
                <section className="relative z-20 pt-[24px] px-6 max-w-[1000px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-start">
                        {filteredCards.map((card) => {
                            const isExpanded = expandedCardId === card.id;

                            return (
                                <div
                                    key={card.id}
                                    className={`bg-[#FFFFFF] border border-[#D6C7B8] rounded-[12px] overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-[0_8px_30px_rgba(31,36,34,0.06)]' : 'shadow-sm hover:border-[#3F5D4D]/30'}`}
                                >
                                    {/* Accordion Header */}
                                    <button
                                        onClick={() => toggleCard(card.id)}
                                        className="w-full flex items-start justify-between p-[20px] md:p-[24px] focus:outline-none"
                                        aria-expanded={isExpanded}
                                    >
                                        <div className="text-left pr-4">
                                            <h3 className="font-serif text-[16px] md:text-[18px] font-medium text-[#1F2422] mb-3">
                                                {card.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {card.categories.map(cat => (
                                                    <span key={cat} className="bg-[#F4F1EC] text-[#5E6A65] text-[11px] md:text-[12px] uppercase tracking-wider px-[12px] py-[4px] rounded-full">
                                                        {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 pt-1">
                                            <svg
                                                className={`w-5 h-5 text-[#8C857A] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Accordion Content Container */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-[20px] md:px-[24px] pb-[24px] pt-2 border-t border-[#F4F1EC]">
                                            <ul className="space-y-[10px] md:space-y-[12px]">
                                                {card.questions.map((question, idx) => (
                                                    <li key={idx} className="flex items-start text-[14px] md:text-[15px] text-[#5E6A65] leading-[1.6]">
                                                        <span className="text-[#C89A5B] mr-3 mt-[7px] text-[8px] flex-shrink-0">●</span>
                                                        <span>{question}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredCards.length === 0 && (
                        <div className="text-center py-20 bg-[#FFFFFF] rounded-[16px] border border-[#D6C7B8]/50">
                            <p className="text-[16px] text-[#5E6A65]">No afformation moments found in this category.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AfformationsPage;
