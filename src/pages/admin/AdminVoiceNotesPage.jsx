import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminVoiceNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        duration: '',
        audio_url: '',
        is_active: true,
        sort_order: 0
    });

    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            setLoading(true);

            // Fetch voice notes
            const { data, error } = await supabase
                .from('voice_notes')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setNotes(data || []);
        } catch (error) {
            console.error('Error fetching voice notes:', error);
            alert('Failed to load Voice Notes. Are the tables created?');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (note) => {
        setFormData({
            id: note.id,
            title: note.title,
            description: note.description || '',
            duration: note.duration || '',
            audio_url: note.audio_url || '',
            is_active: note.is_active !== false,
            sort_order: note.sort_order || 0
        });
        setCurrentNote(note);
        setAudioFile(null); // Reset file input
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            duration: '',
            audio_url: '',
            is_active: true,
            sort_order: notes.length + 1
        });
        setCurrentNote(null);
        setAudioFile(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentNote(null);
        setAudioFile(null);
        setUploadProgress('');
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setAudioFile(e.target.files[0]);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setUploadProgress('');

        try {
            const noteId = currentNote?.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let finalAudioUrl = formData.audio_url;

            // 1. If a new file was selected, upload it to Supabase Storage first
            if (audioFile) {
                setUploadProgress('Uploading audio file to voice-notes bucket...');
                const fileExt = audioFile.name.split('.').pop();
                const fileName = `${noteId}-${Date.now()}.${fileExt}`;
                const filePath = `files/${fileName}`; // No categories, simple folder structure

                const { error: uploadError } = await supabase.storage
                    .from('voice-notes')
                    .upload(filePath, audioFile, { upsert: true });

                if (uploadError) throw uploadError;

                // Get the public URL for the newly uploaded file
                const { data: { publicUrl } } = supabase.storage
                    .from('voice-notes')
                    .getPublicUrl(filePath);

                finalAudioUrl = publicUrl;
                setUploadProgress('Audio uploaded! Saving database entry...');
            }

            // 2. Prepare payload
            const payload = {
                title: formData.title,
                description: formData.description,
                duration: formData.duration,
                audio_url: finalAudioUrl,
                is_active: formData.is_active,
                sort_order: parseInt(formData.sort_order) || 0
            };

            if (currentNote?.id) {
                payload.id = currentNote.id;
            }

            // 3. Upsert into database
            const { error: dbError } = await supabase
                .from('voice_notes')
                .upsert(payload, { onConflict: 'id' });

            if (dbError) throw dbError;

            await fetchNotes();
            setIsEditing(false);
            setUploadProgress('');
        } catch (error) {
            console.error('Error saving voice note:', error);
            alert(`Failed to save Voice Note: ${error.message || 'Unknown error'}`);
        } finally {
            setIsSaving(false);
            setUploadProgress('');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Voice Note?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('voice_notes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchNotes();
        } catch (error) {
            console.error('Error deleting voice note:', error);
            alert('Failed to delete Voice Note');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Voice Notes</h1>
                    <p className="text-text-dark/70">Manage personal audio messages for members.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Voice Note
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-8 border-b border-text-dark/10 pb-4">
                        {currentNote ? 'Edit Voice Note' : 'New Voice Note'}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-8">
                        <div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-text-dark mb-1">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                        placeholder="e.g. When You Feel Like Giving Up"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
                                    <textarea
                                        rows="2"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-none"
                                        placeholder="A reminder that rest is not the same as quitting."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Display Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                        placeholder="e.g. 3:24"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Sort Order</label>
                                    <input
                                        type="number"
                                        value={formData.sort_order}
                                        onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* AUDIO FILE */}
                        <div className="p-6 bg-bone/30 rounded-xl border border-dashed border-text-dark/20">
                            <h3 className="text-lg font-medium text-text-dark mb-2">Audio File</h3>
                            {formData.audio_url && !audioFile && (
                                <div className="mb-4">
                                    <p className="text-sm text-green-700 font-medium mb-1">✓ Current file loaded:</p>
                                    <audio controls src={formData.audio_url} className="w-full h-10"></audio>
                                    <p className="text-xs text-text-dark/50 mt-1 truncate">{formData.audio_url}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">
                                    {formData.audio_url ? 'Upload new file (overrides current)' : 'Upload Audio Track (.wav, .mp3)'}
                                </label>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-text-dark/70
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-clay/10 file:text-clay
                                        hover:file:bg-clay/20 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 p-4 bg-bone/50 rounded-xl border border-text-dark/5">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5 rounded border-text-dark/20 text-clay focus:ring-clay"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-text-dark cursor-pointer">
                                Active (Visible in Member Portal)
                            </label>
                        </div>

                        {/* SUBMIT BUTTONS */}
                        <div className="flex items-center gap-4 pt-6 border-t border-text-dark/10">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-5 py-2.5 text-text-dark hover:bg-bone rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : 'Save Voice Note'}
                            </button>
                            {uploadProgress && (
                                <span className="text-sm font-medium text-clay animate-pulse">{uploadProgress}</span>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {notes.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No voice notes found. Upload your first track!</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex items-center justify-between gap-6 group ${!note.is_active ? 'opacity-60' : ''}`}>
                                <div className="flex items-center gap-4 min-w-0">
                                    <button
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${note.audio_url ? 'bg-sage text-white hover:bg-sage/80 shadow-sm' : 'bg-bone text-text-dark/30'}`}
                                        title={note.audio_url ? 'Has audio' : 'Needs audio upload'}
                                        onClick={() => {
                                            if (note.audio_url) {
                                                const audio = new Audio(note.audio_url);
                                                audio.play();
                                            }
                                        }}
                                    >
                                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>

                                    <div className="min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-display text-xl text-text-dark truncate">{note.title}</h3>
                                            {!note.audio_url && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                    Missing Audio
                                                </span>
                                            )}
                                            {!note.is_active && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-text-dark/60 font-medium truncate">
                                            Duration: {note.duration || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {note.sort_order}</span>
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="text-sm font-medium px-4 py-2 rounded-xl text-text-dark hover:bg-bone transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="text-sm font-medium px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminVoiceNotesPage;
