import { Link } from 'react-router-dom';

// Standalone Practitioner Partnership guide — deliberately NOT in the site nav.
// Johanna shares this link directly with practitioners.

const Eyebrow = ({ children }) => (
    <p className="text-golden-deep uppercase tracking-[0.2em] text-xs md:text-sm mb-4">{children}</p>
);

const Divider = () => (
    <div className="flex items-center justify-center gap-4 my-2">
        <span className="h-px w-16 md:w-24 bg-clay" />
        <span className="material-symbols-outlined text-golden-light text-xl">spa</span>
        <span className="h-px w-16 md:w-24 bg-clay" />
    </div>
);

const STEPS = [
    {
        icon: 'person',
        title: 'You bring',
        body: 'Your expertise, favourite client exercises, practical tools, and the wisdom you find yourself sharing again and again.',
    },
    {
        icon: 'lightbulb',
        title: 'Together we build',
        body: 'We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library.',
    },
    {
        icon: 'volunteer_activism',
        title: 'Members receive',
        body: 'A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it.',
    },
    {
        icon: 'visibility',
        title: 'You receive',
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
    },
    {
        n: '02',
        title: 'Share your idea',
        body: "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library.",
    },
    {
        n: '03',
        title: "We'll build it together",
        body: "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached.",
    },
];

