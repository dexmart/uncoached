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

    { key: 'about.why.title', group: 'About — Why Uncoached Exists', label: 'Section heading', text: 'Why Uncoached Exists' },
    { key: 'about.why.body1', group: 'About — Why Uncoached Exists', label: 'Paragraph 1', multiline: true, text: 'Uncoached was created as a response to a culture of outsourced authority, endless consumption, and the belief that discomfort needs to be eliminated rather than understood;' },
    { key: 'about.why.body2', group: 'About — Why Uncoached Exists', label: 'Paragraph 2', multiline: true, text: 'One that prioritises insight over integration, hierarchy over self-trust, and fixing emotions instead of learning how to live with them.' },
    { key: 'about.why.emphasis', group: 'About — Why Uncoached Exists', label: 'Closing emphasis', multiline: true, text: 'Uncoached exists to support the part of the journey that usually happens alone.' },

    { key: 'about.shift.title', group: 'About — The Shift', label: 'Section heading', text: 'The Shift' },
    { key: 'about.shift.intro', group: 'About — The Shift', label: 'Intro', text: 'When support becomes available in real time, something changes.' },
    { key: 'about.shift.point1', group: 'About — The Shift', label: 'Point 1', text: 'You stop treating “bad” moments as problems.' },
    { key: 'about.shift.point2', group: 'About — The Shift', label: 'Point 2', text: 'You stop chasing “good” moments for relief.' },
    { key: 'about.shift.point3', group: 'About — The Shift', label: 'Point 3', multiline: true, text: 'You learn how to meet whatever life brings with more steadiness, clarity, and self-trust.' },

    { key: 'about.quote', group: 'About — Core Message', label: 'Quote', multiline: true, text: 'Uncoached exists to turn insight into lived experience by helping people build self-trust, repetition, and support in real time.' },

    { key: 'about.philosophy.title', group: 'About — Philosophy', label: 'Section heading', text: 'A Philosophy of Self-Leadership' },
    { key: 'about.philosophy.emphasis', group: 'About — Philosophy', label: 'Emphasised line', text: 'It is about coming home to yourself.' },
    { key: 'about.philosophy.intro', group: 'About — Philosophy', label: 'Lead-in line', multiline: true, text: 'When you learn how to support yourself in both the messy moments and the expansive ones:' },
    { key: 'about.philosophy.point1', group: 'About — Philosophy', label: 'Point 1', text: 'You stop outsourcing your authority.' },
    { key: 'about.philosophy.point2', group: 'About — Philosophy', label: 'Point 2', multiline: true, text: 'You start trusting your own capacity to move through life.' },

    { key: 'about.closing.title1', group: 'About — Closing', label: 'Heading 1', text: 'This Is Not For Everyone' },
    { key: 'about.closing.body1', group: 'About — Closing', label: 'Paragraph 1', multiline: true, text: 'Uncoached is not for people looking for quick fixes or answers outside themselves.' },
    { key: 'about.closing.body2', group: 'About — Closing', label: 'Paragraph 2', multiline: true, text: 'It is for those who are willing to practice, stay present, and integrate what they already know into daily life until it becomes automatic.' },
    { key: 'about.closing.body3', group: 'About — Closing', label: 'Paragraph 3', multiline: true, text: 'It is for people who are ready to live their growth, not just understand it.' },
    { key: 'about.closing.title2', group: 'About — Closing', label: 'Heading 2', text: 'A Quiet Invitation' },
    { key: 'about.closing.invite1', group: 'About — Closing', label: 'Invitation 1', text: 'If you feel tired of consuming and ready to embody.' },
    { key: 'about.closing.invite2', group: 'About — Closing', label: 'Invitation 2', multiline: true, text: 'If you want support that meets you in real life, not just in theory.' },
    { key: 'about.closing.invite3', group: 'About — Closing', label: 'Invitation 3', text: 'If you are ready to become your own most trusted guide.' },
    { key: 'about.closing.cta', group: 'About — Closing', label: 'Button', text: 'Start Your Journey' },

    // ── Legal pages — whole documents, so sections can be added freely ───
    { key: 'legal.terms.effective', group: 'Legal — Terms of Use', label: 'Effective date line', text: 'Effective: August 2025' },
    {
        key: 'legal.terms.body', group: 'Legal — Terms of Use', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading. Leave a blank line between paragraphs.',
        text: `Welcome to Uncoached, a product of Emergyng Energy (a sole proprietorship registered in Canada). These Terms of Use govern your access to and use of our digital tools, including Field, our AI companion, and the Clarity Toolkit.

## 1. Acceptance of Terms
By using our website and digital tools, and downloadable resources (“Services”), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.

## 2. Description of Services & Disclaimers
Uncoached offers self-guided digital wellness tools, including downloadable content and AI-powered reflections. Our tools are designed to support personal reflection. They are not a substitute for professional therapy, counseling, or medical advice. Emergyng Energy is not liable for any damages, emotional or otherwise, that result from use of our tools or platform.

Our Services are for self-reflection and clarity-building only. They are not intended to diagnose, treat, or cure any condition. If you're experiencing emotional distress, please seek support from a qualified professional.

Use of Uncoached does not create a therapist-client, coach-client, healthcare provider-patient, fiduciary, or other professional relationship between you and Emergyng Energy.

Our AI assistant, Field, offers reflective conversation support but is not a therapist, coach, or licensed professional. You use Field at your own discretion, and we make no guarantees about outcomes. Field may occasionally generate inaccurate, incomplete, or inappropriate information. You should use your own judgment and should not rely on Field for medical, legal, financial, or other professional advice.

Features, tools, and content available may evolve over time as part of ongoing updates to the service.

## 3. Payment & Access
Except where required by applicable law, all sales are final. Due to the digital nature of our Services, we do not offer refunds once a payment has been processed.

Your subscription provides access to Field and the Clarity Toolkit, and other tools and add-on tools for the duration of your active billing cycle. If you choose to cancel, you will retain access until the end of your current paid month(s) or paid year. Future tools, expansions, or card bundles may be included in your subscription or offered separately at our discretion.

## 4. User Conduct
You agree not to misuse our tools. You will not share copyrighted content outside of its intended use or engage in any behavior that harms the experience for others. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

You agree not to use Field or any part of the Uncoached experience to share harmful, illegal, threatening, or abusive content. Any such use is strictly prohibited.

## 5. Intellectual Property
All content provided by Uncoached, including AI tools, printable cards, and digital experiences are owned by Emergyng Energy. You're granted a limited, non-transferable license for personal use only. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

## 6. Eligibility
You must be at least 18 years old to use Uncoached. If you are under 18, you may only use the Services with the permission and supervision of a parent or legal guardian, where permitted by applicable law.

## 7. Modifications to Terms
We may revise these Terms, including subscription pricing, at any time. Continued use of the service after changes implies acceptance of the updated terms.

## 8. Limitation of Liability
Emergyng Energy is not liable for any indirect or incidental damages, emotional or otherwise, that result from use (or inability to use) of our tools or platform.

## 9. Contact
For support, email us at hello@uncoached.space.

## 10. Governing Law
These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.`
    },

    { key: 'legal.privacy.effective', group: 'Legal — Privacy Policy', label: 'Effective date line', text: 'Effective Date: September 2025' },
    {
        key: 'legal.privacy.body', group: 'Legal — Privacy Policy', label: 'Full document', document: true,
        help: 'Start a line with ## to make it a heading, or • to make a bullet. Leave a blank line between paragraphs.',
        text: `Uncoached (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, downloadable tools, and our AI companion, Field.

By using Uncoached, you agree to the terms of this Privacy Policy.

## 1. Information We Collect
We collect two main types of information.

Information you provide:
• When you purchase The Uncoached Essentials (via Stripe), we collect your name, email address, and payment details. Payment information is processed securely by Stripe and is never stored by us.
• When you interact with Field, you may provide personal reflections, journal-like entries, or other text responses.
• When you apply to the Practitioner Partnership, we collect the details and headshot you submit in the application form.

Automatically collected information:
• Basic usage data, such as browser type, device type, IP address, and pages visited on our site.
• Email opt-ins (if you subscribe), which include your name and email address.

## 2. How We Use Your Information
• Provide and deliver Uncoached products (printable toolkits, add-on tools, rituals, AI access).
• Enable and improve your experience with Field, our AI companion.
• Review Practitioner Partnership applications and administer the partnership.
• Send you updates you've opted into (e.g., new cards, behind-the-scenes tools, or Field's secret features).
• Maintain and improve site performance and user experience.

## 3. AI Assistant (Field) and Chatbase
When you interact with Field, your entries are processed by our service provider Chatbase, which hosts the AI model on our behalf.
• You do not need a Chatbase account; everything happens directly inside the Uncoached website.
• Your messages are used to generate responses within Field and to operate, maintain, and improve the functionality and quality of the Services. Your entries are not used to train public AI models.
• Chatbase processes information on our behalf in accordance with its applicable privacy and security practices.
• If you delete your cookies, Field will refresh and you will lose any previously stored memories within Field.

We recommend avoiding sensitive personal details (such as medical, financial, or legal information) when using Field.

## 4. How We Share Information
We do not sell your personal data. We only share information in the following limited ways:
• Service providers: With trusted partners like Stripe (for payments) and Chatbase (for Field's AI responses).
• Legal compliance: If required by law or to protect our rights and safety.

## 5. Data Retention
• Email and purchase details are retained as long as necessary for customer support, tax, and legal obligations.
• Entries shared with Field are processed by Chatbase and may be stored for a limited period as necessary to provide the Service and improve reliability.
• Practitioner applications are retained so we can review them and maintain the practitioner community.

## 6. Your Rights
Depending on your location, you may have the right to:
• Access, correct, or delete your personal information.
• Opt out of communications at any time (unsubscribe link provided in every email).
• Request that we limit or stop processing your data.

To exercise these rights, email us at hello@uncoached.space.

## 7. Security
We use reasonable measures to protect your personal information. However, no system is 100% secure, and we cannot guarantee absolute security of your data.

## 8. Children's Privacy
Uncoached is not intended for individuals under 18. We do not knowingly collect personal information from children.

## 9. Updates to This Policy
We may update this Privacy Policy from time to time. When we do, we'll update the effective date at the top of this page. Significant changes will be communicated clearly.

## 10. Contact
For privacy concerns, email us at hello@uncoached.space.`
    },

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

/** Groups read "Page — Section" (or just "Page"), so the admin can nest them. */
export const parseGroup = (group) => {
    const parts = group.split('\u2014').map((s) => s.trim());
    return { page: parts[0], section: parts[1] || 'General' };
};

/** Pages in the order they appear, for the admin's tabs. */
export const SITE_COPY_PAGES = SITE_COPY_FIELDS.reduce((pages, f) => {
    const { page } = parseGroup(f.group);
    if (!pages.includes(page)) pages.push(page);
    return pages;
}, []);

/** Sections belonging to a page, in order. */
export const sectionsForPage = (page) =>
    SITE_COPY_FIELDS.reduce((secs, f) => {
        const g = parseGroup(f.group);
        if (g.page === page && !secs.includes(g.section)) secs.push(g.section);
        return secs;
    }, []);

export const fieldsForSection = (page, section) =>
    SITE_COPY_FIELDS.filter((f) => {
        const g = parseGroup(f.group);
        return g.page === page && g.section === section;
    });
