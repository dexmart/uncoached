import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { parseFocusAreas } from '../lib/practitionerCategories';
import { useCopy } from '../context/SiteCopyContext';

const Field = ({ label, hint, optional, children }) => (
    <label className="block">
        <span className="block font-medium text-text-dark mb-1.5">
            {label}{' '}
            {optional && <span className="text-text-tertiary font-normal text-sm">(optional)</span>}
        </span>
        {hint && <span className="block text-sm text-text-muted mb-2">{hint}</span>}
        {children}
    </label>
);

const inputClass =
    'w-full px-4 py-3 bg-white border border-clay/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/40 text-text-dark placeholder-text-tertiary';

// Practitioners type links however they like — "example.com", "www.example.com",
// "https://example.com". Store something that actually works as a link.
const tidyUrl = (value) => {
    const s = (value || '').trim();
    if (!s) return null;
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith('@')) return s;                    // a social handle, leave alone
    if (!s.includes('.') || /\s/.test(s)) return s;     // not a domain — keep as typed
    return `https://${s.replace(/^\/+/, '')}`;
};

const PartnershipApplyPage = () => {
    const copy = useCopy();
    const [form, setForm] = useState({
        full_name: '', credentials: '', email: '', bio: '', areas_of_focus: '',
        countries: '', delivery: '', languages: '', website_url: '', social_url: '',
        expertise_area: '', resource_ideas: '',
        consent_publish: false, consent_collaborate: false,
    });
    const [photo, setPhoto] = useState(null);

    const focusCount = parseFocusAreas(form.areas_of_focus).length;
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [done, setDone] = useState(false);

    const set = (k) => (e) =>
        setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            // Upload the photo first (optional) so we can store its public URL.
            let photo_url = null;
            if (photo) {
                if (photo.size > 5 * 1024 * 1024) {
                    setError('Please choose a photo under 5MB.');
                    setSubmitting(false);
                    return;
                }
                const ext = photo.name.split('.').pop();
                const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
                const { error: upErr } = await supabase.storage
                    .from('practitioner-photos')
                    .upload(path, photo, { upsert: false });
                if (upErr) {
                    console.error('Photo upload failed:', upErr);
                    setError("We couldn't upload your photo. You can try again, or submit without it.");
                    setSubmitting(false);
                    return;
                }
                photo_url = supabase.storage.from('practitioner-photos').getPublicUrl(path).data.publicUrl;
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/practitioners/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    consent: form.consent_publish && form.consent_collaborate,
                    website_url: tidyUrl(form.website_url),
                    social_url: tidyUrl(form.social_url),
                    photo_url,
                }),
            });
            const data = await res.json();

            if (data.success) setDone(true);
            else setError(data.error || 'Something went wrong. Please try again.');
        } catch (err) {
            console.error('Application submit failed:', err);
            setError('Something went wrong. Please try again in a moment.');
        } finally {
            setSubmitting(false);
        }
    };

    if (done) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center px-6 text-center">
                <div className="max-w-md">
                    <img
                        src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.png'}
                        alt="Uncoached"
                        className="h-20 w-auto mx-auto mb-8"
                    />
                    <h1 className="font-display text-3xl md:text-4xl text-sage mb-4">{copy('apply.thanks.title')}</h1>
                    <p className="text-text-muted leading-relaxed mb-8">
                        {copy('apply.thanks.body')}
                    </p>
                    <Link to="/partnership" className="text-sage hover:underline">
                        ← {copy('apply.thanks.back')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="whitespace-pre-line min-h-screen bg-bone text-text-dark font-body antialiased px-6 py-16 md:py-24">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <img
                        src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.png'}
                        alt="Uncoached"
                        className="h-16 w-auto mx-auto mb-8"
                    />
                    <h1 className="font-display text-3xl md:text-4xl text-sage mb-3">
                        {copy('apply.title')}
                    </h1>
                    <p className="text-text-muted leading-relaxed">
                        {copy('apply.intro')}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8 text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Field label={copy('apply.name.label')}>
                            <input required value={form.full_name} onChange={set('full_name')}
                                className={inputClass} placeholder="Jane Doe" />
                        </Field>
                        <Field label={copy('apply.credentials.label')} hint={copy('apply.credentials.hint')}>
                            <input required value={form.credentials} onChange={set('credentials')}
                                className={inputClass} placeholder="RP, MSW, RSW…" />
                        </Field>
                    </div>

                    <Field label={copy('apply.email.label')} hint={copy('apply.email.hint')}>
                        <input required type="email" value={form.email} onChange={set('email')}
                            className={inputClass} placeholder="you@yourpractice.com" />
                    </Field>

                    <Field label={copy('apply.photo.label')} hint={copy('apply.photo.hint')} optional>
                        <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0] || null)}
                            className="w-full text-sm text-text-muted file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:bg-sage file:text-bone file:font-medium hover:file:bg-sage/90 file:cursor-pointer" />
                    </Field>

                    <Field label={copy('apply.bio.label')} hint={copy('apply.bio.hint')}>
                        <textarea rows={4} value={form.bio} onChange={set('bio')}
                            className={inputClass} placeholder="Tell us about your practice..." />
                    </Field>

                    <Field label={copy('apply.focus.label')} hint={copy('apply.focus.hint')}>
                        <input value={form.areas_of_focus} onChange={set('areas_of_focus')}
                            className={inputClass}
                            placeholder="e.g. Trauma Therapy, Somatic Practice, EMDR, Couples Therapy..." />
                        {focusCount > 5 && (
                            <span className="block text-sm text-golden-deep mt-1.5">
                                That's {focusCount} areas — please narrow it to 5 so people can find you easily.
                            </span>
                        )}
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <Field label={copy('apply.countries.label')}>
                            <input value={form.countries} onChange={set('countries')}
                                className={inputClass} placeholder="Canada, USA…" />
                        </Field>
                        <Field label={copy('apply.languages.label')}>
                            <input value={form.languages} onChange={set('languages')}
                                className={inputClass} placeholder="English, Spanish…" />
                        </Field>
                    </div>

                    <Field label={copy('apply.delivery.label')}>
                        <div className="flex flex-wrap gap-3">
                            {['Virtual', 'In-person', 'Both'].map((opt) => (
                                <label key={opt}
                                    className={`px-5 py-2.5 rounded-full border cursor-pointer transition-colors ${
                                        form.delivery === opt
                                            ? 'bg-sage text-bone border-sage'
                                            : 'bg-white text-text-muted border-clay/40 hover:border-sage/40'
                                    }`}>
                                    <input type="radio" name="delivery" value={opt} checked={form.delivery === opt}
                                        onChange={set('delivery')} className="sr-only" />
                                    {opt}
                                </label>
                            ))}
                        </div>
                    </Field>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <Field label={copy('apply.website.label')}>
                            <input type="text" inputMode="url" value={form.website_url} onChange={set('website_url')}
                                className={inputClass} placeholder="yourpractice.com" />
                        </Field>
                        <Field label={copy('apply.social.label')} optional>
                            <input value={form.social_url} onChange={set('social_url')}
                                className={inputClass} placeholder="@yourhandle or a link" />
                        </Field>
                    </div>

                    <Field label={copy('apply.expertise.label')} hint={copy('apply.expertise.hint')}>
                        <textarea rows={3} value={form.expertise_area} onChange={set('expertise_area')}
                            className={inputClass} placeholder="Grounding practices for panic, boundary-setting…" />
                    </Field>

                    <Field label={copy('apply.ideas.label')} hint={copy('apply.ideas.hint')} optional>
                        <textarea rows={3} value={form.resource_ideas} onChange={set('resource_ideas')}
                            className={inputClass}
                            placeholder="e.g. an exercise, reflection, worksheet, conversation tool, or practice I use with clients..." />
                    </Field>

                    <div className="space-y-3">
                        <label className="flex items-start gap-3 bg-clay/30 rounded-2xl p-5 cursor-pointer">
                            <input type="checkbox" required checked={form.consent_publish} onChange={set('consent_publish')}
                                className="mt-1 w-5 h-5 accent-[#3F5D4D] flex-shrink-0" />
                            <span className="text-sm text-text-dark/85 leading-relaxed">
                                {copy('apply.consent1')}
                            </span>
                        </label>
                        <label className="flex items-start gap-3 bg-clay/30 rounded-2xl p-5 cursor-pointer">
                            <input type="checkbox" required checked={form.consent_collaborate} onChange={set('consent_collaborate')}
                                className="mt-1 w-5 h-5 accent-[#3F5D4D] flex-shrink-0" />
                            <span className="text-sm text-text-dark/85 leading-relaxed">
                                {copy('apply.consent2')}
                            </span>
                        </label>
                    </div>

                    <button type="submit" disabled={submitting}
                        className="w-full py-4 bg-sage text-bone rounded-full font-medium text-lg hover:bg-sage/90 transition-colors disabled:opacity-60">
                        {submitting ? 'Sending…' : copy('apply.submit')}
                    </button>

                    <p className="text-center text-sm text-text-muted leading-relaxed -mt-2">
                        {copy('apply.privacy_note')}{' '}
                        <Link to="/privacy" className="text-sage hover:underline">{copy('apply.privacy_link')}</Link>.
                    </p>

                    <p className="text-center">
                        <Link to="/partnership" className="text-sm text-text-muted hover:text-sage hover:underline">
                            ← {copy('apply.back')}
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default PartnershipApplyPage;
