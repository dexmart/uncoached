import LegalLayout from '../../components/LegalLayout';

const PrivacyPage = () => (
    <LegalLayout title="Privacy Policy" subtitle="Final copy coming soon">
        <p>
            Our full Privacy Policy is being finalized and will appear here shortly.
        </p>
        <p>
            If you have any questions about your data in the meantime, reach us at{' '}
            <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">
                hello@uncoached.space
            </a>.
        </p>
    </LegalLayout>
);

export default PrivacyPage;
