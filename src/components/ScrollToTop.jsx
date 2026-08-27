import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll the window to the top whenever the route changes. Without this,
// react-router preserves the previous scroll position, so navigating from a
// scrolled page lands you in the middle of the next one.
//
// A #hash is the exception: then we scroll to that section instead. Editable
// documents load their text from the database after mount, so the target may
// not be on the page yet — keep looking briefly before giving up.
const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        const id = decodeURIComponent(hash.slice(1));
        let tries = 0;
        let timer;

        const find = () => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            if (tries++ < 20) timer = setTimeout(find, 100);
            else window.scrollTo(0, 0);   // section is gone — start at the top
        };

        find();
        return () => clearTimeout(timer);
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
