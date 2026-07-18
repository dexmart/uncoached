import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll the window to the top whenever the route (pathname) changes.
// Without this, react-router preserves the previous scroll position, so
// navigating from a scrolled page lands you in the middle of the next one.
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
