import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { user, loading, isAdmin, isRoleLoading } = useAuth();

    // Show loading state while checking auth
    if (loading || isRoleLoading) {
        return (
            <div className="min-h-screen bg-bone flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Require authentication
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Require admin role
    if (!isAdmin) {
        // If they are logged in but not an admin, send them to the regular dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
