import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminAffirmationsPage = () => {
    const [affirmations, setAffirmations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAffirmation, setCurrentAffirmation] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        category_id: '',
        text: '',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories for the dropdown
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('affirmation_categories')
                .select('id, title')
                .order('sort_order', { ascending: true });

            if (categoriesError) throw categoriesError;
            setCategories(categoriesData || []);

            // Fetch affirmations with joined category data
            const { data: affirmationsData, error: affirmationsError } = await supabase
                .from('affirmations')
                .select(`
                    *,
                    affirmation_categories (
                        title
                    )
                `)
                .order('category_id', { ascending: true })
                .order('sort_order', { ascending: true });

            if (affirmationsError) throw affirmationsError;
            setAffirmations(affirmationsData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to load Affirmations. Are the tables created?');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (affirmation) => {
        setFormData({
            category_id: affirmation.category_id,
            text: affirmation.text,
            is_active: affirmation.is_active !== false,
            sort_order: affirmation.sort_order || 0
        });
        setCurrentAffirmation(affirmation);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            category_id: categories.length > 0 ? categories[0].id : '',
            text: '',
            is_active: true,
            sort_order: affirmations.length + 1
        });
        setCurrentAffirmation(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentAffirmation(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (!formData.category_id) {
                alert('Please select a Category');
                setIsSaving(false);
                return;
            }

            const payload = {
                category_id: formData.category_id,
                text: formData.text,
                is_active: formData.is_active,
                sort_order: parseInt(formData.sort_order) || 0
            };

            if (currentAffirmation?.id) {
                payload.id = currentAffirmation.id;
            }

            const { error } = await supabase
                .from('affirmations')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;

            await fetchData();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving affirmation:', error);
            alert(`Failed to save Affirmation: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Affirmation?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('affirmations')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchData();
        } catch (error) {
            console.error('Error deleting affirmation:', error);
            alert('Failed to delete Affirmation');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Affirmations</h1>
                    <p className="text-text-dark/70">Manage the individual affirmations inside each category.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Affirmation
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-8 border-b border-text-dark/10 pb-4">
                        {currentAffirmation ? 'Edit Affirmation' : 'New Affirmation'}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1">Category *</label>
                            <select
                                required
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                className="w-full md:w-1/2 px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay bg-white"
                            >
                                <option value="" disabled>Select a Category...</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-dark mb-1">Affirmation Text</label>
                            <textarea
                                rows="3"
                                required
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:ring-1 focus:ring-clay resize-none text-lg leading-relaxed font-medium"
                                placeholder="I am allowed to take up space."
                            ></textarea>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-2 p-4 bg-bone/50 rounded-xl border border-text-dark/5 w-full">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-5 h-5 rounded border-text-dark/20 text-clay focus:ring-clay"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-text-dark cursor-pointer">
                                    Active (Visible in Portal)
                                </label>
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
                                {isSaving ? 'Saving...' : 'Save Affirmation'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {affirmations.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No affirmations found. Add your first one!</p>
                        </div>
                    ) : (
                        affirmations.map((affirmation) => (
                            <div key={affirmation.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex flex-col md:flex-row md:items-center justify-between gap-6 group ${!affirmation.is_active ? 'opacity-60' : ''}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                        <span className="text-xs bg-bone px-2 py-1 rounded text-text-dark/60 font-medium w-fit">
                                            {affirmation.affirmation_categories?.title || affirmation.category_id}
                                        </span>
                                        {!affirmation.is_active && (
                                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full w-fit">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-display text-xl text-text-dark shrink-0">
                                        "{affirmation.text}"
                                    </h3>
                                </div>
                                <div className="shrink-0 flex items-center justify-between md:justify-end gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-text-dark/10">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {affirmation.sort_order}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(affirmation)}
                                            className="text-sm font-medium px-4 py-2 rounded-xl text-text-dark hover:bg-bone transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(affirmation.id)}
                                            className="text-sm font-medium px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminAffirmationsPage;
