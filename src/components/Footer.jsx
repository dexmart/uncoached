import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-charcoal py-8 border-t border-bone/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-bone/60">
                    <p>© 2026 Emergyng Energy. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link className="hover:text-bone transition-colors" to="/terms">Terms</Link>
                        <span>·</span>
                        <Link className="hover:text-bone transition-colors" to="/privacy">Privacy</Link>
                        <span>·</span>
                        <Link className="hover:text-bone transition-colors" to="/billing">Billing & Refunds</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
