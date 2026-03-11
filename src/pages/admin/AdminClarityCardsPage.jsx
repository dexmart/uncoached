import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const AdminClarityCardsPage = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        is_active: true,
        sort_order: 0
    });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('clarity_cards')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setCards(data || []);
        } catch (error) {
            console.error('Error fetching cards:', error);
            alert('Failed to load Clarity Cards. Check if tables are created.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (card) => {
        setFormData({
            title: card.title,
            description: card.description || '',
            is_active: card.is_active,
            sort_order: card.sort_order || 0
        });
        setCurrentCard(card);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setFormData({
            title: '',
            description: '',
            is_active: true,
            sort_order: cards.length + 1
        });
        setCurrentCard(null);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentCard(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                is_active: formData.is_active,
                sort_order: parseInt(formData.sort_order) || 0
            };

            if (currentCard?.id) {
                payload.id = currentCard.id;
            }

            const { error } = await supabase
                .from('clarity_cards')
                .upsert(payload, { onConflict: 'id' });

            if (error) throw error;

            await fetchCards();
            setIsEditing(false);
        } catch (error) {
            console.error('Error saving clarity card:', error);
            alert('Failed to save Clarity Card');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this Clarity Card?')) {
            return;
        }

        try {
            const { error } = await supabase
                .from('clarity_cards')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchCards();
        } catch (error) {
            console.error('Error deleting clarity card:', error);
            alert('Failed to delete Clarity Card');
        }
    };

    if (loading) {
        return <div className="p-8"><div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-display text-4xl text-text-dark mb-2">Clarity Cards</h1>
                    <p className="text-text-dark/70">Manage the journaling cards and reflective prompts.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleAddNew}
                        className="px-5 py-2.5 bg-clay text-white font-medium rounded-xl hover:bg-clay/90 transition-colors shadow-sm"
                    >
                        + New Card
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-text-dark/10">
                    <h2 className="font-display text-2xl mb-6">{currentCard ? 'Edit Clarity Card' : 'New Clarity Card'}</h2>
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
                                    placeholder="e.g. A Tiny Win to Celebrate"
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
                            <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
                            <textarea
                                rows="3"
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-text-dark/20 rounded-xl focus:outline-none focus:border-clay resize-none"
                                placeholder="e.g. Catch the progress you usually gloss over..."
                            ></textarea>
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
                                {isSaving ? 'Saving...' : 'Save Card'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {cards.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-text-dark/10 shadow-sm">
                            <p className="text-text-dark/50">No Clarity Cards found. Create your first one!</p>
                        </div>
                    ) : (
                        cards.map((card) => (
                            <div key={card.id} className={`bg-white p-5 rounded-2xl shadow-sm border border-text-dark/10 flex items-center gap-6 ${!card.is_active ? 'opacity-60' : ''}`}>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-display text-xl text-text-dark truncate">{card.title}</h3>
                                        {!card.is_active && (
                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-bone text-text-dark/60">Hidden</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-text-dark/70 truncate">{card.description}</p>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <span className="text-xs text-text-dark/40 mr-4">Order: {card.sort_order}</span>
                                    <button
                                        onClick={() => handleEdit(card)}
                                        className="text-text-dark/50 hover:text-clay transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(card.id)}
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

export default AdminClarityCardsPage;
