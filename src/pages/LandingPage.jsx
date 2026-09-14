import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import IntegrationSection from '../components/IntegrationSection'
import DeeperWorkSection from '../components/DeeperWorkSection'
import ServicesSection from '../components/ServicesSection'
import MeetFieldSection from '../components/MeetFieldSection'
import TestimonialsSection from '../components/TestimonialsSection'
import GiftSection from '../components/GiftSection'
import SubscribeSection from '../components/SubscribeSection'
import Footer from '../components/Footer'
import Seo from '../components/Seo';

function LandingPage() {
    return (
        <div className="bg-bone text-text-dark font-body antialiased">
            <Seo title="" description="Where insight finally becomes lived. A quiet, self-guided space for integrating therapy, coaching, and inner work into real, everyday moments." path="/" />
            <Navbar />
            <HeroSection />
            <IntegrationSection />
            <DeeperWorkSection />
            <ServicesSection />
            <MeetFieldSection />
            {/* <TestimonialsSection /> */}
            <GiftSection />
            <SubscribeSection />
            <Footer />
        </div>
    )
}

export default LandingPage
