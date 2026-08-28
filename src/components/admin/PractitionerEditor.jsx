import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { tidyUrl } from '../../lib/urls';
import { parseFocusAreas } from '../../lib/practitionerCategories';

// Lets Johanna write or correct a practitioner's profile herself, and add
// someone who never went through the application form. Everything here is what
// shows publicly, except the email, which stays private.

const BLANK = {
    full_name: '', credentials: '', email: '', photo_url: '', bio: '',
    areas_of_focus: '', countries: '', delivery: '', languages: '',
    website_url: '', social_url: '', uncoached_resource: '',
};

const input =
    'w-full px-3.5 py-2.5 bg-bone/40 border border-clay/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark text-sm';

const Row = ({ label, hint, children, wide }) => (
    <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
        <span className="block text-sm font-medium text-text-dark mb-1">{label}</span>
        {hint && <span className="block text-xs text-text-muted mb-1.5">{hint}</span>}
        {children}
    </label>
);

const PractitionerEditor = ({ row, onSaved, onCancel }) => {
    const isNew = !row?.id;
    const [form, setForm] = useState({ ...BLANK, ...(row || {}) });
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
    const focusCount = parseFocusAreas(form.areas_of_focus).length;

    const uploadPhoto = async (file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setError('Please choose a photo under 5MB.');
            return;
        }
        setBusy(true);
        setError('');
        try {
            const ext = file.name.split('.').pop();
            const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { error: upErr } = await supabase.storage
                .from('practitioner-photos').upload(path, file, { upsert: false });
            if (upErr) throw upErr;
            const url = supabase.storage.from('practitioner-photos').getPublicUrl(path).data.publicUrl;
            setForm((f) => ({ ...f, photo_url: url }));
        } catch (err) {
            console.error('Photo upload failed:', err);
            setError("That photo couldn't be uploaded. Try a different file.");
        } finally {
            setBusy(false);
        }
    };

    const save = async () => {
        if (!form.full_name.trim()) { setError('A name is needed.'); return; }
        if (!form.email.trim()) { setError('An email is needed. It stays private — it is how you reach them.'); return; }

        setBusy(true);
        setError('');
        const payload = {
            full_name: form.full_name.trim(),
            credentials: form.credentials?.trim() || null,
            email: form.email.trim(),
            photo_url: form.photo_url || null,
            bio: form.bio?.trim() || null,
            areas_of_focus: form.areas_of_focus?.trim() || null,
            countries: form.countries?.trim() || null,
            delivery: form.delivery || null,
            languages: form.languages?.trim() || null,
            website_url: tidyUrl(form.website_url),
            social_url: tidyUrl(form.social_url),
            uncoached_resource: form.uncoached_resource?.trim() || null,
        };

        try {
            if (isNew) {
                // Added by hand, so it is already reviewed — publish it directly.
                const { data, error } = await supabase
                    .from('practitioner_applications')
                    .insert({ ...payload, status: 'approved', consent: true })
                    .select()
                    .single();
                if (error) throw error;
                onSaved(data, true);
            } else {
                const { data, error } = await supabase
                    .from('practitioner_applications')
                    .update(payload)
                    .eq('id', row.id)
                    .select()
                    .single();
                if (error) throw error;
                onSaved(data, false);
            }
        } catch (err) {
            console.error('Save practitioner failed:', err);
            setError('Could not save. Please try again.');
            setBusy(false);
        }
    };

    return (
        <div className="mt-5 pt-5 border-t border-clay/20">
            {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-xl text-sm">{error}</div>}

            <div className="flex items-center gap-4 mb-5">
                {form.photo_url ? (
                    <img src={form.photo_url} alt="" className="w-20 h-20 rounded-full object-cover border border-clay/30" />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-sage/10 text-sage flex items-center justify-center font-display text-xl">
                        {(form.full_name || '?').slice(0, 1)}
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium text-text-dark mb-1">Profile photo</p>
                    <div className="flex items-center gap-3">
                        <input type="file" accept="image/*" disabled={busy}
                            onChange={(e) => uploadPhoto(e.target.files?.[0])}
                            className="text-xs text-text-muted file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-sage file:text-bone file:text-xs file:font-medium hover:file:bg-sage/90 file:cursor-pointer" />
                        {form.photo_url && (
                            <button onClick={() => setForm((f) => ({ ...f, photo_url: '' }))}
                                className="text-xs text-text-muted hover:text-red-500 underline">
                                Remove
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-text-tertiary mt-1.5">A clear headshot, under 5MB.</p>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
                <Row label="Full name">
                    <input value={form.full_name} onChange={set('full_name')} className={input} />
                </Row>
                <Row label="Credentials / training">
                    <input value={form.credentials || ''} onChange={set('credentials')} className={input}
                        placeholder="RP, MSW, RSW…" />
                </Row>

                <Row label="Email" hint="Private — never shown on the website." wide>
                    <input type="email" value={form.email} onChange={set('email')} className={input} />
                </Row>

                <Row label="Short bio" hint="Shown on their card in the directory." wide>
                    <textarea rows={4} value={form.bio || ''} onChange={set('bio')} className={input} />
                </Row>

                <Row label="Area(s) of focus"
                    hint="Separate with commas. These become the filter buttons on the Practitioners page."
                    wide>
                    <input value={form.areas_of_focus || ''} onChange={set('areas_of_focus')} className={input}
                        placeholder="Trauma Therapy, Somatic Practice, EMDR…" />
                    {focusCount > 5 && (
                        <span className="block text-xs text-golden-deep mt-1.5">
                            That&apos;s {focusCount} areas — 5 or fewer keeps the filters tidy.
                        </span>
                    )}
                </Row>

                <Row label="Country / countries">
                    <input value={form.countries || ''} onChange={set('countries')} className={input}
                        placeholder="Canada, USA…" />
                </Row>
                <Row label="Languages">
                    <input value={form.languages || ''} onChange={set('languages')} className={input}
                        placeholder="English, German…" />
                </Row>

                <Row label="How they work with clients">
                    <div className="flex flex-wrap gap-2">
                        {['Virtual', 'In-person', 'Both'].map((opt) => (
                            <button key={opt} type="button"
                                onClick={() => setForm((f) => ({ ...f, delivery: f.delivery === opt ? '' : opt }))}
                                className={`px-4 py-2 rounded-full text-sm border transition-colors ${form.delivery === opt
                                    ? 'bg-sage text-bone border-sage'
                                    : 'bg-white text-text-muted border-clay/40 hover:border-sage/40'}`}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </Row>
                <Row label="Website / booking link">
                    <input value={form.website_url || ''} onChange={set('website_url')} className={input}
                        placeholder="theirpractice.com" />
                </Row>

                <Row label="Social media" hint="A link, or a handle like @theirname." wide>
                    <input value={form.social_url || ''} onChange={set('social_url')} className={input} />
                </Row>

                <Row label="Uncoached resource (optional)"
                    hint="What they contributed to the Library. Shown on their card so visitors can see their work. Leave it empty and the card simply doesn't show the line."
                    wide>
                    <input value={form.uncoached_resource || ''} onChange={set('uncoached_resource')}
                        className={input}
                        placeholder="Grounding Practice for Panic — Audio Breath" />
                </Row>
            </div>

            <div className="flex items-center gap-3 mt-6">
                <button onClick={save} disabled={busy}
                    className="px-6 py-2.5 rounded-full text-sm font-medium bg-sage text-bone hover:bg-sage/90 disabled:opacity-50">
                    {busy ? 'Saving…' : isNew ? 'Add practitioner' : 'Save changes'}
                </button>
                <button onClick={onCancel} disabled={busy}
                    className="text-sm text-text-muted hover:text-text-dark underline">
                    Cancel
                </button>
                {isNew && (
                    <span className="text-xs text-text-tertiary">
                        They&apos;ll be published on the Practitioners page straight away.
                    </span>
                )}
            </div>
        </div>
    );
};

export default PractitionerEditor;
