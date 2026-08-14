import { Link } from 'react-router-dom';

// Standalone Practitioner Partnership guide — deliberately NOT in the site nav.
// Johanna shares this link directly with practitioners.
//
// Built from her Canva guide using her own exported photography, icons,
// signature and leaf sprig, laid out fluidly for the web.

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

const bg = (file) => `${import.meta.env.BASE_URL}bg/partnership/${file}`;

const Sprig = ({ className = '' }) => (
    <img src={bg('leaf-sprig.png')} alt="" className={`select-none ${className}`} />
);

const DividerTrio = () => (
    <div className="flex items-center justify-center gap-4 w-full">
        <span className="h-px flex-1 max-w-[190px]" style={{ backgroundColor: GREEN }} />
        <Sprig className="w-9 h-auto flex-shrink-0" />
        <span className="h-px flex-1 max-w-[190px]" style={{ backgroundColor: GREEN }} />
    </div>
);

const SectionTitle = ({ children, className = '' }) => (
    <h2 className={`uppercase leading-[1.15] text-[25px] md:text-[32px] ${className}`}
        style={{ ...lora, color: GREEN }}>
        {children}
    </h2>
);

const Body = ({ children, className = '' }) => (
    <p className={`text-[15px] leading-[1.75] ${className}`} style={{ ...baskerville, color: INK }}>
        {children}
    </p>
);

const Callout = ({ children, className = '' }) => (
    <div className={`rounded-[26px] px-6 py-6 md:px-8 flex items-start gap-4 ${className}`}
        style={{ backgroundColor: TAN }}>
        <Sprig className="w-8 h-auto flex-shrink-0 mt-1" />
        <div>{children}</div>
    </div>
);

/** Faint fern watermark. multiply blend removes its white background. */
const Fern = ({ className }) => (
    <img src={bg('fern-watermark.png')} alt=""
        className={`pointer-events-none absolute select-none ${className}`}
        style={{ mixBlendMode: 'multiply', opacity: 0.55 }} />
);

const PILLARS = [
    { icon: 'ico-share.png', label: ['You share', 'your expertise.'] },
    { icon: 'ico-create.png', label: ['We create a', 'resource together.'] },
    { icon: 'ico-heart.png', label: ['Members get', 'practical support.'] },
    { icon: 'ico-sprout.png', label: ['Your practice', 'gets visibility.'] },
];

const STEPS = [
    {
        icon: 'ico-person.png', title: 'You bring',
        body: 'Your expertise, favourite client exercises, practical tools, and the wisdom you find yourself sharing again and again.',
    },
    {
        icon: 'ico-bulb.png', title: 'Together we build',
        body: 'We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library.',
    },
    {
        icon: 'ico-hand.png', title: 'Members receive',
        body: 'A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it.',
    },
    {
        icon: 'ico-eye.png', title: 'You receive',
        body: 'A Community Practitioner profile introducing visitors and members to your independent practice.',
    },
];

const COULD_SHARE = [
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
];

const PROFILE_SHOWS = [
    'Professional photo', 'Area(s) of focus', 'Countries you work in',
    'Virtual and/or in-person availability', 'Languages spoken',
    'Website and/or booking link', 'Social media (optional)',
];

const GOOD_TO_KNOW = [
    'Your practice remains completely independent.',
    'You manage your own clients, fees, and scheduling.',
    'No referral commissions.',
    "We'll professionally polish and brand every resource together.",
    'Your contribution becomes part of the Uncoached Library.',
    'We periodically review profiles to keep information current.',
];

const JOIN_STEPS = [
    {
        n: '01', title: 'Tell us about you',
        body: 'Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community.',
        d: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 11v5.6M12 7.6v.5',
    },
    {
        n: '02', title: 'Share your idea',
        body: "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library.",
        d: 'M9 17.6h6M10.5 20.4h3M12 3.6a6.2 6.2 0 0 0-3.6 11.2c.4.3.6.8.6 1.3h6c0-.5.2-1 .6-1.3A6.2 6.2 0 0 0 12 3.6zM12 6.6v6',
    },
    {
        n: '03', title: "We'll build it together",
        body: "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached.",
        d: 'M2.5 11l4-4 5 4.5M21.5 12l-4.5-4-3.5 3M3 13l3.5-3.5 4 3.5 3-2.5 3.5 3',
    },
];

const Bullet = () => (
    <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: INK }} />
);

