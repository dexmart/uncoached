import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { signOut, user } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Audio Families', path: '/admin/audio-families' },
        { name: 'Audio Breaths', path: '/admin/audio-breaths' },
        { name: 'Shift Categories', path: '/admin/guided-shift-categories' },
        { name: 'Guided Shifts', path: '/admin/guided-shifts' },
    ];

    return (
        <div className="min-h-screen bg-bone flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-text-dark/10 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-text-dark/10 text-center">
                    <p className="text-text-dark/70 text-xs tracking-[0.3em] uppercase font-medium">
                        uncoached
                    </p>
                    <p className="font-display text-lg text-text-dark mt-1">Admin Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-sm font-medium ${isActive(item.path)
                                ? 'bg-clay text-white shadow-sm'
                                : 'text-text-dark/70 hover:bg-clay/10 hover:text-text-dark'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-text-dark/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-clay text-white flex items-center justify-center font-medium shadow-sm shrink-0">
                            {user?.user_metadata?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-text-dark truncate">
                                {user?.user_metadata?.display_name || 'Admin User'}
                            </p>
                            <p className="text-xs text-text-dark/60 truncate">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Nav Header (Placeholder for simple view) */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-text-dark/10 p-4 flex justify-between items-center z-50">
                <p className="font-display pr-2">uncoached admin</p>
                <div className="flex gap-2 overflow-x-auto text-xs pb-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full ${isActive(item.path) ? 'bg-clay text-white' : 'bg-bone text-text-dark/70'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto md:pt-0 pt-16">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
