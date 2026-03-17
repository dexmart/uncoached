import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AudioBreathsPage = () => {
    const [breathFamilies, setBreathFamilies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilies = async () => {
            try {
                const { data, error } = await supabase
                    .from('audio_families')
                    .select('*, audio_breaths(*)')
                    .order('sort_order', { ascending: true });

                if (error) throw error;

                const formattedFamilies = data.map(family => {
                    // Sort breaths locally by sort_order
                    const sortedBreaths = (family.audio_breaths || []).sort((a, b) => a.sort_order - b.sort_order);

                    return {
                        id: family.id,
                        title: family.title,
                        icon: family.icon,
                        description: family.description,
                        useWhen: family.use_when,
                        breaths: sortedBreaths.map(b => ({
                            id: b.id,
                            name: b.title
                        }))
                    };
                });

                setBreathFamilies(formattedFamilies);
            } catch (error) {
                console.error('Error fetching audio families:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilies();
    }, []);

    const scrollToFamilies = () => {
        document.getElementById('breath-families')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bone">
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

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths Home Page.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bone/40 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content - Centered */}
                <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center md:max-w-lg md:ml-[20%] lg:ml-[25%]">
                    {/* Brand Mark */}
                    <p className="text-text-dark/70 text-xs tracking-[0.3em] uppercase mb-6 font-medium">
                        uncoached
                    </p>

                    {/* Main Headline */}
                    <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl text-text-dark mb-5 leading-[1.15]">
                        Audio Breaths
                    </h1>

                    {/* Subheadline */}
                    <p className="text-text-dark text-base md:text-lg leading-relaxed mb-3">
                        Tiny, guided pauses to help your body settle,
                        <br />
                        reset, or gently shift state.
                    </p>

                    {/* Supporting Text */}
                    <p className="text-text-dark/70 text-sm mb-10 italic">
                        Designed for real life. About five minutes each.
                        <br />
                        No fixing required.
                    </p>

                    {/* CTA Button - Prominent */}
                    <button
                        onClick={scrollToFamilies}
                        className="px-8 py-3.5 bg-white border-2 border-text-dark/40 text-text-dark font-medium rounded-full shadow-md hover:shadow-lg hover:bg-bone hover:border-text-dark/60 transition-all duration-300 mb-5"
                    >
                        Browse Audio Breaths
                    </button>

                    {/* Scroll Hint */}
                    <p className="text-text-dark/50 text-sm">
                        Or scroll to explore
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
                    <svg className="w-5 h-5 text-text-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Why This Works Section */}
            <section className="relative py-20 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths - Why This Works.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Section Header with decorative line */}
                    <div className="text-center mb-12">
                        <p className="text-text-dark/60 text-xs tracking-[0.4em] uppercase mb-4">
                            Why This Works
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-px bg-text-dark/20"></div>
                            <div className="w-2 h-2 rounded-full bg-text-dark/20"></div>
                            <div className="w-12 h-px bg-text-dark/20"></div>
                        </div>
                    </div>

                    {/* Two Column Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Card - Why these tiny breaths matter */}
                        <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm h-full flex flex-col justify-center">
                            <h3 className="font-display text-2xl md:text-3xl text-text-dark mb-8 text-center">
                                Why these tiny breaths matter
                            </h3>
                            <div className="space-y-6 text-text-dark/80 text-center text-base leading-relaxed">
                                <p>
                                    Your breath is one of the fastest ways to communicate safety to your nervous system.
                                </p>
                                <p>
                                    A slow, steady exhale tells your body it's safe enough to soften.
                                </p>
                                <p>
                                    A gentle inhale brings just enough energy online to stay present.
                                </p>

                            </div>
                        </div>

                        {/* Right Card - What these breaths can do */}
                        <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm h-full flex flex-col justify-center">
                            <h3 className="font-display text-2xl md:text-3xl text-text-dark mb-8 text-center">
                                What these breaths can do
                            </h3>
                            <ul className="space-y-6">
                                <li className="flex items-center gap-5">
                                    <div className="text-clay opacity-80 shrink-0">
                                        {/* Heart Icon */}
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-base md:text-lg">Slows a racing heart and breath</span>
                                </li>
                                <li className="flex items-center gap-5">
                                    <div className="text-clay opacity-80 shrink-0">
                                        {/* Sparkles Icon */}
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                            <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
                                            <path d="M19 11h2m-1 -1v2" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-base md:text-lg">Signals safety through the vagus nerve</span>
                                </li>
                                <li className="flex items-center gap-5">
                                    <div className="text-clay opacity-80 shrink-0">
                                        {/* Sun/Sunset Icon */}
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 9a4 4 0 0 1 4 4" />
                                            <path d="M8 13h8" />
                                            <path d="M12 5v2" />
                                            <path d="M5.6 6.4l1.4 1.4" />
                                            <path d="M18.4 6.4l-1.4 1.4" />
                                            <path d="M3 17h18" />
                                            <path d="M6 13a6 6 0 0 1 12 0" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-base md:text-lg">Improves emotional regulation and focus</span>
                                </li>
                                <li className="flex items-center gap-5">
                                    <div className="text-clay opacity-80 shrink-0">
                                        {/* Plant Icon */}
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 20h10" />
                                            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                                            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                                            <path d="M14.1 6c-.7 2.4-.9 4.9.4 6.8" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-base md:text-lg">Helps you respond instead of react</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Closing Text */}
                    <div className="text-center mt-10">
                        <p className="text-text-dark italic text-lg opacity-90 leading-relaxed">
                            When stress hits, your body often moves first.
                            <br />
                            These breaths meet you there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Built For Real Life Section */}
            <section className="relative py-20 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths - Built For Real Life.jpg"}
                        alt=""
                        className="w-full h-full object-cover object-[center_20%]"
                    />
                </div>

                <div className="relative z-10 max-w-lg md:mr-[5%] lg:mr-[10%] ml-auto">
                    {/* Headline */}
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-4">
                        Built for real life moments
                    </h2>

                    {/* Subheadline */}
                    <p className="text-text-dark/70 text-base md:text-lg mb-10">
                        Not meditations. Just small resets for when you need one.
                    </p>

                    {/* Use Cases Card */}
                    <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm mb-10">
                        <ul className="space-y-4">
                            {[
                                'Before a difficult or charged conversation',
                                'Between meetings, tasks, or mental gear shifts',
                                'When anxiety spikes out of nowhere',
                                'In bed when your mind won\'t settle',
                                'When you want to strengthen a good or joyful feeling'
                            ].map((useCase, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <span className="text-clay text-lg mt-0.5 opacity-80">✓</span>
                                    <span className="text-text-dark/90 leading-relaxed text-sm md:text-base">{useCase}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Closing Line */}
                    <p className="text-text-dark italic text-lg opacity-90">
                        Press play and let your body find its way back.
                    </p>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="relative py-20 px-6">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths How to Use Them.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Text Block - Positioned on LEFT */}
                <div className="relative z-10 max-w-lg ml-[5%] lg:ml-[10%] mr-auto">
                    {/* Header - Centered above card */}
                    <div className="text-center mb-8">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-2">
                            How to use Audio Breaths
                        </h2>
                        <p className="text-text-dark/70 text-base">Three simple steps</p>
                    </div>

                    {/* Card Container */}
                    <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">

                        {/* Steps */}
                        <div className="space-y-8 mb-8">
                            <div className="flex items-start gap-4">
                                <span className="font-display text-2xl text-text-dark/60 mt-1">1.</span>
                                <div>
                                    <h3 className="font-medium text-text-dark text-lg mb-1">
                                        Choose what matches your current state
                                    </h3>
                                    <p className="text-text-dark/60 text-sm leading-relaxed">
                                        Not what you think you should feel. What's actually here.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="font-display text-2xl text-text-dark/60 mt-1">2.</span>
                                <div>
                                    <h3 className="font-medium text-text-dark text-lg mb-1">
                                        Press play and follow the voice
                                    </h3>
                                    <p className="text-text-dark/60 text-sm leading-relaxed">
                                        Let the pacing guide you. Your body will take it from there.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="font-display text-2xl text-text-dark/60 mt-1">3.</span>
                                <div>
                                    <h3 className="font-medium text-text-dark text-lg mb-1">
                                        Stop anytime
                                    </h3>
                                    <p className="text-text-dark/60 text-sm leading-relaxed">
                                        There's no right way to do this. No finishing line.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="w-full h-px bg-text-dark/10 mb-8"></div>

                        {/* Safety Note */}
                        <p className="text-text-dark/70 text-sm mb-8 leading-relaxed">
                            Headphones are optional. Keep your eyes open if needed,
                            especially if you're driving or on the move.
                        </p>

                        {/* Closing - Centered */}
                        <div className="text-center">
                            <p className="font-display text-lg text-text-dark italic mb-1">
                                These won't solve everything.
                            </p>
                            <p className="text-text-dark/80 italic text-sm">
                                They'll help you settle enough to choose your next step.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Audio Breath Families Section */}
            <section id="breath-families" className="py-24 px-6 bg-bone relative">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4 italic">
                            Find the breath your body is asking for
                        </h2>
                        <p className="text-text-muted text-lg">
                            Four families of short Audio Breaths, each designed for a different state.
                        </p>
                    </div>

                    {/* Families Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {breathFamilies.map((family) => (
                            <div
                                key={family.id}
                                className="bg-bone/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm flex flex-col h-full group hover:shadow-md transition-all overflow-hidden"
                            >
                                <div className="p-6 flex-1 flex flex-col items-center text-center">
                                    {/* Icon */}
                                    <div className="text-4xl mb-4">
                                        {family.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display text-xl text-text-dark mb-3">
                                        {family.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-text-dark/70 text-sm mb-6 leading-relaxed">
                                        {family.description}
                                    </p>

                                    {/* Breath Links */}
                                    <div className="space-y-3 w-full mt-auto">
                                        {family.breaths.map((breath) => (
                                            <Link
                                                key={breath.id}
                                                to={`/dashboard/audio-breaths/${breath.id}`}
                                                className="block w-full px-4 py-3 bg-white/50 rounded-xl text-sm text-text-dark hover:bg-white/80 transition-colors border border-transparent hover:border-clay/10 shadow-sm"
                                            >
                                                {breath.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Use When Footer */}
                                <div className="px-6 py-4 bg-clay/5 border-t border-clay/10 mt-auto flex items-center justify-between gap-4 group/footer cursor-default">
                                    <p className="text-xs text-text-dark/70 text-left leading-relaxed">
                                        <span className="font-semibold text-text-dark block mb-0.5">Use when:</span>
                                        {family.useWhen}
                                    </p>
                                    <span className="text-clay/60 group-hover/footer:text-clay transition-colors">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-sage text-bone rounded-full hover:bg-sage/90 transition-colors"
                        >
                            Return to the membership space
                        </Link>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default AudioBreathsPage;
