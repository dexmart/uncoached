import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Practitioner Partnership guide — deliberately NOT in the site nav.
// Johanna shares this link directly with practitioners.
//
// Presented as a draggable 3D card deck (one card per page of her printed
// guide) so it reads like the PDF but behaves like a modern site. The depth
// effect is pure CSS 3D — no WebGL needed.

const GREEN = '#3F5D4D';
const CREAM = '#F4F1EC';
const TAN = '#D6C7B8';
const TAN_LIGHT = '#DCCFC0';
const ROSE = '#B0948A';
const GOLD = '#C89A5B';
const INK = '#1F2422';

const lora = { fontFamily: "'Lora', Georgia, serif" };
const baskerville = { fontFamily: "'Libre Baskerville', Georgia, serif" };
const allura = { fontFamily: "'Allura', cursive" };

const bg = (f) => `${import.meta.env.BASE_URL}bg/partnership/${f}`;
const logo = (f) => `${import.meta.env.BASE_URL}logo/${f}`;

const Sprig = ({ className = '' }) => (
    <img src={bg('leaf-sprig.png')} alt="" className={`select-none ${className}`} draggable="false" />
);

const Divider = () => (
    <div className="flex items-center justify-center gap-3 w-full my-3">
        <span className="h-px flex-1 max-w-[90px]" style={{ backgroundColor: GREEN }} />
        <Sprig className="w-6 h-auto flex-shrink-0" />
        <span className="h-px flex-1 max-w-[90px]" style={{ backgroundColor: GREEN }} />
    </div>
);

const Title = ({ children, className = '' }) => (
    <h2 className={`uppercase leading-[1.18] text-[clamp(15px,2.1vh,21px)] ${className}`}
        style={{ ...lora, color: GREEN }}>{children}</h2>
);

const P = ({ children, className = '' }) => (
    <p className={`text-[clamp(9.5px,1.28vh,12.5px)] leading-[1.72] ${className}`}
        style={{ ...baskerville, color: INK }}>{children}</p>
);

const Callout = ({ children }) => (
    <div className="rounded-2xl px-4 py-3.5 flex items-start gap-3" style={{ backgroundColor: TAN }}>
        <Sprig className="w-5 h-auto flex-shrink-0 mt-0.5" />
        <div>{children}</div>
    </div>
);

const Bullet = () => (
    <span className="mt-[0.55em] w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: INK }} />
);

const List = ({ items, tight }) => (
    <ul className={tight ? 'space-y-0.5' : 'space-y-1.5'}>
        {items.map((t) => (
            <li key={t} className="flex items-start gap-2">
                <Bullet />
                <span className="text-[clamp(9px,1.22vh,12px)] leading-[1.6]" style={{ ...baskerville, color: INK }}>{t}</span>
            </li>
        ))}
    </ul>
);

/* ── Slide content ─────────────────────────────────────────────────────── */

const Cover = () => (
    <div className="relative w-full h-full">
        <img src={bg('cover-vase.jpg')} alt="" draggable="false"
            className="absolute inset-0 w-full h-full object-cover object-left" />
        <div className="absolute inset-0"
            style={{ background: `linear-gradient(90deg, transparent 22%, ${CREAM}45 46%, ${CREAM}cc 66%)` }} />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-5 pb-9">
            <div className="w-[62%] ml-auto mr-[2%]">
                <img src={logo('logo-sage-on-light.png')} alt="Uncoached" draggable="false"
                    className="h-[7vh] max-h-14 w-auto mx-auto mb-[3vh]" />
                <h1 className="text-[clamp(17px,2.5vh,26px)] leading-[1.32] mb-[2.5vh]"
                    style={{ ...baskerville, color: GREEN }}>
                    Uncoached<br />Practitioner<br />Partnership<br />Guide
                </h1>
                <span className="block h-px w-12 mx-auto mb-[2.5vh]" style={{ backgroundColor: GREEN }} />
                <p className="text-[clamp(9.5px,1.3vh,12.5px)] leading-relaxed" style={{ color: GREEN }}>
                    Helping clients between<br />the breakthroughs.
                </p>
                <Sprig className="w-7 h-auto mx-auto mt-[2.5vh]" />
            </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 py-2.5 text-center" style={{ backgroundColor: GREEN }}>
            <span className="text-white text-[9px] uppercase" style={{ letterSpacing: '0.26em' }}>uncoached.space</span>
        </div>
    </div>
);

