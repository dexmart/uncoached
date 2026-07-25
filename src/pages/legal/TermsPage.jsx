import LegalLayout from '../../components/LegalLayout';

const TermsPage = () => (
    <LegalLayout title="Terms of Service" subtitle="Final copy coming soon">
        <p>
            Our full Terms of Service are being finalized and will appear here shortly.
        </p>
        <p>
            If you have any questions in the meantime, reach us at{' '}
            <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">
                hello@uncoached.space
            </a>.
        </p>
    </LegalLayout>
);

export default TermsPage;
