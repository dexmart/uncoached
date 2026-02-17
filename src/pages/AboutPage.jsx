import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from '../components/about/AboutHero'
import AboutGap from '../components/about/AboutGap'
import AboutWhy from '../components/about/AboutWhy'
import AboutShift from '../components/about/AboutShift'
import AboutQuote from '../components/about/AboutQuote'
import AboutPhilosophy from '../components/about/AboutPhilosophy'
import AboutClosing from '../components/about/AboutClosing'

const AboutPage = () => {
    return (
        <div className="bg-bone text-text-dark font-body antialiased">
            <Navbar />
            <AboutHero />
            <AboutGap />
            <AboutWhy />
            <AboutShift />
            <AboutQuote />
            <AboutPhilosophy />
            <AboutClosing />
            <Footer />
        </div>
    );
};

export default AboutPage;