const PartnershipPage = () => {
    return (
        <div className="antialiased" style={{ backgroundColor: CREAM }}>

            {/* ── 1 · Cover ─────────────────────────────────────────── */}
            <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden">
                <img src={bg('cover-vase.jpg')} alt=""
                    className="absolute inset-0 w-full h-full object-cover object-left" />
                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(90deg, transparent 30%, ${CREAM}40 52%, ${CREAM}b8 68%)` }} />

                <div className="relative z-10 w-full px-6 pb-12">
                    <div className="max-w-sm ml-auto lg:mr-[8%] text-center">
                        <img src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.png'}
                            alt="Uncoached" className="h-[72px] md:h-20 w-auto mx-auto mb-7" />
                        <h1 className="text-[29px] md:text-[36px] leading-[1.32] mb-7"
                            style={{ ...baskerville, color: GREEN }}>
                            Uncoached<br />Practitioner<br />Partnership<br />Guide
                        </h1>
                        <span className="block h-px w-20 mx-auto mb-7" style={{ backgroundColor: GREEN }} />
                        <p className="text-[15px] leading-relaxed" style={{ color: GREEN }}>
                            Helping clients between<br />the breakthroughs.
                        </p>
                        <Sprig className="w-11 h-auto mx-auto mt-7" />
                    </div>
                </div>

                <div className="relative z-10 w-full py-4 text-center" style={{ backgroundColor: GREEN }}>
                    <span className="text-white text-[11px] md:text-xs uppercase" style={{ letterSpacing: '0.26em' }}>
                        uncoached.space
                    </span>
                </div>
            </section>

            {/* ── 2 · Welcome ───────────────────────────────────────── */}
            <section>
                <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.8fr]">
                    <div className="px-6 md:px-10 lg:pl-14 py-14 md:py-16 order-2 lg:order-1">
                        <p className="uppercase text-[21px] md:text-[24px] mb-6"
                            style={{ ...lora, color: GREEN, letterSpacing: '0.1em' }}>Welcome</p>
                        <p className="text-[18px] md:text-[20px]" style={{ ...baskerville, color: INK }}>
                            Before anything else,
                        </p>
                        <p className="text-[40px] md:text-[46px] leading-none mb-7 pl-2"
                            style={{ ...allura, color: GREEN }}>thank you.</p>

                        <div className="space-y-4 max-w-md">
                            <Body>One thing I've realized over the years is that insight doesn't automatically become change.</Body>
                            <Body>Someone can leave a session feeling lighter, clearer, and committed to doing things differently. But lasting change isn't built in the hour you spend together. It happens afterwards, in everyday life, when they're trying to remember what they learned and put it into practice.</Body>
                            <Body className="font-bold">That's what inspired Uncoached.</Body>
                            <Body>I wanted to create something practitioners would genuinely be excited to share with their clients. A place where clients could reconnect with what they've already learned and continue building on the work they've already started.</Body>
                            <Body className="font-bold">Not to replace the work you're already doing, but to help it stick.</Body>
                            <Body>That's what the Practitioner Partnership is all about.</Body>
                            <Body>Together, we can take the tools and ideas that are already changing lives and give them a home where they can continue helping people long after the session ends.</Body>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 h-52 sm:h-64 lg:h-auto">
                        <img src={bg('welcome-sunset.jpg')} alt=""
                            className="w-full h-full object-cover lg:rounded-tl-[42%]" />
                    </div>
                </div>
            </section>

            {/* ── 3 · What is the partnership ───────────────────────── */}
            <section className="relative px-6 py-14 md:py-16 overflow-hidden">
                <Fern className="-bottom-16 -right-24 w-[380px] max-w-[65%]" />
                <div className="relative max-w-2xl mx-auto">
                    <SectionTitle className="mb-6">What is the Practitioner Partnership?</SectionTitle>
                    <div className="mb-8"><DividerTrio /></div>

                    <div className="space-y-4">
                        <Body className="font-bold">One of the most rewarding parts of this work is watching someone take what they've learned and truly make it part of their life.</Body>
                        <Body>Every practitioner has exercises, perspectives, and practical tools that make a real difference. Together, we'll turn some of those into polished Uncoached resources that people can return to whenever they need a reminder, a reset, or a different perspective.</Body>
                        <Body><strong>These resources aren't designed to replace your work. They're designed to reinforce it.</strong> They give your clients a trusted place to return to the tools, exercises, and perspectives you've already introduced, while also discovering complementary perspectives that may deepen what they're learning or help something finally click.</Body>
                        <Body>They're also there for the moments when you need to step away, so your clients still have something meaningful to lean on until you're back.</Body>
                        <Body>As part of the partnership, your expertise becomes a part of a growing library that supports people long after the session ends. <strong>You'll also have a professional profile where visitors and members can discover your work, learn about your approach, and connect with you independently.</strong></Body>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 mt-12">
                        {PILLARS.map((p) => (
                            <div key={p.label[0]} className="flex flex-col items-center text-center gap-3">
                                <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: TAN_LIGHT }}>
                                    <img src={bg(p.icon)} alt="" className="w-[38px] h-auto" />
                                </div>
                                <p className="text-[12.5px] leading-snug" style={{ ...baskerville, color: INK }}>
                                    {p.label[0]}<br />{p.label[1]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4 · How our partnership works ─────────────────────── */}
            <section className="relative px-6 py-14 md:py-16 overflow-hidden">
                <Fern className="bottom-0 right-0 w-[320px] max-w-[55%]" />
                <div className="relative max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        <SectionTitle className="mb-2">How our partnership works</SectionTitle>
                        <p className="italic text-[15px]" style={{ ...lora, color: GREEN }}>
                            An exchange that creates impact.
                        </p>
                    </div>

                    <ol>
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="flex gap-5">
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-[62px] h-[62px] rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: GREEN }}>
                                        <img src={bg(step.icon)} alt="" className="w-[34px] h-auto" />
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className="flex flex-col items-center py-1.5">
                                            <span className="w-px h-7" style={{ backgroundColor: INK }} />
                                            <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill={INK}><path d="M5 8L0 0h10z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="pb-6">
                                    <h3 className="uppercase text-[17px] mb-1.5" style={{ ...lora, color: GREEN }}>
                                        {step.title}
                                    </h3>
                                    <Body>{step.body}</Body>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <Callout className="mt-2">
                        <p className="text-[15px] leading-relaxed" style={{ ...baskerville, color: INK }}>
                            Every collaboration looks a little different. That's the beauty of it.
                        </p>
                    </Callout>
                </div>
            </section>

            {/* ── 5 · What you could share ──────────────────────────── */}
            <section className="relative px-6 py-14 md:py-16 overflow-hidden">
                <img src={bg('blossom.png')} alt=""
                    className="pointer-events-none absolute top-4 -right-10 w-[170px] md:w-[230px] select-none" />
                <div className="relative max-w-xl mx-auto">
                    <SectionTitle className="mb-4">What you could share</SectionTitle>

                    {/* Soft sage band standing in for the printed dry-brush swash */}
                    <div className="relative mb-8 py-2">
                        <span className="absolute inset-y-0 -left-5 right-4 rounded-full"
                            style={{ backgroundColor: '#A8AC97', opacity: 0.35 }} />
                        <p className="relative text-[23px] md:text-[27px] leading-tight pl-1"
                            style={{ ...allura, color: GREEN }}>
                            Something that's already helping the people you work with.
                        </p>
                    </div>

                    <Body className="text-center max-w-lg mx-auto mb-9">
                        Think about the practical things you already teach, practise, or send home with
                        clients. The exercises they come back to. The tools that help something click. The
                        things you wish they remembered when real life happens between sessions.
                    </Body>

                    <h3 className="text-[19px] font-bold mb-4" style={{ ...baskerville, color: INK }}>
                        It could be…
                    </h3>
                    <ul className="space-y-2 mb-10">
                        {COULD_SHARE.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <Bullet />
                                <span className="text-[15px] leading-relaxed" style={{ ...baskerville, color: INK }}>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <Callout>
                        <p className="font-bold mb-1 text-[15px]" style={{ ...baskerville, color: INK }}>
                            You bring the expertise.
                        </p>
                        <p className="text-[15px] leading-relaxed" style={{ ...baskerville, color: INK }}>
                            Share the idea, practice or approach with me and help me understand how you use
                            it. Together, we'll translate it into a polished Uncoached resource that's clear,
                            practical and easy to use.
                        </p>
                    </Callout>
                </div>
            </section>

            {/* ── 6 · Your practitioner profile ─────────────────────── */}
            <section className="relative px-6 py-14 md:py-16 overflow-hidden">
                <img src={bg('profile-books.jpg')} alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom" />
                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM}e0 50%, ${CREAM}99 100%)` }} />

                <div className="relative max-w-xl mx-auto">
                    <SectionTitle className="mb-5">Your practitioner profile</SectionTitle>
                    <Body className="mb-8">
                        Your profile is featured on the public Uncoached website, making it visible to both
                        visitors and members who want to learn more about your work before reaching out.
                    </Body>

                    <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 items-start mb-8">
                        <div className="rounded-2xl p-6" style={{ backgroundColor: TAN }}>
                            <p className="italic font-bold mb-3 text-[14.5px]" style={{ ...baskerville, color: INK }}>
                                Here's what people will see:
                            </p>
                            <ul className="space-y-2">
                                {PROFILE_SHOWS.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <Bullet />
                                        <span className="text-[14.5px] leading-relaxed" style={{ ...baskerville, color: INK }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:pt-3">
                            <p className="text-[21px] leading-[1.45]" style={{ ...allura, color: GREEN }}>
                                You don't need to be a copywriter.
                            </p>
                            <p className="text-[21px] leading-[1.45] mt-3" style={{ ...allura, color: GREEN }}>
                                I'll help bring your profile to life.
                            </p>
                            <Sprig className="w-11 h-auto mt-2 ml-auto mr-6" />
                        </div>
                    </div>

                    <div className="rounded-2xl p-6" style={{ backgroundColor: `${TAN}e6` }}>
                        <p className="italic font-bold mb-3 text-[14.5px]" style={{ ...baskerville, color: INK }}>
                            A few important things to know:
                        </p>
                        <ul className="space-y-1.5">
                            {GOOD_TO_KNOW.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <Bullet />
                                    <span className="text-[14px] leading-relaxed" style={{ ...baskerville, color: INK }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── 7 · Building something meaningful ─────────────────── */}
            <section className="relative px-6 py-14 md:py-16 overflow-hidden">
                <img src={bg('meaningful-vase.jpg')} alt=""
                    className="absolute inset-0 w-full h-full object-cover object-right-bottom" />
                <div className="absolute inset-0"
                    style={{ background: `linear-gradient(90deg, ${CREAM}f5 0%, ${CREAM}e6 50%, ${CREAM}73 100%)` }} />

                <div className="relative max-w-xl mx-auto">
                    <SectionTitle>Building</SectionTitle>
                    <p className="text-[36px] md:text-[42px] leading-none pl-1 mb-6"
                        style={{ ...allura, color: GREEN }}>Something Meaningful</p>
                    <div className="mb-8"><DividerTrio /></div>

                    <div className="space-y-4 max-w-md">
                        <Body>I don't want Uncoached to become another platform filled with endless content that people scroll past and never use.</Body>
                        <Body>I want it to become a living library built by practitioners who genuinely care about helping people long after the session ends.</Body>
                        <Body>Every practitioner brings a different perspective.</Body>
                        <Body>Every contribution gives someone another way to navigate a difficult day, see themselves differently, or take one small step forward.</Body>
                        <Body>We'll probably never know all the lives those resources will touch.</Body>
                        <Body>I think that's pretty special.</Body>
                        <Body>If that sounds like something you'd like to be part of, I'd love to welcome you to the Uncoached community.</Body>
                    </div>

                    <div className="mt-10">
                        <p className="text-[20px] leading-[1.5] mb-4" style={{ ...allura, color: GREEN }}>
                            Thank you for considering it.<br />I'd love to build this with you.
                        </p>
                        <img src={bg('signature.png')} alt="Johanna" className="h-[62px] w-auto" />
                        <p className="text-[11.5px] mt-1 pl-12" style={{ ...baskerville, color: INK }}>
                            Founder, Uncoached
                        </p>
                    </div>
                </div>
            </section>

            {/* ── 8 · Ready to join ─────────────────────────────────── */}
            <section className="px-4 md:px-6 py-4" style={{ backgroundColor: GREEN }}>
                <div className="max-w-2xl mx-auto px-6 py-12 md:px-12" style={{ backgroundColor: '#E8E1D6' }}>
                    <div className="text-center mb-10">
                        <SectionTitle className="mb-4">Ready to join?</SectionTitle>
                        <DividerTrio />
                        <p className="mt-4 text-[15px]" style={{ ...baskerville, color: INK }}>
                            Here's what happens next.
                        </p>
                    </div>

                    <div className="space-y-7">
                        {JOIN_STEPS.map((step) => (
                            <div key={step.n} className="flex gap-5">
                                <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: ROSE }}>
                                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={CREAM}
                                        strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={step.d} />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="uppercase text-[16px] md:text-[17px] mb-1.5" style={baskerville}>
                                        <span style={{ color: GOLD }}>{step.n} ·</span>{' '}
                                        <span style={{ color: GREEN }}>{step.title}</span>
                                    </h3>
                                    <p className="text-[14px] leading-[1.7]" style={{ ...baskerville, color: INK }}>
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-12 pb-8 px-2">
                    <p className="text-[15px] md:text-[16px] leading-relaxed max-w-lg mx-auto mb-8"
                        style={{ ...baskerville, color: CREAM }}>
                        If you care deeply about helping people create real change, let's build something
                        that helps them keep going.
                    </p>

                    <Link to="/partnership/apply"
                        className="inline-block px-11 py-3 rounded-full text-[17px] transition-transform duration-300 hover:scale-105"
                        style={{ ...baskerville, backgroundColor: TAN, color: GREEN, letterSpacing: '0.04em' }}>
                        I'M IN! <span aria-hidden="true">→</span>
                    </Link>

                    <img src={import.meta.env.BASE_URL + 'logo/logouncoached.png'}
                        alt="Uncoached" className="h-14 w-auto mx-auto mt-12" />
                </div>
            </section>
        </div>
    );
};

export default PartnershipPage;
