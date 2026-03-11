import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminAudioFamiliesPage = () => {
    const [families, setFamilies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFamily, setCurrentFamily] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        icon: '',
        use_when: '',
        sort_order: 0
    });

    useEffect(() => {
        fetchFamilies();
    }, []);

    const fetchFamilies = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('audio_families')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setFamilies(data || []);
        } catch (error) {
            console.error('Error fetching families:', error);
            alert('Failed to load Audio Families. Are the tables created?');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (family) => {
        setFormData({
            id: family.id,
            title: family.title,
            description: family.description || '',
            icon: family.icon || '',
            use_when: family.use_when || '',
            sort_order: family.sort_order || 0
        });
        setCurrentFamily(family);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            icon: '✨',
            use_when: '',
            sort_order: families.length + 1
        });
        setCurrentFamily(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentFamily(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Very simple slugify for ID if new
            const familyId = currentFamily?.id || formData.id || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const payload = {
                id: familyId,
                title: formData.title,
                description: formData.description,
                icon: formData.icon,
                use_when: formData.use_when,
                sort_order: parseInt(formData.sort_order) || 0
            };

            const { error } = await supabase
                .from('audio_families')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;

            await fetchFamilies();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving family:', error);
            alert('Failed to save Audio Family');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this family? This will permanently delete all Audio Breaths inside it too.')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('audio_families')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchFamilies();
        } catch (error) {
            console.error('Error deleting family:', error);
            alert('Failed to delete Audio Family');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Audio Families</h1>
                    <p className="text-text-dark/70">Manage the highest-level categories for Audio Breaths.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Family
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-6">{currentFamily ? 'Edit Family' : 'New Audio Family'}</h2>
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay focus:ring-1 focus:ring-clay"
                                    placeholder="e.g. Calm Me Down"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Unique ID</label>
                                <input
                                    type="text"
                                    disabled={!!currentFamily}
                                    value={formData.id}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl bg-bone/30 text-text-dark/60"
                                    placeholder="Leave blank to auto-generate from title"
                                />
                                <p className="text-xs text-text-dark/50 mt-1">Used for database relations and URLs.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay"
                                    placeholder="e.g. 💗"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-dark mb-1">Sort Order</label>
                                <input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                                    className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1">Short Description</label>
                            <textarea
                                rows="2"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay resive-none"
                                placeholder="For anxiety, nervous system overload, or high activation."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1">"Use When" Advice</label>
                            <textarea
                                rows="2"
                                value={formData.use_when}
                                onChange={(e) => setFormData({ ...formData, use_when: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay resize-none"
                                placeholder="Your system is braced or scanning for threat and needs to settle first."
                            ></textarea>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-text-dark/10">
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
                                className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isSaving ? 'Saving...' : 'Save Family'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {families.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No audio families found. Create your first one!</p>
                        </div>
                    ) : (
                        families.map((family) => (
                            <div key={family.id} className="bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-bone flex items-center justify-center text-2xl shrink-0">
                                    {family.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-xl text-text-dark truncate">{family.title}</h3>
                                        <span className="text-xs bg-bone px-2 py-0.5 rounded-full text-text-dark/60 font-mono">
                                            {family.id}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-dark/70 truncate">{family.description}</p>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {family.sort_order}</span>
                                    <button
                                        onClick={() => handleEdit(family)}
                                        className="text-text-dark/50 hover:text-clay transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(family.id)}
                                        className="text-text-dark/40 hover:text-red-500 transition-colors"
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

export default AdminAudioFamiliesPage;
