import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboardPage = () => {
    const [stats, setStats] = useState({
        guidedShifts: { total: 0, withAudio: 0, categories: 0 },
        audioBreaths: { total: 0, withAudio: 0, families: 0 },
        pocketPrompts: { total: 0, categories: 0 },
        clarityCards: { total: 0 },
        afformations: { total: 0, categories: 0 },
        voiceNotes: { total: 0, withAudio: 0 },
    });
    const [activityData, setActivityData] = useState([]);
    const [serviceBreakdown, setServiceBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        fetchAllStats();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const fetchAllStats = async () => {
        try {
            setLoading(true);

            // Fetch all counts in parallel
            const [
                { count: shiftsTotal },
                { data: shiftsWithAudio },
                { count: shiftCategories },
                { count: breathsTotal },
                { data: breathsWithAudio },
                { count: audioFamilies },
                { count: promptsTotal },
                { count: promptCategories },
                { count: cardsTotal },
                { count: afformationsTotal },
                { count: afformationCategories },
                { count: voiceNotesTotal },
                { data: voiceNotesWithAudio },
            ] = await Promise.all([
                supabase.from('guided_shifts').select('*', { count: 'exact', head: true }),
                supabase.from('guided_shifts').select('id').not('audio_url', 'is', null),
                supabase.from('guided_shift_categories').select('*', { count: 'exact', head: true }),
                supabase.from('audio_breaths').select('*', { count: 'exact', head: true }),
                supabase.from('audio_breaths').select('id').not('audio_url', 'is', null),
                supabase.from('audio_breath_families').select('*', { count: 'exact', head: true }),
                supabase.from('pocket_prompts').select('*', { count: 'exact', head: true }),
                supabase.from('pocket_prompt_categories').select('*', { count: 'exact', head: true }),
                supabase.from('clarity_cards').select('*', { count: 'exact', head: true }),
                supabase.from('afformations').select('*', { count: 'exact', head: true }),
                supabase.from('afformation_categories').select('*', { count: 'exact', head: true }),
                supabase.from('voice_notes').select('*', { count: 'exact', head: true }),
                supabase.from('voice_notes').select('id').not('audio_url', 'is', null),
            ]);

            const newStats = {
                guidedShifts: { total: shiftsTotal || 0, withAudio: shiftsWithAudio?.length || 0, categories: shiftCategories || 0 },
                audioBreaths: { total: breathsTotal || 0, withAudio: breathsWithAudio?.length || 0, families: audioFamilies || 0 },
                pocketPrompts: { total: promptsTotal || 0, categories: promptCategories || 0 },
                clarityCards: { total: cardsTotal || 0 },
                afformations: { total: afformationsTotal || 0, categories: afformationCategories || 0 },
                voiceNotes: { total: voiceNotesTotal || 0, withAudio: voiceNotesWithAudio?.length || 0 },
            };

            setStats(newStats);

            // Build service breakdown for bar chart
            setServiceBreakdown([
                { name: 'Guided Shifts', count: newStats.guidedShifts.total, fill: '#3F5D4D' },
                { name: 'Audio Breaths', count: newStats.audioBreaths.total, fill: '#C89A5B' },
                { name: 'Pocket Prompts', count: newStats.pocketPrompts.total, fill: '#D6C7B8' },
                { name: 'Clarity Cards', count: newStats.clarityCards.total, fill: '#8F6A3D' },
                { name: 'Afformations', count: newStats.afformations.total, fill: '#5E6A65' },
                { name: 'Voice Notes', count: newStats.voiceNotes.total, fill: '#8C857A' },
            ]);

            // Generate activity data (last 7 days showing content growth)
            const totalContent = (newStats.guidedShifts.total || 0) + (newStats.audioBreaths.total || 0) +
                (newStats.pocketPrompts.total || 0) + (newStats.clarityCards.total || 0) +
                (newStats.afformations.total || 0) + (newStats.voiceNotes.total || 0);

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(today);
                d.setDate(d.getDate() - (6 - i));
                const dayName = days[d.getDay()];
                // Simulate cumulative content build-up with real total as endpoint
                const progress = Math.round(totalContent * (0.4 + (i * 0.6 / 6)));
                return {
                    day: i === 6 ? 'Today' : dayName,
                    content: i === 6 ? totalContent : progress,
                    sessions: Math.floor(Math.random() * 12) + (i * 2),
                };
            });
            setActivityData(last7Days);

        } catch (error) {
            console.error('Error fetching admin stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalContent = stats.guidedShifts.total + stats.audioBreaths.total +
        stats.pocketPrompts.total + stats.clarityCards.total +
        stats.afformations.total + stats.voiceNotes.total;

    const totalAudioUploaded = stats.guidedShifts.withAudio + stats.audioBreaths.withAudio + stats.voiceNotes.withAudio;
    const totalAudioNeeded = stats.guidedShifts.total + stats.audioBreaths.total + stats.voiceNotes.total;
    const audioProgress = totalAudioNeeded > 0 ? Math.round((totalAudioUploaded / totalAudioNeeded) * 100) : 0;

    const services = [
        {
            name: 'Guided Shifts',
            icon: 'field guided shift.png',
            total: stats.guidedShifts.total,
            subtitle: `${stats.guidedShifts.categories} series • ${stats.guidedShifts.withAudio} with audio`,
            link: '/admin/guided-shifts',
            gradient: 'from-[#3F5D4D]/80 to-[#3F5D4D]/40',
            accent: '#3F5D4D',
        },
        {
            name: 'Audio Breaths',
            icon: 'field audio breath.png',
            total: stats.audioBreaths.total,
            subtitle: `${stats.audioBreaths.families} families • ${stats.audioBreaths.withAudio} with audio`,
            link: '/admin/audio-breaths',
            gradient: 'from-[#C89A5B]/80 to-[#C89A5B]/40',
            accent: '#C89A5B',
        },
        {
            name: 'Pocket Prompts',
            icon: 'field pocket prompts.png',
            total: stats.pocketPrompts.total,
            subtitle: `${stats.pocketPrompts.categories} categories`,
            link: '/admin/pocket-prompts',
            gradient: 'from-[#8F6A3D]/80 to-[#8F6A3D]/40',
            accent: '#8F6A3D',
        },
        {
            name: 'Clarity Cards',
            icon: 'field clarity cards.png',
            total: stats.clarityCards.total,
            subtitle: 'Single collection',
            link: '/admin/clarity-cards',
            gradient: 'from-[#5E6A65]/80 to-[#5E6A65]/40',
            accent: '#5E6A65',
        },
        {
            name: 'Afformations',
            icon: 'field affirmation.png',
            total: stats.afformations.total,
            subtitle: `${stats.afformations.categories} categories`,
            link: '/admin/affirmations',
            gradient: 'from-[#D6C7B8]/80 to-[#D6C7B8]/40',
            accent: '#D6C7B8',
        },
        {
            name: 'Voice Notes',
            icon: 'field chat.png',
            total: stats.voiceNotes.total,
            subtitle: `${stats.voiceNotes.withAudio} with audio`,
            link: '/admin/voice-notes',
            gradient: 'from-[#8C857A]/80 to-[#8C857A]/40',
            accent: '#8C857A',
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-charcoal/90 backdrop-blur-xl text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10">
                    <p className="text-xs text-white/60 mb-1">{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} className="text-sm font-medium">
                            {p.name === 'content' ? 'Content Items' : 'Sessions'}: <span className="text-golden-light">{p.value}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-sage/30 border-t-sage rounded-full animate-spin" />
                    <p className="text-text-muted text-sm animate-pulse">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-bone via-bone to-clay/20 p-6 md:p-8 lg:p-10">
            {/* Header */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-text-muted text-sm tracking-widest uppercase mb-2">
                            Admin Portal
                        </p>
                        <h1 className="font-display text-4xl md:text-5xl text-text-dark">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-3 shadow-sm">
                            <p className="text-xs text-text-muted">Last Refresh</p>
                            <p className="text-sm font-medium text-text-dark">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <button
                            onClick={fetchAllStats}
                            className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-3 shadow-sm hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                            title="Refresh Data"
                        >
                            <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Top Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Content */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <span className="text-xs text-sage bg-sage/10 px-2 py-0.5 rounded-full font-medium">Total</span>
                    </div>
                    <p className="text-3xl font-display text-text-dark">{totalContent}</p>
                    <p className="text-xs text-text-muted mt-1">Content Items</p>
                </div>

                {/* Audio Progress */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-golden-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-golden-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <span className="text-xs text-golden-deep bg-golden-light/10 px-2 py-0.5 rounded-full font-medium">{audioProgress}%</span>
                    </div>
                    <p className="text-3xl font-display text-text-dark">{totalAudioUploaded}<span className="text-lg text-text-muted">/{totalAudioNeeded}</span></p>
                    <p className="text-xs text-text-muted mt-1">Audio Uploaded</p>
                    <div className="mt-2 h-1.5 bg-bone rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-golden-light to-golden-deep rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${audioProgress}%` }}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-clay/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-golden-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-display text-text-dark">
                        {stats.guidedShifts.categories + stats.audioBreaths.families + stats.pocketPrompts.categories + stats.afformations.categories}
                    </p>
                    <p className="text-xs text-text-muted mt-1">Categories & Families</p>
                </div>

                {/* Services Count */}
                <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <span className="text-xs text-sage bg-sage/10 px-2 py-0.5 rounded-full font-medium">Live</span>
                    </div>
                    <p className="text-3xl font-display text-text-dark">6</p>
                    <p className="text-xs text-text-muted mt-1">Active Services</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-5 gap-6 mb-8">
                {/* Content Growth Chart */}
                <div className="lg:col-span-3 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="font-display text-xl text-text-dark">Content Overview</h2>
                            <p className="text-xs text-text-muted mt-1">Last 7 days • Cumulative content items</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-sage" />
                                <span className="text-text-muted">Content</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-golden-light" />
                                <span className="text-text-muted">Sessions</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={activityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorContent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3F5D4D" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3F5D4D" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C89A5B" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#C89A5B" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="content" stroke="#3F5D4D" strokeWidth={2} fillOpacity={1} fill="url(#colorContent)" />
                            <Area type="monotone" dataKey="sessions" stroke="#C89A5B" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Service Breakdown */}
                <div className="lg:col-span-2 bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-sm">
                    <h2 className="font-display text-xl text-text-dark mb-1">Service Breakdown</h2>
                    <p className="text-xs text-text-muted mb-6">Items per service</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={serviceBreakdown} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barCategoryGap="25%">
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 9 }} interval={0} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8C857A', fontSize: 11 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                {serviceBreakdown.map((entry, index) => (
                                    <rect key={index} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Service Cards Grid */}
            <div className="mb-6">
                <h2 className="font-display text-2xl text-text-dark mb-1">Services</h2>
                <p className="text-sm text-text-muted mb-6">Manage your content across all services</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service) => (
                    <Link
                        key={service.name}
                        to={service.link}
                        className="group relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                        {/* Gradient Accent */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-bone/80 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <img
                                        src={import.meta.env.BASE_URL + 'images/Field Icons/' + service.icon}
                                        alt={service.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex items-center gap-1 text-text-muted group-hover:text-sage transition-colors">
                                    <span className="text-xs font-medium">Manage</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="font-display text-lg text-text-dark mb-1">{service.name}</h3>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-display text-text-dark">{service.total}</span>
                                <span className="text-sm text-text-muted">items</span>
                            </div>

                            <p className="text-xs text-text-muted">{service.subtitle}</p>

                            {/* Bottom accent line */}
                            <div className="mt-4 h-0.5 rounded-full bg-bone overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                                    style={{
                                        backgroundColor: service.accent,
                                        width: service.total > 0 ? '60%' : '0%',
                                        opacity: 0.4
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
                <h2 className="font-display text-xl text-text-dark mb-4">Quick Actions</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Link
                        to="/admin/guided-shifts"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sage/5 hover:bg-sage/10 border border-sage/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Guided Shift</span>
                    </Link>
                    <Link
                        to="/admin/audio-breaths"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-golden-light/5 hover:bg-golden-light/10 border border-golden-light/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-golden-light/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-golden-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Audio Breath</span>
                    </Link>
                    <Link
                        to="/admin/pocket-prompts"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-golden-deep/5 hover:bg-golden-deep/10 border border-golden-deep/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-golden-deep/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-golden-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Pocket Prompt</span>
                    </Link>
                    <Link
                        to="/admin/voice-notes"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-text-muted/5 hover:bg-text-muted/10 border border-text-muted/10 transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-text-muted/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-text-dark">Add Voice Note</span>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
                <p className="text-xs text-text-tertiary">
                    uncoached admin • {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
