import { Link } from 'react-router-dom';

// Standalone Practitioner Partnership guide — deliberately NOT in the site nav.
// Johanna shares this link directly with practitioners.
//
// Rebuilt from her Canva A4 guide: same palette, typefaces, photography and
// ornaments, but laid out fluidly for the web rather than as fixed A4 pages.

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
const parisienne = { fontFamily: "'Parisienne', cursive" };

const bg = (file) => `${import.meta.env.BASE_URL}bg/partnership/${file}`;

/** The three-leaf sprig used as the divider centrepiece throughout the guide. */
const LeafSprig = ({ className = '', color = GREEN }) => (
    <svg viewBox="0 0 60 40" className={className} fill="none" aria-hidden="true">
        <path d="M56 30C44 30 30 26 16 16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M40 25c-5-1-9-4-11-8 5-1 10 2 11 8z" fill={color} />
        <path d="M28 19c-5-1-9-4-11-8 5-1 10 2 11 8z" fill={color} />
        <path d="M16 13c-4-1-7-4-8-8 4-1 8 3 8 8z" fill={color} />
    </svg>
);

const DividerTrio = ({ color = GREEN }) => (
    <div className="flex items-center justify-center gap-3 md:gap-5 w-full">
        <span className="h-px flex-1 max-w-[180px]" style={{ backgroundColor: color }} />
        <LeafSprig className="w-10 h-7 flex-shrink-0" color={color} />
        <span className="h-px flex-1 max-w-[180px]" style={{ backgroundColor: color }} />
    </div>
);

const SectionTitle = ({ children, className = '' }) => (
    <h2
        className={`uppercase leading-[1.15] text-[26px] md:text-[34px] ${className}`}
        style={{ ...lora, color: GREEN }}
    >
        {children}
    </h2>
);

const Body = ({ children, className = '' }) => (
    <p className={`text-[15px] md:text-base leading-[1.75] ${className}`} style={{ ...baskerville, color: INK }}>
        {children}
    </p>
);

/** Tan pill/rounded callout with a leaf sprig, as used on pp. 4, 5, 6. */
const Callout = ({ children, className = '' }) => (
    <div
        className={`rounded-[28px] px-6 py-6 md:px-9 md:py-7 flex items-start gap-4 ${className}`}
        style={{ backgroundColor: TAN }}
    >
        <LeafSprig className="w-9 h-6 flex-shrink-0 mt-1" />
        <div>{children}</div>
    </div>
);

const STEPS = [
    {
        title: 'You bring',
        body: 'Your expertise, favourite client exercises, practical tools, and the wisdom you find yourself sharing again and again.',
        icon: (
            <>
                <circle cx="12" cy="8.5" r="4" />
                <path d="M4.5 20.5c0-4.1 3.4-7 7.5-7s7.5 2.9 7.5 7" />
            </>
        ),
    },
    {
        title: 'Together we build',
        body: 'We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library.',
        icon: (
            <>
                <path d="M9 17h6M10 20h4" />
                <path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1h6c0-.4.1-.8.5-1.1A6 6 0 0 0 12 3z" />
            </>
        ),
    },
    {
        title: 'Members receive',
        body: 'A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it.',
        icon: (
            <>
                <path d="M3 15c2.5-1.5 5-1.5 7.5 0h6a2 2 0 0 1 0 4H9" />
                <path d="M12.5 10.5c1.6-1.7 3-2.2 3.9-1.3.9.9.5 2.3-1.2 3.9l-2.7 2.4-2.7-2.4c-1.7-1.6-2.1-3-1.2-3.9.9-.9 2.3-.4 3.9 1.3z" />
            </>
        ),
    },
    {
        title: 'You receive',
        body: 'A Community Practitioner profile introducing visitors and members to your independent practice.',
        icon: (
            <>
                <path d="M2.5 13c2.5-3.5 5.7-5.2 9.5-5.2s7 1.7 9.5 5.2c-2.5 3.5-5.7 5.2-9.5 5.2S5 16.5 2.5 13z" />
                <circle cx="12" cy="13" r="2.5" />
            </>
        ),
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
    'Professional photo',
    'Area(s) of focus',
    'Countries you work in',
    'Virtual and/or in-person availability',
    'Languages spoken',
    'Website and/or booking link',
    'Social media (optional)',
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
        n: '01',
        title: 'Tell us about you',
        body: 'Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community.',
        icon: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5.5M12 7.8v.4" />
            </>
        ),
    },
    {
        n: '02',
        title: 'Share your idea',
        body: "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library.",
        icon: (
            <>
                <path d="M9 17.5h6M10.5 20.5h3" />
                <path d="M12 3.5a6.2 6.2 0 0 0-3.6 11.2c.4.3.6.8.6 1.3h6c0-.5.2-1 .6-1.3A6.2 6.2 0 0 0 12 3.5z" />
                <path d="M12 6.5v6" />
            </>
        ),
    },
    {
        n: '03',
        title: "We'll build it together",
        body: "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached.",
        icon: (
            <>
                <path d="M3 12.5l3.5-3.5 4 3.5 3-2.5 3.5 3" />
                <path d="M2.5 10.5l4-4 5 4.5M21.5 11.5l-4.5-4-3.5 3" />
            </>
        ),
    },
];

