// Practitioners type links however they like — "example.com", "www.example.com",
// "https://example.com". Store something that actually works as a link.
export const tidyUrl = (value) => {
    const s = (value || '').trim();
    if (!s) return null;
    if (/^https?:\/\//i.test(s)) return s;
    if (s.startsWith('@')) return s;                    // a social handle, leave alone
    if (!s.includes('.') || /\s/.test(s)) return s;     // not a domain — keep as typed
    return `https://${s.replace(/^\/+/, '')}`;
};
