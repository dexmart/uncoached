import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

// Friendly 404 for any unknown URL.
const NotFoundPage = () => {
    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
            <Seo title="Page not found" />
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-24">
                <div className="text-center max-w-md">
                    <p className="font-display text-6xl text-sage mb-4">404</p>
                    <h1 className="font-display text-3xl text-text-dark mb-4">This page wandered off</h1>
                    <p className="text-text-muted mb-8">
                        The page you were looking for isn&apos;t here. Let&apos;s get you back to a calm place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/" className="px-6 py-3 bg-sage text-bone rounded-full font-medium hover:bg-sage/90 transition-all">
                            Back home
                        </Link>
                        <Link to="/pricing" className="px-6 py-3 bg-white border border-clay/30 text-text-dark rounded-full font-medium hover:bg-bone/50 transition-all">
                            See membership
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundPage;
