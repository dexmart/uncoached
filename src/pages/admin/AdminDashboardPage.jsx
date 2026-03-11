const AdminDashboardPage = () => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="font-display text-4xl text-text-dark mb-4">Admin Dashboard</h1>
            <p className="text-text-dark/70 text-lg mb-8">
                Welcome to the Uncoached content management system.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-text-dark/10 shadow-sm">
                    <h2 className="font-display text-2xl text-text-dark mb-2">Phase 1: Audio Breaths</h2>
                    <p className="text-text-dark/70 text-base mb-6">
                        Manage the families (categories) and individual audio tracks for the Audio Breaths feature.
                    </p>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-clay"></span>
                            <span>Upload audio files to Supabase securely</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-clay"></span>
                            <span>Write science & spiritual contexts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-clay"></span>
                            <span>Reorder how they appear in the app</span>
                        </div>
                    </div>
                </div>

                <div className="bg-bone/50 p-6 rounded-2xl border border-dashed border-text-dark/20 text-center flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 text-text-dark/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <h2 className="font-medium text-text-dark/70 mb-1">More Features Coming Soon</h2>
                    <p className="text-text-dark/50 text-sm">
                        Clarity Cards, Voice Notes, etc.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
