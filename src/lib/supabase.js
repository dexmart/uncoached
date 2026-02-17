import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'uncoached-auth',
        storage: window.localStorage
    }
});

// Helper to get session with retry
export const getSessionWithRetry = async (retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (!error && data.session) {
                return data.session;
            }
            if (error && error.name !== 'AbortError') {
                console.error('Session error:', error);
                return null;
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Session fetch error:', err);
                return null;
            }
        }
        // Wait a bit before retrying
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    return null;
};
