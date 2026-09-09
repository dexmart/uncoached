import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPendingGiftCode } from '../lib/giftCode';

const ProtectedRoute = ({ children, requireSubscription = false }) => {
    const { user, loading, isSubscribed, isSubscriptionLoading, isAdmin, isRoleLoading } = useAuth();

    if (loading || (requireSubscription && (isSubscriptionLoading || isRoleLoading))) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-muted">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Admins (e.g. the owner) always have full access, regardless of subscription.
    if (requireSubscription && !isSubscribed && !isAdmin) {
        // Someone who arrived with a gift card and just signed in should finish
        // redeeming it, not be asked to pay.
        return <Navigate to={getPendingGiftCode() ? '/redeem' : '/pricing'} replace />;
    }

    return children;
};

export default ProtectedRoute;
