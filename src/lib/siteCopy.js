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

    // The eight cards in the carousel. Titles support *stars* for a sage italic
    // highlight — that is what makes the "for" in Af*for*mations stand out.
    { key: 'home.services.card1_title', group: "Home — What You'll Find Inside", label: 'Card 1 title', text: "Field" },
    { key: 'home.services.card1_body', group: "Home — What You'll Find Inside", label: 'Card 1 text', multiline: true, text: "Chat with Field in real time, like reflecting with a trusted friend that helps you hear yourself more clearly, without advice or pressure." },
    { key: 'home.services.card2_title', group: "Home — What You'll Find Inside", label: 'Card 2 title', text: "Audio Breaths" },
    { key: 'home.services.card2_body', group: "Home — What You'll Find Inside", label: 'Card 2 text', multiline: true, text: "Soft, short audio practices to help regulate your nervous system and ground your body in the moment." },
    { key: 'home.services.card3_title', group: "Home — What You'll Find Inside", label: 'Card 3 title', text: "Clarity Cards" },
    { key: 'home.services.card3_body', group: "Home — What You'll Find Inside", label: 'Card 3 text', multiline: true, text: "Journaling cards with thoughtful questions and exercises to untangle your mind and spark a deeper clarity." },
    { key: 'home.services.card4_title', group: "Home — What You'll Find Inside", label: 'Card 4 title', text: "Pocket Prompts" },
    { key: 'home.services.card4_body', group: "Home — What You'll Find Inside", label: 'Card 4 text', multiline: true, text: "Structured prompt experiences that guide reflection and next steps, helping insight turn into real change over time." },
    { key: 'home.services.card5_title', group: "Home — What You'll Find Inside", label: 'Card 5 title', text: "Guided Shifts" },
    { key: 'home.services.card5_body', group: "Home — What You'll Find Inside", label: 'Card 5 text', multiline: true, text: "Short, guided experiences that help you reset your state and reconnect with yourself in the moment." },
    { key: 'home.services.card6_title', group: "Home — What You'll Find Inside", label: 'Card 6 title', help: 'Anything between *stars* shows in sage italic.', text: "Af*for*mations" },
    { key: 'home.services.card6_body', group: "Home — What You'll Find Inside", label: 'Card 6 text', multiline: true, text: "Empowering questions to ask yourself, designed to guide your brain toward supportive answers." },
    { key: 'home.services.card7_title', group: "Home — What You'll Find Inside", label: 'Card 7 title', text: "Grounding Voice Notes" },
    { key: 'home.services.card7_body', group: "Home — What You'll Find Inside", label: 'Card 7 text', multiline: true, text: "Brief, supportive voice notes offering gentle reminders of who you are in moments when you need steadiness, encouragement, or perspective." },
    { key: 'home.services.card8_title', group: "Home — What You'll Find Inside", label: 'Card 8 title', text: "More Coming Soon" },
    { key: 'home.services.card8_body', group: "Home — What You'll Find Inside", label: 'Card 8 text', multiline: true, text: "A growing space, shaped with care. New tools and experiences will be added intentionally, always with the same focus on safety, integration, and self-trust." },

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

    // ── Practitioners · Hero ────────────────────────────────────────────
    { key: 'practitioners.hero.eyebrow', group: 'Practitioners — Hero', label: 'Small line above the headline', text: "Trusted Practitioners Around the World" },
    { key: 'practitioners.hero.title', group: 'Practitioners — Hero', label: 'Headline', text: "Find someone whose approach" },
    { key: 'practitioners.hero.title_emphasis', group: 'Practitioners — Hero', label: 'Headline (italic ending)', text: "resonates." },
    { key: 'practitioners.hero.intro', group: 'Practitioners — Hero', label: 'Intro paragraph', multiline: true, text: "The professionals listed here are people personally trusted or worked with. There are no affiliate links and no commissions. This page exists simply to help you find practitioners whose approach may resonate with you." },

    // ── Practitioners · Our Promise ─────────────────────────────────────
    { key: 'practitioners.promise.card1_title', group: 'Practitioners — Our Promise', label: 'Card 1 title', text: "No affiliate links" },
    { key: 'practitioners.promise.card1_body', group: 'Practitioners — Our Promise', label: 'Card 1 text', text: "Nothing here is a paid placement." },
    { key: 'practitioners.promise.card2_title', group: 'Practitioners — Our Promise', label: 'Card 2 title', text: "No commissions or kickbacks" },
    { key: 'practitioners.promise.card2_body', group: 'Practitioners — Our Promise', label: 'Card 2 text', text: "We never earn from a referral." },
    { key: 'practitioners.promise.card3_title', group: 'Practitioners — Our Promise', label: 'Card 3 title', text: "Included on trust, not payment" },
    { key: 'practitioners.promise.card3_body', group: 'Practitioners — Our Promise', label: 'Card 3 text', text: "Listed only when the work aligns." },

    // ── Practitioners · The Directory ───────────────────────────────────
    { key: 'practitioners.directory.link_website', group: 'Practitioners — The Directory', label: 'Website link wording on a profile card', text: "Visit website" },
    { key: 'practitioners.directory.empty', group: 'Practitioners — The Directory', label: 'Message when nobody is listed yet', multiline: true, help: 'Shown only while the directory is empty.', text: "Our first practitioners are being welcomed in. Check back soon." },
    { key: 'practitioners.directory.empty_category', group: 'Practitioners — The Directory', label: 'Message when a filter has no one in it', multiline: true, text: "No practitioners in this category yet." },

    // ── Practitioners · Disclaimer ────────────────────────────────
    { key: 'practitioners.disclaimer.body', group: 'Practitioners — Disclaimer', label: 'Disclaimer paragraph', multiline: true, rows: 6, help: 'Shown in italics under the practitioner profiles.', text: "Practitioners featured on Uncoached operate independently and are responsible for their own services, qualifications, fees, policies, and client relationships. Their inclusion on Uncoached does not guarantee or endorse their services or suitability for any individual. Any professional relationship you choose to enter into with a practitioner is between you and that practitioner, independently of Uncoached." },
    { key: 'practitioners.disclaimer.link', group: 'Practitioners — Disclaimer', label: 'Link at the end of the paragraph', help: 'Opens the Practitioner Disclaimer section of your Terms page.', text: "Read full Practitioner Disclaimer" },

    // ── Practitioners · How Practitioners Are Chosen ────────────────────
    { key: 'practitioners.process.title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Section heading', text: "How practitioners are chosen" },
    { key: 'practitioners.process.intro', group: 'Practitioners — How Practitioners Are Chosen', label: 'Line under the heading', multiline: true, text: "A small, intentional process to keep this list trustworthy." },
    { key: 'practitioners.process.step1_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 1 title', text: "Initial Contact" },
    { key: 'practitioners.process.step1_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 1 text', multiline: true, text: "A short introduction and a website or professional profile is shared." },
    { key: 'practitioners.process.step2_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 2 title', text: "Connection Conversation" },
    { key: 'practitioners.process.step2_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 2 text', multiline: true, text: "If aligned, we schedule a brief conversation or sample session to experience the work directly." },
    { key: 'practitioners.process.step3_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 3 title', text: "Alignment Review" },
    { key: 'practitioners.process.step3_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 3 text', multiline: true, text: "Practitioners are selected based on alignment with Uncoached's spirit and values — not payment." },
    { key: 'practitioners.process.step4_title', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 4 title', text: "Curated Listing" },
    { key: 'practitioners.process.step4_body', group: 'Practitioners — How Practitioners Are Chosen', label: 'Step 4 text', multiline: true, text: "Not everyone who reaches out is included. The list stays intentionally small and curated." },

    // ── Practitioners · Interested In Being Featured ────────────────────
    { key: 'practitioners.featured.title', group: 'Practitioners — Interested In Being Featured', label: 'Section heading', text: "Interested in being featured?" },
    { key: 'practitioners.featured.body', group: 'Practitioners — Interested In Being Featured', label: 'Paragraph', multiline: true, text: "Uncoached occasionally adds new practitioners to this list when their work aligns with the values and approach of the platform. If you are a therapist, counselor, somatic practitioner, nervous system specialist, or other wellbeing professional and feel your work may be a good fit, you're welcome to reach out." },
    { key: 'practitioners.featured.cta', group: 'Practitioners — Interested In Being Featured', label: 'Button', text: "Apply Here" },

    // ── Partnership Guide · Cover ───────────────────────────────────────
    { key: 'partnership.header.cta', group: 'Partnership Guide — Cover', label: 'Button in the top corner', fixed: true, text: "Apply now" },
    { key: 'partnership.cover.title', group: 'Partnership Guide — Cover', label: 'Cover title', multiline: true, list: true, rows: 4, fixed: true, help: 'One line per line of the title.', text: "Uncoached\nPractitioner\nPartnership\nGuide" },
    { key: 'partnership.cover.tagline', group: 'Partnership Guide — Cover', label: 'Tagline under the line', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Helping clients between\nthe breakthroughs." },
    { key: 'partnership.cover.footer', group: 'Partnership Guide — Cover', label: 'Green bar at the bottom', fixed: true, text: "uncoached.space" },

    // ── Partnership Guide · Welcome ─────────────────────────────────────
    { key: 'partnership.welcome.heading', group: 'Partnership Guide — Welcome', label: 'Heading', fixed: true, text: "Welcome" },
    { key: 'partnership.welcome.lead', group: 'Partnership Guide — Welcome', label: 'Line above the handwriting', fixed: true, text: "Before anything else," },
    { key: 'partnership.welcome.script', group: 'Partnership Guide — Welcome', label: 'Handwritten line', fixed: true, text: "thank you." },
    { key: 'partnership.welcome.p1', group: 'Partnership Guide — Welcome', label: 'Paragraph 1', multiline: true, fixed: true, text: "One thing I've realized over the years is that insight doesn't automatically become change." },
    { key: 'partnership.welcome.p2', group: 'Partnership Guide — Welcome', label: 'Paragraph 2', multiline: true, fixed: true, text: "Someone can leave a session feeling lighter, clearer, and committed to doing things differently. But lasting change isn't built in the hour you spend together. It happens afterwards, in everyday life, when they're trying to remember what they learned and put it into practice." },
    { key: 'partnership.welcome.p3', group: 'Partnership Guide — Welcome', label: 'Paragraph 3 (bold)', multiline: true, fixed: true, text: "That's what inspired Uncoached." },
    { key: 'partnership.welcome.p4', group: 'Partnership Guide — Welcome', label: 'Paragraph 4', multiline: true, fixed: true, text: "I wanted to create something practitioners would genuinely be excited to share with their clients. A place where clients could reconnect with what they've already learned and continue building on the work they've already started." },
    { key: 'partnership.welcome.p5', group: 'Partnership Guide — Welcome', label: 'Paragraph 5 (bold)', multiline: true, fixed: true, text: "Not to replace the work you're already doing, but to help it stick." },
    { key: 'partnership.welcome.p6', group: 'Partnership Guide — Welcome', label: 'Paragraph 6', multiline: true, fixed: true, text: "That's what the Practitioner Partnership is all about." },
    { key: 'partnership.welcome.p7', group: 'Partnership Guide — Welcome', label: 'Paragraph 7', multiline: true, fixed: true, text: "Together, we can take the tools and ideas that are already changing lives and give them a home where they can continue helping people long after the session ends." },

    // ── Partnership Guide · What Is The Partnership ─────────────────────
    { key: 'partnership.what.title', group: 'Partnership Guide — What Is The Partnership', label: 'Page title', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line of the title.', text: "What is the Practitioner\nPartnership?" },
    { key: 'partnership.what.p1', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 1 (bold)', multiline: true, fixed: true, text: "One of the most rewarding parts of this work is watching someone take what they've learned and truly make it part of their life." },
    { key: 'partnership.what.p2', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 2', multiline: true, fixed: true, text: "Every practitioner has exercises, perspectives, and practical tools that make a real difference. Together, we'll turn some of those into polished Uncoached resources that people can return to whenever they need a reminder, a reset, or a different perspective." },
    { key: 'partnership.what.p3_bold', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 3 — bold opening', multiline: true, fixed: true, text: "These resources aren't designed to replace your work. They're designed to reinforce it." },
    { key: 'partnership.what.p3_rest', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 3 — rest of the paragraph', multiline: true, fixed: true, text: "They give your clients a trusted place to return to the tools, exercises, and perspectives you've already introduced, while also discovering complementary perspectives that may deepen what they're learning or help something finally click." },
    { key: 'partnership.what.p4', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 4', multiline: true, fixed: true, text: "They're also there for the moments when you need to step away, so your clients still have something meaningful to lean on until you're back." },
    { key: 'partnership.what.p5', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 5 — opening', multiline: true, fixed: true, text: "As part of the partnership, your expertise becomes a part of a growing library that supports people long after the session ends." },
    { key: 'partnership.what.p5_bold', group: 'Partnership Guide — What Is The Partnership', label: 'Paragraph 5 — bold ending', multiline: true, fixed: true, text: "You'll also have a professional profile where visitors and members can discover your work, learn about your approach, and connect with you independently." },
    { key: 'partnership.what.icon1', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 1 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "You share\nyour expertise." },
    { key: 'partnership.what.icon2', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 2 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "We create a\nresource together." },
    { key: 'partnership.what.icon3', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 3 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "Members get\npractical support." },
    { key: 'partnership.what.icon4', group: 'Partnership Guide — What Is The Partnership', label: 'Icon 4 caption', multiline: true, list: true, rows: 2, fixed: true, help: 'Two short lines.', text: "Your practice\ngets visibility." },

    // ── Partnership Guide · How Our Partnership Works ───────────────────
    { key: 'partnership.how.title', group: 'Partnership Guide — How Our Partnership Works', label: 'Page title', fixed: true, text: "How our partnership works" },
    { key: 'partnership.how.subtitle', group: 'Partnership Guide — How Our Partnership Works', label: 'Italic line under the title', fixed: true, text: "An exchange that creates impact." },
    { key: 'partnership.how.step1_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 1 title', fixed: true, text: "You bring" },
    { key: 'partnership.how.step1_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 1 text', multiline: true, fixed: true, text: "Your expertise, favorite client exercises, practical tools, and the wisdom you find yourself sharing again and again." },
    { key: 'partnership.how.step2_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 2 title', fixed: true, text: "Together we build" },
    { key: 'partnership.how.step2_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 2 text', multiline: true, fixed: true, text: "We help shape your expertise into a beautiful, practical resource that feels at home inside the Uncoached Library." },
    { key: 'partnership.how.step3_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 3 title', fixed: true, text: "Members receive" },
    { key: 'partnership.how.step3_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 3 text', multiline: true, fixed: true, text: "A growing library of practical tools and resources from a diverse community of practitioners, giving them support they can return to whenever they need it." },
    { key: 'partnership.how.step4_title', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 4 title', fixed: true, text: "You receive" },
    { key: 'partnership.how.step4_body', group: 'Partnership Guide — How Our Partnership Works', label: 'Step 4 text', multiline: true, fixed: true, text: "A Community Practitioner profile introducing visitors and members to your independent practice." },
    { key: 'partnership.how.callout', group: 'Partnership Guide — How Our Partnership Works', label: 'Tan box at the bottom', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Every collaboration looks a little different.\nThat's the beauty of it." },

    // ── Partnership Guide · What You Could Share ────────────────────────
    { key: 'partnership.share.title', group: 'Partnership Guide — What You Could Share', label: 'Page title', fixed: true, text: "What you could share" },
    { key: 'partnership.share.script', group: 'Partnership Guide — What You Could Share', label: 'Handwritten line on the green brush stroke', multiline: true, fixed: true, text: "Something that's already helping the people you work with." },
    { key: 'partnership.share.intro', group: 'Partnership Guide — What You Could Share', label: 'Intro paragraph', multiline: true, fixed: true, text: "Think about the practical things you already teach, practice, or send home with clients. The exercises they come back to. The tools that help something click. The things you wish they remembered when real life happens between sessions." },
    { key: 'partnership.share.list_heading', group: 'Partnership Guide — What You Could Share', label: 'Heading above the list', fixed: true, text: "It could be…" },
    { key: 'partnership.share.bullets', group: 'Partnership Guide — What You Could Share', label: 'The bullet list', multiline: true, list: true, rows: 12, fixed: true, help: 'One bullet per line. Adding lines will make this page overflow — swap a line out rather than adding to the list.', text: "A favorite client exercise\nA body-based or grounding practice\nA conversation or communication tool\nA way to recognize or map a recurring pattern\nA skill you regularly teach clients to practice\nA check-in you use to help someone take stock\nAn exercise for partners to do together\nA practical coping or regulation strategy\nA decision-making or problem-solving framework\nA reflection or journal prompt that consistently creates insight\nA piece of between-session practice you frequently suggest\nA simple tool that helps clients apply what they've learned in real life" },
    { key: 'partnership.share.callout_bold', group: 'Partnership Guide — What You Could Share', label: 'Tan box — bold opening', fixed: true, text: "You bring the expertise." },
    { key: 'partnership.share.callout_body', group: 'Partnership Guide — What You Could Share', label: 'Tan box — paragraph', multiline: true, fixed: true, text: "Share the idea, practice or approach with me and help me understand how you use it. Together, we'll translate it into a polished Uncoached resource that's clear, practical and easy to use." },

    // ── Partnership Guide · Your Practitioner Profile ───────────────────
    { key: 'partnership.profile.title', group: 'Partnership Guide — Your Practitioner Profile', label: 'Page title', fixed: true, text: "Your practitioner profile" },
    { key: 'partnership.profile.intro', group: 'Partnership Guide — Your Practitioner Profile', label: 'Intro paragraph', multiline: true, fixed: true, text: "Your profile is featured on the public Uncoached website, making it visible to both visitors and members who want to learn more about your work before reaching out." },
    { key: 'partnership.profile.panel_heading', group: 'Partnership Guide — Your Practitioner Profile', label: 'Tan panel heading', fixed: true, text: "Here's what people will see:" },
    { key: 'partnership.profile.panel_items', group: 'Partnership Guide — Your Practitioner Profile', label: 'Tan panel list', multiline: true, list: true, rows: 7, fixed: true, help: 'One item per line. Seven lines fit this panel.', text: "Professional photo\nArea(s) of focus\nCountries you work in\nVirtual and/or in-person availability\nLanguages spoken\nWebsite and/or booking link\nSocial media (optional)" },
    { key: 'partnership.profile.script1', group: 'Partnership Guide — Your Practitioner Profile', label: 'Handwritten line 1', multiline: true, fixed: true, text: "You don't need to be a copywriter." },
    { key: 'partnership.profile.script2', group: 'Partnership Guide — Your Practitioner Profile', label: 'Handwritten line 2', multiline: true, fixed: true, text: "I'll help bring your profile to life." },
    { key: 'partnership.profile.notes_heading', group: 'Partnership Guide — Your Practitioner Profile', label: 'Bottom panel heading', fixed: true, text: "A few important things to know:" },
    { key: 'partnership.profile.notes_items', group: 'Partnership Guide — Your Practitioner Profile', label: 'Bottom panel list', multiline: true, list: true, rows: 6, fixed: true, help: 'One item per line. Six lines fit this panel.', text: "Your practice remains completely independent.\nYou manage your own clients, fees, and scheduling.\nNo referral commissions.\nWe'll professionally polish and brand every resource together.\nYour contribution becomes part of the Uncoached Library.\nWe periodically review profiles to keep information current." },

    // ── Partnership Guide · Building Something Meaningful ───────────────
    { key: 'partnership.meaning.title', group: 'Partnership Guide — Building Something Meaningful', label: 'Page title', fixed: true, text: "Building" },
    { key: 'partnership.meaning.script', group: 'Partnership Guide — Building Something Meaningful', label: 'Handwritten line under the title', fixed: true, text: "Something Meaningful" },
    { key: 'partnership.meaning.body', group: 'Partnership Guide — Building Something Meaningful', label: 'The letter', multiline: true, list: true, rows: 8, fixed: true, help: 'One paragraph per line. Leave a line blank and it disappears.', text: "I don't want Uncoached to become another platform filled with endless content that people scroll past and never use.\nI want it to become a living library built by practitioners who genuinely care about helping people long after the session ends.\nEvery practitioner brings a different perspective.\nEvery contribution gives someone another way to navigate a difficult day, see themselves differently, or take one small step forward.\nWe'll probably never know all the lives those resources will touch.\nI think that's pretty special.\nIf that sounds like something you'd like to be part of, I'd love to welcome you to the Uncoached community." },
    { key: 'partnership.meaning.closing', group: 'Partnership Guide — Building Something Meaningful', label: 'Handwritten sign-off', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "Thank you for considering it.\nI'd love to build this with you." },
    { key: 'partnership.meaning.signature_caption', group: 'Partnership Guide — Building Something Meaningful', label: 'Caption under your signature', fixed: true, text: "Founder, Uncoached" },

    // ── Partnership Guide · Ready To Join ───────────────────────────────
    { key: 'partnership.join.title', group: 'Partnership Guide — Ready To Join', label: 'Page title', fixed: true, text: "Ready to join?" },
    { key: 'partnership.join.subtitle', group: 'Partnership Guide — Ready To Join', label: 'Line under the divider', fixed: true, text: "Here's what happens next." },
    { key: 'partnership.join.step1_title', group: 'Partnership Guide — Ready To Join', label: 'Step 01 title', fixed: true, text: "Tell us about you" },
    { key: 'partnership.join.step1_body', group: 'Partnership Guide — Ready To Join', label: 'Step 01 text', multiline: true, fixed: true, text: "Share a little about your practice, your expertise, and the work you do. This helps us get to know you and how you could fit into the Uncoached community." },
    { key: 'partnership.join.step2_title', group: 'Partnership Guide — Ready To Join', label: 'Step 02 title', fixed: true, text: "Share your idea" },
    { key: 'partnership.join.step2_body', group: 'Partnership Guide — Ready To Join', label: 'Step 02 text', multiline: true, fixed: true, text: "Have an idea already? Amazing. If not, we'll figure it out together and find something from your expertise that would genuinely add value to the Uncoached Library." },
    { key: 'partnership.join.step3_title', group: 'Partnership Guide — Ready To Join', label: 'Step 03 title', fixed: true, text: "We'll build it together" },
    { key: 'partnership.join.step3_body', group: 'Partnership Guide — Ready To Join', label: 'Step 03 text', multiline: true, fixed: true, text: "We'll work with you to shape your idea into a polished Uncoached resource, create your Practitioner profile, and get everything ready to become part of Uncoached." },
    { key: 'partnership.join.closing', group: 'Partnership Guide — Ready To Join', label: 'Cream text on the green background', multiline: true, list: true, rows: 2, fixed: true, help: 'One line per line.', text: "If you care deeply about helping people create real change,\nlet's build something that helps them keep going." },
    { key: 'partnership.join.cta', group: 'Partnership Guide — Ready To Join', label: 'The big button', fixed: true, help: 'The arrow is added automatically.', text: "I'M IN!" },

    // ── Application Form · Introduction ─────────────────────────────────
    { key: 'apply.title', group: 'Application Form — Introduction', label: 'Headline', text: "Tell us about you" },
    { key: 'apply.intro', group: 'Application Form — Introduction', label: 'Intro paragraph', multiline: true, text: "Share a few details about your practice, the work you do, and what you'd like to bring to Uncoached. We'll review your submission to make sure the partnership feels like a good fit. If approved, we'll be in touch with next steps." },

    // ── Application Form · Questions ────────────────────────────────────
    { key: 'apply.name.label', group: 'Application Form — Questions', label: 'Full name — question', text: "Full name" },
    { key: 'apply.credentials.label', group: 'Application Form — Questions', label: 'Credentials — question', text: "Credentials / Training" },
    { key: 'apply.credentials.hint', group: 'Application Form — Questions', label: 'Credentials — hint', multiline: true, text: "Licences, certifications, professional designations, or relevant training." },
    { key: 'apply.email.label', group: 'Application Form — Questions', label: 'Email — question', text: "Email" },
    { key: 'apply.email.hint', group: 'Application Form — Questions', label: 'Email — hint', multiline: true, text: "Where we'll contact you about your submission." },
    { key: 'apply.photo.label', group: 'Application Form — Questions', label: 'Photo — question', text: "Professional photo" },
    { key: 'apply.photo.hint', group: 'Application Form — Questions', label: 'Photo — hint', multiline: true, text: "A clear headshot. JPG or PNG, under 5MB." },
    { key: 'apply.bio.label', group: 'Application Form — Questions', label: 'Bio — question', text: "Short bio" },
    { key: 'apply.bio.hint', group: 'Application Form — Questions', label: 'Bio — hint', multiline: true, text: "Tell us a little about your work, who you support, and your approach." },
    { key: 'apply.focus.label', group: 'Application Form — Questions', label: 'Areas of focus — question', text: "Area(s) of focus" },
    { key: 'apply.focus.hint', group: 'Application Form — Questions', label: 'Areas of focus — hint', multiline: true, text: "Choose up to 5 areas that best represent the work you do." },
    { key: 'apply.countries.label', group: 'Application Form — Questions', label: 'Countries — question', text: "Country / countries you can work in" },
    { key: 'apply.languages.label', group: 'Application Form — Questions', label: 'Languages — question', text: "Languages" },
    { key: 'apply.delivery.label', group: 'Application Form — Questions', label: 'Virtual or in-person — question', text: "How do you work with clients?" },
    { key: 'apply.website.label', group: 'Application Form — Questions', label: 'Website — question', text: "Website / booking link or email" },
    { key: 'apply.social.label', group: 'Application Form — Questions', label: 'Social media — question', text: "Social media" },
    { key: 'apply.expertise.label', group: 'Application Form — Questions', label: 'Expertise — question', multiline: true, text: "What expertise would you most like to contribute from?" },
    { key: 'apply.expertise.hint', group: 'Application Form — Questions', label: 'Expertise — hint', multiline: true, text: "The thing you find yourself teaching again and again." },
    { key: 'apply.ideas.label', group: 'Application Form — Questions', label: 'Resource idea — question', multiline: true, text: "Do you already have a resource or practice in mind?" },
    { key: 'apply.ideas.hint', group: 'Application Form — Questions', label: 'Resource idea — hint', multiline: true, text: "No idea yet? That's completely fine. We can explore it together during your Partnership Chat." },

    // ── Application Form · Consent & Submit ─────────────────────────────
    { key: 'apply.consent1', group: 'Application Form — Consent & Submit', label: 'First tick box', multiline: true, text: "If accepted into the Practitioner Partnership, I give Uncoached permission to publish the practitioner profile information and headshot I provide on the Uncoached website." },
    { key: 'apply.consent2', group: 'Application Form — Consent & Submit', label: 'Second tick box', multiline: true, text: "I understand that the Practitioner Partnership includes collaborating with Uncoached on at least one practical resource for the Uncoached Library if my application is accepted." },
    { key: 'apply.submit', group: 'Application Form — Consent & Submit', label: 'Submit button', text: "Submit application" },
    { key: 'apply.privacy_note', group: 'Application Form — Consent & Submit', label: 'Line under the button', multiline: true, help: 'The Privacy Policy link is added to the end of this sentence automatically.', text: "We'll review your application and be in touch with next steps if it feels like a good fit. By submitting this application, you acknowledge that the information you provide will be collected and used to review your application and administer the Practitioner Partnership in accordance with the" },
    { key: 'apply.privacy_link', group: 'Application Form — Consent & Submit', label: 'Wording of the Privacy Policy link', text: "Uncoached Privacy Policy" },
    { key: 'apply.back', group: 'Application Form — Consent & Submit', label: 'Link back to the guide', help: 'The arrow is added automatically.', text: "Back to the guide" },

    // ── Application Form · After Submitting ─────────────────────────────
    { key: 'apply.thanks.title', group: 'Application Form — After Submitting', label: 'Thank you headline', text: "Thank you." },
    { key: 'apply.thanks.body', group: 'Application Form — After Submitting', label: 'Thank you paragraph', multiline: true, text: "Your application is with Johanna. She reads every one personally and will be in touch by email — if it feels like a fit, she'll send you a link to book a call." },
    { key: 'apply.thanks.back', group: 'Application Form — After Submitting', label: 'Link back to the guide', help: 'The arrow is added automatically.', text: "Back to the Partnership Guide" },

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