const Welcome = () => (
    <div className="relative w-full h-full flex">
        <div className="flex-1 px-6 py-7 overflow-y-auto uc-scroll">
            <p className="uppercase text-[clamp(13px,1.8vh,17px)] mb-3"
                style={{ ...lora, color: GREEN, letterSpacing: '0.1em' }}>Welcome</p>
            <p className="text-[clamp(11px,1.5vh,14px)]" style={{ ...baskerville, color: INK }}>Before anything else,</p>
            <p className="text-[clamp(26px,3.6vh,36px)] leading-none mb-4 pl-1" style={{ ...allura, color: GREEN }}>thank you.</p>
            <div className="space-y-2.5">
                <P>One thing I've realized over the years is that insight doesn't automatically become change.</P>
                <P>Someone can leave a session feeling lighter, clearer, and committed to doing things differently. But lasting change isn't built in the hour you spend together. It happens afterwards, in everyday life, when they're trying to remember what they learned and put it into practice.</P>
                <P className="font-bold">That's what inspired Uncoached.</P>
                <P>I wanted to create something practitioners would genuinely be excited to share with their clients. A place where clients could reconnect with what they've already learned and continue building on the work they've already started.</P>
                <P className="font-bold">Not to replace the work you're already doing, but to help it stick.</P>
                <P>That's what the Practitioner Partnership is all about.</P>
                <P>Together, we can take the tools and ideas that are already changing lives and give them a home where they can continue helping people long after the session ends.</P>
            </div>
        </div>
        <div className="w-[30%] flex-shrink-0">
            <img src={bg('welcome-sunset.jpg')} alt="" draggable="false"
                className="w-full h-full object-cover rounded-tl-[38%]" />
        </div>
    </div>
);

