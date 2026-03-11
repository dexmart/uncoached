import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const VoiceNotesPage = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const [voiceNotes, setVoiceNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('voice_notes')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setVoiceNotes(data || []);
        } catch (error) {
            console.error('Error fetching voice notes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => {
            setCurrentlyPlaying(null);
            setCurrentTime(0);
            setDuration(0);
        };

        const handlePlay = () => {
            // Re-fetch duration in case it wasn't populated instantly
            if (audio.duration && !isNaN(audio.duration)) {
                setDuration(audio.duration);
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('play', handlePlay);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('play', handlePlay);
        };
    }, [currentlyPlaying]);

    const handlePlay = (note) => {
        if (currentlyPlaying?.id === note.id) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setCurrentlyPlaying(null);
        } else {
            setCurrentlyPlaying(note);
            setCurrentTime(0);
            setDuration(0); // Reset duration while loading
            // Audio will auto-play when source changes
        }
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bone">
            {/* Hidden Audio Element */}
            {currentlyPlaying?.audio_url && (
                <audio
                    ref={audioRef}
                    src={currentlyPlaying.audio_url}
                    autoPlay={true}
                />
            )}

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-sage/20 to-clay/10"></div>

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
                        Voice Notes
                    </h1>
                    <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
                        Remember who you are. Personal messages for when you need to hear it.
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-text-muted text-lg leading-relaxed">
                        These are like voice memos from a friend—short, personal recordings for specific moments.
                        Listen when you need a reminder, a perspective shift, or just to feel less alone.
                    </p>
                </div>
            </section>

            {/* Voice Notes Library */}
            <section className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    {voiceNotes.length === 0 ? (
                        <div className="text-center py-16 bg-white/50 rounded-3xl border border-clay/10">
                            <p className="text-text-muted text-lg">No voice notes available right now.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {voiceNotes.map(note => (
                                <div
                                    key={note.id}
                                    className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${currentlyPlaying?.id === note.id
                                        ? 'border-sage shadow-md'
                                        : 'border-clay/20 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Play Button */}
                                        <button
                                            onClick={() => handlePlay(note)}
                                            className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${currentlyPlaying?.id === note.id
                                                ? 'bg-sage text-bone'
                                                : 'bg-sage/10 text-sage hover:bg-sage hover:text-bone'
                                                }`}
                                        >
                                            {currentlyPlaying?.id === note.id ? (
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            )}
                                        </button>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-display text-lg text-text-dark truncate">
                                                {note.title}
                                            </h3>
                                            <p className="text-text-muted text-sm truncate">
                                                {note.description}
                                            </p>

                                            {/* Progress Bar (when playing) */}
                                            {currentlyPlaying?.id === note.id && (
                                                <div className="mt-3">
                                                    <div className="h-1.5 bg-clay/20 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-sage transition-all"
                                                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between text-xs text-text-muted mt-1">
                                                        <span>{formatTime(currentTime)}</span>
                                                        <span>{formatTime(duration)}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default VoiceNotesPage;
