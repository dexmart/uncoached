import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_COPY } from '../lib/siteCopy';
import SNAPSHOT from '../lib/siteCopySnapshot.json';

const SiteCopyContext = createContext({ copy: (k) => DEFAULT_COPY[k] ?? '' });

// eslint-disable-next-line react-refresh/only-export-components
export const useCopy = () => useContext(SiteCopyContext).copy;

// The site is a static bundle, so the wording Johanna has edited can only be
// fetched after the page has already started rendering. Left alone, that means
// every visit paints the original wording for a moment and then swaps to hers —
// the flash she noticed on the homepage headline.
//
// Two things stop that, and between them the first paint is already correct:
//
//   1. SNAPSHOT — her wording as it stood at the last deploy, baked into the
//      bundle by scripts/snapshot-site-copy.mjs. Covers a brand-new visitor,
//      who has nothing stored in their browser yet.
//   2. The cache — the copy we fetched on this visitor's last visit, read back
//      synchronously here. Covers anyone returning, and is newer than the
//      snapshot if she has edited since the last deploy.
//
// The live fetch still runs and still wins, so nothing can go stale for long.
// The cache is preferred whole rather than merged over the snapshot: it is a
// complete picture of the database at the moment it was written, so a field she
// has since reverted is correctly absent from it.
const CACHE_KEY = 'uncoached.siteCopy.v1';

const readCache = () => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        // Private browsing, storage disabled, or corrupt JSON — no cache is fine.
        return {};
    }
};

const writeCache = (map) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(map));
    } catch {
        // Storage full or blocked. The copy still works, it just isn't cached.
    }
};

const initialCopy = () => {
    const cached = readCache();
    return Object.keys(cached).length ? cached : SNAPSHOT;
};

export const SiteCopyProvider = ({ children }) => {
    const [overrides, setOverrides] = useState(initialCopy);

    useEffect(() => {
        let active = true;
        supabase
            .from('site_copy')
            .select('key,value')
            .then(({ data, error }) => {
                // If the table isn't there yet, or the fetch fails, every field
                // falls back to the cache, then the snapshot, then its original
                // wording — so the page is never blank and never half-written.
                if (error) return;
                if (!active || !data) return;
                const map = {};
                data.forEach((r) => {
                    if (r.value && r.value.trim()) map[r.key] = r.value;
                });
                setOverrides(map);
                writeCache(map);
            });
        return () => { active = false; };
    }, []);

    const copy = useCallback(
        (key) => overrides[key] ?? DEFAULT_COPY[key] ?? '',
        [overrides]
    );

    return <SiteCopyContext.Provider value={{ copy }}>{children}</SiteCopyContext.Provider>;
};
