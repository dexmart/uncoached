import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const GuidedShiftsPage = () => {
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
                className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 text-text-dark/60 hover:text-text-dark transition-colors group mix-blend-multiply"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-light tracking-wide">Back to Portal</span>
            </Link>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Hero Section.jpg"}
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
                        Shift your state.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-text-dark text-xl md:text-2xl leading-relaxed mb-8 italic">
                        In minutes. In real life.
                    </p>

                    {/* Description */}
                    <p className="text-text-dark text-base leading-relaxed mb-6">
                        Guided Shifts are short, precise audio experiences that help your nervous system settle, reset, or reorient when life feels loud, heavy, fast, or stuck.
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-2 mb-8 inline-block text-left mx-auto">
                        {['No long meditations.', 'No breath-counting.', 'No fixing yourself.'].map(item => (
                            <li key={item} className="flex items-center gap-2 text-text-dark/80">
                                <span className="text-clay">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Supporting Text */}
                    <p className="text-text-dark/70 text-sm mb-10 italic">
                        Just guided internal shifts you can use
                        <br />
                        when it actually matters.
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={scrollToFamilies}
                        className="px-8 py-3.5 bg-clay text-white rounded-full shadow-md hover:shadow-lg hover:bg-clay/90 transition-all duration-300 mb-5"
                    >
                        Browse the Guided Shifts
                    </button>
                </div>
            </section>

            {/* Why This Works Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Why This Works.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-4">
                            Why This Works
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                Why these tiny shifts matter
                            </h3>
                            <div className="space-y-6 text-text-dark/80 text-base leading-relaxed text-center">
                                <p>
                                    Most tools talk to your mind.
                                    <br />
                                    Guided Shifts work with your body.
                                </p>
                                <p>
                                    They use sensation, attention, and subtle nervous system cues to help you move out of urgency, shutdown, or overwhelm and back into steadiness.
                                </p>
                                <ul className="text-left space-y-3 mt-6 inline-block">
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>The nervous system responds faster than thought</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>Small internal shifts create immediate relief</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-clay">✓</span>
                                        <span>Regulation comes from safety, not effort</span>
                                    </li>
                                </ul>
                                <p className="italic font-medium pt-4">
                                    This isn't about going deeper.
                                    <br />
                                    It's about coming back online.
                                </p>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="bg-bone/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-sm">
                            <h3 className="font-display text-2xl text-text-dark mb-6 text-center">
                                What these shifts can do
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">When your state is dysregulated:</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>thinking gets narrow</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>emotions feel bigger than they are</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-red-400">✗</span>
                                            <span>decisions feel urgent or impossible</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="h-px bg-clay/10 my-4"></div>
                                <div>
                                    <p className="text-text-dark/70 mb-3 text-center">A regulated state restores:</p>
                                    <ul className="space-y-2 text-text-dark/80">
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>perspective</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>choice</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-clay">✓</span>
                                            <span>access to your inner signals</span>
                                        </li>
                                    </ul>
                                </div>
                                <p className="text-center text-text-dark/90 italic pt-4">
                                    These shifts help you meet the moment you're in without getting swallowed by it.
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
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts Built For Real Life.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg md:mr-[5%] lg:mr-[10%] ml-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-6">
                        Built for real life moments
                    </h2>

                    <p className="font-semibold text-text-dark mb-4">Use them when:</p>
                    <ul className="space-y-3 mb-8">
                        {[
                            "you're spiralling before a conversation",
                            "you can't shut your mind off at night",
                            "therapy stirred something up",
                            "grief, pressure, or fear hits suddenly",
                            "you need to move forward but feel stuck"
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-text-dark/90 text-sm md:text-base">
                                <span className="text-clay">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-4">
                        <p className="text-lg font-medium text-clay">Most are under 5 minutes.</p>
                        <p className="text-text-dark/80">
                            With practice, these learned techniques can land in your body in under 60 seconds.
                        </p>
                        <p className="text-text-dark/60 italic">No setup required.</p>
                    </div>
                </div>
            </section>

            {/* How to Use Section */}
            <section className="relative py-20 px-6">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shifts How to Use Them.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-lg ml-[5%] lg:ml-[10%] mr-auto bg-white/40 backdrop-blur-lg p-8 rounded-2xl border border-white/40">
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-8">
                        How to Use Them
                    </h2>

                    <div className="space-y-6 mb-8">
                        {[
                            "Choose the series that matches what you're experiencing",
                            "Press play",
                            "Let the guidance do the work"
                        ].map((step, i) => (
                            <div key={i} className="flex gap-4">
                                <span className="text-clay font-medium text-lg">✓</span>
                                <span className="text-text-dark text-lg">{step}</span>
                            </div>
                        ))}
                    </div>

                    <p className="text-text-dark/80 mb-4 leading-relaxed">
                        Use them seated, standing, in bed, between meetings, or in the car before you go inside.
                    </p>
                    <p className="text-text-dark italic">
                        Repeat as needed. There is no right way.
                    </p>
                </div>
            </section>

            {/* Shift Families Section */}
            <section id="shift-families" className="py-24 px-6 bg-bone relative">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img
                        src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Families.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                            Guided Shift Families
                        </h2>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            Small, precise resets for your nervous system, built for real moments in real life.
                            <br />
                            <span className="text-sm opacity-70 italic">More coming soon.</span>
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
                                className="bg-bone/60 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm flex flex-col h-full overflow-hidden hover:shadow-md transition-all group"
                            >
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-clay/80 p-3 bg-white/50 rounded-full w-12 h-12 flex items-center justify-center shrink-0">
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

                                    <p className="text-text-dark/70 text-sm mb-6 min-h-[40px]">
                                        {family.purpose}
                                    </p>

                                    <div className="space-y-2 mt-auto">
                                        {family.shifts.map((shift, idx) => (
                                            <div key={idx}>
                                                {shift.status === 'active' ? (
                                                    <Link
                                                        to={`/dashboard/guided-shifts/${shift.name.toLowerCase().replace(/ /g, '-')}`}
                                                        className="block w-full px-4 py-2.5 bg-white/60 hover:bg-white text-text-dark rounded-xl text-sm transition-all text-center border border-transparent hover:border-clay/20"
                                                    >
                                                        {shift.name}
                                                    </Link>
                                                ) : (
                                                    <div className="block w-full px-4 py-2.5 bg-white/20 text-text-dark/40 rounded-xl text-sm text-center border border-transparent cursor-default">
                                                        {shift.name} <span className="text-[10px] opacity-70 ml-1">(soon)</span>
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
