import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import {
    SITE_COPY_FIELDS, SITE_COPY_PAGES, sectionsForPage, fieldsForSection, parseGroup,
} from '../../lib/siteCopy';

// NOTE: FieldCard and LengthGuide MUST stay at module scope. Declaring a
// component inside AdminSiteCopyPage creates a brand-new component type on
// every render, so React unmounts and remounts the <input> on each keystroke
// and the caret is lost after a single character.

const inputClass =
    'w-full px-3.5 py-2.5 bg-bone/40 border border-clay/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm';

/**
 * The Partnership guide pages are a fixed size, like printed pages — nothing
 * scrolls inside them. For those fields we show how the wording compares to the
 * original, and warn before it would run off the page.
 */
const LengthGuide = ({ f, value }) => {
    const now = (value ?? '').length;
    const original = f.text.length;
    const ratio = original ? now / original : 1;
    const over = ratio > 1.3;
    const near = !over && ratio > 1.12;
    return (
        <p className={`text-xs mt-1.5 ${over ? 'text-red-600' : near ? 'text-golden-deep' : 'text-text-tertiary'}`}>
            {over
                ? `That is quite a bit longer than the original (${now} characters vs ${original}). This page is a fixed size, so the wording may run off it — worth sending Boye a note to check this one.`
                : near
                    ? `A little longer than the original (${now} vs ${original} characters). It should still fit, but take a look at the page.`
                    : `${now} characters — the original was ${original}.`}
        </p>
    );
};

const FieldCard = ({ f, value, saved, busy, showWhere, onChange, onSave, onRevert }) => {
    const original = f.text;
    const isCustom = saved !== undefined && saved !== '' && saved !== original;
    const isChanged = (value ?? '') !== (saved || original);

    return (
        <div className="bg-white border border-clay/25 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                    <label htmlFor={f.key} className="font-medium text-text-dark text-sm">{f.label}</label>
                    {showWhere && <p className="text-[11px] text-text-tertiary mt-0.5">{f.group}</p>}
                    {f.help && <p className="text-xs text-text-muted mt-1">{f.help}</p>}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    {isCustom && (
                        <span className="text-[10px] uppercase tracking-wider bg-sage/15 text-sage px-2 py-0.5 rounded-full">edited</span>
                    )}
                    <button onClick={() => onRevert(f)} className="text-xs text-text-muted hover:text-text-dark underline">
                        Revert
                    </button>
                    <button onClick={() => onSave(f)} disabled={busy || !isChanged}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-sage text-bone hover:bg-sage/90 disabled:opacity-35">
                        Save
                    </button>
                </div>
            </div>

            {f.document ? (
                <textarea id={f.key} rows={22} value={value ?? ''}
                    onChange={(e) => onChange(f.key, e.target.value)}
                    className={`${inputClass} leading-relaxed font-mono`} />
            ) : f.multiline ? (
                <textarea id={f.key} rows={f.rows || 4} value={value ?? ''}
                    onChange={(e) => onChange(f.key, e.target.value)}
                    className={`${inputClass} leading-relaxed ${f.list ? 'font-mono' : ''}`} />
            ) : (
                <input id={f.key} value={value ?? ''}
                    onChange={(e) => onChange(f.key, e.target.value)}
                    className={inputClass} />
            )}

            {f.fixed && <LengthGuide f={f} value={value} />}
            {f.multiline && !f.list && !f.fixed && !f.document && (
                <p className="text-xs text-text-tertiary mt-1.5">
                    Press Enter twice to start a new paragraph. The spacing shows on the website.
                </p>
            )}
        </div>
    );
};

