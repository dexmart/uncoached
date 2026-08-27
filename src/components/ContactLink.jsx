import { useState, useRef, useEffect } from 'react';

// "Contact Us" is a mailto: link, which only does something if the visitor's
// device has a mail handler registered. Plenty don't — a desktop browser with
// no default mail app, or one where the Gmail handler has been cleared — and
// then the link looks broken: you click it and nothing happens at all.
//
// So: still a real mailto anchor (right-click → copy address keeps working, and
// anyone with a mail app gets their mail app). But if the page is still sitting
// there a moment after the click, nothing opened, and we show the address with
// a copy button and webmail links instead.

export const CONTACT_EMAIL = 'hello@uncoached.space';

const WEBMAIL = [
    { label: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}` },
    { label: 'Outlook', href: `https://outlook.live.com/mail/0/deeplink/compose?to=${CONTACT_EMAIL}` },
];

const ContactLink = ({ className, label = 'Contact Us', onNavigate }) => {
    const [showFallback, setShowFallback] = useState(false);
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);

    useEffect(() => () => clearTimeout(timer.current), []);

    const handleClick = () => {
        onNavigate?.();
        clearTimeout(timer.current);

        // If a mail client opens, the page loses focus or is hidden. Watch for
        // either; if neither happens the link did nothing, so we step in.
        let handled = false;
        const markHandled = () => { handled = true; };
        window.addEventListener('blur', markHandled, { once: true });
        document.addEventListener('visibilitychange', markHandled, { once: true });

        timer.current = setTimeout(() => {
            window.removeEventListener('blur', markHandled);
            document.removeEventListener('visibilitychange', markHandled);
            if (!handled && !document.hidden) setShowFallback(true);
        }, 1200);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(CONTACT_EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard blocked — the address is on screen to copy by hand.
        }
    };

    return (
        <>
            <a className={className} href={`mailto:${CONTACT_EMAIL}`} onClick={handleClick}>
                {label}
            </a>

            {showFallback && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 bg-charcoal/70"
                    role="dialog" aria-modal="true" aria-label="Contact Uncoached"
                    onClick={() => setShowFallback(false)}>
                    <div className="bg-bone rounded-3xl p-7 max-w-sm w-full text-center shadow-2xl"
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="font-display text-2xl text-text-dark mb-2">Get in touch</h2>
                        <p className="text-text-muted text-sm leading-relaxed mb-5">
                            Your device didn&apos;t have an email app ready to open. You can copy the
                            address, or write to us in your browser.
                        </p>

                        <div className="flex items-center justify-between gap-3 bg-white border border-clay/40 rounded-xl px-4 py-3 mb-4">
                            <span className="text-text-dark text-sm break-all">{CONTACT_EMAIL}</span>
                            <button onClick={copy}
                                className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-sage text-bone hover:bg-sage/90">
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-5">
                            {WEBMAIL.map((m) => (
                                <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                                    className="text-sm text-sage hover:underline">
                                    Open in {m.label}
                                </a>
                            ))}
                        </div>

                        <button onClick={() => setShowFallback(false)}
                            className="text-sm text-text-muted hover:text-text-dark underline">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactLink;
