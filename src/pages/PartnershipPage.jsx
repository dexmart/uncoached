import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Practitioner Partnership guide — deliberately NOT in the site nav.
// Johanna shares this link directly with practitioners.
//
// Each page is drawn on a fixed A4 canvas (794 x 1123 = 210 x 297mm at 96dpi)
// and the whole canvas is scaled to fit the viewport. Nothing scrolls inside a
// page, so no content is ever cut off and the layout stays true to her Canva
// original at every screen size. On small screens the type inevitably gets
// small, so tapping a page opens it at readable width.

const PAGE_W = 794;
const PAGE_H = 1123;

const GREEN = '#3F5D4D';
const CREAM = '#F4F1EC';
const TAN = '#D6C7B8';
const TAN_LIGHT = '#DCCFC0';
const ROSE = '#B0948A';
const GOLD = '#C89A5B';
const INK = '#1F2422';

const lora = { fontFamily: "'Lora', Georgia, serif" };
const bask = { fontFamily: "'Libre Baskerville', Georgia, serif" };
const allura = { fontFamily: "'Allura', cursive" };

const bg = (f) => `${import.meta.env.BASE_URL}bg/partnership/${f}`;
const logo = (f) => `${import.meta.env.BASE_URL}logo/${f}`;

const Sprig = ({ w = 34, className = '', style }) => (
    <img src={bg('leaf-sprig.png')} alt="" draggable="false"
        style={{ width: w, ...style }} className={`select-none ${className}`} />
);

const Rule = ({ w }) => <span style={{ width: w, height: 1.5, backgroundColor: GREEN }} />;

const DividerTrio = ({ ruleW = 150 }) => (
    <div className="flex items-center justify-center gap-5"><Rule w={ruleW} /><Sprig w={38} /><Rule w={ruleW} /></div>
);

const Title = ({ children, size = 42, align = 'left', mb = 0 }) => (
    <h2 style={{ ...lora, color: GREEN, fontSize: size, lineHeight: 1.16, textTransform: 'uppercase', textAlign: align, marginBottom: mb }}>
        {children}
    </h2>
);

const Body = ({ children, size = 14.5, bold, style }) => (
    <p style={{ ...bask, color: INK, fontSize: size, lineHeight: 1.75, fontWeight: bold ? 700 : 400, ...style }}>
        {children}
    </p>
);

const Bullets = ({ items, size = 14.5, gap = 9, dot = INK }) => (
    <ul style={{ display: 'flex', flexDirection: 'column', gap }}>
        {items.map((t) => (
            <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <span style={{ width: 5, height: 5, borderRadius: 99, backgroundColor: dot, marginTop: size * 0.62, flexShrink: 0 }} />
                <span style={{ ...bask, color: INK, fontSize: size, lineHeight: 1.6 }}>{t}</span>
            </li>
        ))}
    </ul>
);

