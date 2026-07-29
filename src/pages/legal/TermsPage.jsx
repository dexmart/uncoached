import LegalLayout from '../../components/LegalLayout';

const Section = ({ title, children }) => (
    <div className="space-y-3">
        <h2 className="font-display text-xl text-text-dark">{title}</h2>
        {children}
    </div>
);

const TermsPage = () => (
    <LegalLayout title="Terms of Use" subtitle="Effective: August 2025">
        <p>
            Welcome to Uncoached, a product of Emergyng Energy (a sole proprietorship registered in
            Canada). These Terms of Use govern your access to and use of our digital tools, including
            Field, our AI companion, and the Clarity Toolkit.
        </p>

        <Section title="1. Acceptance of Terms">
            <p>
                By using our website and digital tools, and downloadable resources (“Services”), you
                agree to be bound by these Terms of Use. If you do not agree, please do not use the site.
            </p>
        </Section>

        <Section title="2. Description of Services & Disclaimers">
            <p>
                Uncoached offers self-guided digital wellness tools, including downloadable content and
                AI-powered reflections. Our tools are designed to support personal reflection. They are
                not a substitute for professional therapy, counseling, or medical advice. Emergyng
                Energy is not liable for any damages, emotional or otherwise, that result from use of our
                tools or platform.
            </p>
            <p>
                Our Services are for self-reflection and clarity-building only. They are not intended to
                diagnose, treat, or cure any condition. If you're experiencing emotional distress, please
                seek support from a qualified professional.
            </p>
            <p>
                Use of Uncoached does not create a therapist-client, coach-client, healthcare
                provider-patient, fiduciary, or other professional relationship between you and Emergyng
                Energy.
            </p>
            <p>
                Our AI assistant, Field, offers reflective conversation support but is not a therapist,
                coach, or licensed professional. You use Field at your own discretion, and we make no
                guarantees about outcomes. Field may occasionally generate inaccurate, incomplete, or
                inappropriate information. You should use your own judgment and should not rely on Field
                for medical, legal, financial, or other professional advice.
            </p>
            <p>
                Features, tools, and content available may evolve over time as part of ongoing updates to
                the service.
            </p>
        </Section>

        <Section title="3. Payment & Access">
            <p>
                Except where required by applicable law, all sales are final. Due to the digital nature of
                our Services, we do not offer refunds once a payment has been processed.
            </p>
            <p>
                Your subscription provides access to Field and the Clarity Toolkit, and other tools and
                add-on tools for the duration of your active billing cycle. If you choose to cancel, you
                will retain access until the end of your current paid month(s) or paid year. Future tools,
                expansions, or card bundles may be included in your subscription or offered separately at
                our discretion.
            </p>
        </Section>

        <Section title="4. User Conduct">
            <p>
                You agree not to misuse our tools. You will not share copyrighted content outside of its
                intended use or engage in any behavior that harms the experience for others. Reproduction,
                resale, redistribution, or unauthorized sharing is prohibited without written permission.
            </p>
            <p>
                You agree not to use Field or any part of the Uncoached experience to share harmful,
                illegal, threatening, or abusive content. Any such use is strictly prohibited.
            </p>
        </Section>

        <Section title="5. Intellectual Property">
            <p>
                All content provided by Uncoached, including AI tools, printable cards, and digital
                experiences are owned by Emergyng Energy. You're granted a limited, non-transferable
                license for personal use only. Reproduction, resale, redistribution, or unauthorized
                sharing is prohibited without written permission.
            </p>
        </Section>

        <Section title="6. Eligibility">
            <p>
                You must be at least 18 years old to use Uncoached. If you are under 18, you may only use
                the Services with the permission and supervision of a parent or legal guardian, where
                permitted by applicable law.
            </p>
        </Section>

        <Section title="7. Modifications to Terms">
            <p>
                We may revise these Terms, including subscription pricing, at any time. Continued use of
                the service after changes implies acceptance of the updated terms.
            </p>
        </Section>

        <Section title="8. Limitation of Liability">
            <p>
                Emergyng Energy is not liable for any indirect or incidental damages, emotional or
                otherwise, that result from use (or inability to use) of our tools or platform.
            </p>
        </Section>

        <Section title="9. Contact">
            <p>
                For support, email us at{' '}
                <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">hello@uncoached.space</a>.
            </p>
        </Section>

        <Section title="10. Governing Law">
            <p>
                These Terms are governed by the laws of the Province of Ontario and the federal laws of
                Canada applicable therein, without regard to conflict of law principles.
            </p>
        </Section>
    </LegalLayout>
);

export default TermsPage;
