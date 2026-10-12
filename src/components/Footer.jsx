import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';

const Footer = () => {
    const copy = useCopy();
    return (
        <footer className="bg-charcoal py-8 border-t border-bone/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-bone/60">
                    <p>{copy('footer.copyright')}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link className="hover:text-bone transition-colors" to="/terms">{copy('footer.link_terms')}</Link>
                        <span>·</span>
                        <Link className="hover:text-bone transition-colors" to="/privacy">{copy('footer.link_privacy')}</Link>
                        <span>·</span>
                        <Link className="hover:text-bone transition-colors" to="/billing">{copy('footer.link_billing')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