const Callout = ({ children, pad = 26 }) => (
    <div style={{ backgroundColor: TAN, borderRadius: 34, padding: `${pad}px 34px`, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <Sprig w={34} style={{ marginTop: 4, flexShrink: 0 }} />
        <div>{children}</div>
    </div>
);

/* ── Pages ─────────────────────────────────────────────────────────────── */

const Cover = () => (
    <>
        <img src={bg('cover-vase.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: PAGE_H - 87, objectFit: 'cover', objectPosition: 'left' }} />
        <div style={{ position: 'absolute', inset: 0, height: PAGE_H - 87, background: `linear-gradient(90deg, transparent 30%, ${CREAM}45 52%, ${CREAM}c4 72%)` }} />
        <div style={{ position: 'absolute', left: '52%', right: 46, top: 120, textAlign: 'center' }}>
            <img src={logo('logo-sage-on-light.png')} alt="Uncoached" draggable="false"
                style={{ height: 96, margin: '0 auto 44px' }} />
            <h1 style={{ ...bask, color: GREEN, fontSize: 40, lineHeight: 1.35 }}>
                Uncoached<br />Practitioner<br />Partnership<br />Guide
            </h1>
            <span style={{ display: 'block', width: 92, height: 1.5, backgroundColor: GREEN, margin: '42px auto' }} />
            <p style={{ ...bask, color: GREEN, fontSize: 17, lineHeight: 1.7 }}>
                Helping clients between<br />the breakthroughs.
            </p>
            <Sprig w={44} style={{ margin: '38px auto 0' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 87, backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 17, letterSpacing: '0.25em', textTransform: 'uppercase', ...bask }}>
                uncoached.space
            </span>
        </div>
    </>
);

const Welcome = () => (
    <>
        <img src={bg('welcome-sunset.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', right: 0, top: 170, width: 336, height: 908, objectFit: 'cover', borderTopLeftRadius: 170 }} />
        <div style={{ position: 'absolute', left: 52, top: 78, width: 392 }}>
            <p style={{ ...lora, color: GREEN, fontSize: 33, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Welcome</p>
            <p style={{ ...bask, color: INK, fontSize: 25, marginTop: 26 }}>Before anything else,</p>
            <p style={{ ...allura, color: GREEN, fontSize: 55, lineHeight: 1, marginLeft: 6, marginTop: 2 }}>thank you.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 17, marginTop: 30 }}>
                <Body>One thing I've realized over the years is that insight doesn't automatically become change.</Body>
                <Body>Someone can leave a session feeling lighter, clearer, and committed to doing things differently. But lasting change isn't built in the hour you spend together. It happens afterwards, in everyday life, when they're trying to remember what they learned and put it into practice.</Body>
                <Body bold>That's what inspired Uncoached.</Body>
                <Body>I wanted to create something practitioners would genuinely be excited to share with their clients. A place where clients could reconnect with what they've already learned and continue building on the work they've already started.</Body>
                <Body bold>Not to replace the work you're already doing, but to help it stick.</Body>
                <Body>That's what the Practitioner Partnership is all about.</Body>
                <Body>Together, we can take the tools and ideas that are already changing lives and give them a home where they can continue helping people long after the session ends.</Body>
            </div>
        </div>
    </>
);

const WhatIs = () => (
    <>
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -40, bottom: -30, width: 420, mixBlendMode: 'multiply', opacity: 0.45 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 76 }}>
            <Title size={42}>What is the Practitioner<br />Partnership?</Title>
            <div style={{ margin: '30px 0 34px' }}><DividerTrio ruleW={140} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <Body bold>One of the most rewarding parts of this work is watching someone take what they've learned and truly make it part of their life.</Body>
                <Body>Every practitioner has exercises, perspectives, and practical tools that make a real difference. Together, we'll turn some of those into polished Uncoached resources that people can return to whenever they need a reminder, a reset, or a different perspective.</Body>
                <Body><b>These resources aren't designed to replace your work. They're designed to reinforce it.</b> They give your clients a trusted place to return to the tools, exercises, and perspectives you've already introduced, while also discovering complementary perspectives that may deepen what they're learning or help something finally click.</Body>
                <Body>They're also there for the moments when you need to step away, so your clients still have something meaningful to lean on until you're back.</Body>
                <Body>As part of the partnership, your expertise becomes a part of a growing library that supports people long after the session ends. <b>You'll also have a professional profile where visitors and members can discover your work, learn about your approach, and connect with you independently.</b></Body>
            </div>
        </div>
        <div style={{ position: 'absolute', left: 50, right: 50, bottom: 56, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {[
                ['ico-share.png', 'You share', 'your expertise.'],
                ['ico-create.png', 'We create a', 'resource together.'],
                ['ico-heart.png', 'Members get', 'practical support.'],
                ['ico-sprout.png', 'Your practice', 'gets visibility.'],
            ].map(([ic, a, b]) => (
                <div key={a} style={{ textAlign: 'center' }}>
                    <div style={{ width: 94, height: 94, borderRadius: 99, backgroundColor: TAN_LIGHT, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={bg(ic)} alt="" draggable="false" style={{ width: 54 }} />
                    </div>
                    <p style={{ ...bask, color: INK, fontSize: 13.5, lineHeight: 1.5 }}>{a}<br />{b}</p>
                </div>
            ))}
        </div>
    </>
);

const HowItWorks = () => (
    <>
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -10, bottom: -20, width: 360, mixBlendMode: 'multiply', opacity: 0.4 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 108, textAlign: 'center' }}>
            <Title size={38} align="center">How our partnership works</Title>
            <p style={{ ...lora, color: GREEN, fontSize: 19, fontStyle: 'italic', marginTop: 8 }}>An exchange that creates impact.</p>
        </div>
        <div style={{ position: 'absolute', left: 76, right: 60, top: 210 }}>
            {[
                ['ico-person.png', 'You bring', 'Your expertise, favourite client exercises, practical tools, and the wisdom you find yourself sharing again and again.'],
                ['ico-bulb.png', 'Together we build', 'We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library.'],
                ['ico-hand.png', 'Members receive', 'A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it.'],
                ['ico-eye.png', 'You receive', 'A Community Practitioner profile introducing visitors and members to your independent practice.'],
            ].map(([ic, t, b], i, arr) => (
                <div key={t} style={{ display: 'flex', gap: 26 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        <div style={{ width: 92, height: 92, borderRadius: 99, backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={bg(ic)} alt="" draggable="false" style={{ width: 51 }} />
                        </div>
                        {i < arr.length - 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '7px 0' }}>
                                <span style={{ width: 1.5, height: 26, backgroundColor: INK }} />
                                <svg viewBox="0 0 10 8" style={{ width: 13 }} fill={INK}><path d="M5 8L0 0h10z" /></svg>
                            </div>
                        )}
                    </div>
                    <div style={{ paddingTop: 8, paddingBottom: 12 }}>
                        <h3 style={{ ...lora, color: GREEN, fontSize: 23, textTransform: 'uppercase', marginBottom: 6 }}>{t}</h3>
                        <Body>{b}</Body>
                    </div>
                </div>
            ))}
        </div>
        <div style={{ position: 'absolute', left: 130, right: 130, bottom: 74 }}>
            <Callout pad={20}>
                <Body>Every collaboration looks a little different.<br />That's the beauty of it.</Body>
            </Callout>
        </div>
    </>
);

const CouldShare = () => (
    <>
        <img src={bg('blossom.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -30, top: 60, width: 300 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 88 }}>
            <Title size={40}>What you could share</Title>
            <div style={{ position: 'relative', margin: '22px 0 32px', padding: '8px 0' }}>
                <span style={{ position: 'absolute', inset: '0 90px 0 -30px', borderRadius: 99, backgroundColor: '#A8AC97', opacity: 0.34 }} />
                <p style={{ ...allura, color: GREEN, fontSize: 32, position: 'relative', paddingLeft: 6 }}>
                    Something that's already helping the people you work with.
                </p>
            </div>
            <Body style={{ textAlign: 'center', padding: '0 40px' }}>
                Think about the practical things you already teach, practise, or send home with clients.
                The exercises they come back to. The tools that help something click. The things you wish
                they remembered when real life happens between sessions.
            </Body>
            <h3 style={{ ...bask, color: INK, fontSize: 22, fontWeight: 700, margin: '30px 0 18px' }}>It could be…</h3>
            <Bullets gap={7} items={[
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
        <div style={{ position: 'absolute', left: 88, right: 88, bottom: 62 }}>
            <Callout pad={22}>
                <Body bold>You bring the expertise.</Body>
                <Body>Share the idea, practice or approach with me and help me understand how you use it.
                    Together, we'll translate it into a polished Uncoached resource that's clear, practical
                    and easy to use.</Body>
            </Callout>
        </div>
    </>
);

// Page 6 — restored to the printed layout: intro, tan panel of bullets with the
// script note beside it, then the full-width "things to know" panel.
const Profile = () => (
    <>
        <img src={bg('profile-books.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM}f2 30%, ${CREAM}b8 100%)` }} />

        <div style={{ position: 'absolute', left: 50, right: 50, top: 106 }}>
            <Title size={38}>Your practitioner profile</Title>
            <Body size={15.5} style={{ marginTop: 26, width: 470 }}>
                Your profile is featured on the public Uncoached website, making it visible to both
                visitors and members who want to learn more about your work before reaching out.
            </Body>
        </div>

        <div style={{ position: 'absolute', left: 46, top: 318, width: 442, backgroundColor: TAN, borderRadius: 20, padding: '30px 36px' }}>
            <p style={{ ...bask, color: INK, fontSize: 15, fontWeight: 700, fontStyle: 'italic', marginBottom: 18 }}>
                Here's what people will see:
            </p>
            <Bullets gap={12} size={15.5} items={[
                'Professional photo', 'Area(s) of focus', 'Countries you work in',
                'Virtual and/or in-person availability', 'Languages spoken',
                'Website and/or booking link', 'Social media (optional)',
            ]} />
        </div>

        <div style={{ position: 'absolute', left: 528, top: 336, width: 224 }}>
            <p style={{ ...allura, color: GREEN, fontSize: 26, lineHeight: 1.55 }}>You don't need to be a copywriter.</p>
            <p style={{ ...allura, color: GREEN, fontSize: 26, lineHeight: 1.55, marginTop: 22 }}>I'll help bring your profile to life.</p>
            <Sprig w={48} style={{ marginTop: 14, marginLeft: 130 }} />
        </div>

        <div style={{ position: 'absolute', left: 46, right: 68, bottom: 96, backgroundColor: `${TAN}e6`, borderRadius: 20, padding: '28px 36px' }}>
            <p style={{ ...bask, color: INK, fontSize: 15, fontWeight: 700, fontStyle: 'italic', marginBottom: 16 }}>
                A few important things to know:
            </p>
            <Bullets gap={8} size={14.5} items={[
                'Your practice remains completely independent.',
                'You manage your own clients, fees, and scheduling.',
                'No referral commissions.',
                "We'll professionally polish and brand every resource together.",
                'Your contribution becomes part of the Uncoached Library.',
                'We periodically review profiles to keep information current.',
            ]} />
        </div>
    </>
);

// Page 7 — restored: BUILDING / script, divider, narrow letter column clearing
// the vase, then her real signature.
const Meaningful = () => (
    <>
        <img src={bg('meaningful-vase.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right bottom' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, ${CREAM}f7 0%, ${CREAM}e8 48%, ${CREAM}5c 100%)` }} />

        <div style={{ position: 'absolute', left: 50, right: 50, top: 84 }}>
            <Title size={42}>Building</Title>
            <p style={{ ...allura, color: GREEN, fontSize: 52, lineHeight: 1, marginTop: 4, marginLeft: 22 }}>Something Meaningful</p>
            <div style={{ marginTop: 34 }}><DividerTrio ruleW={140} /></div>
        </div>

        <div style={{ position: 'absolute', left: 50, top: 292, width: 462, display: 'flex', flexDirection: 'column', gap: 17 }}>
            <Body>I don't want Uncoached to become another platform filled with endless content that people scroll past and never use.</Body>
            <Body>I want it to become a living library built by practitioners who genuinely care about helping people long after the session ends.</Body>
            <Body>Every practitioner brings a different perspective.</Body>
            <Body>Every contribution gives someone another way to navigate a difficult day, see themselves differently, or take one small step forward.</Body>
            <Body>We'll probably never know all the lives those resources will touch.</Body>
            <Body>I think that's pretty special.</Body>
            <Body>If that sounds like something you'd like to be part of, I'd love to welcome you to the Uncoached community.</Body>
        </div>

        <div style={{ position: 'absolute', left: 52, bottom: 96 }}>
            <p style={{ ...allura, color: GREEN, fontSize: 30, lineHeight: 1.5 }}>
                Thank you for considering it.<br />I'd love to build this with you.
            </p>
            <img src={bg('signature.png')} alt="Johanna" draggable="false" style={{ height: 84, marginTop: 14 }} />
            <p style={{ ...bask, color: INK, fontSize: 13, marginTop: 4, marginLeft: 78 }}>Founder, Uncoached</p>
        </div>
    </>
);

const ReadyToJoin = () => (
    <>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: GREEN }} />
        <div style={{ position: 'absolute', left: 33, right: 33, top: 30, height: 712, backgroundColor: '#E4DCD0', padding: '46px 54px' }}>
            <Title size={38} align="center">Ready to join?</Title>
            <div style={{ margin: '22px 0 20px' }}><DividerTrio ruleW={110} /></div>
            <p style={{ ...bask, color: INK, fontSize: 18, textAlign: 'center', marginBottom: 36 }}>Here's what happens next.</p>

            {[
                ['01', 'Tell us about you', 'Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community.', 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.6M12 7.6v.5'],
                ['02', 'Share your idea', "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library.", 'M9 17.6h6M10.5 20.4h3M12 3.6a6.2 6.2 0 0 0-3.6 11.2c.4.3.6.8.6 1.3h6c0-.5.2-1 .6-1.3A6.2 6.2 0 0 0 12 3.6zM12 6.6v6'],
                ['03', "We'll build it together", "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached.", 'M2.5 11l4-4 5 4.5M21.5 12l-4.5-4-3.5 3M3 13l3.5-3.5 4 3.5 3-2.5 3.5 3'],
            ].map(([n, t, b, d]) => (
                <div key={n} style={{ display: 'flex', gap: 24, marginBottom: 30 }}>
                    <div style={{ width: 94, height: 94, borderRadius: 99, backgroundColor: ROSE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" style={{ width: 50 }} fill="none" stroke={CREAM} strokeWidth="1.3"
                            strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                    </div>
                    <div style={{ paddingTop: 8 }}>
                        <h3 style={{ ...bask, fontSize: 24, textTransform: 'uppercase', marginBottom: 8 }}>
                            <span style={{ color: GOLD }}>{n} ·</span> <span style={{ color: GREEN }}>{t}</span>
                        </h3>
                        <Body size={15}>{b}</Body>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ position: 'absolute', left: 70, right: 70, top: 772, textAlign: 'center' }}>
            <p style={{ ...bask, color: CREAM, fontSize: 18, lineHeight: 1.7 }}>
                If you care deeply about helping people create real change,<br />
                let's build something that helps them keep going.
            </p>
            <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center' }}>
                <span style={{ ...bask, backgroundColor: TAN, color: GREEN, fontSize: 22, letterSpacing: '0.04em', padding: '16px 52px', borderRadius: 99, display: 'inline-block' }}>
                    I'M IN! →
                </span>
            </div>
            <img src={logo('logouncoached.png')} alt="Uncoached" draggable="false"
                style={{ height: 108, margin: '34px auto 0' }} />
        </div>
    </>
);

const SLIDES = [
    { key: 'cover', label: 'Cover', El: Cover },
    { key: 'welcome', label: 'Welcome', El: Welcome },
    { key: 'what', label: 'The Partnership', El: WhatIs },
    { key: 'how', label: 'How it works', El: HowItWorks },
    { key: 'share', label: 'What you could share', El: CouldShare },
    { key: 'profile', label: 'Your profile', El: Profile },
    { key: 'meaning', label: 'Something meaningful', El: Meaningful },
    { key: 'join', label: 'Ready to join', El: ReadyToJoin },
];

/** One A4 page drawn at fixed size, then scaled to fit. */
const Page = ({ children, scale }) => (
    <div style={{ width: PAGE_W * scale, height: PAGE_H * scale, overflow: 'hidden', backgroundColor: CREAM }}>
        <div style={{ width: PAGE_W, height: PAGE_H, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            {children}
        </div>
    </div>
);

/* ── Deck ──────────────────────────────────────────────────────────────── */

const PartnershipPage = () => {
    const [index, setIndex] = useState(0);
    const [dragDx, setDragDx] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [zoom, setZoom] = useState(null);      // slide index opened for reading
    const [box, setBox] = useState({ w: 1200, h: 700 });
    const drag = useRef({ active: false, startX: 0, moved: false });
    const stage = useRef(null);

    const total = SLIDES.length;
    const go = useCallback((d) => setIndex((i) => Math.min(total - 1, Math.max(0, i + d))), [total]);

    useEffect(() => {
        const measure = () => {
            const el = stage.current;
            if (el) setBox({ w: el.clientWidth, h: el.clientHeight });
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (zoom !== null) { if (e.key === 'Escape') setZoom(null); return; }
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [go, zoom]);

    // Fit a whole page inside the stage, leaving room for the neighbouring cards.
    const scale = Math.min(box.h / PAGE_H, (box.w * 0.78) / PAGE_W);
    const cardW = PAGE_W * scale;

    const onDown = (e) => {
        drag.current = { active: true, startX: e.clientX, moved: false };
        setIsDragging(true);
        setDragDx(0);
    };
    const onMove = (e) => {
        if (!drag.current.active) return;
        const dx = e.clientX - drag.current.startX;
        if (Math.abs(dx) > 5) drag.current.moved = true;
        const edge = (index === 0 && dx > 0) || (index === total - 1 && dx < 0);
        setDragDx(edge ? dx * 0.25 : dx);
    };
    const onUp = () => {
        if (!drag.current.active) return;
        drag.current.active = false;
        setIsDragging(false);
        if (Math.abs(dragDx) > cardW * 0.15) go(dragDx < 0 ? 1 : -1);
        setDragDx(0);
    };

    const dragOffset = dragDx / (cardW * 0.66 || 1);

    const styleFor = (i) => {
        const o = i - index - dragOffset;
        const abs = Math.abs(o);
        const sign = Math.sign(o);
        return {
            transform: `translate(-50%,-50%) translateX(${o * 66}%) translateZ(${-abs * 180}px) rotateY(${-sign * Math.min(abs, 2.2) * 11}deg) scale(${Math.max(0.6, 1 - abs * 0.09)})`,
            opacity: abs < 3 ? Math.max(0, 1 - abs * 0.32) : 0,
            zIndex: 100 - Math.round(abs * 10),
            pointerEvents: abs < 0.5 ? 'auto' : 'none',
            transition: isDragging ? 'none' : 'transform 620ms cubic-bezier(.22,1,.36,1), opacity 620ms',
        };
    };

    // Zoomed reading view: fit to width so the type is legible, scroll vertically.
    const zoomScale = Math.min((box.w * 0.96) / PAGE_W, 1);

    return (
        <div className="relative w-full h-[100svh] overflow-hidden select-none" style={{ backgroundColor: '#EDE7DE' }}>
            <div className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(120% 80% at 50% 0%, #fff 0%, transparent 55%), radial-gradient(90% 60% at 50% 100%, ${TAN}55 0%, transparent 60%)` }} />

            <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
                <Link to="/"><img src={logo('logo-sage-on-light.png')} alt="Uncoached" className="h-9 w-auto" draggable="false" /></Link>
                <Link to="/partnership/apply" className="rounded-full px-5 py-2 text-[12px] transition-transform hover:scale-105"
                    style={{ ...bask, backgroundColor: GREEN, color: CREAM }}>I'm in</Link>
            </header>

            <div ref={stage} className="absolute left-0 right-0" style={{ top: 68, bottom: 104 }}>
                <div className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    style={{ perspective: '1700px', touchAction: 'pan-y' }}
                    onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
                    onPointerCancel={onUp} onPointerLeave={onUp}>
                    {SLIDES.map((s, i) => (
                        <article key={s.key} data-card aria-hidden={i !== index}
                            onClick={() => {
                                if (drag.current.moved) return;
                                if (i === index) setZoom(i); else setIndex(i);
                            }}
                            className="absolute left-1/2 top-1/2 overflow-hidden rounded-[10px]"
                            style={{
                                ...styleFor(i),
                                boxShadow: '0 30px 70px -20px rgba(31,36,34,.35), 0 6px 18px rgba(31,36,34,.12)',
                                transformStyle: 'preserve-3d',
                            }}>
                            <Page scale={scale}>{s.El()}</Page>
                        </article>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-50 pb-5 flex flex-col items-center gap-3">
                <div className="flex items-center gap-5">
                    <button onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page"
                        className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                        style={{ borderColor: GREEN, color: GREEN }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="flex items-center gap-2">
                        {SLIDES.map((s, i) => (
                            <button key={s.key} onClick={() => setIndex(i)} aria-label={s.label} aria-current={i === index}
                                className="rounded-full transition-all"
                                style={{ width: i === index ? 9 : 6, height: i === index ? 9 : 6, backgroundColor: i === index ? GREEN : `${GREEN}44` }} />
                        ))}
                    </div>
                    <button onClick={() => go(1)} disabled={index === total - 1} aria-label="Next page"
                        className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30 disabled:hover:scale-100"
                        style={{ borderColor: GREEN, color: GREEN }}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6"
                            strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
                <p className="text-[11px]" style={{ ...bask, color: '#8C857A' }}>
                    Use the arrows, or drag · <span className="hidden sm:inline">click</span><span className="sm:hidden">tap</span> a page to read it
                </p>
            </div>

            {/* Readable view */}
            {zoom !== null && (
                <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain"
                    style={{ backgroundColor: 'rgba(31,36,34,.72)' }}
                    onClick={() => setZoom(null)}>
                    <button onClick={() => setZoom(null)} aria-label="Close"
                        className="fixed top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: CREAM, color: GREEN }}>
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                    </button>
                    <div className="flex justify-center py-6" onClick={(e) => e.stopPropagation()}>
                        <div style={{ boxShadow: '0 20px 60px rgba(0,0,0,.4)' }}>
                            <Page scale={zoomScale}>{SLIDES[zoom].El()}</Page>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnershipPage;