const WhatIs = () => (
    <div className="relative w-full h-full px-6 py-7 overflow-y-auto uc-scroll">
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            className="pointer-events-none absolute -bottom-6 -right-10 w-[55%] select-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.5 }} />
        <div className="relative">
            <Title className="mb-1">What is the Practitioner Partnership?</Title>
            <Divider />
            <div className="space-y-2.5 mt-3">
                <P className="font-bold">One of the most rewarding parts of this work is watching someone take what they've learned and truly make it part of their life.</P>
                <P>Every practitioner has exercises, perspectives, and practical tools that make a real difference. Together, we'll turn some of those into polished Uncoached resources that people can return to whenever they need a reminder, a reset, or a different perspective.</P>
                <P><strong>These resources aren't designed to replace your work. They're designed to reinforce it.</strong> They give your clients a trusted place to return to the tools, exercises, and perspectives you've already introduced, while also discovering complementary perspectives that may deepen what they're learning or help something finally click.</P>
                <P>They're also there for the moments when you need to step away, so your clients still have something meaningful to lean on until you're back.</P>
                <P>As part of the partnership, your expertise becomes a part of a growing library that supports people long after the session ends. <strong>You'll also have a professional profile where visitors and members can discover your work, learn about your approach, and connect with you independently.</strong></P>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-5">
                {[
                    ['ico-share.png', 'You share', 'your expertise.'],
                    ['ico-create.png', 'We create a', 'resource together.'],
                    ['ico-heart.png', 'Members get', 'practical support.'],
                    ['ico-sprout.png', 'Your practice', 'gets visibility.'],
                ].map(([ic, a, b]) => (
                    <div key={a} className="flex flex-col items-center text-center gap-1.5">
                        <div className="w-[6.2vh] h-[6.2vh] max-w-12 max-h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: TAN_LIGHT }}>
                            <img src={bg(ic)} alt="" draggable="false" className="w-[55%] h-auto" />
                        </div>
                        <p className="text-[8.5px] leading-tight" style={{ ...baskerville, color: INK }}>{a}<br />{b}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const HowItWorks = () => (
    <div className="relative w-full h-full px-6 py-7 overflow-y-auto uc-scroll">
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            className="pointer-events-none absolute bottom-0 -right-8 w-[48%] select-none"
            style={{ mixBlendMode: 'multiply', opacity: 0.45 }} />
        <div className="relative text-center mb-4">
            <Title>How our partnership works</Title>
            <p className="italic text-[clamp(9.5px,1.3vh,12px)] mt-1" style={{ ...lora, color: GREEN }}>
                An exchange that creates impact.
            </p>
        </div>
        <ol className="relative">
            {[
                ['ico-person.png', 'You bring', 'Your expertise, favourite client exercises, practical tools, and the wisdom you find yourself sharing again and again.'],
                ['ico-bulb.png', 'Together we build', 'We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library.'],
                ['ico-hand.png', 'Members receive', 'A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it.'],
                ['ico-eye.png', 'You receive', 'A Community Practitioner profile introducing visitors and members to your independent practice.'],
            ].map(([ic, t, b], i, arr) => (
                <li key={t} className="flex gap-3.5">
                    <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-[5.6vh] h-[5.6vh] max-w-11 max-h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: GREEN }}>
                            <img src={bg(ic)} alt="" draggable="false" className="w-[52%] h-auto" />
                        </div>
                        {i < arr.length - 1 && (
                            <div className="flex flex-col items-center py-1">
                                <span className="w-px h-4" style={{ backgroundColor: INK }} />
                                <svg viewBox="0 0 10 8" className="w-2 h-1.5" fill={INK}><path d="M5 8L0 0h10z" /></svg>
                            </div>
                        )}
                    </div>
                    <div className="pb-2.5">
                        <h3 className="uppercase text-[clamp(10px,1.35vh,13px)] mb-0.5" style={{ ...lora, color: GREEN }}>{t}</h3>
                        <P>{b}</P>
                    </div>
                </li>
            ))}
        </ol>
        <div className="relative mt-2">
            <Callout>
                <p className="text-[clamp(9.5px,1.25vh,12px)] leading-relaxed" style={{ ...baskerville, color: INK }}>
                    Every collaboration looks a little different. That's the beauty of it.
                </p>
            </Callout>
        </div>
    </div>
);

const CouldShare = () => (
    <div className="relative w-full h-full px-6 py-7 overflow-y-auto uc-scroll">
        <img src={bg('blossom.png')} alt="" draggable="false"
            className="pointer-events-none absolute -top-2 -right-8 w-[38%] select-none" />
        <div className="relative">
            <Title className="mb-2">What you could share</Title>
            <div className="relative mb-3 py-1">
                <span className="absolute inset-y-0 -left-3 right-6 rounded-full"
                    style={{ backgroundColor: '#A8AC97', opacity: 0.32 }} />
                <p className="relative text-[clamp(13px,1.85vh,18px)] leading-tight pl-1"
                    style={{ ...allura, color: GREEN }}>
                    Something that's already helping the people you work with.
                </p>
            </div>
            <P className="text-center mb-3">
                Think about the practical things you already teach, practise, or send home with clients.
                The exercises they come back to. The tools that help something click.
            </P>
            <h3 className="text-[clamp(11px,1.5vh,14px)] font-bold mb-2" style={{ ...baskerville, color: INK }}>It could be…</h3>
            <div className="mb-3">
                <List tight items={[
                    'A favourite client exercise',
                    'A body-based or grounding practice',
                    'A conversation or communication tool',
                    'A way to recognize or map a recurring pattern',
                    'A skill you regularly teach clients to practise',
                    'A check-in you use to help someone take stock',
                    'An exercise for partners to do together',
                    'A practical coping or regulation strategy',
                    'A decision-making or problem-solving framework',
                    'A reflection or journal prompt that consistently creates insight',
                    'A piece of between-session practice you frequently suggest',
                    "A simple tool that helps clients apply what they've learned in real life",
                ]} />
            </div>
            <Callout>
                <p className="font-bold text-[clamp(9.5px,1.25vh,12px)] mb-0.5" style={{ ...baskerville, color: INK }}>
                    You bring the expertise.
                </p>
                <p className="text-[clamp(9.5px,1.25vh,12px)] leading-relaxed" style={{ ...baskerville, color: INK }}>
                    Share the idea with me and help me understand how you use it. Together, we'll translate
                    it into a polished Uncoached resource.
                </p>
            </Callout>
        </div>
    </div>
);

const Profile = () => (
    <div className="relative w-full h-full">
        <img src={bg('profile-books.jpg')} alt="" draggable="false"
            className="absolute inset-0 w-full h-full object-cover object-bottom" />
        <div className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM}e6 48%, ${CREAM}a6 100%)` }} />
        <div className="relative h-full px-6 py-7 overflow-y-auto uc-scroll">
            <Title className="mb-2">Your practitioner profile</Title>
            <P className="mb-3">
                Your profile is featured on the public Uncoached website, making it visible to both
                visitors and members who want to learn more about your work before reaching out.
            </P>
            <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: TAN }}>
                <p className="italic font-bold mb-2 text-[clamp(9.5px,1.25vh,12px)]" style={{ ...baskerville, color: INK }}>
                    Here's what people will see:
                </p>
                <List tight items={['Professional photo', 'Area(s) of focus', 'Countries you work in',
                    'Virtual and/or in-person availability', 'Languages spoken',
                    'Website and/or booking link', 'Social media (optional)']} />
            </div>
            <p className="text-[clamp(13px,1.8vh,17px)] leading-[1.45] mb-3 text-right pr-2" style={{ ...allura, color: GREEN }}>
                You don't need to be a copywriter.<br />I'll help bring your profile to life.
            </p>
            <div className="rounded-xl p-4" style={{ backgroundColor: `${TAN}e6` }}>
                <p className="italic font-bold mb-2 text-[clamp(9.5px,1.25vh,12px)]" style={{ ...baskerville, color: INK }}>
                    A few important things to know:
                </p>
                <List tight items={[
                    'Your practice remains completely independent.',
                    'You manage your own clients, fees, and scheduling.',
                    'No referral commissions.',
                    "We'll professionally polish and brand every resource together.",
                    'Your contribution becomes part of the Uncoached Library.',
                    'We periodically review profiles to keep information current.',
                ]} />
            </div>
        </div>
    </div>
);

const Meaningful = () => (
    <div className="relative w-full h-full">
        <img src={bg('meaningful-vase.jpg')} alt="" draggable="false"
            className="absolute inset-0 w-full h-full object-cover object-right-bottom" />
        <div className="absolute inset-0"
            style={{ background: `linear-gradient(105deg, ${CREAM}fa 0%, ${CREAM}ed 52%, ${CREAM}73 100%)` }} />
        <div className="relative h-full px-6 py-7 overflow-y-auto uc-scroll">
            <Title>Building</Title>
            <p className="text-[clamp(22px,3.1vh,32px)] leading-none pl-0.5 mb-1" style={{ ...allura, color: GREEN }}>
                Something Meaningful
            </p>
            <Divider />
            <div className="space-y-2.5 mt-3 max-w-[85%]">
                <P>I don't want Uncoached to become another platform filled with endless content that people scroll past and never use.</P>
                <P>I want it to become a living library built by practitioners who genuinely care about helping people long after the session ends.</P>
                <P>Every practitioner brings a different perspective.</P>
                <P>Every contribution gives someone another way to navigate a difficult day, see themselves differently, or take one small step forward.</P>
                <P>We'll probably never know all the lives those resources will touch.</P>
                <P>I think that's pretty special.</P>
                <P>If that sounds like something you'd like to be part of, I'd love to welcome you to the Uncoached community.</P>
            </div>
            <div className="mt-4">
                <p className="text-[clamp(13px,1.75vh,17px)] leading-[1.5] mb-1" style={{ ...allura, color: GREEN }}>
                    Thank you for considering it.<br />I'd love to build this with you.
                </p>
                <img src={bg('signature.png')} alt="Johanna" draggable="false" className="h-[5.5vh] max-h-11 w-auto" />
                <p className="text-[8.5px] mt-0.5 pl-9" style={{ ...baskerville, color: INK }}>Founder, Uncoached</p>
            </div>
        </div>
    </div>
);

const ReadyToJoin = () => (
    <div className="relative w-full h-full flex flex-col" style={{ backgroundColor: GREEN }}>
        <div className="m-2.5 px-5 py-6 flex-1 overflow-y-auto uc-scroll" style={{ backgroundColor: '#E8E1D6' }}>
            <div className="text-center mb-4">
                <Title>Ready to join?</Title>
                <Divider />
                <p className="text-[clamp(9.5px,1.3vh,12px)]" style={{ ...baskerville, color: INK }}>
                    Here's what happens next.
                </p>
            </div>
            <div className="space-y-3.5">
                {[
                    ['01', 'Tell us about you', 'Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community.', 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.6M12 7.6v.5'],
                    ['02', 'Share your idea', "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library.", 'M9 17.6h6M10.5 20.4h3M12 3.6a6.2 6.2 0 0 0-3.6 11.2c.4.3.6.8.6 1.3h6c0-.5.2-1 .6-1.3A6.2 6.2 0 0 0 12 3.6zM12 6.6v6'],
                    ['03', "We'll build it together", "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached.", 'M2.5 11l4-4 5 4.5M21.5 12l-4.5-4-3.5 3M3 13l3.5-3.5 4 3.5 3-2.5 3.5 3'],
                ].map(([n, t, b, d]) => (
                    <div key={n} className="flex gap-3">
                        <div className="w-[5vh] h-[5vh] max-w-10 max-h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: ROSE }}>
                            <svg viewBox="0 0 24 24" className="w-[52%] h-auto" fill="none" stroke={CREAM}
                                strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                        </div>
                        <div>
                            <h3 className="uppercase text-[clamp(9.5px,1.3vh,12px)] mb-0.5" style={baskerville}>
                                <span style={{ color: GOLD }}>{n} ·</span> <span style={{ color: GREEN }}>{t}</span>
                            </h3>
                            <p className="text-[clamp(8.5px,1.15vh,11px)] leading-[1.65]" style={{ ...baskerville, color: INK }}>{b}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="text-center px-5 pb-5 pt-1">
            <p className="text-[clamp(9px,1.2vh,11.5px)] leading-relaxed mb-3" style={{ ...baskerville, color: CREAM }}>
                If you care deeply about helping people create real change, let's build something that
                helps them keep going.
            </p>
            <Link to="/partnership/apply"
                className="inline-block px-8 py-2.5 rounded-full text-[clamp(11px,1.5vh,14px)] transition-transform duration-300 hover:scale-105"
                style={{ ...baskerville, backgroundColor: TAN, color: GREEN, letterSpacing: '0.04em' }}>
                I'M IN! <span aria-hidden="true">→</span>
            </Link>
        </div>
    </div>
);

const SLIDES = [
    { key: 'cover', label: 'Cover', el: <Cover /> },
    { key: 'welcome', label: 'Welcome', el: <Welcome /> },
    { key: 'what', label: 'The Partnership', el: <WhatIs /> },
    { key: 'how', label: 'How it works', el: <HowItWorks /> },
    { key: 'share', label: 'What you could share', el: <CouldShare /> },
    { key: 'profile', label: 'Your profile', el: <Profile /> },
    { key: 'meaning', label: 'Something meaningful', el: <Meaningful /> },
    { key: 'join', label: 'Ready to join', el: <ReadyToJoin /> },
];

/* ── The deck ──────────────────────────────────────────────────────────── */

const PartnershipPage = () => {
    const [index, setIndex] = useState(0);
    const [dragDx, setDragDx] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const drag = useRef({ active: false, startX: 0, moved: false });
    const deckRef = useRef(null);
    const [cardW, setCardW] = useState(360);

    const total = SLIDES.length;
    const go = useCallback((dir) => {
        setIndex((i) => Math.min(total - 1, Math.max(0, i + dir)));
    }, [total]);

    // Measure the centre card so drag distance maps 1:1 to card movement
    useEffect(() => {
        const measure = () => {
            const el = deckRef.current?.querySelector('[data-card]');
            if (el) setCardW(el.getBoundingClientRect().width || 360);
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go]);

    const onDown = (e) => {
        drag.current = { active: true, startX: e.clientX, moved: false };
        setIsDragging(true);
        setDragDx(0);
    };
    const onMove = (e) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.startX;
        if (Math.abs(dx) > 4) drag.current.moved = true;
        // resist at the ends
        const atStart = index === 0 && dx > 0;
        const atEnd = index === total - 1 && dx < 0;
        setDragDx(atStart || atEnd ? dx * 0.25 : dx);
    };
    const onUp = () => {
        if (!drag.current.active) return;
        drag.current.active = false;
        setIsDragging(false);
        if (Math.abs(dragDx) > cardW * 0.18) go(dragDx < 0 ? 1 : -1);
        setDragDx(0);
    };

    // fractional offset while dragging, so the whole deck follows the finger
    const dragOffset = dragDx / (cardW * 0.62 || 1);

    const styleFor = (i) => {
        const o = i - index - dragOffset;
        const abs = Math.abs(o);
        const sign = Math.sign(o);
        const visible = abs < 3;
        return {
            transform: `translate(-50%, -50%) translateX(${o * 62}%) translateZ(${-abs * 170}px) rotateY(${-sign * Math.min(abs, 2.2) * 11}deg) scale(${Math.max(0.6, 1 - abs * 0.1)})`,
            opacity: visible ? Math.max(0, 1 - abs * 0.3) : 0,
            zIndex: 100 - Math.round(abs * 10),
            pointerEvents: abs < 0.5 ? 'auto' : 'none',
            transition: isDragging ? 'none' : 'transform 620ms cubic-bezier(.22,1,.36,1), opacity 620ms',
        };
    };

    return (
        <div className="relative w-full h-[100svh] overflow-hidden select-none"
            style={{ backgroundColor: '#EDE7DE' }}>

            <style>{`
                .uc-scroll::-webkit-scrollbar{width:4px}
                .uc-scroll::-webkit-scrollbar-thumb{background:${TAN};border-radius:4px}
                .uc-scroll{scrollbar-width:thin;scrollbar-color:${TAN} transparent}
                @media (prefers-reduced-motion: reduce){
                    [data-card]{transition:none !important}
                }
            `}</style>

            {/* soft ambient wash */}
            <div className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(120% 80% at 50% 0%, #FFFFFF 0%, transparent 55%), radial-gradient(90% 60% at 50% 100%, ${TAN}66 0%, transparent 60%)` }} />

            {/* header */}
            <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo('logo-sage-on-light.png')} alt="Uncoached" className="h-9 w-auto" draggable="false" />
                </Link>
                <Link to="/partnership/apply"
                    className="rounded-full px-5 py-2 text-[12px] transition-transform hover:scale-105"
                    style={{ ...baskerville, backgroundColor: GREEN, color: CREAM }}>
                    I'm in
                </Link>
            </div>

            {/* deck */}
            <div
                ref={deckRef}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{ perspective: '1600px', touchAction: 'pan-y' }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onPointerLeave={onUp}
            >
                {SLIDES.map((s, i) => (
                    <article
                        key={s.key}
                        data-card
                        aria-hidden={i !== index}
                        onClick={() => { if (!drag.current.moved && i !== index) setIndex(i); }}
                        className="absolute left-1/2 top-1/2 rounded-[18px] overflow-hidden bg-white"
                        style={{
                            ...styleFor(i),
                            height: 'min(74svh, 620px)',
                            aspectRatio: '210 / 297',
                            boxShadow: '0 30px 70px -20px rgba(31,36,34,.35), 0 6px 18px rgba(31,36,34,.12)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <div className="w-full h-full relative" style={{ backgroundColor: CREAM }}>
                            {s.el}
                            <span className="absolute bottom-2.5 left-3.5 text-[8.5px] tracking-wider z-20"
                                style={{ ...baskerville, color: i === 0 || s.key === 'join' ? '#ffffffaa' : '#8C857A' }}>
                                {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            {/* controls */}
            <div className="absolute bottom-0 inset-x-0 z-50 pb-5 sm:pb-7 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4 sm:gap-6">
                    <button onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page"
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                        style={{ borderColor: GREEN, color: GREEN }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div className="flex items-center gap-2">
                        {SLIDES.map((s, i) => (
                            <button key={s.key} onClick={() => setIndex(i)} aria-label={s.label}
                                aria-current={i === index}
                                className="rounded-full transition-all"
                                style={{
                                    width: i === index ? 9 : 6, height: i === index ? 9 : 6,
                                    backgroundColor: i === index ? GREEN : `${GREEN}44`,
                                }} />
                        ))}
                    </div>

                    <button onClick={() => go(1)} disabled={index === total - 1} aria-label="Next page"
                        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                        style={{ borderColor: GREEN, color: GREEN }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                <p className="flex items-center gap-1.5 text-[10.5px]" style={{ ...baskerville, color: '#8C857A' }}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.4"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11V6.5a1.5 1.5 0 1 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0v4.5a5 5 0 0 1-5 5h-1.6a4 4 0 0 1-3.1-1.5L6 17" />
                    </svg>
                    Click and drag to explore
                </p>
            </div>
        </div>
    );
};

export default PartnershipPage;
