import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AudioBreathPlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [breath, setBreath] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Initial fetch of breath data
    useEffect(() => {
        const fetchBreath = async () => {
            try {
                const { data, error } = await supabase
                    .from('audio_breaths')
                    .select(`
                        *,
                        audio_families (
                            title
                        )
                    `)
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (!data) {
                    navigate('/dashboard/audio-breaths');
                    return;
                }

                setBreath(data);
            } catch (error) {
                console.error('Error fetching breath:', error);
                navigate('/dashboard/audio-breaths');
            } finally {
                setLoading(false);
            }
        };

        fetchBreath();
    }, [id, navigate]);

    // Icons mapping
    const familyIcons = {
        'calm-me-down': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M16 8v8" />
                <path d="M20 10v4" />
                <path d="M8 8v8" />
                <path d="M4 10v4" />
            </svg>
        ),
        'emotional-regulation': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        ),
        'motivate-me': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9a4 4 0 0 1 4 4" />
                <path d="M12 3v2" />
                <path d="M12 19v2" />
                <path d="M3 13h2" />
                <path d="M19 13h2" />
                <path d="M5.6 6.4l1.4 1.4" />
                <path d="M18.4 6.4l-1.4 1.4" />
                <path d="M5.6 19.6l1.4-1.4" />
                <path d="M18.4 19.6l-1.4-1.4" />
            </svg>
        ),
        'help-me-focus': (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12h-4" />
            </svg>
        )
    };

    // Separate useEffect for audio event listeners
    useEffect(() => {
        if (!breath || !audioRef.current) return;

        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!breath) return null;

    return (
        <div className="min-h-screen bg-bone">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Audio Breaths Home Page.jpg"}
                    alt=""
                    className="w-full h-full object-cover opacity-100" // Changed opacity to 100 as per common pattern in other pages, handled by overlay if needed
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div> {/* Added light overlay to soften BG */}
            </div>

            <div className="relative z-10 min-h-screen">
                {/* Navigation */}
                <div className="sticky top-0 z-50 px-6 py-8 pointer-events-none">
                    <Link
                        to="/dashboard/audio-breaths"
                        className="inline-flex items-center gap-2 text-text-dark/60 hover:text-text-dark transition-colors pointer-events-auto mix-blend-multiply"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">Back to Audio Breaths</span>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-lg mx-auto px-6 pb-20">
                    {/* Audio Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-clay/20 backdrop-blur-sm rounded-full text-text-dark shadow-sm">
                            {familyIcons[breath.family_id] || (
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3v18" />
                                    <path d="M16 8v8" />
                                    <path d="M20 10v4" />
                                    <path d="M8 8v8" />
                                    <path d="M4 10v4" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-4xl md:text-5xl text-text-dark text-center mb-10">
                        {breath.title}
                    </h1>

                    {/* Play Button Pill */}
                    <div className="flex justify-center mb-12">
                        <button
                            onClick={togglePlay}
                            className="flex items-center gap-3 px-8 py-3 bg-white/50 backdrop-blur-sm border border-white/40 shadow-sm rounded-full hover:bg-white/70 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center group-hover:bg-clay/90 transition-colors">
                                {isPlaying ? (
                                    <svg className="w-4 h-4 text-white ml-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-text-dark font-medium text-lg pr-2">Listen</span>
                        </button>
                    </div>

                    <audio ref={audioRef} src={breath.audio_url} />

                    {/* Intro & Description */}
                    <div className="text-center mb-8">
                        <p className="text-text-dark text-lg md:text-xl leading-relaxed opacity-80">
                            {breath.intro}
                            <span className="block mt-2">{breath.description}</span>
                        </p>
                    </div>

                    {/* Approach Box - Highlighted */}
                    <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/30 shadow-sm text-center">
                        <p className="text-text-dark/90 text-lg leading-relaxed">
                            {breath.approach}
                        </p>
                    </div>

                    {/* Use This When */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-text-dark/10 flex-1"></div>
                            <h3 className="font-display text-2xl text-text-dark text-center">
                                Use this when:
                            </h3>
                            <div className="h-px bg-text-dark/10 flex-1"></div>
                        </div>

                        <div className="space-y-4">
                            {(breath.use_when || []).map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-clay/30 flex items-center justify-center text-white">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <span className="text-text-dark/80 text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Science Corner */}
                    <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                        <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                            Science Corner
                        </h4>
                        <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                            {breath.science_text}
                        </p>
                        <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                        <p className="text-text-dark/50 text-xs italic">
                            Source: {breath.science_source}
                        </p>
                    </div>

                    {/* Spiritual Corner - Added Back */}
                    <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                        <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                            Spiritual Corner
                        </h4>
                        <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                            {breath.spiritual_text}
                        </p>
                        <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                        <p className="text-text-dark/50 text-xs italic">
                            Source: {breath.spiritual_source}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AudioBreathPlayerPage;
