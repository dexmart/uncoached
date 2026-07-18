import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GiftSection from '../components/GiftSection';

// Dedicated page so the "Gift" nav link shows only the Give the Gift of Calm
// section, rather than scrolling to a spot on the full homepage.
const GiftPage = () => {
    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
            <Navbar />
            <div className="pt-24 flex-1">
                <GiftSection />
            </div>
            <Footer />
        </div>
    );
};

export default GiftPage;
