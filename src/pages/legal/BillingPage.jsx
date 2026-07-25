import { Link } from 'react-router-dom';
import LegalLayout from '../../components/LegalLayout';

const BillingPage = () => (
    <LegalLayout title="Billing & Refunds">
        <h2 className="font-display text-xl text-text-dark">Managing Your Subscription</h2>
        <p>
            You can update your payment method, view or download invoices, and cancel your
            subscription directly through our secure Billing Portal.
        </p>
        <p>
            Signed in? Open the Billing Portal any time from your{' '}
            <Link className="text-sage hover:underline" to="/dashboard/profile">Profile page</Link>.
        </p>

        <h2 className="font-display text-xl text-text-dark pt-2">Renewals &amp; Cancellation</h2>
        <p>
            Memberships renew automatically at the end of each billing period. You can cancel any
            time before renewal to stop future charges — your access continues until the end of the
            period you've already paid for.
        </p>

        <h2 className="font-display text-xl text-text-dark pt-2">Refunds</h2>
        <p>
            Our full refund policy is being finalized and will appear here shortly.
        </p>
        <p>
            Questions about a charge? Email{' '}
            <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">
                hello@uncoached.space
            </a>.
        </p>
    </LegalLayout>
);

export default BillingPage;
