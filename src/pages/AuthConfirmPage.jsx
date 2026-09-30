import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Seo from '../components/Seo';

// Where the links in our auth emails land.
//
// Supabase's default links point at supabase.co, which doesn't match the
// uncoached.space sender — and mail providers read that mismatch as a phishing
// signal and file the email as spam. Our email templates link here instead,
// with a one-time token, and this page completes the step with Supabase.
const ALLOWED = ['signup', 'email', 'recovery', 'magiclink', 'email_change', 'invite'];

const NEXT = {
    recovery: '/reset-password',   // choose a new password
    invite: '/reset-password',     // set a first password
    email_change: '/dashboard/profile',
    // signup / email / magiclink: /dashboard, which already routes a
    // non-member to pricing (or to their gift card) and a member inside.
};

const AuthConfirmPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        const tokenHash = params.get('token_hash');
        const type = params.get('type');

        let active = true;
        (async () => {
            if (!tokenHash || !ALLOWED.includes(type)) {
                if (active) setError('This link is incomplete. Please use the button in the email again.');
                return;
            }
            const { error: verifyErr } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
            if (!active) return;
            if (verifyErr) {
                setError('This link has expired or has already been used. Links only work once, for a short time.');
                return;
            }
            navigate(NEXT[type] || '/dashboard', { replace: true });
        })();
        return () => { active = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-bone flex items-center justify-center px-6">
            <Seo title="One moment" />
            <div className="max-w-md w-full text-center">
                <Link to="/">
                    <img
                        src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.webp'}
                        alt="Uncoached"
                        className="h-14 mx-auto mb-8"
                    />
                </Link>
                {error ? (
                    <>
                        <h1 className="font-display text-3xl text-text-dark mb-3">That link didn&apos;t work</h1>
                        <p className="text-text-muted mb-8">{error}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/signin" className="px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all">
                                Sign in
                            </Link>
                            <Link to="/signin" className="px-6 py-3 bg-white border border-clay/30 text-text-dark rounded-full font-medium hover:bg-bone/50 transition-all">
                                Send a new link
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-10 h-10 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-5" />
                        <p className="text-text-muted">One moment…</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthConfirmPage;