const Glyph = ({ children, stroke }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.3"
        strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-9 md:h-9">
        {children}
    </svg>
);

const PartnershipPage = () => {
    return (
        <div className="antialiased" style={{ backgroundColor: CREAM }}>

            {/* ── 1 · Cover ─────────────────────────────────────────── */}
            <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
                <img
                    src={bg('cover-vase.jpg')}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-left"
                />
                {/* Keep the right-hand column legible on small screens */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 0%, ${CREAM}55 45%, ${CREAM}cc 70%)` }} />

                <div className="relative z-10 w-full px-6 pb-16">
                    <div className="max-w-md ml-auto mr-[6%] text-center">
                        <img
                            src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.png'}
                            alt="Uncoached"
                            className="h-20 md:h-24 w-auto mx-auto mb-8"
                        />
                        <h1
                            className="text-[30px] md:text-[40px] leading-[1.3] mb-8"
                            style={{ ...baskerville, color: GREEN }}
                        >
                            Uncoached<br />Practitioner<br />Partnership<br />Guide
                        </h1>
                        <span className="block h-px w-24 mx-auto mb-8" style={{ backgroundColor: GREEN }} />
                        <p className="text-[15px] md:text-base leading-relaxed" style={{ color: GREEN }}>
                            Helping clients between<br />the breakthroughs.
                        </p>
                        <LeafSprig className="w-14 h-9 mx-auto mt-8" />
                    </div>
                </div>

                <div className="relative z-10 w-full py-5 text-center" style={{ backgroundColor: GREEN }}>
                    <span className="text-white text-xs md:text-sm uppercase" style={{ letterSpacing: '0.25em' }}>
                        uncoached.space
                    </span>
                </div>
            </section>

            {/* ── 2 · Welcome ───────────────────────────────────────── */}
            <section className="relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_0.85fr]">
                    <div className="px-6 md:px-12 lg:pl-16 py-16 md:py-24 order-2 lg:order-1">
                        <p className="uppercase text-[22px] md:text-[26px] mb-7" style={{ ...lora, color: GREEN, letterSpacing: '0.1em' }}>
                            Welcome
                        </p>
                        <p className="text-[19px] md:text-[22px] mb-1" style={{ ...baskerville, color: INK }}>
                            Before anything else,
                        </p>
                        <p className="text-[42px] md:text-[52px] leading-none mb-8 pl-3" style={{ ...allura, color: GREEN }}>
                            thank you.
                        </p>

                        <div className="space-y-5 max-w-lg">
                            <Body>
                                One thing I've realized over the years is that insight doesn't automatically
                                become change.
                            </Body>
                            <Body>
                                Someone can leave a session feeling lighter, clearer, and committed to doing
                                things differently. But lasting change isn't built in the hour you spend
                                together. It happens afterwards, in everyday life, when they're trying to
                                remember what they learned and put it into practice.
                            </Body>
                            <Body className="font-bold">That's what inspired Uncoached.</Body>
                            <Body>
                                I wanted to create something practitioners would genuinely be excited to
                                share with their clients. A place where clients could reconnect with what
                                they've already learned and continue building on the work they've already
                                started.
                            </Body>
                            <Body className="font-bold">
                                Not to replace the work you're already doing, but to help it stick.
                            </Body>
                            <Body>That's what the Practitioner Partnership is all about.</Body>
                            <Body>
                                Together, we can take the tools and ideas that are already changing lives and
                                give them a home where they can continue helping people long after the
                                session ends.
                            </Body>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 h-56 sm:h-72 lg:h-auto lg:min-h-[620px]">
                        <img
                            src={bg('welcome-sunset.jpg')}
                            alt=""
                            className="w-full h-full object-cover lg:rounded-tl-[45%]"
                        />
                    </div>
                </div>
            </section>

            {/* ── 3 · What is the partnership ───────────────────────── */}
            <section className="relative px-6 py-16 md:py-24 overflow-hidden">
                <img
                    src={bg('fern-watermark.png')}
                    alt=""
                    className="pointer-events-none absolute -bottom-10 -right-16 w-[420px] max-w-[70%] opacity-70"
                />
                <div className="relative max-w-3xl mx-auto">
                    <SectionTitle className="mb-8">What is the Practitioner Partnership?</SectionTitle>
                    <div className="mb-10"><DividerTrio /></div>

                    <div className="space-y-5">
                        <Body className="font-bold">
                            One of the most rewarding parts of this work is watching someone take what
                            they've learned and truly make it part of their life.
                        </Body>
                        <Body>
                            Every practitioner has exercises, perspectives, and practical tools that make a
                            real difference. Together, we'll turn some of those into polished Uncoached
                            resources that people can return to whenever they need a reminder, a reset, or a
                            different perspective.
                        </Body>
                        <Body>
                            <strong>
                                These resources aren't designed to replace your work. They're designed to
                                reinforce it.
                            </strong>{' '}
                            They give your clients a trusted place to return to the tools, exercises, and
                            perspectives you've already introduced, while also discovering complementary
                            perspectives that may deepen what they're learning or help something finally
                            click.
                        </Body>
                        <Body>
                            They're also there for the moments when you need to step away, so your clients
                            still have something meaningful to lean on until you're back.
                        </Body>
                        <Body>
                            As part of the partnership, your expertise becomes a part of a growing library
                            that supports people long after the session ends.{' '}
                            <strong>
                                You'll also have a professional profile where visitors and members can
                                discover your work, learn about your approach, and connect with you
                                independently.
                            </strong>
                        </Body>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 mt-14">
                        {[
                            { label: ['You share', 'your expertise.'], icon: (<><circle cx="9" cy="9" r="3" /><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 7.2A2.8 2.8 0 0 1 16 12M18 19c0-2.2-.7-3.9-2-5" /></>) },
                            { label: ['We create a', 'resource together.'], icon: (<><path d="M5 4h9l5 5v11H5z" /><path d="M13.5 14.5l4.5-4.5 2 2-4.5 4.5-2.6.6z" /></>) },
                            { label: ['Members get', 'practical support.'], icon: (<path d="M12 20.5S3.5 15.4 3.5 9.7A4.7 4.7 0 0 1 12 6.9a4.7 4.7 0 0 1 8.5 2.8c0 5.7-8.5 10.8-8.5 10.8z" />) },
                            { label: ['Your practice', 'gets visibility.'], icon: (<><path d="M12 20v-8" /><path d="M12 12c0-3 2-5 5-5 0 3-2 5-5 5zM12 13c0-3-2-5-5-5 0 3 2 5 5 5z" /><path d="M7.5 20h9" /></>) },
                        ].map((item) => (
                            <div key={item.label[0]} className="flex flex-col items-center text-center gap-3">
                                <div
                                    className="w-[70px] h-[70px] md:w-20 md:h-20 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: TAN_LIGHT }}
                                >
                                    <Glyph stroke={INK}>{item.icon}</Glyph>
                                </div>
                                <p className="text-[13px] leading-snug" style={{ ...baskerville, color: INK }}>
                                    {item.label[0]}<br />{item.label[1]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4 · How our partnership works ─────────────────────── */}
            <section className="relative px-6 py-16 md:py-24 overflow-hidden">
                <img
                    src={bg('fern-watermark.png')}
                    alt=""
                    className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/4 w-[380px] max-w-[65%] opacity-60"
                />
                <div className="relative max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionTitle className="mb-3">How our partnership works</SectionTitle>
                        <p className="italic text-[15px] md:text-[17px]" style={{ ...lora, color: GREEN }}>
                            An exchange that creates impact.
                        </p>
                    </div>

                    <ol className="space-y-0">
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="flex gap-5 md:gap-7">
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div
                                        className="w-[62px] h-[62px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: GREEN }}
                                    >
                                        <Glyph stroke={CREAM}>{step.icon}</Glyph>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className="flex flex-col items-center py-2">
                                            <span className="w-px h-8 md:h-10" style={{ backgroundColor: INK }} />
                                            <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill={INK}><path d="M5 8L0 0h10z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="pb-8">
                                    <h3 className="uppercase text-[17px] md:text-[20px] mb-2" style={{ ...lora, color: GREEN }}>
                                        {step.title}
                                    </h3>
                                    <Body>{step.body}</Body>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <Callout className="mt-4">
                        <p className="text-[15px] md:text-base leading-relaxed" style={{ ...baskerville, color: INK }}>
                            Every collaboration looks a little different.<br className="hidden sm:block" />{' '}
                            That's the beauty of it.
                        </p>
                    </Callout>
                </div>
            </section>

            {/* ── 5 · What you could share ──────────────────────────── */}
            <section className="relative px-6 py-16 md:py-24 overflow-hidden">
                <img
                    src={bg('blossom.png')}
                    alt=""
                    className="pointer-events-none absolute top-6 -right-8 w-[190px] md:w-[260px] opacity-90 rotate-6"
                />
                <div className="relative max-w-2xl mx-auto">
                    <SectionTitle className="mb-5">What you could share</SectionTitle>

                    <div className="relative mb-9 -ml-6 pl-6 pr-4 py-2">
                        <img
                            src={bg('swash.png')}
                            alt=""
                            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                        />
                        <p className="relative text-[24px] md:text-[30px] leading-tight" style={{ ...allura, color: GREEN }}>
                            Something that's already helping the people you work with.
                        </p>
                    </div>

                    <Body className="text-center max-w-xl mx-auto mb-10">
                        Think about the practical things you already teach, practise, or send home with
                        clients. The exercises they come back to. The tools that help something click. The
                        things you wish they remembered when real life happens between sessions.
                    </Body>

                    <h3 className="text-[19px] md:text-[22px] font-bold mb-5" style={{ ...baskerville, color: INK }}>
                        It could be…
                    </h3>
                    <ul className="space-y-2.5 mb-12">
                        {COULD_SHARE.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: INK }} />
                                <span className="text-[15px] md:text-base leading-relaxed" style={{ ...baskerville, color: INK }}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Callout className="max-w-xl mx-auto">
                        <p className="font-bold mb-1.5 text-[15px] md:text-base" style={{ ...baskerville, color: INK }}>
                            You bring the expertise.
                        </p>
                        <p className="text-[15px] md:text-base leading-relaxed" style={{ ...baskerville, color: INK }}>
                            Share the idea, practice or approach with me and help me understand how you use
                            it. Together, we'll translate it into a polished Uncoached resource that's clear,
                            practical and easy to use.
                        </p>
                    </Callout>
                </div>
            </section>

            {/* ── 6 · Your practitioner profile ─────────────────────── */}
            <section className="relative px-6 py-16 md:py-24 overflow-hidden">
                <img
                    src={bg('profile-books.jpg')}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM}d9 45%, ${CREAM}a6 100%)` }} />

                <div className="relative max-w-2xl mx-auto">
                    <SectionTitle className="mb-6">Your practitioner profile</SectionTitle>
                    <Body className="mb-10 max-w-xl">
                        Your profile is featured on the public Uncoached website, making it visible to both
                        visitors and members who want to learn more about your work before reaching out.
                    </Body>

                    <div className="grid md:grid-cols-[1.35fr_1fr] gap-7 items-start mb-10">
                        <div className="rounded-2xl p-6 md:p-7" style={{ backgroundColor: TAN }}>
                            <p className="italic font-bold mb-4 text-[15px]" style={{ ...baskerville, color: INK }}>
                                Here's what people will see:
                            </p>
                            <ul className="space-y-2.5">
                                {PROFILE_SHOWS.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: INK }} />
                                        <span className="text-[15px] leading-relaxed" style={{ ...baskerville, color: INK }}>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative md:pt-4">
                            <p className="text-[22px] md:text-[26px] leading-[1.5]" style={{ ...allura, color: GREEN }}>
                                You don't need to be a copywriter.
                            </p>
                            <p className="text-[22px] md:text-[26px] leading-[1.5] mt-4" style={{ ...allura, color: GREEN }}>
                                I'll help bring your profile to life.
                            </p>
                            <LeafSprig className="w-12 h-8 mt-3 ml-auto mr-4" />
                        </div>
                    </div>

                    <div className="rounded-2xl p-6 md:p-7" style={{ backgroundColor: `${TAN}e6` }}>
                        <p className="italic font-bold mb-4 text-[15px]" style={{ ...baskerville, color: INK }}>
                            A few important things to know:
                        </p>
                        <ul className="space-y-2">
                            {GOOD_TO_KNOW.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: INK }} />
                                    <span className="text-[14px] md:text-[15px] leading-relaxed" style={{ ...baskerville, color: INK }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── 7 · Building something meaningful ─────────────────── */}
            <section className="relative px-6 py-16 md:py-24 overflow-hidden">
                <img
                    src={bg('meaningful-vase.jpg')}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-right-bottom"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${CREAM}f2 0%, ${CREAM}e0 55%, ${CREAM}80 100%)` }} />

                <div className="relative max-w-2xl mx-auto">
                    <SectionTitle>Building</SectionTitle>
                    <p className="text-[38px] md:text-[48px] leading-none pl-2 mb-7" style={{ ...allura, color: GREEN }}>
                        Something Meaningful
                    </p>
                    <div className="mb-10"><DividerTrio /></div>

                    <div className="space-y-5 max-w-lg">
                        <Body>
                            I don't want Uncoached to become another platform filled with endless content
                            that people scroll past and never use.
                        </Body>
                        <Body>
                            I want it to become a living library built by practitioners who genuinely care
                            about helping people long after the session ends.
                        </Body>
                        <Body>Every practitioner brings a different perspective.</Body>
                        <Body>
                            Every contribution gives someone another way to navigate a difficult day, see
                            themselves differently, or take one small step forward.
                        </Body>
                        <Body>We'll probably never know all the lives those resources will touch.</Body>
                        <Body>I think that's pretty special.</Body>
                        <Body>
                            If that sounds like something you'd like to be part of, I'd love to welcome you
                            to the Uncoached community.
                        </Body>
                    </div>

                    <div className="mt-12">
                        <p className="text-[21px] md:text-[25px] leading-[1.5] mb-6" style={{ ...allura, color: GREEN }}>
                            Thank you for considering it.<br />I'd love to build this with you.
                        </p>
                        <div className="flex items-end gap-3">
                            <svg viewBox="0 0 24 22" className="w-9 h-8 flex-shrink-0" fill="none"
                                stroke={ROSE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20.5S2 14.5 2 8.2A5 5 0 0 1 12 5.5a5 5 0 0 1 10 2.7c0 6.3-10 12.3-10 12.3z" />
                            </svg>
                            <div>
                                <p className="text-[34px] md:text-[40px] leading-none" style={{ ...parisienne, color: INK }}>
                                    Johanna
                                </p>
                                <p className="text-[12px] mt-1.5 pl-1" style={{ ...baskerville, color: INK }}>
                                    Founder, Uncoached
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8 · Ready to join ─────────────────────────────────── */}
            <section className="px-4 md:px-6 py-4 md:py-6" style={{ backgroundColor: GREEN }}>
                <div className="max-w-3xl mx-auto rounded-sm px-6 py-14 md:px-14 md:py-16" style={{ backgroundColor: '#E8E1D6' }}>
                    <div className="text-center mb-12">
                        <SectionTitle className="mb-5">Ready to join?</SectionTitle>
                        <DividerTrio />
                        <p className="mt-5 text-[15px] md:text-[17px]" style={{ ...baskerville, color: INK }}>
                            Here's what happens next.
                        </p>
                    </div>

                    <div className="space-y-9">
                        {JOIN_STEPS.map((step) => (
                            <div key={step.n} className="flex gap-5 md:gap-7">
                                <div
                                    className="w-[58px] h-[58px] md:w-[66px] md:h-[66px] rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: ROSE }}
                                >
                                    <Glyph stroke={CREAM}>{step.icon}</Glyph>
                                </div>
                                <div>
                                    <h3 className="uppercase text-[16px] md:text-[19px] mb-2" style={{ ...baskerville }}>
                                        <span style={{ color: GOLD }}>{step.n} ·</span>{' '}
                                        <span style={{ color: GREEN }}>{step.title}</span>
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] leading-[1.7]" style={{ ...baskerville, color: INK }}>
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-14 pb-10 px-2">
                    <p className="text-[15px] md:text-[17px] leading-relaxed max-w-xl mx-auto mb-9"
                        style={{ ...baskerville, color: CREAM }}>
                        If you care deeply about helping people create real change, let's build something
                        that helps them keep going.
                    </p>

                    <Link
                        to="/partnership/apply"
                        className="inline-block px-12 py-3.5 rounded-full text-[17px] md:text-[19px] transition-transform duration-300 hover:scale-105"
                        style={{ ...baskerville, backgroundColor: TAN, color: GREEN, letterSpacing: '0.04em' }}
                    >
                        I'M IN! <span aria-hidden="true">→</span>
                    </Link>

                    <img
                        src={import.meta.env.BASE_URL + 'logo/logouncoached.png'}
                        alt="Uncoached"
                        className="h-16 w-auto mx-auto mt-14"
                    />
                </div>
            </section>
        </div>
    );
};

export default PartnershipPage;
