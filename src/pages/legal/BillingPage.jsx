import LegalLayout from '../../components/LegalLayout';
import CopyDocument from '../../components/CopyDocument';
import { useCopy } from '../../context/SiteCopyContext';

const BillingPage = () => {
    const copy = useCopy();
    return (
        <LegalLayout title="Billing &amp; Refunds" subtitle={copy('legal.billing.effective')}>
            <CopyDocument text={copy('legal.billing.body')} />
        </LegalLayout>
    );
};

export default BillingPage;
