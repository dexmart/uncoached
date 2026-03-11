import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const { user, signOut } = useAuth();

    const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'Friend';

    const navigationItems = [
        {
            title: 'Field',
            description: 'Support in the moment.',
            icon: 'images/Field Icons/field chat.png',
            link: '/dashboard/field',
            color: 'from-sage/20 to-sage/10'
        },
        {
            title: 'Audio Breaths',
            description: 'Breathe, then continue.',
            icon: 'images/Field Icons/field audio breath.png',
            link: '/dashboard/audio-breaths',
            color: 'from-golden/20 to-golden/10'
        },
        {
            title: 'Guided Shifts',
            description: 'Small practices, real shifts.',
            icon: 'images/Field Icons/field guided shift.png',
            link: '/dashboard/guided-shifts',
            color: 'from-clay/20 to-clay/10'
        },
        {
            title: 'Pocket Prompts',
            description: 'Clarity through questions.',
            icon: 'images/Field Icons/field pocket prompts.png',
            link: '/dashboard/pocket-prompts',
            color: 'from-sage/20 to-sage/10'
        },
        {
            title: 'Clarity Cards',
            description: 'Work it out on paper.',
            icon: 'images/Field Icons/field clarity cards.png',
            link: '/dashboard/clarity-cards',
            color: 'from-golden/20 to-golden/10'
        },
        {
            title: 'Affirmations',
            description: 'Words to come back to.',
            icon: 'images/Field Icons/field affirmation.png',
            link: '/dashboard/affirmations',
            color: 'from-clay/20 to-clay/10'
        }
    ];

    const voiceNotes = {
        title: 'Voice Notes',
        description: 'Remember who you are.',
        icon: 'images/Field Icons/field audio breath.png',
        link: '/dashboard/voice-notes',
        color: 'from-sage/20 to-sage/10'
    };

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Members Welcome.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-32 pb-24 px-6 md:pt-48">

                {/* Profile Avatar / Link */}
                <Link to="/dashboard/profile" className="mb-6 group relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-clay/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {user?.user_metadata?.avatar_url ? (
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-3xl text-clay/50 font-display">
                                {displayName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-charcoal/80 text-bone text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
                        Edit Profile
                    </div>
                </Link>

                {/* Welcome */}
                <h1 className="font-display text-4xl md:text-5xl text-text-dark text-center mb-2">
                    Welcome, {displayName}
                </h1>
                <p className="text-text-muted text-center mb-8">
                    It's good to have you here.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-xl mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search the portal..."
                            className="w-full px-6 py-4 pl-12 bg-white/80 backdrop-blur-sm border border-clay/30 rounded-full focus:outline-none focus:ring-2 focus:ring-sage/50 text-text-dark"
                        />
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Navigation Grid */}
                <div className="w-full max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {navigationItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-clay/20`}
                            >
                                <img
                                    src={import.meta.env.BASE_URL + item.icon}
                                    alt={item.title}
                                    className="w-16 h-16 mx-auto mb-4 object-contain"
                                />
                                <h3 className="font-display text-lg text-text-dark font-semibold mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-text-muted text-sm">
                                    {item.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Voice Notes - Centered */}
                    <div className="flex justify-center">
                        <Link
                            to={voiceNotes.link}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/90 hover:shadow-lg transition-all duration-300 border border-clay/20 w-full md:w-1/3"
                        >
                            <img
                                src={import.meta.env.BASE_URL + voiceNotes.icon}
                                alt={voiceNotes.title}
                                className="w-16 h-16 mx-auto mb-4 object-contain"
                            />
                            <h3 className="font-display text-lg text-text-dark font-semibold mb-1">
                                {voiceNotes.title}
                            </h3>
                            <p className="text-text-muted text-sm">
                                {voiceNotes.description}
                            </p>
                        </Link>
                    </div>
                </div>

                {/* Sign Out */}
                <button
                    onClick={handleSignOut}
                    className="mt-12 px-8 py-3 bg-sage text-bone rounded-full font-medium shadow-sm hover:bg-sage/90 transition-all duration-300 text-sm tracking-wide"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
