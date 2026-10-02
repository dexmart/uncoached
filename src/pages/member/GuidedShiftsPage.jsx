import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCopy } from '../../context/SiteCopyContext';

const GuidedShiftsPage = () => {
    const copy = useCopy();
    const [shiftFamilies, setShiftFamilies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilies = async () => {
            try {
                const { data, error } = await supabase
                    .from('guided_shift_categories')
                    .select('*, guided_shifts(*)')
                    .order('sort_order', { ascending: true });

                if (error) throw error;

                const formattedFamilies = data.map(family => {
                    const sortedShifts = (family.guided_shifts || []).sort((a, b) => a.sort_order - b.sort_order);

                    return {
                        id: family.id,
                        title: family.title,
                        purpose: family.purpose,
                        icon: family.icon,
                        shifts: sortedShifts.map(s => ({
                            id: s.id,
                            name: s.title,
                            status: s.is_active ? 'active' : 'coming-soon'
                        }))
                    };
                });

                setShiftFamilies(formattedFamilies);
            } catch (error) {
                console.error('Error fetching guided shifts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFamilies();
    }, []);

    const scrollToFamilies = () => {
        document.getElementById('shift-families')?.scrollIntoView({ behavior: 'smooth' });
    };

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
                <span className="text-sm font-medium tracking-wide">{copy('shifts.back_link')}</span>
            </Link>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Hero Section.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-bone/40 via-transparent to-transparent"></div>
                </div>

                {/* Hero Content - Centered */}
                <div className="relative z-10 w-full max-w-md mx-auto px-6 text-center md:max-w-lg md:ml-[20%] lg:ml-[25%]">
                    {/* Brand Mark */}
                    {/* Brand Mark REMOVED */}
                    {/* Main Headline */}
                    <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl text-text-dark mb-5 leading-[1.15]">
                        {copy('shifts.hero.title')}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-text-dark text-xl md:text-2xl leading-relaxed mb-8 italic">
                        {copy('shifts.hero.subtitle')}
                    </p>

                    {/* Description */}
                    <p className="text-text-dark text-base leading-relaxed mb-6">
                        {copy('shifts.hero.description')}
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-2 mb-8 inline-block text-left mx-auto">
                        {copy('shifts.hero.checklist').split('\n').filter(Boolean).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-text-dark/80">
                                <span className="text-sage">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Supporting Text */}
                    <p className="text-text-dark/70 text-sm mb-10 italic whitespace-pre-line">
                        {copy('shifts.hero.supporting')}
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToFamilies}
                        className="px-8 py-3.5 bg-clay text-white rounded-full shadow-md hover:shadow-lg hover:bg-clay/90 transition-all duration-300 mb-5"
                    >
                        {copy('shifts.hero.cta')}
                    </button>
                </div>
            </section>

            {/* Why This Works Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Why This Works.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-4">
                            {copy('shifts.why.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                {copy('shifts.why.left_title')}
                            </h3>
                            <div className="space-y-6 text-text-dark/80 text-base leading-relaxed text-center">
                                <p className="whitespace-pre-line">
                                    {copy('shifts.why.left_p1')}
                                </p>
                                <p>
                                    {copy('shifts.why.left_p2')}
                                </p>
                                <ul className="text-left space-y-3 mt-6 inline-block">
                                    {copy('shifts.why.left_list').split('\n').filter(Boolean).map((item, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="text-sage">✓</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="italic font-medium pt-4 whitespace-pre-line">
                                    {copy('shifts.why.left_closing')}
                                </p>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                {copy('shifts.why.right_title')}
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">{copy('shifts.why.dysregulated_intro')}</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        {copy('shifts.why.dysregulated_list').split('\n').filter(Boolean).map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-red-400">✗</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="h-px bg-clay/10 my-4"></div>
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">{copy('shifts.why.regulated_intro')}</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        {copy('shifts.why.regulated_list').split('\n').filter(Boolean).map((item, i) => (
                                            <li key={i} className="flex gap-3">
                                                <span className="text-sage">✓</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p className="text-center text-text-dark/90 italic pt-4">
                                    {copy('shifts.why.right_closing')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built For Real Life Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Built For Real Life.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg md:mr-[5%] lg:mr-[10%] ml-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-6">
                        {copy('shifts.real_life.title')}
                    </h2>

                    <p className="font-semibold text-text-dark mb-4">{copy('shifts.real_life.intro')}</p>
                    <ul className="space-y-3 mb-8">
                        {copy('shifts.real_life.list').split('\n').filter(Boolean).map((item, i) => (
                            <li key={i} className="flex gap-3 text-text-dark/90 text-sm md:text-base">
                                <span className="text-sage">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-4">
                        <p className="text-lg font-medium text-sage">{copy('shifts.real_life.highlight')}</p>
                        <p className="text-text-dark/80">
                            {copy('shifts.real_life.body')}
                        </p>
                        <p className="text-text-dark/60 italic">{copy('shifts.real_life.closing')}</p>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts How to Use Them.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg ml-[5%] lg:ml-[10%] mr-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-8">
                        {copy('shifts.how.title')}
                    </h2>

                    <div className="space-y-6 mb-8">
                        {copy('shifts.how.steps').split('\n').filter(Boolean).map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-sage font-medium text-lg">✓</span>
                                <span className="text-text-dark text-lg">{step}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-text-dark/80 mb-4 leading-relaxed">
                        {copy('shifts.how.body')}
                    </p>
                    <p className="text-text-dark italic">
                        {copy('shifts.how.closing')}
                    </p>
                </div>
            </section>

            {/* Shift Families Section */}
            <section id="shift-families" className="py-24 px-6 bg-bone relative">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Families.webp"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                            {copy('shifts.families.title')}
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {copy('shifts.families.intro')}
                            <br />
                            <span className="text-sm opacity-70 italic">{copy('shifts.families.note')}</span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-full py-20 text-center text-text-dark/50 italic">
                                Loading Guided Shifts...
                            </div>
                        ) : shiftFamilies.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-text-dark/50 italic bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                                No Guided Shifts found.
                            </div>
                        ) : shiftFamilies.map((family) => (
                            <div
                                key={family.id}
                                className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#D6C7B8]/50 shadow-[0_4px_20px_rgba(31,36,34,0.08)] flex flex-col h-full overflow-hidden hover:shadow-[0_8px_30px_rgba(31,36,34,0.12)] hover:border-[#3F5D4D]/30 transition-all duration-300 group"
                            >
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-[#C89A5B] p-3 bg-[#F4F1EC] rounded-full w-12 h-12 flex items-center justify-center shrink-0 shadow-sm border border-[#D6C7B8]/30">
                                            {family.icon?.startsWith('<svg') ? (
                                                <div dangerouslySetInnerHTML={{ __html: family.icon }} className="flex items-center justify-center w-full h-full" />
                                            ) : (
                                                <span>{family.icon}</span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-display text-xl text-text-dark leading-tight">
                                                {family.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-[#5E6A65] text-sm mb-6 min-h-[40px] leading-relaxed">
                                        {family.purpose}
                                    </p>

                                    <div className="space-y-2 mt-auto">
                                        {family.shifts.map((shift, idx) => (
                                            <div key={idx}>
                                                {shift.status === 'active' ? (
                                                    <Link
                                                        to={`/dashboard/guided-shifts/${encodeURIComponent(shift.id)}`}
                                                        className="block w-full px-4 py-3 bg-[#3F5D4D] hover:bg-[#2E4A3B] text-white rounded-xl text-sm font-medium transition-all text-center shadow-sm hover:shadow-md"
                                                    >
                                                        {shift.name}
                                                    </Link>
                                                ) : (
                                                    <div className="block w-full px-4 py-3 bg-[#F4F1EC] text-[#8C857A] rounded-xl text-sm text-center border border-[#D6C7B8]/30 cursor-default">
                                                        {shift.name} <span className="text-[10px] opacity-70 ml-1">{copy('shifts.families.soon_label')}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GuidedShiftsPage;
