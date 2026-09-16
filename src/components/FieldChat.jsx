import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    loadFieldConversation, saveFieldConversation, clearFieldConversation, FIELD_IDLE_MS,
} from '../lib/fieldStorage';

const API = import.meta.env.VITE_API_URL;

// Field's chat box. The conversation is held here and in this tab's
// sessionStorage only; each turn resends it so Field follows the thread. It is
// never stored on our side, and the server never logs it. Cleared by the
// member, on sign out, when the tab closes, or after 30 idle minutes.
const FieldChat = () => {
    const [messages, setMessages] = useState(loadFieldConversation);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const bottomRef = useRef(null);
    const idleTimer = useRef(null);

    // Persist and keep the view pinned to the latest message.
    useEffect(() => {
        if (messages.length) saveFieldConversation(messages); else clearFieldConversation();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    // Inactivity: wipe the conversation after FIELD_IDLE_MS with no new turns.
    useEffect(() => {
        clearTimeout(idleTimer.current);
        if (messages.length) {
            idleTimer.current = setTimeout(() => setMessages([]), FIELD_IDLE_MS);
        }
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
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-clay/20 bg-white/70">
                <span className="text-xs text-text-tertiary">Private. Not saved anywhere but this tab.</span>
                <button
                    type="button"
                    onClick={clearAll}
                    disabled={!messages.length}
                    className="text-xs text-text-muted hover:text-sage underline underline-offset-4 disabled:opacity-40 disabled:no-underline"
                >
                    Clear conversation
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                {messages.length === 0 && (
                    <p className="text-center text-text-muted text-sm pt-10">
                        Say whatever&apos;s on your mind. Field will follow.
                    </p>
                )}
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${
                                m.role === 'user'
                                    ? 'bg-sage text-bone rounded-br-md'
                                    : 'bg-bone text-text-dark border border-clay/30 rounded-bl-md'
                            }`}
                        >
                            {m.content || (busy && i === messages.length - 1 ? <span className="opacity-60">Field is thinking…</span> : '')}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {error && <div className="mx-4 mb-2 bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">{error}</div>}

            {/* Composer */}
            <form onSubmit={send} className="flex gap-2 p-3 border-t border-clay/20 bg-white/70">
                <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onKeyDown}
                    rows={1}
                    placeholder="Write to Field…"
                    className="flex-1 resize-none px-4 py-3 bg-white border border-clay/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sage/40 text-[15px]"
                />
                <button
                    type="submit"
                    disabled={busy || !draft.trim()}
                    className="px-5 py-3 bg-sage text-bone rounded-2xl font-medium hover:bg-sage/90 transition-all disabled:opacity-50"
                >
                    {busy ? '…' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default FieldChat;
