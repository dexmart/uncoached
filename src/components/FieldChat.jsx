import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    loadFieldConversation, saveFieldConversation, clearFieldConversation, FIELD_IDLE_MS,
} from '../lib/fieldStorage';

const API = import.meta.env.VITE_API_URL;
const AVATAR = import.meta.env.BASE_URL + 'images/Field Icons/field chat.webp';

// Field's chat. Styled to match the Field mockup on the homepage — dark card,
// Field's avatar, pale sage from the member and dark from Field.
//
// The conversation is held here and in this tab's sessionStorage only, and is
// resent each turn so Field follows the thread. It is never stored on our side
// and the server never logs it. Cleared by the member, on sign out, when the
// tab closes, or after 30 idle minutes.
const FieldChat = () => {
    const [messages, setMessages] = useState(loadFieldConversation);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);
    const idleTimer = useRef(null);

    useEffect(() => {
        if (messages.length) saveFieldConversation(messages); else clearFieldConversation();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {
        clearTimeout(idleTimer.current);
        if (messages.length) idleTimer.current = setTimeout(() => setMessages([]), FIELD_IDLE_MS);
        return () => clearTimeout(idleTimer.current);
    }, [messages]);

    const clearAll = () => {
        setMessages([]);
        setError('');
        clearFieldConversation();
    };

    const send = async (e) => {
        e?.preventDefault();
        const text = draft.trim();
        if (!text || busy) return;
        setDraft('');
        setError('');

        const history = [...messages, { role: 'user', content: text }];
        setMessages([...history, { role: 'assistant', content: '' }]);
        setBusy(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${API}/field/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Only the turns go up. No name, email or account id.
                body: JSON.stringify({ accessToken: session?.access_token, messages: history }),
            });

            if (!res.ok) {
                let msg = 'Field couldn\'t answer just now. Please try again.';
                try { msg = (await res.json()).error || msg; } catch { /* keep default */ }
                setMessages(history);
                setError(msg);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let reply = '';
            for (;;) {
                const { value, done } = await reader.read();
                if (done) break;
                reply += decoder.decode(value, { stream: true });
                const snapshot = reply;
                setMessages([...history, { role: 'assistant', content: snapshot }]);
            }
            if (!reply.trim()) {
                setMessages(history);
                setError('Field went quiet. Please try again.');
            }
        } catch {
            setMessages(history);
            setError('We couldn\'t reach Field. Check your connection and try again.');
        } finally {
            setBusy(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    };

    return (
        <div className="flex flex-col h-full bg-[#0D0F0E] text-bone">
            {/* Header — Field, with their face on it */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <img src={AVATAR} alt="" className="w-9 h-9 rounded-full bg-white/10 object-contain" />
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-bone leading-tight">Field</p>
                    <p className="text-[11px] text-bone/50 leading-tight">Private. Stays in this tab.</p>
                </div>
                <button
                    type="button"
                    onClick={clearAll}
                    disabled={!messages.length}
                    className="text-xs text-bone/60 hover:text-bone px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-colors disabled:opacity-30 disabled:hover:text-bone/60"
                >
                    Clear
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center pt-10">
                        <img src={AVATAR} alt="" className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <p className="text-bone/60 text-sm max-w-xs mx-auto">
                            Say whatever&apos;s on your mind. Field will follow.
                        </p>
                    </div>
                )}

                {messages.map((m, i) => {
                    const mine = m.role === 'user';
                    return (
                        <div key={i} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                            {!mine && (
                                <img src={AVATAR} alt="" className="w-7 h-7 rounded-full bg-white/10 object-contain flex-shrink-0 mb-1" />
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${
                                    mine
                                        ? 'bg-[#DCE8D6] text-[#1F2422] rounded-br-md'
                                        : 'bg-white/[0.07] text-bone/90 border border-white/10 rounded-bl-md'
                                }`}
                            >
                                {m.content || (busy && i === messages.length - 1
                                    ? <span className="text-bone/50">Field is thinking…</span>
                                    : '')}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {error && (
                <div className="mx-4 mb-2 bg-red-500/15 border border-red-400/30 text-red-200 p-3 rounded-xl text-sm text-center">
                    {error}
                </div>
            )}

            {/* Composer */}
            <form onSubmit={send} className="px-3 pb-3">
                <div className="flex items-end gap-2 bg-white/[0.06] border border-white/15 rounded-3xl px-3 py-2 focus-within:border-white/30 transition-colors">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder="Write your thoughts here…"
                        className="flex-1 resize-none bg-transparent px-2 py-2 text-[15px] text-bone placeholder-bone/40 focus:outline-none"
                    />
                    <button
                        type="submit"
                        disabled={busy || !draft.trim()}
                        aria-label="Send"
                        className="w-10 h-10 flex-shrink-0 rounded-full bg-sage text-bone flex items-center justify-center hover:bg-sage/90 transition-all disabled:opacity-40"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <p className="text-center text-[11px] text-bone/40 mt-3">
                    This is a private space. Your entries don&apos;t leave this chat.
                </p>
            </form>
        </div>
    );
};

export default FieldChat;
