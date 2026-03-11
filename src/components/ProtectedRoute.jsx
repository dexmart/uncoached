import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireSubscription = false }) => {
    const { user, loading, isSubscribed, isSubscriptionLoading } = useAuth();

    if (loading || (requireSubscription && isSubscriptionLoading)) {
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

    if (requireSubscription && !isSubscribed) {
        return <Navigate to="/pricing" replace />;
    }

    return children;
};

export default ProtectedRoute;
