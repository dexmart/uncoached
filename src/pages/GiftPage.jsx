import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GiftSection from '../components/GiftSection';
import Seo from '../components/Seo';

// Dedicated page so the "Gift" nav link shows only the Give the Gift of Calm
// section, rather than scrolling to a spot on the full homepage.
const GiftPage = () => {
    return (
        <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
            <Seo title="Give the Gift of Calm" description="Send an Uncoached gift card — a thoughtful, stress-free gift for someone who craves more self-connection." path="/gift" />
            <Navbar />
            <div className="pt-24 flex-1">
                <GiftSection />
            </div>
            <Footer />
        </div>
    );
};

export default GiftPage;
