import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useCopy } from '../context/SiteCopyContext';
import CopyDocument from './CopyDocument';

// Asks a member to accept the User Agreement the first time they enter the
// members area, and records exactly which version of each document they
// accepted (see setup-user-agreement.sql).
//
// If Johanna publishes a new User Agreement version, members are asked again
// and a new record is written; the previous one is kept.
const AgreementGate = ({ children }) => {
    const { user } = useAuth();
    const copy = useCopy();
    const version = (copy('legal.agreement.version') || '1.0').trim();

    const [checking, setChecking] = useState(true);
    const [accepted, setAccepted] = useState(false);
    const [ticked, setTicked] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) return;
        let active = true;
        (async () => {
            const { data, error: readErr } = await supabase
                .from('document_acceptances')
                .select('id')
                .eq('user_id', user.id)
                .eq('user_agreement_version', version)
                .limit(1);
            if (!active) return;
            if (readErr) {
                // If the table isn't there yet, never lock a paying member out
                // of what they've paid for — let them through and say so.
                console.error('Could not read agreement acceptance:', readErr.message);
                setAccepted(true);
            } else {
                setAccepted((data || []).length > 0);
            }
            setChecking(false);
        })();
        return () => { active = false; };
    }, [user, version]);

    const accept = async () => {
        setSaving(true);
        setError('');
        const { error: writeErr } = await supabase.from('document_acceptances').insert({
            user_id: user.id,
            accepted: true,
            user_agreement_version: version,
            terms_version: (copy('legal.terms.version') || '').trim() || null,
            privacy_version: (copy('legal.privacy.version') || '').trim() || null,
            billing_version: (copy('legal.billing.version') || '').trim() || null,
        });
        if (writeErr) {
            console.error('Could not record acceptance:', writeErr.message);
            setError('We could not record that just now. Please try again.');
            setSaving(false);
            return;
        }
        setAccepted(true);
    };

    if (!user || checking || accepted) return children;

    return (
        <div className="min-h-screen bg-bone px-6 py-16">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <img
                        src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.webp'}
                        alt="Uncoached"
                        className="h-14 mx-auto mb-6"
                    />
                    <h1 className="font-display text-3xl md:text-4xl text-text-dark mb-3">
                        {copy('legal.agreement.title')}
                    </h1>
                    <p className="text-text-muted whitespace-pre-line">{copy('legal.agreement.intro')}</p>
                </div>

                <div className="bg-white border border-clay/30 rounded-2xl shadow-sm p-6 md:p-8 mb-6 max-h-[45vh] overflow-y-auto space-y-5 text-text-muted leading-relaxed">
                    <CopyDocument text={copy('legal.agreement.body')} />
                </div>

                <p className="text-center text-sm text-text-muted mb-6">
                    You can read the full{' '}
                    <Link to="/terms" target="_blank" className="text-sage hover:underline">Terms of Use</Link>,{' '}
                    <Link to="/privacy" target="_blank" className="text-sage hover:underline">Privacy Policy</Link> and{' '}
                    <Link to="/billing" target="_blank" className="text-sage hover:underline">Billing &amp; Refunds</Link> policy.
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm text-center">{error}</div>
                )}

                <label className="flex items-start gap-3 bg-white border border-clay/30 rounded-2xl p-5 mb-5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={ticked}
                        onChange={(e) => setTicked(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[#3F5D4D] flex-shrink-0"
                    />
                    <span className="text-text-dark text-sm leading-relaxed whitespace-pre-line">
                        {copy('legal.agreement.accept_label')}
                    </span>
                </label>

                <button
                    onClick={accept}
                    disabled={!ticked || saving}
                    className="w-full px-6 py-4 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? 'One moment…' : copy('legal.agreement.button')}
                </button>

                <p className="text-center text-xs text-text-tertiary mt-4">
                    Version {version} · recorded with the date you accept it
                </p>
            </div>
        </div>
    );
};

export default AgreementGate;
