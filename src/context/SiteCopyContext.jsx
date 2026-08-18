import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_COPY } from '../lib/siteCopy';

const SiteCopyContext = createContext({ copy: (k) => DEFAULT_COPY[k] ?? '' });

// eslint-disable-next-line react-refresh/only-export-components
export const useCopy = () => useContext(SiteCopyContext).copy;

export const SiteCopyProvider = ({ children }) => {
    const [overrides, setOverrides] = useState({});

    useEffect(() => {
        let active = true;
        supabase
            .from('site_copy')
            .select('key,value')
            .then(({ data, error }) => {
                // If the table isn't there yet, or the fetch fails, every field
                // simply falls back to its original wording.
                if (error) return;
                if (!active || !data) return;
                const map = {};
                data.forEach((r) => {
                    if (r.value && r.value.trim()) map[r.key] = r.value;
                });
                setOverrides(map);
            });
        return () => { active = false; };
    }, []);

    const copy = useCallback(
        (key) => overrides[key] ?? DEFAULT_COPY[key] ?? '',
        [overrides]
    );

    return <SiteCopyContext.Provider value={{ copy }}>{children}</SiteCopyContext.Provider>;
};
