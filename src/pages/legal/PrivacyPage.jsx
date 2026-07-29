import LegalLayout from '../../components/LegalLayout';

const Section = ({ title, children }) => (
    <div className="space-y-3">
        <h2 className="font-display text-xl text-text-dark">{title}</h2>
        {children}
    </div>
);

const Bullets = ({ items }) => (
    <ul className="space-y-2 pl-1">
        {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
                <span className="text-sage mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-sage" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

const PrivacyPage = () => (
    <LegalLayout title="Privacy Policy" subtitle="Effective Date: September 2025">
        <p>
            Uncoached (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when you use our website,
            downloadable tools, and our AI companion, Field.
        </p>
        <p>By using Uncoached, you agree to the terms of this Privacy Policy.</p>

        <Section title="1. Information We Collect">
            <p>We collect two main types of information:</p>
            <p className="font-medium text-text-dark">1.1 Information You Provide</p>
            <Bullets items={[
                'When you purchase The Uncoached Essentials (via Stripe), we collect your name, email address, and payment details. Payment information is processed securely by Stripe and is never stored by us.',
                'When you interact with Field, you may provide personal reflections, journal-like entries, or other text responses.',
            ]} />
            <p className="font-medium text-text-dark">1.2 Automatically Collected Information</p>
            <Bullets items={[
                'Basic usage data, such as browser type, device type, IP address, and pages visited on our site.',
                'Email opt-ins (if you subscribe), which include your name and email address.',
            ]} />
        </Section>

        <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <Bullets items={[
                'Provide and deliver Uncoached products (printable toolkits, add-on tools, rituals, AI access).',
                'Enable and improve your experience with Field, our AI companion.',
                "Send you updates you've opted into (e.g., new cards, behind-the-scenes tools, or Field's secret features).",
                'Maintain and improve site performance and user experience.',
            ]} />
        </Section>

        <Section title="3. AI Assistant (Field) and Chatbase">
            <p>
                When you interact with Field, your entries are processed by our service provider Chatbase,
                which hosts the AI model on our behalf.
            </p>
            <Bullets items={[
                'You do not need a Chatbase account; everything happens directly inside the Uncoached website.',
                'Your messages are used to generate responses within Field and to operate, maintain, and improve the functionality and quality of the Services. Your entries are not used to train public AI models.',
                'Chatbase processes information on our behalf in accordance with its applicable privacy and security practices.',
                'If you delete your cookies, Field will refresh and you will lose any previously stored memories within Field.',
            ]} />
            <p>
                We recommend avoiding sensitive personal details (such as medical, financial, or legal
                information) when using Field.
            </p>
        </Section>

        <Section title="4. How We Share Information">
            <p>We do not sell your personal data. We only share information in the following limited ways:</p>
            <Bullets items={[
                'Service providers: With trusted partners like Stripe (for payments) and Chatbase (for Field’s AI responses).',
                'Legal compliance: If required by law or to protect our rights and safety.',
            ]} />
        </Section>

        <Section title="5. Data Retention">
            <Bullets items={[
                'Email and purchase details are retained as long as necessary for customer support, tax, and legal obligations.',
                'Entries shared with Field are processed by Chatbase and may be stored for a limited period as necessary to provide the Service and improve reliability.',
            ]} />
        </Section>

        <Section title="6. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <Bullets items={[
                'Access, correct, or delete your personal information.',
                'Opt out of communications at any time (unsubscribe link provided in every email).',
                'Request that we limit or stop processing your data.',
            ]} />
            <p>
                To exercise these rights, email us at{' '}
                <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">hello@uncoached.space</a>.
            </p>
        </Section>

        <Section title="7. Security">
            <p>
                We use reasonable measures to protect your personal information. However, no system is
                100% secure, and we cannot guarantee absolute security of your data.
            </p>
        </Section>

        <Section title="8. Children's Privacy">
            <p>
                Uncoached is not intended for individuals under 18. We do not knowingly collect personal
                information from children.
            </p>
        </Section>

        <Section title="9. Updates to This Policy">
            <p>
                We may update this Privacy Policy from time to time. When we do, we'll update the effective
                date at the top of this page. Significant changes will be communicated clearly.
            </p>
        </Section>

        <Section title="10. Contact">
            <p>
                For privacy concerns, email us at{' '}
                <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">hello@uncoached.space</a>.
            </p>
        </Section>
    </LegalLayout>
);

export default PrivacyPage;