const AdminSiteCopyPage = () => {
    const [values, setValues] = useState({});   // what's in the boxes
    const [saved, setSaved] = useState({});     // what's stored
    const [page, setPage] = useState(SITE_COPY_PAGES[0]);
    const [openSection, setOpenSection] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    const load = useCallback(async () => {
        setLoading(true); setError('');
        try {
            const { data, error } = await supabase.from('site_copy').select('key,value');
            if (error) throw error;
            const stored = {};
            (data || []).forEach((r) => { stored[r.key] = r.value ?? ''; });
            const initial = {};
            SITE_COPY_FIELDS.forEach((f) => { initial[f.key] = stored[f.key] || f.text; });
            setSaved(stored); setValues(initial);
        } catch (err) {
            console.error('Load site copy failed:', err);
            setError("Couldn't load your text. Make sure you're signed in as an admin.");
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { load(); }, [load]);
    useEffect(() => { setOpenSection(sectionsForPage(page)[0] ?? null); }, [page]);

    const isCustom = useCallback(
        (f) => saved[f.key] !== undefined && saved[f.key] !== '' && saved[f.key] !== f.text,
        [saved]
    );
    const isChanged = useCallback(
        (f) => (values[f.key] ?? '') !== (saved[f.key] || f.text),
        [values, saved]
    );

    const unsaved = useMemo(() => SITE_COPY_FIELDS.filter(isChanged), [isChanged]);

    const setValue = useCallback((key, value) => {
        setValues((v) => ({ ...v, [key]: value }));
    }, []);

    const saveFields = useCallback(async (fields) => {
        if (!fields.length) return;
        setBusy(true); setError(''); setNotice('');
        try {
            const rows = fields.map((f) => ({
                key: f.key, value: (values[f.key] ?? '').trim(), updated_at: new Date().toISOString(),
            }));
            const { error } = await supabase.from('site_copy').upsert(rows, { onConflict: 'key' });
            if (error) throw error;
            setSaved((s) => {
                const next = { ...s };
                rows.forEach((r) => { next[r.key] = r.value; });
                return next;
            });
            setNotice(fields.length === 1
                ? 'Saved. Refresh your website to see it.'
                : `Saved ${fields.length} changes. Refresh your website to see them.`);
            setTimeout(() => setNotice(''), 5000);
        } catch (err) {
            console.error('Save failed:', err);
            setError('Could not save. Please try again.');
        } finally { setBusy(false); }
    }, [values]);

    const saveOne = useCallback((f) => saveFields([f]), [saveFields]);
    const revert = useCallback((f) => setValues((v) => ({ ...v, [f.key]: f.text })), []);

    // Search looks across every page, so she can find a phrase without knowing
    // which page it lives on.
    const searchHits = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (q.length < 2) return null;
        return SITE_COPY_FIELDS.filter((f) =>
            (values[f.key] ?? '').toLowerCase().includes(q) ||
            f.label.toLowerCase().includes(q) ||
            f.group.toLowerCase().includes(q));
    }, [search, values]);

    const editedOn = (p) => SITE_COPY_FIELDS.filter((f) => parseGroup(f.group).page === p && isCustom(f)).length;

    const card = (f, showWhere) => (
        <FieldCard key={f.key} f={f} showWhere={showWhere}
            value={values[f.key]} saved={saved[f.key]} busy={busy}
            onChange={setValue} onSave={saveOne} onRevert={revert} />
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-bone via-bone to-clay/20 p-6 md:p-8 lg:p-10 pb-28">
            <div className="mb-7">
                <p className="text-text-muted text-sm tracking-widest uppercase mb-2">Admin Portal</p>
                <h1 className="font-display text-4xl md:text-5xl text-text-dark">Website Text</h1>
                <p className="text-text-muted mt-2 max-w-2xl">
                    Change the wording on your public pages. Pick a page, open a section, edit the box and
                    press <b>Save</b> — then refresh your website to see it. <b>Revert</b> puts the original
                    wording back, so you can&apos;t get stuck.
                </p>
            </div>

            {error && <div className="mb-5 bg-red-50 text-red-600 p-4 rounded-2xl text-sm">{error}</div>}
            {notice && <div className="mb-5 bg-sage/10 text-sage p-4 rounded-2xl text-sm">{notice}</div>}

            {/* Find any wording, anywhere */}
            <div className="relative mb-6 max-w-xl">
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search all your website text…"
                    className="w-full pl-11 pr-4 py-3 bg-white/80 border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm" />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin" />
                </div>
            ) : searchHits ? (
                <div className="space-y-3 max-w-3xl">
                    <p className="text-sm text-text-muted">
                        {searchHits.length} {searchHits.length === 1 ? 'result' : 'results'} for “{search.trim()}”
                    </p>
                    {searchHits.map((f) => card(f, true))}
                    {searchHits.length === 0 && (
                        <p className="text-text-muted py-8 text-center">Nothing matched that. Try fewer words.</p>
                    )}
                </div>
            ) : (
                <>
                    {/* Page tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-clay/30 pb-4">
                        {SITE_COPY_PAGES.map((p) => {
                            const n = editedOn(p);
                            return (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${page === p
                                        ? 'bg-sage text-bone shadow-sm'
                                        : 'bg-white/70 text-text-muted border border-clay/30 hover:bg-white'}`}>
                                    {p}
                                    {n > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${page === p ? 'bg-bone/25' : 'bg-sage/15 text-sage'}`}>{n}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {page === 'Partnership Guide' && (
                        <div className="max-w-3xl mb-5 bg-golden-light/15 border border-golden-light/40 rounded-2xl px-5 py-4">
                            <p className="text-sm text-text-dark leading-relaxed">
                                <b>A note on this one.</b> The Partnership Guide pages are a fixed size,
                                like printed pages — nothing scrolls inside them. Rewording is completely
                                fine; just try to keep each box roughly the same length as it is now. Each
                                box tells you how it compares, and warns you if it has grown enough to run
                                off the page.
                            </p>
                        </div>
                    )}

                    {/* Sections, one open at a time */}
                    <div className="space-y-3 max-w-3xl">
                        {sectionsForPage(page).map((section) => {
                            const fields = fieldsForSection(page, section);
                            const open = openSection === section;
                            const edited = fields.filter(isCustom).length;
                            const pending = fields.filter(isChanged).length;
                            return (
                                <div key={section} className="bg-white/70 border border-white/60 rounded-2xl overflow-hidden">
                                    <button onClick={() => setOpenSection(open ? null : section)}
                                        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-white/60 transition-colors">
                                        <span className="font-display text-lg text-text-dark">{section}</span>
                                        <span className="flex items-center gap-2.5 flex-shrink-0">
                                            {pending > 0 && (
                                                <span className="text-[10px] uppercase tracking-wider bg-golden-light/25 text-golden-deep px-2 py-0.5 rounded-full">
                                                    {pending} unsaved
                                                </span>
                                            )}
                                            {edited > 0 && (
                                                <span className="text-[10px] uppercase tracking-wider bg-sage/15 text-sage px-2 py-0.5 rounded-full">
                                                    {edited} edited
                                                </span>
                                            )}
                                            <span className="text-text-muted text-xs">{fields.length} {fields.length === 1 ? 'box' : 'boxes'}</span>
                                            <svg className={`w-4 h-4 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                    {open && (
                                        <div className="px-5 pb-5 space-y-3 border-t border-clay/20 pt-4">
                                            {fields.map((f) => card(f))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Save everything at once */}
            {unsaved.length > 0 && (
                <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-clay/30 px-6 py-4">
                    <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                        <p className="text-sm text-text-dark">
                            <b>{unsaved.length}</b> unsaved {unsaved.length === 1 ? 'change' : 'changes'}
                        </p>
                        <div className="flex items-center gap-3">
                            <button onClick={() => unsaved.forEach(revert)}
                                className="text-sm text-text-muted hover:text-text-dark underline">
                                Undo all
                            </button>
                            <button onClick={() => saveFields(unsaved)} disabled={busy}
                                className="px-6 py-2.5 rounded-full text-sm font-medium bg-sage text-bone hover:bg-sage/90 disabled:opacity-50">
                                {busy ? 'Saving…' : 'Save all changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSiteCopyPage;