const PartnershipPage = () => {
    return (
        <div className="bg-bone text-text-dark font-body antialiased">

            {/* ── Cover ─────────────────────────────────────────────── */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={import.meta.env.BASE_URL + 'bg/about/S1 Hero - about.png'}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-bone/80" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <img
                        src={import.meta.env.BASE_URL + 'logo/logo-sage-on-light.png'}
                        alt="Uncoached"
                        className="h-24 md:h-28 w-auto mx-auto mb-10"
                    />
                    <h1 className="font-display text-4xl md:text-6xl text-sage leading-[1.1] mb-8">
                        Uncoached<br />Practitioner<br />Partnership Guide
                    </h1>
                    <span className="block h-px w-24 bg-sage/40 mx-auto mb-8" />
                    <p className="text-text-muted text-lg md:text-xl">
                        Helping clients between the breakthroughs.
                    </p>
                </div>

                <p className="absolute bottom-6 left-0 right-0 text-center text-xs tracking-[0.25em] text-text-tertiary uppercase z-10">
                    uncoached.space
                </p>
            </section>

            {/* ── Welcome ───────────────────────────────────────────── */}
            <section className="px-6 py-20 md:py-28">
                <div className="max-w-2xl mx-auto">
                    <Eyebrow>Welcome</Eyebrow>
                    <h2 className="font-display text-3xl md:text-4xl text-text-dark mb-8">
                        Before anything else, <span className="italic text-sage">thank you.</span>
                    </h2>

                    <div className="space-y-5 text-text-muted leading-relaxed">
                        <p>
                            One thing I've realized over the years is that insight doesn't automatically
                            become change.
                        </p>
                        <p>
                            Someone can leave a session feeling lighter, clearer, and committed to doing
                            things differently. But lasting change isn't built in the hour you spend
                            together. It happens afterwards, in everyday life, when they're trying to
                            remember what they learned and put it into practice.
                        </p>
                        <p className="font-semibold text-text-dark">That's what inspired Uncoached.</p>
                        <p>
                            I wanted to create something practitioners would genuinely be excited to share
                            with their clients. A place where clients could reconnect with what they've
                            already learned and continue building on the work they've already started.
                        </p>
                        <p className="font-semibold text-text-dark">
                            Not to replace the work you're already doing, but to help it stick.
                        </p>
                        <p>That's what the Practitioner Partnership is all about.</p>
                        <p>
                            Together, we can take the tools and ideas that are already changing lives and
                            give them a home where they can continue helping people long after the session
                            ends.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── What is the partnership ───────────────────────────── */}
            <section className="px-6 py-20 md:py-28 bg-white/60">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-sage mb-6">
                            What is the Practitioner Partnership?
                        </h2>
                        <Divider />
                    </div>

                    <div className="space-y-5 text-text-muted leading-relaxed">
                        <p className="font-semibold text-text-dark">
                            One of the most rewarding parts of this work is watching someone take what
                            they've learned and truly make it part of their life.
                        </p>
                        <p>
                            Every practitioner has exercises, perspectives, and practical tools that make a
                            real difference. Together, we'll turn some of those into polished Uncoached
                            resources that people can return to whenever they need a reminder, a reset, or
                            a different perspective.
                        </p>
                        <p>
                            <span className="font-semibold text-text-dark">
                                These resources aren't designed to replace your work. They're designed to
                                reinforce it.
                            </span>{' '}
                            They give your clients a trusted place to return to the tools, exercises, and
                            perspectives you've already introduced, while also discovering complementary
                            perspectives that may deepen what they're learning or help something finally
                            click.
                        </p>
                        <p>
                            They're also there for the moments when you need to step away, so your clients
                            still have something meaningful to lean on until you're back.
                        </p>
                        <p>
                            As part of the partnership, your expertise becomes a part of a growing library
                            that supports people long after the session ends.{' '}
                            <span className="font-semibold text-text-dark">
                                You'll also have a professional profile where visitors and members can
                                discover your work, learn about your approach, and connect with you
                                independently.
                            </span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
                        {[
                            { icon: 'groups', label: 'You share your expertise.' },
                            { icon: 'edit_note', label: 'We create a resource together.' },
                            { icon: 'favorite', label: 'Members get practical support.' },
                            { icon: 'potted_plant', label: 'Your practice gets visibility.' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-clay/40 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-text-dark text-3xl">
                                        {item.icon}
                                    </span>
                                </div>
                                <p className="text-sm text-text-muted leading-snug">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How the partnership works ─────────────────────────── */}
            <section className="px-6 py-20 md:py-28">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-display text-3xl md:text-4xl text-sage mb-2">
                            How our partnership works
                        </h2>
                        <p className="text-text-muted italic">An exchange that creates impact.</p>
                    </div>

                    <ol className="space-y-8">
                        {STEPS.map((step, i) => (
                            <li key={step.title} className="flex gap-5">
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center">
                                        <span className="material-symbols-outlined text-bone text-2xl">
                                            {step.icon}
                                        </span>
                                    </div>
                                    {i < STEPS.length - 1 && <span className="w-px flex-1 bg-clay mt-2" />}
                                </div>
                                <div className="pb-2">
                                    <h3 className="font-display text-xl md:text-2xl text-sage mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-text-muted leading-relaxed">{step.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-10 bg-clay/40 rounded-3xl px-7 py-5 flex items-start gap-3">
                        <span className="material-symbols-outlined text-sage">eco</span>
                        <p className="text-text-dark">
                            Every collaboration looks a little different. That's the beauty of it.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── What you could share ──────────────────────────────── */}
            <section className="px-6 py-20 md:py-28 bg-white/60">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl text-sage mb-4">
                        What you could share
                    </h2>
                    <p className="font-display italic text-xl text-text-dark mb-8">
                        Something that's already helping the people you work with.
                    </p>

                    <p className="text-text-muted leading-relaxed mb-8">
                        Think about the practical things you already teach, practise, or send home with
                        clients. The exercises they come back to. The tools that help something click. The
                        things you wish they remembered when real life happens between sessions.
                    </p>

                    <h3 className="font-display text-2xl text-text-dark mb-5">It could be…</h3>
                    <ul className="space-y-3 mb-10">
                        {COULD_SHARE.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-text-muted">
                                <span className="w-1.5 h-1.5 rounded-full bg-golden-light mt-2.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="bg-clay/40 rounded-3xl px-7 py-6 flex items-start gap-4">
                        <span className="material-symbols-outlined text-sage mt-0.5">eco</span>
                        <div>
                            <p className="font-semibold text-text-dark mb-1">You bring the expertise.</p>
                            <p className="text-text-dark/80 leading-relaxed">
                                Share the idea, practice or approach with me and help me understand how you
                                use it. Together, we'll translate it into a polished Uncoached resource
                                that's clear, practical and easy to use.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Your practitioner profile ─────────────────────────── */}
            <section className="px-6 py-20 md:py-28">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-display text-3xl md:text-4xl text-sage mb-6">
                        Your practitioner profile
                    </h2>
                    <p className="text-text-muted leading-relaxed mb-10">
                        Your profile is featured on the public Uncoached website, making it visible to both
                        visitors and members who want to learn more about your work before reaching out.
                    </p>

                    <div className="grid md:grid-cols-5 gap-6 items-start mb-10">
                        <div className="md:col-span-3 bg-clay/40 rounded-3xl p-7">
                            <p className="font-display italic text-lg text-text-dark mb-4">
                                Here's what people will see:
                            </p>
                            <ul className="space-y-2.5">
                                {PROFILE_SHOWS.map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-text-dark/85">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="md:col-span-2 font-display italic text-lg text-sage/80 leading-relaxed md:pt-6">
                            You don't need to be a copywriter. I'll help bring your profile to life.
                        </p>
                    </div>

                    <div className="border border-golden-light/40 rounded-3xl p-7">
                        <p className="font-display italic text-lg text-text-dark mb-4">
                            A few important things to know:
                        </p>
                        <ul className="space-y-2.5">
                            {GOOD_TO_KNOW.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-text-muted">
                                    <span className="w-1.5 h-1.5 rounded-full bg-golden-light mt-2.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Building something meaningful ─────────────────────── */}
            <section className="px-6 py-20 md:py-28 bg-white/60">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-sage">Building</h2>
                        <p className="font-display italic text-3xl md:text-4xl text-sage/90">
                            Something Meaningful
                        </p>
                        <div className="mt-6">
                            <Divider />
                        </div>
                    </div>

                    <div className="space-y-5 text-text-muted leading-relaxed">
                        <p>
                            I don't want Uncoached to become another platform filled with endless content
                            that people scroll past and never use.
                        </p>
                        <p>
                            I want it to become a living library built by practitioners who genuinely care
                            about helping people long after the session ends.
                        </p>
                        <p>Every practitioner brings a different perspective.</p>
                        <p>
                            Every contribution gives someone another way to navigate a difficult day, see
                            themselves differently, or take one small step forward.
                        </p>
                        <p>We'll probably never know all the lives those resources will touch.</p>
                        <p>I think that's pretty special.</p>
                        <p>
                            If that sounds like something you'd like to be part of, I'd love to welcome you
                            to the Uncoached community.
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-clay">
                        <p className="font-display italic text-lg text-sage/90 leading-relaxed mb-4">
                            Thank you for considering it.<br />I'd love to build this with you.
                        </p>
                        <p className="font-display text-3xl text-text-dark">Johanna</p>
                        <p className="text-text-tertiary text-sm">Founder, Uncoached</p>
                    </div>
                </div>
            </section>

            {/* ── Ready to join ─────────────────────────────────────── */}
            <section className="px-6 pt-20 md:pt-28">
                <div className="max-w-2xl mx-auto bg-clay/40 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-10">
                        <h2 className="font-display text-3xl md:text-4xl text-sage mb-4">Ready to join?</h2>
                        <Divider />
                        <p className="text-text-dark mt-4">Here's what happens next.</p>
                    </div>

                    <div className="space-y-8">
                        {JOIN_STEPS.map((step) => (
                            <div key={step.n} className="flex gap-5">
                                <div className="w-14 h-14 rounded-full bg-white/70 border border-white flex items-center justify-center flex-shrink-0">
                                    <span className="font-display text-lg text-golden-deep">{step.n}</span>
                                </div>
                                <div>
                                    <h3 className="font-display text-xl text-sage mb-2">
                                        <span className="text-golden-deep">{step.n}</span> · {step.title}
                                    </h3>
                                    <p className="text-text-dark/80 leading-relaxed">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── I'm in ────────────────────────────────────────────── */}
            <section className="bg-sage px-6 py-16 md:py-20 mt-16 text-center">
                <p className="text-bone/90 text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
                    If you care deeply about helping people create real change, let's build something that
                    helps them keep going.
                </p>

                <Link
                    to="/partnership/apply"
                    className="inline-flex items-center gap-2 px-10 py-4 rounded-full border-2 border-golden-light text-bone font-display text-xl hover:bg-golden-light hover:text-charcoal transition-colors duration-300"
                >
                    I'M IN! <span aria-hidden="true">→</span>
                </Link>

                <img
                    src={import.meta.env.BASE_URL + 'logo/logouncoached.png'}
                    alt="Uncoached"
                    className="h-16 w-auto mx-auto mt-12 opacity-90"
                />
            </section>
        </div>
    );
};

export default PartnershipPage;
