import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminGuidedShiftsPage = () => {
    const [shifts, setShifts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentShift, setCurrentShift] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        category_id: '',
        title: '',
        intro: '',
        description: '',
        approach: '',
        use_when: '', // Will be a textarea where each line is an item
        science_text: '',
        science_source: '',
        spiritual_text: '',
        spiritual_source: '',
        audio_url: '',
        is_active: true,
        sort_order: 0
    });

    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories for the dropdown
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('guided_shift_categories')
                .select('id, title')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;
            setCategories(categoriesData || []);

            // Fetch shifts
            const { data: shiftsData, error: shiftsError } = await supabase
                .from('guided_shifts')
                .select(`
                    *,
                    guided_shift_categories (
                        title
                    )
                `)
                .order('category_id', { ascending: true })
                .order('sort_order', { ascending: true });

            if (shiftsError) throw shiftsError;
            setShifts(shiftsData || []);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load Guided Shifts. Are the tables created?');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (shift) => {
        setFormData({
            id: shift.id,
            category_id: shift.category_id,
            title: shift.title,
            intro: shift.intro || '',
            description: shift.description || '',
            approach: shift.approach || '',
            use_when: (shift.use_when || []).join('\n'), // Convert JSON array to newline string
            science_text: shift.science_text || '',
            science_source: shift.science_source || '',
            spiritual_text: shift.spiritual_text || '',
            spiritual_source: shift.spiritual_source || '',
            audio_url: shift.audio_url || '',
            is_active: shift.is_active !== false,
            sort_order: shift.sort_order || 0
        });
        setCurrentShift(shift);
        setAudioFile(null); // Reset file input
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            category_id: categories[0]?.id || '', // Default to first category
            title: '',
            intro: '',
            description: '',
            approach: '',
            use_when: '',
            science_text: '',
            science_source: '',
            spiritual_text: '',
            spiritual_source: '',
            audio_url: '',
            is_active: true,
            sort_order: 1
        });
        setCurrentShift(null);
        setAudioFile(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentShift(null);
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
            if (!formData.category_id) {
                alert('Please select a Guided Shift Category');
                setIsSaving(false);
                return;
            }

            const shiftId = currentShift?.id || formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let finalAudioUrl = formData.audio_url;

            // 1. If a new file was selected, upload it to Supabase Storage first
            if (audioFile) {
                setUploadProgress('Uploading audio file to guided-shifts bucket...');
                const fileExt = audioFile.name.split('.').pop();
                const fileName = `${shiftId}-${Date.now()}.${fileExt}`;
                const filePath = `${formData.category_id}/${fileName}`; // Group by category folder

                const { error: uploadError } = await supabase.storage
                    .from('guided-shifts')
                    .upload(filePath, audioFile, { upsert: true });

                if (uploadError) throw uploadError;

                // Get the public URL for the newly uploaded file
                const { data: { publicUrl } } = supabase.storage
                    .from('guided-shifts')
                    .getPublicUrl(filePath);

                finalAudioUrl = publicUrl;
                setUploadProgress('Audio uploaded! Saving database entry...');
            }

            // 2. Prepare payload
            const payload = {
                id: shiftId,
                category_id: formData.category_id,
                title: formData.title,
                intro: formData.intro,
                description: formData.description,
                approach: formData.approach,
                use_when: formData.use_when.split('\n').map(s => s.trim()).filter(s => s.length > 0), // Convert back to JSON array
                science_text: formData.science_text,
                science_source: formData.science_source,
                spiritual_text: formData.spiritual_text,
                spiritual_source: formData.spiritual_source,
                audio_url: finalAudioUrl,
                is_active: formData.is_active,
                sort_order: parseInt(formData.sort_order) || 0
            };

            // 3. Upsert into database
            const { error: dbError } = await supabase
                .from('guided_shifts')
                .upsert(payload, { onConflict: 'id' });

            if (dbError) throw dbError;

            await fetchData();
            setIsEditing(false);
            setUploadProgress('');
        } catch (error) {
            console.error('Error saving shift:', error);
            alert(`Failed to save Guided Shift: ${error.message || 'Unknown error'}`);
        } finally {
            setIsSaving(false);
            setUploadProgress('');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Guided Shift?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('guided_shifts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchData();
        } catch (error) {
            console.error('Error deleting shift:', error);
            alert('Failed to delete Guided Shift');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-6xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Guided Shifts</h1>
                    <p className="text-text-dark/70">Manage individual Guided Shifts and upload audio files.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Shift
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-8 border-b border-text-dark/10 pb-4">
                        {currentShift ? 'Edit Guided Shift' : 'New Guided Shift'}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-8">
                        {/* BASIC INFO */}
                        <div>
                            <h3 className="text-lg font-medium text-text-dark mb-4 drop-shadow-sm">Basic Info</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Title *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                        placeholder="e.g. The Centering Drop"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Unique ID</label>
                                    <input
                                        type="text"
                                        disabled={!!currentShift}
                                        value={formData.id}
                                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl bg-bone/30 text-text-dark/60"
                                        placeholder="Leave blank to auto-generate from title"
                                    />
                                    <p className="text-xs text-text-dark/50 mt-1">Used for database relations and URLs.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
                                    <div>
                                        <label className="block text-sm font-medium text-text-dark mb-1">Category *</label>
                                        <select
                                            required
                                            value={formData.category_id}
                                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                            className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay bg-white"
                                        >
                                            <option value="" disabled>Select a Category...</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>{c.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-text-dark mb-1">Status</label>
                                            <select
                                                value={formData.is_active ? 'active' : 'coming-soon'}
                                                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay bg-white"
                                            >
                                                <option value="active">Active</option>
                                                <option value="coming-soon">Coming Soon</option>
                                            </select>
                                        </div>
                                        <div className="flex-1">
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

                        {/* DESCRIPTIONS */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-text-dark drop-shadow-sm">Member Context</h3>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Intro (Bold large text)</label>
                                <input
                                    type="text"
                                    value={formData.intro}
                                    onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                    placeholder="When everything feels too fast."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Sub-Description (Secondary text)</label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay"
                                    placeholder="A grounding shift for moments of overwhelm..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Approach (Main body paragraph)</label>
                                <textarea
                                    rows="2"
                                    value={formData.approach}
                                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-none"
                                    placeholder="This guided shift meets the body in this state..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">"Use this when:" Bullet Points (One per line)</label>
                                <textarea
                                    rows="4"
                                    value={formData.use_when}
                                    onChange={(e) => setFormData({ ...formData, use_when: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay text-sm"
                                    placeholder="Your thoughts feel fast or spiralling&#10;Your chest feels tight&#10;You need relief"
                                ></textarea>
                            </div>
                        </div>

                        {/* DEEP CORNERS */}
                        <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-text-dark/10">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-clay drop-shadow-sm">Science Corner</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Text</label>
                                    <textarea
                                        rows="3"
                                        value={formData.science_text}
                                        onChange={(e) => setFormData({ ...formData, science_text: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-none text-sm"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Source / Author Citation</label>
                                    <input
                                        type="text"
                                        value={formData.science_source}
                                        onChange={(e) => setFormData({ ...formData, science_source: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay text-sm"
                                        placeholder="Porges, S. W. (2011)."
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-clay drop-shadow-sm">Spiritual Corner</h3>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Text</label>
                                    <textarea
                                        rows="3"
                                        value={formData.spiritual_text}
                                        onChange={(e) => setFormData({ ...formData, spiritual_text: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-none text-sm"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-dark mb-1">Source / Author Citation</label>
                                    <input
                                        type="text"
                                        value={formData.spiritual_source}
                                        onChange={(e) => setFormData({ ...formData, spiritual_source: e.target.value })}
                                        className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay text-sm"
                                        placeholder="Brach, T. (2003)."
                                    />
                                </div>
                            </div>
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
                                ) : 'Save Guided Shift'}
                            </button>
                            {uploadProgress && (
                                <span className="text-sm font-medium text-clay animate-pulse">{uploadProgress}</span>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {shifts.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No supervised shifts found. Upload your first track!</p>
                        </div>
                    ) : (
                        shifts.map((shift) => (
                            <div key={shift.id} className="bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex items-center justify-between gap-6 group">
                                <div className="flex items-center gap-4 min-w-0">
                                    <button
                                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${shift.audio_url ? 'bg-sage text-white hover:bg-sage/80 shadow-sm' : 'bg-bone text-text-dark/30'}`}
                                        title={shift.audio_url ? 'Has audio' : 'Needs audio upload'}
                                        onClick={() => {
                                            if (shift.audio_url) {
                                                const audio = new Audio(shift.audio_url);
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
                                            <h3 className="font-display text-xl text-text-dark truncate">{shift.title}</h3>
                                            {!shift.audio_url && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                                    Missing Audio
                                                </span>
                                            )}
                                            {!shift.is_active && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-text-dark/60 font-medium truncate">
                                            Category: {shift.guided_shift_categories?.title || shift.category_id}
                                        </p>
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(shift)}
                                        className="text-sm font-medium px-4 py-2 rounded-xl text-text-dark hover:bg-bone transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(shift.id)}
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

export default AdminGuidedShiftsPage;
