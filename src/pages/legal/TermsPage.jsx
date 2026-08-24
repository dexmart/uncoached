import LegalLayout from '../../components/LegalLayout';
import CopyDocument from '../../components/CopyDocument';
import { useCopy } from '../../context/SiteCopyContext';

const TermsPage = () => {
    const copy = useCopy();
    return (
        <LegalLayout title="Terms of Use" subtitle={copy('legal.terms.effective')}>
            <CopyDocument text={copy('legal.terms.body')} />
        </LegalLayout>
    );
};

export default TermsPage;
