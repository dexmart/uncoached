import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCopy } from '../context/SiteCopyContext';
import {
    loadFieldConversation, saveFieldConversation, clearFieldConversation, FIELD_IDLE_MS,
} from '../lib/fieldStorage';

const API = import.meta.env.VITE_API_URL;
const AVATAR = import.meta.env.BASE_URL + 'images/Field Icons/field chat.webp';

const EMOJIS = ['😊', '🥰', '🙂', '😌', '🥲', '😔', '😢', '😭', '😤', '😩', '😰', '😅',
    '🤍', '💛', '💚', '🌿', '🌱', '🌸', '☀️', '🌙', '✨', '🙏', '🤗', '👍',
    '💪', '🫶', '😮‍💨', '🤔', '😴', '🔥', '🎉', '☕'];

const MAX_ATTACHMENT_CHARS = 8000;
const SpeechRecognition = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

// Text out of an attached file, read here in the browser. The file itself is
// never uploaded or stored anywhere; only its words go to Field, as part of
// the member's message.
async function readAttachment(file) {
    const name = file.name.toLowerCase();
    if (file.type === 'application/pdf' || name.endsWith('.pdf')) {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
        const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
            const content = await (await pdf.getPage(i)).getTextContent();
            pages.push(content.items.map((it) => it.str).join(' '));
            if (pages.join('\n').length > MAX_ATTACHMENT_CHARS) break;
        }
        return pages.join('\n\n');
    }
    if (file.type.startsWith('text/') || /\.(txt|md)$/.test(name)) return file.text();
    throw new Error('unsupported');
}

