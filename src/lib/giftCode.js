// A gift card code someone arrived with but hasn't redeemed yet.
//
// Redeeming needs an account, and creating or signing in to one takes the
// visitor through other pages (and, with Google, off the site entirely). The
// code is kept here so that wherever they land afterwards, they're sent back
// to finish redeeming instead of being asked to pay.
const KEY = 'uncoached.giftCode';

export const rememberGiftCode = (code) => {
    try { localStorage.setItem(KEY, String(code || '').trim().toUpperCase()); } catch { /* storage blocked — the URL still carries it */ }
};

export const getPendingGiftCode = () => {
    try { return localStorage.getItem(KEY) || ''; } catch { return ''; }
};

export const clearGiftCode = () => {
    try { localStorage.removeItem(KEY); } catch { /* nothing to clear */ }
};
