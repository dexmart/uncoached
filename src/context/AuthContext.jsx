import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getSessionWithRetry } from '../lib/supabase';

const AuthContext = createContext({});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const [subscription, setSubscription] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchSubscription = async (userId, email) => {
        try {
            // First check Supabase
            const { data, error } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();

            if (error) {
                console.error('Error fetching subscription:', error);
            } else if (data && data.status === 'active') {
                setSubscription(data);
                return;
            }

            // If no active subscription in Supabase, verify directly with Stripe
            if (email) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/verify-subscription`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId, userEmail: email })
                    });
                    const result = await response.json();
                    if (result.subscribed) {
                        // Trust the backend result directly (bypassing potential RLS read issues)
                        setSubscription({
                            user_id: userId,
                            status: result.status,
                            plan: result.plan,
                            // Add other fields if needed, but status is the critical one
                        });
                    }
                } catch (verifyErr) {
                    console.error('Stripe verify failed (backend may be offline):', verifyErr);
                }
            }
        } catch (err) {
            console.error('Subscription fetch failed:', err);
        }
    };

    const fetchUserRole = async (userId) => {
        setIsRoleLoading(true);
        try {
            const { data, error } = await supabase
                .from('user_roles')
                .select('role')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                console.error('Error fetching user role:', error);
                setIsAdmin(false);
            } else {
                setIsAdmin(data?.role === 'admin');
            }
        } catch (err) {
            console.error('Role fetch failed:', err);
            setIsAdmin(false);
        } finally {
            setIsRoleLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        // Get initial session with retry
        const getSession = async () => {
            const session = await getSessionWithRetry();

            if (mounted) {
                if (session?.user) {
                    console.log('Session found:', session.user.email);
                    setUser(session.user);
                    setLoading(false); // Unblock the UI for normal users immediately

                    // Fetch heavy details in background
                    Promise.all([
                        fetchSubscription(session.user.id, session.user.email),
                        fetchUserRole(session.user.id)
                    ]);
                } else {
                    console.log('No session found');
                    setIsAdmin(false);
                    setIsRoleLoading(false);
                    setLoading(false);
                }
            }
        };

        getSession();

        // Listen for auth changes - this is the primary source of truth
        const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log('Auth event:', event, session?.user?.email);

                if (mounted) {
                    setUser(session?.user ?? null);

                    if (session?.user) {
                        setLoading(false); // Unblock immediately
                        Promise.all([
                            fetchSubscription(session.user.id, session.user.email),
                            fetchUserRole(session.user.id)
                        ]);
                    } else {
                        setSubscription(null);
                        setIsAdmin(false);
                        setIsRoleLoading(false);
                        setLoading(false);
                    }
                }
            }
        );

        return () => {
            mounted = false;
            authSubscription.unsubscribe();
        };
    }, []);

    // fetchSubscription moved up
    const signUp = async (email, password, displayName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { display_name: displayName }
            }
        });
        return { data, error };
    };

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    };

    const signInWithGoogle = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`
            }
        });
        return { data, error };
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        return { error };
    };

    const updateProfile = async (displayName, avatarUrl) => {
        try {
            const updates = {};
            if (displayName !== undefined) updates.display_name = displayName;
            if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;

            const { data, error } = await supabase.auth.updateUser({
                data: updates
            });

            if (data?.user) {
                setUser(data.user);
            }

            return { data, error };
        } catch (error) {
            return { error };
        }
    };

    const value = {
        user,
        loading,
        subscription,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        updateProfile,
        isSubscribed: subscription?.status === 'active',
        isAdmin,
        isRoleLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