// Field's chat. Styled to match the Field mockup on the homepage: dark card,
// Field's avatar, pale sage from the member and dark from Field.
//
// The conversation is held here and in this tab's sessionStorage only, and is
// resent each turn so Field follows the thread. It is never stored on our side
// and the server never logs it. Cleared by the member, on sign out, when the
// tab closes, or after 30 idle minutes.
const FieldChat = () => {
    const copy = useCopy();
    const greeting = copy('fieldpage.chat.greeting').split('\n').map((l) => l.trim()).filter(Boolean);

    const [messages, setMessages] = useState(loadFieldConversation);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [attachment, setAttachment] = useState(null);   // { name, text }
    const [reading, setReading] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const [listening, setListening] = useState(false);
    const bottomRef = useRef(null);
    const idleTimer = useRef(null);
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const recognition = useRef(null);

    useEffect(() => {
        if (messages.length) saveFieldConversation(messages); else clearFieldConversation();
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {
        clearTimeout(idleTimer.current);
        if (messages.length) idleTimer.current = setTimeout(() => setMessages([]), FIELD_IDLE_MS);
        return () => clearTimeout(idleTimer.current);
    }, [messages]);

    useEffect(() => () => recognition.current?.abort(), []);

    const clearAll = () => {
        setMessages([]);
        setError('');
        setAttachment(null);
        clearFieldConversation();
    };

    const insertAtCursor = (text) => {
        const el = inputRef.current;
        const start = el?.selectionStart ?? draft.length;
        const end = el?.selectionEnd ?? draft.length;
        setDraft(draft.slice(0, start) + text + draft.slice(end));
        requestAnimationFrame(() => {
            el?.focus();
            el?.setSelectionRange(start + text.length, start + text.length);
        });
    };

    // Speech to text, using the browser's own dictation. Only shown where the
    // browser supports it (Chrome, Edge, Safari).
    const toggleListening = () => {
        if (listening) { recognition.current?.stop(); return; }
        setError('');
        const rec = new SpeechRecognition();
        rec.lang = navigator.language || 'en-US';
        rec.continuous = true;
        rec.interimResults = false;
        rec.onresult = (e) => {
            const said = Array.from(e.results).slice(e.resultIndex)
                .filter((r) => r.isFinal).map((r) => r[0].transcript).join(' ').trim();
            if (said) setDraft((d) => (d.trim() ? `${d.trimEnd()} ${said}` : said));
        };
        rec.onerror = (e) => {
            if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                setError('Your browser blocked the microphone. Allow it in the address bar to speak to Field.');
            }
        };
        rec.onend = () => setListening(false);
        recognition.current = rec;
        rec.start();
        setListening(true);
    };

    const onPickFile = async (file) => {
        if (!file) return;
        setError('');
        setReading(true);
        try {
            let text = (await readAttachment(file)).replace(/\s+\n/g, '\n').trim();
            if (!text) throw new Error('empty');
            if (text.length > MAX_ATTACHMENT_CHARS) text = text.slice(0, MAX_ATTACHMENT_CHARS) + '\n[…the rest of the document was cut off]';
            setAttachment({ name: file.name, text });
        } catch (err) {
            setError(err.message === 'unsupported'
                ? 'Field can read PDF and plain text files. Please attach one of those.'
                : 'Field couldn\'t read any text in that file.');
        } finally {
            setReading(false);
        }
    };

    const send = async (e) => {
        e?.preventDefault();
        const text = draft.trim();
        if ((!text && !attachment) || busy) return;
        recognition.current?.stop();
        setDraft('');
        setError('');
        setShowEmojis(false);

        const content = attachment
            ? `${text || 'I\'ve shared a document with you.'}\n\n[Attached document: ${attachment.name}]\n${attachment.text}`
            : text;
        const mine = { role: 'user', content, display: text, attachment: attachment?.name };
        setAttachment(null);

        const history = [...messages, mine];
        setMessages([...history, { role: 'assistant', content: '' }]);
        setBusy(true);

        // Field's greeting goes first so it remembers what it asked.
        const turns = (greeting.length ? [{ role: 'assistant', content: greeting.join('\n\n') }] : [])
            .concat(history.map(({ role, content: c }) => ({ role, content: c })));

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const res = await fetch(`${API}/field/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Only the turns go up. No name, email or account id.
                body: JSON.stringify({ accessToken: session?.access_token, messages: turns }),
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

    const fieldBubble = 'bg-white/[0.07] text-bone/90 border border-white/10 rounded-bl-md';
    const iconButton = 'w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center text-bone/60 hover:text-bone hover:bg-white/10 transition-colors disabled:opacity-30';

    return (
        <div className="flex flex-col h-full bg-[#0D0F0E] text-bone">
            {/* Header: Field, with their face on it */}
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
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
                {greeting.map((line, i) => (
                    <div key={`g${i}`} className="flex items-end gap-2 justify-start">
                        {i === greeting.length - 1
                            ? <img src={AVATAR} alt="" className="w-7 h-7 rounded-full bg-white/10 object-contain flex-shrink-0 mb-1" />
                            : <span className="w-7 flex-shrink-0" />}
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${fieldBubble}`}>
                            {line}
                        </div>
                    </div>
                ))}

                {messages.map((m, i) => {
                    const mine = m.role === 'user';
                    const shown = mine ? (m.display ?? m.content) : m.content;
                    return (
                        <div key={i} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'} ${i === 0 ? 'pt-2' : ''}`}>
                            {!mine && (
                                <img src={AVATAR} alt="" className="w-7 h-7 rounded-full bg-white/10 object-contain flex-shrink-0 mb-1" />
                            )}
                            <div
                                className={`max-w-[80%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${
                                    mine ? 'bg-[#DCE8D6] text-[#1F2422] rounded-br-md' : fieldBubble
                                }`}
                            >
                                {mine && m.attachment && (
                                    <span className="flex items-center gap-1.5 text-xs text-[#1F2422]/70 mb-1">
                                        <PaperclipIcon className="w-3.5 h-3.5" /> {m.attachment}
                                    </span>
                                )}
                                {shown || (busy && i === messages.length - 1
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
            <form onSubmit={send} className="px-3 pb-3 relative">
                {showEmojis && (
                    <div className="absolute bottom-full left-3 mb-2 p-2 bg-[#1A1D1C] border border-white/15 rounded-2xl shadow-xl grid grid-cols-8 gap-1 z-10">
                        {EMOJIS.map((em) => (
                            <button key={em} type="button" onClick={() => insertAtCursor(em)}
                                className="w-9 h-9 text-xl rounded-lg hover:bg-white/10 transition-colors">
                                {em}
                            </button>
                        ))}
                    </div>
                )}

                {(attachment || reading) && (
                    <div className="mb-2 mx-1 inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 rounded-full pl-3 pr-1.5 py-1 text-xs text-bone/80 max-w-full">
                        <PaperclipIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{reading ? 'Reading the document…' : attachment.name}</span>
                        {attachment && (
                            <button type="button" onClick={() => setAttachment(null)} aria-label="Remove attachment"
                                className="w-5 h-5 rounded-full hover:bg-white/15 flex items-center justify-center">×</button>
                        )}
                    </div>
                )}

                <div className="flex items-end gap-1 bg-white/[0.06] border border-white/15 rounded-3xl px-2 py-1.5 focus-within:border-white/30 transition-colors">
                    <button type="button" onClick={() => fileRef.current?.click()} disabled={reading}
                        aria-label="Attach a document" title="Attach a PDF or text file" className={iconButton}>
                        <PaperclipIcon className="w-5 h-5" />
                    </button>
                    <input ref={fileRef} type="file" accept=".pdf,.txt,.md,application/pdf,text/plain" className="hidden"
                        onChange={(e) => { onPickFile(e.target.files?.[0]); e.target.value = ''; }} />

                    <button type="button" onClick={() => setShowEmojis((v) => !v)}
                        aria-label="Add an emoji" title="Add an emoji" className={iconButton}>
                        <span className="text-lg leading-none">🙂</span>
                    </button>

                    <textarea
                        ref={inputRef}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder={listening ? 'Listening… speak now' : 'Write your thoughts here…'}
                        className="flex-1 min-w-0 resize-none bg-transparent px-2 py-2 text-[15px] text-bone placeholder-bone/40 focus:outline-none"
                    />

                    {SpeechRecognition && (
                        <button type="button" onClick={toggleListening}
                            aria-label={listening ? 'Stop speaking' : 'Speak instead of typing'}
                            title={listening ? 'Stop' : 'Speak instead of typing'}
                            className={`${iconButton} ${listening ? 'text-red-300 bg-red-500/20 animate-pulse' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={busy || (!draft.trim() && !attachment)}
                        aria-label="Send"
                        className="w-10 h-10 flex-shrink-0 rounded-full bg-sage text-bone flex items-center justify-center hover:bg-sage/90 transition-all disabled:opacity-40"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <p className="text-center text-[11px] text-bone/40 mt-3">
                    {copy('fieldpage.chat.footer')}
                </p>
            </form>
        </div>
    );
};

const PaperclipIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
    </svg>
);

export default FieldChat;
