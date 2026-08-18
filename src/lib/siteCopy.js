// Every piece of editable site copy, in one place.
//
// `text` is the original wording and acts as the fallback: if the database has
// no override (or Johanna clears a field) the site keeps showing this. That
// means adding a field here is safe — nothing breaks before it's ever edited.
//
// To make a new bit of copy editable: add an entry here, then use
// copy('its.key') in the component.

export const SITE_COPY_FIELDS = [
    // ── Home · Hero ──────────────────────────────────────────────────────
    { key: 'home.hero.title', group: 'Home — Hero', label: 'Headline', text: 'Where insight finally becomes' },
    { key: 'home.hero.title_emphasis', group: 'Home — Hero', label: 'Headline (italic ending)', text: 'lived.' },
    { key: 'home.hero.subtitle', group: 'Home — Hero', label: 'Subheadline', multiline: true, text: 'A quiet, intelligent space for integrating what you already know into real life, real moments, and real change.' },
    { key: 'home.hero.cta_primary', group: 'Home — Hero', label: 'Main button', text: 'Start Your Journey' },
    { key: 'home.hero.cta_secondary', group: 'Home — Hero', label: 'Second button', text: "What's Inside" },
    { key: 'home.hero.note', group: 'Home — Hero', label: 'Small note under buttons', text: 'App coming soon.' },

    // ── Home · How We Help You Integrate ────────────────────────────────
    { key: 'home.integrate.title', group: 'Home — How We Help You Integrate', label: 'Section heading', text: 'How We Help You Integrate' },
    { key: 'home.integrate.intro', group: 'Home — How We Help You Integrate', label: 'Intro paragraph', multiline: true, text: 'Uncoached helps insight from therapy, coaching, and inner work settle into real choices and real life, right when you need it, so you can move on with your day.' },
    { key: 'home.integrate.card1_title', group: 'Home — How We Help You Integrate', label: 'Card 1 title', text: 'Find Clarity' },
    { key: 'home.integrate.card1_body', group: 'Home — How We Help You Integrate', label: 'Card 1 text', multiline: true, text: "Get oriented with what's actually going on, without overthinking." },
    { key: 'home.integrate.card2_title', group: 'Home — How We Help You Integrate', label: 'Card 2 title', text: 'Regulate Gently' },
    { key: 'home.integrate.card2_body', group: 'Home — How We Help You Integrate', label: 'Card 2 text', multiline: true, text: 'Settle your body so your next step feels possible.' },
    { key: 'home.integrate.card3_title', group: 'Home — How We Help You Integrate', label: 'Card 3 title', text: 'Turn Insight Into Action' },
    { key: 'home.integrate.card3_body', group: 'Home — How We Help You Integrate', label: 'Card 3 text', multiline: true, text: 'Apply awareness to real decisions as they happen.' },
    { key: 'home.integrate.footnote', group: 'Home — How We Help You Integrate', label: 'Footnote', text: 'Designed to complement therapy and coaching, not replace it.' },

    // ── Home · Deeper Work ──────────────────────────────────────────────
    { key: 'home.deeper.title', group: 'Home — Deeper Work', label: 'Section heading', multiline: true, text: 'Deeper work, on your own timing' },
    { key: 'home.deeper.subtitle', group: 'Home — Deeper Work', label: 'Subheading', text: 'Because insight matters most when it becomes part of how you live.' },
    { key: 'home.deeper.body1', group: 'Home — Deeper Work', label: 'Paragraph 1', multiline: true, text: 'Uncoached offers a quiet, supportive space for integrating therapy, coaching, and personal work into specific moments in everyday life.' },
    { key: 'home.deeper.body2', group: 'Home — Deeper Work', label: 'Paragraph 2', multiline: true, text: 'No rushing. No fixing. Just tools that help awareness take root gently, privately, and at your own pace.' },
    { key: 'home.deeper.bullet1', group: 'Home — Deeper Work', label: 'Bullet 1', text: 'Building emotional resilience for real life.' },
    { key: 'home.deeper.bullet2', group: 'Home — Deeper Work', label: 'Bullet 2', text: 'Grounded tools for everyday regulation and clarity.' },
    { key: 'home.deeper.bullet3', group: 'Home — Deeper Work', label: 'Bullet 3', text: 'A judgment-free space for honest self-connection.' },
    { key: 'home.deeper.cta', group: 'Home — Deeper Work', label: 'Button', text: 'Our Approach' },

    // ── Home · What You'll Find Inside ──────────────────────────────────
    { key: 'home.services.title', group: "Home — What You'll Find Inside", label: 'Section heading', text: "What You'll Find Inside" },
    { key: 'home.services.subtitle', group: "Home — What You'll Find Inside", label: 'Subheading', text: 'Tools for moving through your days more mindfully.' },
    { key: 'home.services.intro', group: "Home — What You'll Find Inside", label: 'Intro paragraph', multiline: true, text: 'Uncoached offers a growing collection of tools designed to support you across many moments, moods, and seasons. You can reach for what you need, when you need it.' },
    { key: 'home.services.cta', group: "Home — What You'll Find Inside", label: 'Button', text: 'Unlock Everything' },
    { key: 'home.services.footnote', group: "Home — What You'll Find Inside", label: 'Footnote', text: 'Designed to complement therapy and coaching between the sessions, not replace it.' },

    // ── Home · Meet Field ───────────────────────────────────────────────
    { key: 'home.field.title', group: 'Home — Meet Field', label: 'Section heading', text: 'Meet Field' },
    { key: 'home.field.subtitle', group: 'Home — Meet Field', label: 'Subheading', text: 'A different way to be with yourself.' },
    { key: 'home.field.body1', group: 'Home — Meet Field', label: 'Paragraph 1', multiline: true, text: 'Field is not here to coach, advise, or analyze you.' },
    { key: 'home.field.body2', group: 'Home — Meet Field', label: 'Paragraph 2', multiline: true, text: 'It listens, reflects, and stays with what you bring, helping you slow down and hear yourself more clearly in moments that matter.' },
    { key: 'home.field.body3', group: 'Home — Meet Field', label: 'Paragraph 3', multiline: true, text: 'You can talk things through, explore gentle prompts, try short grounding rituals, or simply pause and be with what is present.' },
    { key: 'home.field.body4', group: 'Home — Meet Field', label: 'Paragraph 4', multiline: true, text: 'You decide how deep to go, when to pause, and what comes next. Field follows your lead.' },
    { key: 'home.field.cta', group: 'Home — Meet Field', label: 'Button', text: 'Enter Uncoached' },
    { key: 'home.field.disclaimer', group: 'Home — Meet Field', label: 'Disclaimer', multiline: true, text: 'Field is an AI-powered companion designed to support self-led reflection, not replace human care.' },

    // ── Home · Gift ─────────────────────────────────────────────────────
    { key: 'home.gift.title', group: 'Home — Give the Gift of Calm', label: 'Section heading', text: 'Give the Gift of Calm' },
    { key: 'home.gift.subtitle', group: 'Home — Give the Gift of Calm', label: 'Subheading', text: 'Send a thoughtful gift card and support someone in their journey.' },
    { key: 'home.gift.body', group: 'Home — Give the Gift of Calm', label: 'Paragraph', multiline: true, text: 'Choose a stress-free, meaningful gift for the ones in your life who crave more self-connection.' },
    { key: 'home.gift.cta', group: 'Home — Give the Gift of Calm', label: 'Button', text: 'Send a Gift Card Now' },

    // ── Home · Newsletter ───────────────────────────────────────────────
    { key: 'home.subscribe.title', group: 'Home — Newsletter', label: 'Heading', text: 'Not another newsletter.' },
    { key: 'home.subscribe.body', group: 'Home — Newsletter', label: 'Paragraph', multiline: true, text: "Sign up to receive thoughtful reflections that support real integration. From gentle affirmations and grounding voice notes to early access to new behind-the-scenes tools and Field's powerful features." },
    { key: 'home.subscribe.cta', group: 'Home — Newsletter', label: 'Button', text: 'Stay Connected' },
    { key: 'home.subscribe.success', group: 'Home — Newsletter', label: 'Thank-you message', text: "You're in. Thank you for staying connected. 🌿" },

    // ── About ───────────────────────────────────────────────────────────
    { key: 'about.hero.title', group: 'About — Hero', label: 'Headline (line 1)', text: "It's not about what you know." },
    { key: 'about.hero.title_emphasis', group: 'About — Hero', label: 'Headline (italic line 2)', text: "It's about how you live." },
    { key: 'about.hero.intro', group: 'About — Hero', label: 'Intro line', text: 'Uncoached is for people who have genuinely tried:' },
    { key: 'about.hero.closing', group: 'About — Hero', label: 'Closing line', multiline: true, text: 'And yet, in the middle of real life, it often feels hard to actually live them.' },
    { key: 'about.hero.cta', group: 'About — Hero', label: 'Button', text: 'Start Your Journey' },

    { key: 'about.gap.title', group: 'About — The Gap', label: 'Section heading', text: 'The Gap No One Talks About' },
    { key: 'about.gap.intro', group: 'About — The Gap', label: 'Intro', multiline: true, text: 'Most personal growth focuses on understanding. But understanding alone does not create change.' },
    { key: 'about.gap.emphasis', group: 'About — The Gap', label: 'Emphasised line', text: 'Change happens in ordinary moments.' },
    { key: 'about.gap.closing', group: 'About — The Gap', label: 'Closing line', multiline: true, text: 'You don\'t need more advice, you need something that helps you come back to yourself in the moment.' },

    // ── Pricing ─────────────────────────────────────────────────────────
    { key: 'pricing.title', group: 'Pricing', label: 'Page heading', text: 'Choose your path' },
    { key: 'pricing.subtitle', group: 'Pricing', label: 'Subheading', text: "There's no right pace. Take what you need." },
    { key: 'pricing.universal', group: 'Pricing', label: 'Line above the dropdowns', text: "There's no right pace. Take what you need." },
    { key: 'pricing.disclaimer', group: 'Pricing', label: 'Disclaimer', multiline: true, text: "Uncoached is not therapy or coaching. It's a self-guided space designed to support awareness, regulation, and integration in everyday life. All memberships renew automatically at the end of each billing period. You can cancel at any time before renewal to stop future charges. There's no right pace. Stay for a moment, or make it a rhythm." },
    { key: 'pricing.closing', group: 'Pricing', label: 'Closing statement', multiline: true, text: "You don't need to fix yourself. You just need a place to stay connected to yourself." },
];

/** Ordered list of group names, for the admin screen. */
export const SITE_COPY_GROUPS = SITE_COPY_FIELDS.reduce((groups, f) => {
    if (!groups.includes(f.group)) groups.push(f.group);
    return groups;
}, []);

export const DEFAULT_COPY = Object.fromEntries(SITE_COPY_FIELDS.map((f) => [f.key, f.text]));
