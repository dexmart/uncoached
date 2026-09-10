import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useCopy } from '../context/SiteCopyContext';
import { supabase } from '../lib/supabase';
import { rememberGiftCode, getPendingGiftCode, clearGiftCode } from '../lib/giftCode';

const API = import.meta.env.VITE_API_URL;

const monthsLabel = (n) => (n === 12 ? '1 year' : n === 1 ? '1 month' : `${n} months`);

const prettyDate = (iso) =>
    new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });

// Redeem a GiftUp gift card for membership. The recipient arrives here from the
// link in GiftUp's email (code in the URL), or types the code themselves.
const RedeemPage = () => {
    const copy = useCopy();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { user, loading: authLoading, refreshSubscription } = useAuth();

    const [code, setCode] = useState(() => (params.get('code') || getPendingGiftCode() || '').toUpperCase());
    const [card, setCard] = useState(null);      // { title, months } once checked
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [done, setDone] = useState(null);      // { months, endsOn } once redeemed

    const checkCode = async (value) => {
        const clean = String(value || '').trim().toUpperCase();
        if (!clean) { setError('Enter your gift card code.'); return; }
        setBusy(true); setError(''); setCard(null);
        try {
            const res = await fetch(`${API}/gift/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: clean })
            });
            const data = await res.json();
            if (!data.ok) { setError(data.error || 'That code could not be checked.'); return; }
            setCard(data);
            rememberGiftCode(clean);
        } catch {
            setError('We could not reach the gift card service. Please try again in a moment.');
        } finally {
            setBusy(false);
        }
    };

    // A code in the URL or left over from before sign-in: check it straight away.
    useEffect(() => {
        if (code) checkCode(code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const redeem = async () => {
        setBusy(true); setError('');
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${API}/gift/redeem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, accessToken: session?.access_token })
            });
            const data = await res.json();
            if (!data.ok) { setError(data.error || 'The gift card could not be redeemed.'); return; }
            clearGiftCode();
            setDone(data);
            await refreshSubscription();
        } catch {
            setError('Something went wrong. Nothing has been charged. Please try again.');
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
            <Navbar />
            <main className="pt-32 pb-24 px-6 flex-1">
                <div className="max-w-lg mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="font-display text-4xl md:text-5xl text-text-dark mb-4">{copy('redeem.title')}</h1>
                        <p className="text-text-muted text-lg">{copy('redeem.subtitle')}</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-clay/30 shadow-sm p-8">
                        {done ? (
                            <div className="text-center">
                                <div className="w-14 h-14 rounded-full bg-sage/10 text-sage flex items-center justify-center mx-auto mb-5 text-2xl">✓</div>
                                <h2 className="font-display text-2xl text-text-dark mb-3">Your membership is active</h2>
                                <p className="text-text-muted mb-3">
                                    You have {monthsLabel(done.months)} of Uncoached, until {prettyDate(done.endsOn)}.
                                </p>
                                <p className="text-text-muted text-sm mb-8">
                                    Your access ends by itself on that date. It does not renew, and you will
                                    not be charged. If you would like to stay on afterwards, you can choose a
                                    plan then.
                                </p>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="w-full px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all"
                                >
                                    Go to your space
                                </button>
                            </div>
                        ) : (
                            <>
                                <form
                                    onSubmit={(e) => { e.preventDefault(); checkCode(code); }}
                                    className="flex flex-col sm:flex-row gap-3 mb-4"
                                >
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value.toUpperCase()); setCard(null); setError(''); }}
                                        placeholder="Gift card code"
                                        autoCapitalize="characters"
                                        autoComplete="off"
                                        spellCheck={false}
                                        className="flex-1 px-6 py-3 bg-bone/60 border border-clay/30 rounded-full tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-sage/50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={busy}
                                        className="px-6 py-3 bg-charcoal text-bone rounded-full font-medium hover:bg-charcoal/90 transition-all disabled:opacity-50"
                                    >
                                        {busy && !card ? 'Checking…' : 'Check code'}
                                    </button>
                                </form>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4 text-sm text-center">{error}</div>
                                )}

                                {card && (
                                    <div className="mt-6">
                                        <div className="rounded-xl bg-sage/5 border border-sage/20 p-5 text-center mb-6">
                                            <p className="text-xs uppercase tracking-widest text-text-tertiary mb-1">Your gift</p>
                                            <p className="font-display text-xl text-text-dark">{card.title || 'Uncoached membership'}</p>
                                            <p className="text-sage text-sm mt-1">{monthsLabel(card.months)} of full access</p>
                                            <p className="text-text-tertiary text-xs mt-3">
                                                Ends by itself when the {monthsLabel(card.months)} {card.months === 1 ? 'is' : 'are'} up. No renewal, no card, no charge.
                                            </p>
                                        </div>

                                        {authLoading ? (
                                            <p className="text-center text-text-muted text-sm">One moment…</p>
                                        ) : user ? (
                                            <>
                                                <button
                                                    onClick={redeem}
                                                    disabled={busy}
                                                    className="w-full px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all disabled:opacity-50"
                                                >
                                                    {busy ? 'Redeeming…' : 'Redeem for this account'}
                                                </button>
                                                <p className="text-center text-text-tertiary text-xs mt-3">
                                                    Signed in as {user.email}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-center text-text-muted text-sm mb-4">
                                                    You&apos;ll need an account to redeem it. We&apos;ll bring you straight back here.
                                                </p>
                                                <Link
                                                    to="/signup"
                                                    className="block text-center w-full px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all mb-3"
                                                >
                                                    Create an account
                                                </Link>
                                                <Link
                                                    to="/signin"
                                                    className="block text-center w-full px-6 py-3 bg-white border border-clay/30 text-text-dark rounded-full font-medium hover:bg-bone/50 transition-all"
                                                >
                                                    I already have one, sign in
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <p className="text-center text-text-muted text-sm mt-8 whitespace-pre-line">{copy('redeem.help')}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RedeemPage;
