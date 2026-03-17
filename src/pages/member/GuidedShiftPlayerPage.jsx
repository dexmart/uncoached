import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const GuidedShiftPlayerPage = () => {
    const { id } = useParams();

    const [shift, setShift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
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

                if (error) {
                    setFetchError(`Database error: ${error.message}`);
                    return;
                }

                if (!data) {
                    setFetchError(`No shift found with id: "${id}"`);
                    return;
                }

                setShift(data);
            } catch (err) {
                console.error('Error fetching guided shift:', err);
                setFetchError(`Unexpected error: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchShift();
    }, [id]);

    // Audio event listeners
    useEffect(() => {
        if (!shift || !audioRef.current) return;

        const audio = audioRef.current;
        const handleEnded = () => setIsPlaying(false);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handlePlay = () => {
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('play', handlePlay);

        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('play', handlePlay);
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

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        audioRef.current.currentTime = ratio * duration;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#C89A5B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!shift) {
        return (
            <div className="min-h-screen bg-[#F4F1EC] flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    {fetchError ? (
                        <>
                            <p className="text-red-500 mb-4 font-mono text-sm bg-red-50 p-4 rounded-xl">{fetchError}</p>
                            <Link to="/dashboard/guided-shifts" className="text-[#C89A5B] hover:underline">← Back to Guided Shifts</Link>
                        </>
                    ) : (
                        <p className="text-[#5E6A65]">Shift not found.</p>
                    )}
                </div>
            </div>
        );
    }

    // Safely parse use_when
    let parsedUseWhen = [];
    if (Array.isArray(shift.use_when)) {
        parsedUseWhen = shift.use_when;
    } else if (typeof shift.use_when === 'string') {
        try { parsedUseWhen = JSON.parse(shift.use_when); } catch (e) { parsedUseWhen = []; }
        if (!Array.isArray(parsedUseWhen)) parsedUseWhen = [];
    }

    // Safely extract category icon
    const rawIcon = shift.guided_shift_categories?.icon;
    const categoryIconStr = typeof rawIcon === 'string' ? rawIcon : '';
    const isSvgIcon = categoryIconStr.startsWith('<svg');
    const categoryTitle = shift.guided_shift_categories?.title || '';

    const renderCategoryIcon = () => {
        if (!categoryIconStr) {
            return (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M19 12l-7 7-7-7" />
                </svg>
            );
        }
        if (isSvgIcon) {
            return <div dangerouslySetInnerHTML={{ __html: categoryIconStr }} />;
        }
        return <div className="text-3xl">{categoryIconStr}</div>;
    };

    return (
        <div className="min-h-screen relative">
            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Guided Shift Hero Section.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#F4F1EC]/60 backdrop-blur-[2px]"></div>
            </div>

            {shift.audio_url && <audio ref={audioRef} src={shift.audio_url} />}

            {/* Scrolling Content */}
            <div className="relative z-10 min-h-screen pb-24">
                {/* Navigation */}
                <div className="sticky top-0 z-50 px-6 py-8 pointer-events-none">
                    <Link
                        to="/dashboard/guided-shifts"
                        className="inline-flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group mix-blend-normal pointer-events-auto"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium tracking-wide">Back to Guided Shifts</span>
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-lg mx-auto px-6 mt-4">

                    {/* Category Icon */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#C89A5B]/15 backdrop-blur-sm rounded-full text-[#C89A5B] shadow-sm border border-[#C89A5B]/20">
                            {renderCategoryIcon()}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="font-serif text-[36px] md:text-[44px] text-[#1F2422] text-center mb-6 font-medium leading-tight">
                        {shift.title || ''}
                    </h1>

                    {/* Description / Intro */}
                    {(shift.intro || shift.description) && (
                        <div className="text-center mb-10">
                            <p className="text-[#5E6A65] text-[16px] md:text-[17px] leading-[1.7]">
                                {shift.intro || ''}
                                {shift.description && <span className="block mt-2">{shift.description}</span>}
                            </p>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════ */}
                    {/* AUDIO PLAYER SECTION */}
                    {/* ═══════════════════════════════════════ */}
                    <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-6 shadow-sm border border-white/40 mb-8">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause Button */}
                            <button
                                onClick={togglePlay}
                                className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isPlaying
                                    ? 'bg-[#3F5D4D] text-white'
                                    : 'bg-[#C89A5B]/15 text-[#C89A5B] hover:bg-[#C89A5B] hover:text-white'
                                    }`}
                            >
                                {isPlaying ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            {/* Progress Bar & Time */}
                            <div className="flex-1 min-w-0">
                                <div
                                    className="h-2 bg-[#D6C7B8]/40 rounded-full overflow-hidden cursor-pointer group"
                                    onClick={handleProgressClick}
                                >
                                    <div
                                        className="h-full bg-[#C89A5B] rounded-full transition-all duration-150"
                                        style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[12px] text-[#8C857A] mt-1.5 font-medium">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ═══════════════════════════════════════ */}
                    {/* APPROACH BOX */}
                    {/* ═══════════════════════════════════════ */}
                    {shift.approach && (
                        <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-8 mb-8 border border-white/40 shadow-sm text-center">
                            <p className="text-[#1F2422]/85 text-[16px] leading-[1.75] italic">
                                {shift.approach}
                            </p>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════ */}
                    {/* FIELD INTEGRATION PROMPT */}
                    {/* ═══════════════════════════════════════ */}
                    {shift.field_integration_prompt && (
                        <div className="bg-[#3F5D4D]/10 backdrop-blur-md rounded-[20px] p-8 mb-8 border border-[#3F5D4D]/15 shadow-sm relative overflow-hidden">
                            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#3F5D4D]/5 rounded-full blur-3xl pointer-events-none"></div>

                            <h4 className="text-[13px] uppercase tracking-[0.2em] text-[#3F5D4D] font-bold mb-1 text-center">
                                Field Integration Prompt
                            </h4>
                            <p className="text-[12px] text-[#5E6A65] italic mb-5 text-center">
                                (copy and paste into Field)
                            </p>

                            <div className="text-[#1F2422]/80 text-[15px] leading-[1.8] whitespace-pre-line">
                                {shift.field_integration_prompt}
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════ */}
                    {/* USE THIS WHEN */}
                    {/* ═══════════════════════════════════════ */}
                    {parsedUseWhen.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="h-px bg-[#D6C7B8]/50 flex-1"></div>
                                <h3 className="text-[13px] uppercase tracking-[0.2em] text-[#C89A5B] font-bold text-center">
                                    Use This When
                                </h3>
                                <div className="h-px bg-[#D6C7B8]/50 flex-1"></div>
                            </div>

                            <div className="space-y-3">
                                {parsedUseWhen.map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3.5 border border-white/40">
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-[#C89A5B]/20 flex items-center justify-center mt-0.5">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C89A5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </div>
                                        <span className="text-[#1F2422]/80 text-[15px] leading-relaxed">{typeof item === 'string' ? item : ''}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════ */}
                    {/* SCIENCE & SPIRITUAL CORNERS (side by side) */}
                    {/* ═══════════════════════════════════════ */}
                    {(shift.science_text || shift.spiritual_text) && (
                        <div className={`grid ${shift.science_text && shift.spiritual_text ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4 mb-8`}>
                            {/* Science Corner */}
                            {shift.science_text && (
                                <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-6 border border-white/40 shadow-sm relative overflow-hidden">
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C89A5B]/5 rounded-full blur-3xl pointer-events-none"></div>

                                    {/* Lotus icon */}
                                    <div className="flex justify-center mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89A5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                                            <path d="M12 8v8" />
                                            <path d="M8 12h8" />
                                        </svg>
                                    </div>

                                    <h4 className="text-[12px] uppercase tracking-[0.2em] text-[#C89A5B] font-bold mb-3 text-center">
                                        Science Corner
                                    </h4>
                                    <p className="text-[#1F2422]/75 text-[14px] leading-[1.7]">
                                        {shift.science_text}
                                    </p>
                                    {shift.science_source && (
                                        <>
                                            <div className="w-8 h-px bg-[#D6C7B8]/50 mt-4 mb-3"></div>
                                            <p className="text-[#8C857A] text-[11px] italic">
                                                Source: {shift.science_source}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Spiritual Corner */}
                            {shift.spiritual_text && (
                                <div className="bg-white/90 backdrop-blur-md rounded-[20px] p-6 border border-white/40 shadow-sm relative overflow-hidden">
                                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#3F5D4D]/5 rounded-full blur-3xl pointer-events-none"></div>

                                    {/* Lotus icon */}
                                    <div className="flex justify-center mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C89A5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22c-4.97 0-9-2.24-9-5v-1c0-2.76 4.03-5 9-5s9 2.24 9 5v1c0 2.76-4.03 5-9 5z" />
                                            <path d="M12 2a4 4 0 0 0-4 4c0 2.76 1.79 6 4 6s4-3.24 4-6a4 4 0 0 0-4-4z" />
                                        </svg>
                                    </div>

                                    <h4 className="text-[12px] uppercase tracking-[0.2em] text-[#C89A5B] font-bold mb-3 text-center">
                                        Spiritual Corner
                                    </h4>
                                    <p className="text-[#1F2422]/75 text-[14px] leading-[1.7]">
                                        {shift.spiritual_text}
                                    </p>
                                    {shift.spiritual_source && (
                                        <>
                                            <div className="w-8 h-px bg-[#D6C7B8]/50 mt-4 mb-3"></div>
                                            <p className="text-[#8C857A] text-[11px] italic">
                                                Source: {shift.spiritual_source}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Scroll Down Indicator */}
                    {shift.audio_url && (
                        <div className="text-center pt-4 pb-8">
                            <p className="text-[#8C857A] text-[13px] italic">
                                {categoryTitle && `Part of the ${categoryTitle}`}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuidedShiftPlayerPage;
