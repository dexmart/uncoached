import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_COPY } from '../lib/siteCopy';

const SiteCopyContext = createContext({ copy: (k) => DEFAULT_COPY[k] ?? '' });

// eslint-disable-next-line react-refresh/only-export-components
export const useCopy = () => useContext(SiteCopyContext).copy;

// The site is a static bundle, so the wording Johanna has edited can only be
// fetched after the page has already started rendering. Left alone, that means
// every visit paints the original wording for a moment and then swaps to hers —
// the flash she noticed on the homepage headline.
//
// So we keep the last copy we fetched in the browser and read it back
// synchronously on the next visit, before the first paint. A returning visitor
// therefore sees the right words immediately; the fetch still runs and quietly
// corrects anything that changed since. Only a brand-new visitor, on their very
// first page load, can still see the original wording briefly.
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

export const SiteCopyProvider = ({ children }) => {
    const [overrides, setOverrides] = useState(readCache);

    useEffect(() => {
        let active = true;
        supabase
            .from('site_copy')
            .select('key,value')
            .then(({ data, error }) => {
                // If the table isn't there yet, or the fetch fails, every field
                // simply falls back to the cache and then to its original wording.
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
