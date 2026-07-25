import Navbar from './Navbar';
import Footer from './Footer';

// Shared layout for the footer legal pages (Terms, Privacy, Billing & Refunds).
const LegalLayout = ({ title, subtitle, children }) => (
    <div className="bg-bone text-text-dark font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="font-display text-4xl md:text-5xl text-text-dark mb-3">{title}</h1>
                {subtitle && <p className="text-text-tertiary text-sm mb-10">{subtitle}</p>}
                <div className="space-y-5 text-text-muted leading-relaxed">
                    {children}
                </div>
            </div>
        </main>
        <Footer />
    </div>
);

export default LegalLayout;
