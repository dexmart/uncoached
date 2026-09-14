import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// A calm, dismissible-feeling call to action pinned to the bottom on phones,
// for logged-out visitors on the public pages. Hidden on desktop and for
// members, and kept off the auth and checkout-style pages where it'd be noise.
const HIDE_ON = ['/signin', '/signup', '/pricing', '/redeem', '/reset-password'];

const StickyMobileCTA = () => {
    const { user, loading } = useAuth();
    const { pathname } = useLocation();

    if (loading || user) return null;
    if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

    return (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-bone/90 backdrop-blur-md border-t border-clay/20">
            <Link
                to="/pricing"
                className="block text-center w-full py-3 rounded-full bg-sage text-bone font-medium shadow-sm hover:bg-sage/90 transition-all"
            >
                Start your journey
            </Link>
        </div>
    );
};

export default StickyMobileCTA;
