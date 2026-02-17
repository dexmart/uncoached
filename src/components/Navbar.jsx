import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const logoDefault = import.meta.env.BASE_URL + 'logo/logouncoached.png';
    const logoScrolled = import.meta.env.BASE_URL + 'logo/logo-notext-golden.png';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/95 py-2 shadow-md' : 'bg-transparent py-4'} px-6 lg:px-12`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img
                        src={isScrolled ? logoScrolled : logoDefault}
                        alt="Uncoached"
                        className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-20'} w-auto`}
                    />
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-bone">
                    <Link className="hover:text-golden-light transition-colors" to="/">Home</Link>
                    <Link className="hover:text-golden-light transition-colors" to="/about">About</Link>
                    <a className="hover:text-golden-light transition-colors" href="#contact">Contact Us</a>
                </div>

                <Link
                    className="hidden sm:block px-6 py-2 rounded-full bg-sage text-bone hover:bg-sage/90 transition-all duration-300 text-sm font-medium shadow-sm"
                    to="/signin"
                >
                    Sign In
                </Link>

                <button className="md:hidden text-bone">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
