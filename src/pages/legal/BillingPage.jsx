import { Link } from 'react-router-dom';
import LegalLayout from '../../components/LegalLayout';

const Section = ({ title, children }) => (
    <div className="space-y-3">
        <h2 className="font-display text-xl text-text-dark">{title}</h2>
        {children}
    </div>
);

const BillingPage = () => (
    <LegalLayout title="Billing & Refunds">
        <Section title="Payment Processing">
            <p>
                All payments for Uncoached Essentials are securely processed through Stripe. Your
                subscription renews automatically at the end of each billing period (monthly or annually,
                depending on your plan) unless you cancel before your next renewal date.
            </p>
        </Section>

        <Section title="Refund Policy">
            <p>
                Except where required by applicable law, all sales are final. Due to the digital nature of
                our Services, we do not offer refunds for membership payments once a payment has been
                processed.
            </p>
            <p>
                If you no longer wish to continue, you can cancel your subscription at any time.
                Cancellation takes effect at the end of your current billing period and will prevent any
                future charges.
            </p>
        </Section>

        <Section title="Managing Your Subscription">
            <p>
                You can update your payment method, view or download invoices, and cancel your
                subscription directly through our secure Billing Portal.
            </p>
            <p>
                Signed in? Open the Billing Portal any time from your{' '}
                <Link className="text-sage hover:underline" to="/dashboard/profile">Profile page</Link>.
            </p>
        </Section>

        <Section title="Questions?">
            <p>
                If you believe a charge was made in error, or you have billing concerns, please reach out
                to us at{' '}
                <a className="text-sage hover:underline" href="mailto:hello@uncoached.space">hello@uncoached.space</a>.
            </p>
        </Section>
    </LegalLayout>
);

export default BillingPage;
