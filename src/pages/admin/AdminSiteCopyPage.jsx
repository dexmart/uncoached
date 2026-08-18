import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { SITE_COPY_FIELDS, SITE_COPY_GROUPS } from '../../lib/siteCopy';

const AdminSiteCopyPage = () => {
    const [values, setValues] = useState({});     // key -> current text in the box
    const [saved, setSaved] = useState({});       // key -> what's stored
    const [openGroup, setOpenGroup] = useState(SITE_COPY_GROUPS[0]);
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState(null);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const { data, error } = await supabase.from('site_copy').select('key,value');
            if (error) throw error;
            const stored = {};
            (data || []).forEach((r) => { stored[r.key] = r.value ?? ''; });
            const initial = {};
            SITE_COPY_FIELDS.forEach((f) => { initial[f.key] = stored[f.key] ?? f.text; });
            setSaved(stored);
            setValues(initial);
        } catch (err) {
            console.error('Load site copy failed:', err);
            setError("Couldn't load the site copy. Make sure you're signed in as an admin and the setup SQL has been run.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const save = async (field) => {
        setSavingKey(field.key);
        setError('');
        setNotice('');
        try {
            const value = (values[field.key] ?? '').trim();
            const { error } = await supabase
                .from('site_copy')
                .upsert({ key: field.key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
            if (error) throw error;
            setSaved((s) => ({ ...s, [field.key]: value }));
            setNotice(`Saved “${field.label}”. Refresh the page to see it live.`);
            setTimeout(() => setNotice(''), 4000);
        } catch (err) {
            console.error('Save failed:', err);
            setError(`Could not save “${field.label}”.`);
        } finally {
            setSavingKey(null);
        }
    };

    const reset = (field) => setValues((v) => ({ ...v, [field.key]: field.text }));

    const isChanged = (f) => (values[f.key] ?? '') !== (saved[f.key] ?? f.text);
    const isCustom = (f) => saved[f.key] !== undefined && saved[f.key] !== '' && saved[f.key] !== f.text;

    const groupFields = SITE_COPY_FIELDS.filter((f) => f.group === openGroup);
    const editedCount = SITE_COPY_FIELDS.filter(isCustom).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-bone via-bone to-clay/20 p-6 md:p-8 lg:p-10">
            <div className="mb-8">
                <p className="text-text-muted text-sm tracking-widest uppercase mb-2">Admin Portal</p>
                <h1 className="font-display text-4xl md:text-5xl text-text-dark">Website Text</h1>
                <p className="text-text-muted mt-2 max-w-2xl">
                    Edit the wording on your public pages. Change a box, press <b>Save</b>, then refresh
                    the page to see it. <b>Revert</b> puts the original wording back.
                    {editedCount > 0 && <> You've customised <b>{editedCount}</b> {editedCount === 1 ? 'field' : 'fields'}.</>}
                </p>
            </div>

            {error && <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm">{error}</div>}
            {notice && <div className="mb-6 bg-sage/10 text-sage p-4 rounded-2xl text-sm">{notice}</div>}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
                    {/* Sections */}
                    <div className="bg-white/60 border border-white/60 rounded-2xl p-3 lg:sticky lg:top-6">
                        {SITE_COPY_GROUPS.map((g) => {
                            const count = SITE_COPY_FIELDS.filter((f) => f.group === g && isCustom(f)).length;
                            return (
                                <button key={g} onClick={() => setOpenGroup(g)}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm mb-1 transition-colors flex items-center justify-between gap-2 ${openGroup === g
                                        ? 'bg-sage text-bone'
                                        : 'text-text-muted hover:bg-clay/10 hover:text-text-dark'}`}>
                                    <span>{g}</span>
                                    {count > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${openGroup === g ? 'bg-bone/25' : 'bg-sage/15 text-sage'}`}>
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        {groupFields.map((f) => (
                            <div key={f.key} className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-5">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                    <label htmlFor={f.key} className="font-medium text-text-dark">
                                        {f.label}
                                        {isCustom(f) && (
                                            <span className="ml-2 text-[10px] uppercase tracking-wider bg-sage/15 text-sage px-2 py-0.5 rounded-full">
                                                edited
                                            </span>
                                        )}
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => reset(f)}
                                            className="text-xs text-text-muted hover:text-text-dark underline">
                                            Revert
                                        </button>
                                        <button onClick={() => save(f)} disabled={savingKey === f.key || !isChanged(f)}
                                            className="px-4 py-1.5 rounded-lg text-sm font-medium bg-sage text-bone hover:bg-sage/90 disabled:opacity-40">
                                            {savingKey === f.key ? 'Saving…' : 'Save'}
                                        </button>
                                    </div>
                                </div>

                                {f.multiline ? (
                                    <textarea id={f.key} rows={3} value={values[f.key] ?? ''}
                                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white border border-clay/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm leading-relaxed" />
                                ) : (
                                    <input id={f.key} value={values[f.key] ?? ''}
                                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                                        className="w-full px-4 py-3 bg-white border border-clay/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSiteCopyPage;
