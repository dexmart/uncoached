import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCopy } from '../context/SiteCopyContext';

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
// Every page takes `c`, the site-copy lookup, so Johanna can reword the guide
// from the admin. These pages are a fixed size like a printed page, so the
// admin warns her when a box grows well past its original length.

const lines = (t) => (t || '').split('\n').map((l) => l.trim()).filter(Boolean);

/** Render a multi-line field with real line breaks between the lines. */
const brLines = (t) => lines(t).flatMap((l, i) => (i ? [<br key={`b${i}`} />, l] : [l]));

const Cover = (c) => (
    <>
        <img src={bg('cover-vase.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: PAGE_H - 87, objectFit: 'cover', objectPosition: 'left' }} />
        <div style={{ position: 'absolute', inset: 0, height: PAGE_H - 87, background: `linear-gradient(90deg, transparent 30%, ${CREAM}45 52%, ${CREAM}c4 72%)` }} />
        <div style={{ position: 'absolute', left: '52%', right: 46, top: 120, textAlign: 'center' }}>
            <img src={logo('logo-sage-on-light.png')} alt="Uncoached" draggable="false"
                style={{ height: 96, margin: '0 auto 44px' }} />
            <h1 style={{ ...bask, color: GREEN, fontSize: 40, lineHeight: 1.35 }}>
                {brLines(c('partnership.cover.title'))}
            </h1>
            <span style={{ display: 'block', width: 92, height: 1.5, backgroundColor: GREEN, margin: '42px auto' }} />
            <p style={{ ...bask, color: GREEN, fontSize: 17, lineHeight: 1.7 }}>
                {brLines(c('partnership.cover.tagline'))}
            </p>
            <Sprig w={44} style={{ margin: '38px auto 0' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 87, backgroundColor: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 17, letterSpacing: '0.25em', textTransform: 'uppercase', ...bask }}>
                {c('partnership.cover.footer')}
            </span>
        </div>
    </>
);

const Welcome = (c) => (
    <>
        <img src={bg('welcome-sunset.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', right: 0, top: 170, width: 336, height: 908, objectFit: 'cover', borderTopLeftRadius: 170 }} />
        <div style={{ position: 'absolute', left: 52, top: 78, width: 392 }}>
            <p style={{ ...lora, color: GREEN, fontSize: 33, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c('partnership.welcome.heading')}</p>
            <p style={{ ...bask, color: INK, fontSize: 25, marginTop: 26 }}>{c('partnership.welcome.lead')}</p>
            <p style={{ ...allura, color: GREEN, fontSize: 55, lineHeight: 1, marginLeft: 6, marginTop: 2 }}>{c('partnership.welcome.script')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 17, marginTop: 30 }}>
                <Body>{c('partnership.welcome.p1')}</Body>
                <Body>{c('partnership.welcome.p2')}</Body>
                <Body bold>{c('partnership.welcome.p3')}</Body>
                <Body>{c('partnership.welcome.p4')}</Body>
                <Body bold>{c('partnership.welcome.p5')}</Body>
                <Body>{c('partnership.welcome.p6')}</Body>
                <Body>{c('partnership.welcome.p7')}</Body>
            </div>
        </div>
    </>
);

const WhatIs = (c) => (
    <>
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -40, bottom: -30, width: 420, opacity: 1 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 76 }}>
            <Title size={42}>{brLines(c('partnership.what.title'))}</Title>
            <div style={{ margin: '30px 0 34px' }}><DividerTrio ruleW={140} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <Body bold>{c('partnership.what.p1')}</Body>
                <Body>{c('partnership.what.p2')}</Body>
                <Body><b>{c('partnership.what.p3_bold')}</b> {c('partnership.what.p3_rest')}</Body>
                <Body>{c('partnership.what.p4')}</Body>
                <Body>{c('partnership.what.p5')} <b>{c('partnership.what.p5_bold')}</b></Body>
            </div>
        </div>
        <div style={{ position: 'absolute', left: 50, right: 50, bottom: 56, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
            {[
                ['ico-share.png', 'partnership.what.icon1'],
                ['ico-create.png', 'partnership.what.icon2'],
                ['ico-heart.png', 'partnership.what.icon3'],
                ['ico-sprout.png', 'partnership.what.icon4'],
            ].map(([ic, k]) => (
                <div key={k} style={{ textAlign: 'center' }}>
                    <div style={{ width: 94, height: 94, borderRadius: 99, backgroundColor: TAN_LIGHT, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={bg(ic)} alt="" draggable="false" style={{ width: 54 }} />
                    </div>
                    <p style={{ ...bask, color: INK, fontSize: 13.5, lineHeight: 1.5 }}>{brLines(c(k))}</p>
                </div>
            ))}
        </div>
    </>
);

const HowItWorks = (c) => (
    <>
        <img src={bg('fern-watermark.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -10, bottom: -20, width: 360, opacity: 1 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 108, textAlign: 'center' }}>
            <Title size={38} align="center">{c('partnership.how.title')}</Title>
            <p style={{ ...lora, color: GREEN, fontSize: 19, fontStyle: 'italic', marginTop: 8 }}>{c('partnership.how.subtitle')}</p>
        </div>
        <div style={{ position: 'absolute', left: 76, right: 60, top: 210 }}>
            {[
                ['ico-person.png', 1],
                ['ico-bulb.png', 2],
                ['ico-hand.png', 3],
                ['ico-eye.png', 4],
            ].map(([ic, n], i, arr) => (
                <div key={n} style={{ display: 'flex', gap: 26 }}>
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
                        <h3 style={{ ...lora, color: GREEN, fontSize: 23, textTransform: 'uppercase', marginBottom: 6 }}>{c(`partnership.how.step${n}_title`)}</h3>
                        <Body>{c(`partnership.how.step${n}_body`)}</Body>
                    </div>
                </div>
            ))}
        </div>
        <div style={{ position: 'absolute', left: 130, right: 130, bottom: 74 }}>
            <Callout pad={20}>
                <Body>{brLines(c('partnership.how.callout'))}</Body>
            </Callout>
        </div>
    </>
);

const CouldShare = (c) => (
    <>
        <img src={bg('blossom.png')} alt="" draggable="false"
            style={{ position: 'absolute', right: -18, top: 392, width: 286 }} />
        <div style={{ position: 'absolute', left: 50, right: 50, top: 88 }}>
            <Title size={40}>{c('partnership.share.title')}</Title>
            <div style={{ position: 'relative', margin: '22px 0 32px', padding: '10px 0' }}>
                {/* dry-brush stroke behind the script line, bleeding off the left edge */}
                <span style={{
                    position: 'absolute', left: -62, right: 262, top: -16, bottom: -16,
                    backgroundImage: `url(${bg('swash.png')})`,
                    backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',
                }} />
                <p style={{ ...allura, color: GREEN, fontSize: 23, position: 'relative', paddingLeft: 8 }}>
                    {c('partnership.share.script')}
                </p>
            </div>
            <Body style={{ textAlign: 'center', padding: '0 40px' }}>
                {c('partnership.share.intro')}
            </Body>
            <h3 style={{ ...bask, color: INK, fontSize: 22, fontWeight: 700, margin: '30px 0 18px' }}>{c('partnership.share.list_heading')}</h3>
            <Bullets gap={7} items={lines(c('partnership.share.bullets'))} />
        </div>
        <div style={{ position: 'absolute', left: 88, right: 88, bottom: 62 }}>
            <Callout pad={22}>
                <Body bold>{c('partnership.share.callout_bold')}</Body>
                <Body>{c('partnership.share.callout_body')}</Body>
            </Callout>
        </div>
    </>
);

// Page 6 — restored to the printed layout: intro, tan panel of bullets with the
// script note beside it, then the full-width "things to know" panel.
const Profile = (c) => (
    <>
        <img src={bg('profile-books.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM}f2 30%, ${CREAM}b8 100%)` }} />

        <div style={{ position: 'absolute', left: 50, right: 50, top: 106 }}>
            <Title size={38}>{c('partnership.profile.title')}</Title>
            <Body size={15.5} style={{ marginTop: 26, width: 470 }}>
                {c('partnership.profile.intro')}
            </Body>
        </div>

        <div style={{ position: 'absolute', left: 46, top: 318, width: 442, backgroundColor: TAN, borderRadius: 20, padding: '30px 36px' }}>
            <p style={{ ...bask, color: INK, fontSize: 15, fontWeight: 700, fontStyle: 'italic', marginBottom: 18 }}>
                {c('partnership.profile.panel_heading')}
            </p>
            <Bullets gap={12} size={15.5} items={lines(c('partnership.profile.panel_items'))} />
        </div>

        <div style={{ position: 'absolute', left: 528, top: 336, width: 224 }}>
            <p style={{ ...allura, color: GREEN, fontSize: 26, lineHeight: 1.55 }}>{c('partnership.profile.script1')}</p>
            <p style={{ ...allura, color: GREEN, fontSize: 26, lineHeight: 1.55, marginTop: 22 }}>{c('partnership.profile.script2')}</p>
            <Sprig w={48} style={{ marginTop: 14, marginLeft: 130 }} />
        </div>

        <div style={{ position: 'absolute', left: 46, right: 68, bottom: 96, backgroundColor: `${TAN}e6`, borderRadius: 20, padding: '28px 36px' }}>
            <p style={{ ...bask, color: INK, fontSize: 15, fontWeight: 700, fontStyle: 'italic', marginBottom: 16 }}>
                {c('partnership.profile.notes_heading')}
            </p>
            <Bullets gap={8} size={14.5} items={lines(c('partnership.profile.notes_items'))} />
        </div>
    </>
);

// Page 7 — restored: BUILDING / script, divider, narrow letter column clearing
// the vase, then her real signature.
const Meaningful = (c) => (
    <>
        <img src={bg('meaningful-vase.jpg')} alt="" draggable="false"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right bottom' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, ${CREAM}f7 0%, ${CREAM}e8 48%, ${CREAM}5c 100%)` }} />

        <div style={{ position: 'absolute', left: 50, right: 50, top: 84 }}>
            <Title size={42}>{c('partnership.meaning.title')}</Title>
            <p style={{ ...allura, color: GREEN, fontSize: 52, lineHeight: 1, marginTop: 4, marginLeft: 22 }}>{c('partnership.meaning.script')}</p>
            <div style={{ marginTop: 34 }}><DividerTrio ruleW={140} /></div>
        </div>

        <div style={{ position: 'absolute', left: 50, top: 292, width: 462, display: 'flex', flexDirection: 'column', gap: 17 }}>
            {lines(c('partnership.meaning.body')).map((t, i) => <Body key={i}>{t}</Body>)}
        </div>

        <div style={{ position: 'absolute', left: 52, bottom: 96 }}>
            <p style={{ ...allura, color: GREEN, fontSize: 30, lineHeight: 1.5 }}>
                {brLines(c('partnership.meaning.closing'))}
            </p>
            <img src={bg('signature.png')} alt="Johanna" draggable="false" style={{ height: 84, marginTop: 14 }} />
            <p style={{ ...bask, color: INK, fontSize: 13, marginTop: 4, marginLeft: 78 }}>{c('partnership.meaning.signature_caption')}</p>
        </div>
    </>
);

const ReadyToJoin = (c) => (
    <>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: GREEN }} />
        <div style={{ position: 'absolute', left: 33, right: 33, top: 30, height: 712, backgroundColor: '#E4DCD0', padding: '46px 54px' }}>
            <Title size={38} align="center">{c('partnership.join.title')}</Title>
            <div style={{ margin: '22px 0 20px' }}><DividerTrio ruleW={110} /></div>
            <p style={{ ...bask, color: INK, fontSize: 18, textAlign: 'center', marginBottom: 36 }}>{c('partnership.join.subtitle')}</p>

            {[
                ['01', 1, 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.6M12 7.6v.5'],
                ['02', 2, 'M9 17.6h6M10.5 20.4h3M12 3.6a6.2 6.2 0 0 0-3.6 11.2c.4.3.6.8.6 1.3h6c0-.5.2-1 .6-1.3A6.2 6.2 0 0 0 12 3.6zM12 6.6v6'],
                ['03', 3, 'M2.5 11l4-4 5 4.5M21.5 12l-4.5-4-3.5 3M3 13l3.5-3.5 4 3.5 3-2.5 3.5 3'],
            ].map(([label, n, d]) => (
                <div key={label} style={{ display: 'flex', gap: 24, marginBottom: 30 }}>
                    <div style={{ width: 94, height: 94, borderRadius: 99, backgroundColor: ROSE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" style={{ width: 50 }} fill="none" stroke={CREAM} strokeWidth="1.3"
                            strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                    </div>
                    <div style={{ paddingTop: 8 }}>
                        <h3 style={{ ...bask, fontSize: 24, textTransform: 'uppercase', marginBottom: 8 }}>
                            <span style={{ color: GOLD }}>{label} ·</span> <span style={{ color: GREEN }}>{c(`partnership.join.step${n}_title`)}</span>
                        </h3>
                        <Body size={15}>{c(`partnership.join.step${n}_body`)}</Body>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ position: 'absolute', left: 70, right: 70, top: 772, textAlign: 'center' }}>
            <p style={{ ...bask, color: CREAM, fontSize: 18, lineHeight: 1.7 }}>
                {brLines(c('partnership.join.closing'))}
            </p>
            <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center' }}>
                <Link to="/partnership/apply" onClick={(e) => e.stopPropagation()}
                    style={{ ...bask, backgroundColor: TAN, color: GREEN, fontSize: 22, letterSpacing: '0.04em', padding: '16px 52px', borderRadius: 99, display: 'inline-block', textDecoration: 'none' }}>
                    {c('partnership.join.cta')} →
                </Link>
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
    const copy = useCopy();
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

    // Wheel / trackpad paging — the most natural desktop gesture for a deck.
    useEffect(() => {
        const el = stage.current;
        if (!el) return;
        let lock = false;
        const onWheel = (e) => {
            const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
            if (Math.abs(d) < 10) return;
            e.preventDefault();
            if (lock) return;
            lock = true;
            go(d > 0 ? 1 : -1);
            setTimeout(() => { lock = false; }, 430);
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [go]);

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
                <Link to="/partnership/apply"
                    className="rounded-full px-6 py-2.5 text-[14px] font-semibold transition-transform hover:scale-105 flex items-center gap-2"
                    style={{ ...bask, backgroundColor: GREEN, color: CREAM, boxShadow: '0 6px 18px rgba(63,93,77,.35)' }}>
                    {copy('partnership.header.cta')} <span aria-hidden="true">→</span>
                </Link>
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
                            <Page scale={scale}>{s.El(copy)}</Page>
                        </article>
                    ))}
                </div>

                {/* large side arrows — the obvious desktop control */}
                <button onClick={() => go(-1)} disabled={index === 0} aria-label="Previous page"
                    className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full items-center justify-center transition-all hover:scale-110 disabled:opacity-0"
                    style={{ backgroundColor: '#FFFFFFE6', color: GREEN, boxShadow: '0 8px 24px rgba(31,36,34,.18)' }}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7"
                        strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => go(1)} disabled={index === total - 1} aria-label="Next page"
                    className="hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full items-center justify-center transition-all hover:scale-110 disabled:opacity-0"
                    style={{ backgroundColor: '#FFFFFFE6', color: GREEN, boxShadow: '0 8px 24px rgba(31,36,34,.18)' }}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7"
                        strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
                </button>
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
                    <span className="hidden md:inline">Scroll, use the arrows, or drag · click a page to read it</span><span className="md:hidden">Swipe or use the arrows · tap a page to read it</span>
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
                            <Page scale={zoomScale}>{SLIDES[zoom].El(copy)}</Page>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnershipPage;
