import { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const GuidedShiftPlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [shift, setShift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Initial fetch of shift data
    useEffect(() => {
        const fetchShift = async () => {
            try {
                const { data, error } = await supabase
                    .from('guided_shifts')
                    .select(`
                        *,
                        guided_shift_categories (
                            title,
                            icon
                        )
                    `)
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (!data) {
                    navigate('/dashboard/guided-shifts');
                    return;
                }

                setShift(data);
            } catch (error) {
                console.error('Error fetching guided shift:', error);
                navigate('/dashboard/guided-shifts');
            } finally {
                setLoading(false);
            }
        };

        fetchShift();
    }, [id, navigate]);

    // Separate useEffect for audio event listeners
    useEffect(() => {
        if (!shift || !audioRef.current) return;

        const audio = audioRef.current;
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [shift]);

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

    if (!shift) return null;

    return (
        <div className="min-h-screen bg-bone">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Hero Section.jpg"}
                    alt=""
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px]"></div>
            </div>

            <div className="relative z-10 min-h-screen">
                {/* Navigation */}
                <div className="sticky top-0 z-50 px-6 py-8 pointer-events-none">
                    <Link
                        to="/dashboard/guided-shifts"
                        className="inline-flex items-center gap-2 text-text-dark/60 hover:text-text-dark transition-colors pointer-events-auto mix-blend-multiply"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm">Back to Guided Shifts</span>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-lg mx-auto px-6 pb-20 mt-8">
                    {/* Category Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-clay/20 backdrop-blur-sm rounded-full text-text-dark shadow-sm">
                            {shift.guided_shift_categories?.icon ? (
                                <div className="text-4xl text-clay" dangerouslySetInnerHTML={shift.guided_shift_categories.icon.startsWith('<svg') ? { __html: shift.guided_shift_categories.icon } : undefined}>
                                    {!shift.guided_shift_categories.icon.startsWith('<svg') && shift.guided_shift_categories.icon}
                                </div>
                            ) : (
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 5v14" />
                                    <path d="M19 12l-7 7-7-7" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-4xl md:text-5xl text-text-dark text-center mb-10">
                        {shift.title}
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

                    {shift.audio_url && <audio ref={audioRef} src={shift.audio_url} />}

                    {/* Intro & Description */}
                    {(shift.intro || shift.description) && (
                        <div className="text-center mb-8">
                            <p className="text-text-dark text-lg md:text-xl leading-relaxed opacity-80">
                                {shift.intro}
                                {shift.description && <span className="block mt-2">{shift.description}</span>}
                            </p>
                        </div>
                    )}

                    {/* Approach Box - Highlighted */}
                    {shift.approach && (
                        <div className="bg-bone/60 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/30 shadow-sm text-center">
                            <p className="text-text-dark/90 text-lg leading-relaxed">
                                {shift.approach}
                            </p>
                        </div>
                    )}

                    {/* Use This When */}
                    {shift.use_when && shift.use_when.length > 0 && (
                        <div className="mb-16">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px bg-text-dark/10 flex-1"></div>
                                <h3 className="font-display text-2xl text-text-dark text-center">
                                    Use this when:
                                </h3>
                                <div className="h-px bg-text-dark/10 flex-1"></div>
                            </div>

                            <div className="space-y-4">
                                {shift.use_when.map((item, index) => (
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
                    )}

                    {/* Science Corner */}
                    {shift.science_text && (
                        <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                            {/* Background Decoration */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                            <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                                Science Corner
                            </h4>
                            <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                                {shift.science_text}
                            </p>
                            {shift.science_source && (
                                <>
                                    <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                                    <p className="text-text-dark/50 text-xs italic">
                                        Source: {shift.science_source}
                                    </p>
                                </>
                            )}
                        </div>
                    )}

                    {/* Spiritual Corner */}
                    {shift.spiritual_text && (
                        <div className="bg-bone/40 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 relative overflow-hidden">
                            {/* Background Decoration */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-clay/5 rounded-full blur-3xl"></div>

                            <h4 className="font-display text-base uppercase tracking-widest text-clay mb-4">
                                Spiritual Corner
                            </h4>
                            <p className="text-text-dark/80 text-base leading-relaxed mb-6">
                                {shift.spiritual_text}
                            </p>
                            {shift.spiritual_source && (
                                <>
                                    <div className="w-10 h-px bg-text-dark/10 mb-4"></div>
                                    <p className="text-text-dark/50 text-xs italic">
                                        Source: {shift.spiritual_source}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuidedShiftPlayerPage;
