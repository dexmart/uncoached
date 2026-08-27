import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import PractitionerEditor from '../../components/admin/PractitionerEditor';

const STATUSES = [
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'declined', label: 'Declined' },
];

const FIELDS = [
    ['Email', 'email'],
    ['Short bio', 'bio'],
    ['Areas of focus', 'areas_of_focus'],
    ['Countries', 'countries'],
    ['Virtual / in-person', 'delivery'],
    ['Languages', 'languages'],
    ['Website / booking', 'website_url'],
    ['Social media', 'social_url'],
    ['Expertise to contribute', 'expertise_area'],
    ['Resource ideas', 'resource_ideas'],
];

const badge = (status) => ({
    pending: { bg: '#F6EBD4', fg: '#8A6414', text: 'Pending' },
    approved: { bg: '#E7EDE8', fg: '#3F5D4D', text: 'Approved' },
    declined: { bg: '#F3E7E4', fg: '#9A5B2E', text: 'Declined' },
}[status] || { bg: '#ECE9E2', fg: '#6B6A66', text: status });

const AdminPractitionersPage = () => {
    const [filter, setFilter] = useState('pending');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState(null);
    const [error, setError] = useState('');
    const [openId, setOpenId] = useState(null);
    const [editId, setEditId] = useState(null);      // row being edited, or 'new'
    const [counts, setCounts] = useState({});

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const { data, error } = await supabase
                .from('practitioner_applications')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setRows(data || []);
            const c = {};
            (data || []).forEach((r) => { c[r.status] = (c[r.status] || 0) + 1; });
            setCounts(c);
        } catch (err) {
            console.error('Load applications failed:', err);
            setError("Couldn't load applications. Make sure you're signed in as an admin.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const setStatus = async (row, status) => {
        setBusyId(row.id);
        try {
            const { error } = await supabase
                .from('practitioner_applications')
                .update({ status })
                .eq('id', row.id);
            if (error) throw error;
            setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
            setCounts((c) => ({
                ...c,
                [row.status]: Math.max(0, (c[row.status] || 1) - 1),
                [status]: (c[status] || 0) + 1,
            }));
        } catch (err) {
            console.error('Update failed:', err);
            setError('Could not update that application.');
        } finally {
            setBusyId(null);
        }
    };

    const remove = async (row) => {
        if (!window.confirm(`Permanently delete ${row.full_name}'s application? This cannot be undone.`)) return;
        setBusyId(row.id);
        try {
            const { error } = await supabase
                .from('practitioner_applications')
                .delete()
                .eq('id', row.id);
            if (error) throw error;
            setRows((rs) => rs.filter((r) => r.id !== row.id));
            setCounts((c) => ({ ...c, [row.status]: Math.max(0, (c[row.status] || 1) - 1) }));
        } catch (err) {
            console.error('Delete failed:', err);
            setError('Could not delete that application.');
        } finally {
            setBusyId(null);
        }
    };

    // Saving from the editor: replace the row in place, or drop a newly added
    // practitioner in at the top and switch to the tab it landed in.
    const onSaved = (saved, isNew) => {
        if (isNew) {
            setRows((rs) => [saved, ...rs]);
            setCounts((c) => ({ ...c, approved: (c.approved || 0) + 1 }));
            setFilter('approved');
        } else {
            setRows((rs) => rs.map((r) => (r.id === saved.id ? saved : r)));
        }
        setEditId(null);
    };

    const visible = rows.filter((r) => r.status === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-bone via-bone to-clay/20 p-6 md:p-8 lg:p-10">
            <div className="mb-8">
                <p className="text-text-muted text-sm tracking-widest uppercase mb-2">Admin Portal</p>
                <h1 className="font-display text-4xl md:text-5xl text-text-dark">Practitioners</h1>
                <p className="text-text-muted mt-2 max-w-2xl">
                    Applications from the Partnership guide. Approving one publishes their profile on
                    the public Practitioners page. You can edit anyone&apos;s profile here — their photo,
                    bio, focus areas and links — or add someone who never filled in the form.
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm">{error}</div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
                {STATUSES.map((s) => (
                    <button key={s.key} onClick={() => setFilter(s.key)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === s.key
                            ? 'bg-sage text-bone shadow-sm'
                            : 'bg-white/70 text-text-muted border border-clay/30 hover:bg-white'}`}>
                        {s.label} {counts[s.key] ? `(${counts[s.key]})` : ''}
                    </button>
                ))}
                <button onClick={load}
                    className="px-5 py-2 rounded-full text-sm bg-white/70 border border-clay/30 text-text-muted hover:bg-white">
                    Refresh
                </button>
                <button onClick={() => setEditId(editId === 'new' ? null : 'new')}
                    className="ml-auto px-5 py-2 rounded-full text-sm font-medium bg-sage text-bone hover:bg-sage/90">
                    {editId === 'new' ? 'Cancel' : '+ Add a practitioner'}
                </button>
            </div>

            {editId === 'new' && (
                <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm mb-6">
                    <h2 className="font-display text-xl text-text-dark">Add a practitioner</h2>
                    <p className="text-text-muted text-sm mt-1">
                        For someone you have already agreed with directly, outside the application form.
                    </p>
                    <PractitionerEditor onSaved={onSaved} onCancel={() => setEditId(null)} />
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin" />
                </div>
            ) : visible.length === 0 ? (
                <div className="bg-white/60 border border-clay/20 rounded-2xl p-12 text-center">
                    <p className="text-text-muted">No {filter} applications.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {visible.map((r) => {
                        const b = badge(r.status);
                        const open = openId === r.id;
                        const editing = editId === r.id;
                        return (
                            <div key={r.id}
                                className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {r.photo_url ? (
                                        <img src={r.photo_url} alt={r.full_name}
                                            className="w-16 h-16 rounded-full object-cover flex-shrink-0 border border-clay/30" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-sage/10 text-sage flex items-center justify-center font-display text-lg flex-shrink-0">
                                            {(r.full_name || '?').slice(0, 1)}
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-display text-xl text-text-dark">{r.full_name}</h3>
                                            {r.credentials && (
                                                <span className="text-text-muted text-sm">{r.credentials}</span>
                                            )}
                                            <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold"
                                                style={{ backgroundColor: b.bg, color: b.fg }}>{b.text}</span>
                                        </div>
                                        <p className="text-text-muted text-sm mt-1">
                                            {r.areas_of_focus || 'No focus areas given'}
                                            {r.countries ? ` · ${r.countries}` : ''}
                                        </p>
                                        <p className="text-text-tertiary text-xs mt-1">
                                            {r.email} · applied {new Date(r.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 sm:justify-end">
                                        {r.status !== 'approved' && (
                                            <button onClick={() => setStatus(r, 'approved')} disabled={busyId === r.id}
                                                className="px-4 py-2 rounded-xl text-sm font-medium bg-sage text-bone hover:bg-sage/90 disabled:opacity-50">
                                                Approve
                                            </button>
                                        )}
                                        {r.status !== 'declined' && (
                                            <button onClick={() => setStatus(r, 'declined')} disabled={busyId === r.id}
                                                className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-clay/40 text-text-muted hover:bg-bone disabled:opacity-50">
                                                Decline
                                            </button>
                                        )}
                                        {r.status !== 'pending' && (
                                            <button onClick={() => setStatus(r, 'pending')} disabled={busyId === r.id}
                                                className="px-4 py-2 rounded-xl text-sm bg-white border border-clay/40 text-text-muted hover:bg-bone disabled:opacity-50">
                                                Reopen
                                            </button>
                                        )}
                                        <button onClick={() => { setEditId(editing ? null : r.id); setOpenId(null); }}
                                            className="px-4 py-2 rounded-xl text-sm bg-white border border-clay/40 text-text-muted hover:bg-bone">
                                            {editing ? 'Close' : 'Edit profile'}
                                        </button>
                                        <button onClick={() => { setOpenId(open ? null : r.id); setEditId(null); }}
                                            className="px-4 py-2 rounded-xl text-sm bg-white border border-clay/40 text-text-muted hover:bg-bone">
                                            {open ? 'Hide' : 'Details'}
                                        </button>
                                        <button onClick={() => remove(r)} disabled={busyId === r.id}
                                            className="px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
                                            title="Delete permanently">
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                {editing && (
                                    <PractitionerEditor row={r} onSaved={onSaved} onCancel={() => setEditId(null)} />
                                )}

                                {open && (
                                    <dl className="mt-5 pt-5 border-t border-clay/20 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                                        {FIELDS.filter(([, k]) => r[k]).map(([label, k]) => (
                                            <div key={k} className={k === 'bio' || k === 'resource_ideas' ? 'sm:col-span-2' : ''}>
                                                <dt className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">{label}</dt>
                                                <dd className="text-sm text-text-dark whitespace-pre-line break-words">
                                                    {/^https?:\/\//i.test(r[k]) ? (
                                                        <a href={r[k]} target="_blank" rel="noopener noreferrer"
                                                            className="text-sage hover:underline">{r[k]}</a>
                                                    ) : r[k]}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminPractitionersPage;
