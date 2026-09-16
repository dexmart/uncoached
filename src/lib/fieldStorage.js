// Where a Field conversation lives: this browser tab, and nowhere else.
//
// sessionStorage is wiped when the tab closes, is never sent to a server, and
// isn't shared with other tabs or devices. On top of that we clear it on sign
// out and after a period of inactivity (see FieldChat). Nothing here is ever
// written to Supabase.
const KEY = 'uncoached.field.v1';
export const FIELD_IDLE_MS = 30 * 60 * 1000; // 30 minutes

export const loadFieldConversation = () => {
    try {
        const raw = sessionStorage.getItem(KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!parsed || !Array.isArray(parsed.messages)) return [];
        if (Date.now() - (parsed.at || 0) > FIELD_IDLE_MS) { clearFieldConversation(); return []; }
        return parsed.messages;
    } catch {
        return [];
    }
};

export const saveFieldConversation = (messages) => {
    try { sessionStorage.setItem(KEY, JSON.stringify({ messages, at: Date.now() })); } catch { /* private mode etc. */ }
};

export const clearFieldConversation = () => {
    try { sessionStorage.removeItem(KEY); } catch { /* nothing to clear */ }
};
