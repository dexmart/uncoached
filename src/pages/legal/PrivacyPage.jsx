import LegalLayout from '../../components/LegalLayout';
import CopyDocument from '../../components/CopyDocument';
import { useCopy } from '../../context/SiteCopyContext';

const PrivacyPage = () => {
    const copy = useCopy();
    return (
        <LegalLayout title="Privacy Policy" subtitle={copy('legal.privacy.effective')}>
            <CopyDocument text={copy('legal.privacy.body')} />
        </LegalLayout>
    );
};

export default PrivacyPage;
