import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PricingPage = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState('');
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const plans = [
        {
            id: 'monthly',
            name: 'Monthly',
            price: '$22',
            period: '/month',
            priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
            description: 'Flexible monthly access',
            features: ['Full access to all features', 'Cancel anytime']
        },
        {
            id: 'quarterly',
            name: '3 Months',
            price: '$62',
            period: '/3 months',
            priceId: import.meta.env.VITE_STRIPE_QUARTERLY_PRICE_ID,
            description: 'Save $4 per month',
            perMonth: '$20.67/mo',
            features: ['Full access to all features', 'Best for trying it out']
        },
        {
            id: 'biannual',
            name: '6 Months',
            price: '$120',
            period: '/6 months',
            priceId: import.meta.env.VITE_STRIPE_BIANNUAL_PRICE_ID,
            description: 'Save $6 per month',
            perMonth: '$20/mo',
            popular: false,
            features: ['Full access to all features', 'Great commitment level']
        },
        {
            id: 'annual',
            name: 'Annual',
            price: '$220',
            period: '/year',
            priceId: import.meta.env.VITE_STRIPE_ANNUAL_PRICE_ID,
            description: 'Best value - Save $44',
            perMonth: '$18.33/mo',
            popular: true,
            features: ['Full access to all features', 'Maximum savings']
        }
    ];

    const handleSelectPlan = async (plan) => {
        // Debug logging
        console.log('Auth state:', { user, authLoading });

        // Wait for auth to finish loading before checking
        if (authLoading) return;

        if (!user) {
            navigate('/signup');
            return;
        }

        setLoading(plan.id);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId: plan.priceId,
                    userId: user.id,
                    userEmail: user.email
                })
            });

            const data = await response.json();

            if (data.url) {
                window.location.assign(data.url);
            } else {
                setError('Failed to create checkout session');
                setLoading(null);
            }
        } catch (err) {
            console.error('Checkout error:', err);
            setError('Something went wrong. Please try again.');
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-bone py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link to="/">
                        <img
                            src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.png"}
                            alt="Uncoached"
                            className="h-16 mx-auto mb-8"
                        />
                    </Link>
                    <h1 className="font-display text-4xl md:text-5xl text-text-dark mb-4">
                        Choose your path
                    </h1>
                    <p className="text-text-muted text-lg max-w-xl mx-auto">
                        Begin your journey to self-connection. Full access to Field, Audio Breaths, Guided Shifts, and everything inside.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="max-w-md mx-auto mb-8 bg-red-50 text-red-600 p-4 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-2xl p-8 shadow-sm border ${plan.popular
                                ? 'border-sage ring-2 ring-sage'
                                : 'border-clay/30'
                                } hover:shadow-lg transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-sage text-bone text-xs font-semibold px-4 py-1 rounded-full">
                                        Best Value
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="font-display text-xl text-text-dark mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="font-display text-4xl text-text-dark">
                                        {plan.price}
                                    </span>
                                    <span className="text-text-muted text-sm">
                                        {plan.period}
                                    </span>
                                </div>
                                {plan.perMonth && (
                                    <p className="text-sage text-sm mt-1 font-medium">
                                        {plan.perMonth}
                                    </p>
                                )}
                                <p className="text-text-muted text-sm mt-2">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-text-muted text-sm">
                                        <svg className="w-5 h-5 text-sage flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSelectPlan(plan)}
                                disabled={loading === plan.id || authLoading}
                                className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular
                                    ? 'bg-sage text-bone hover:bg-sage/90'
                                    : 'bg-charcoal text-bone hover:bg-charcoal/90'
                                    } disabled:opacity-50`}
                            >
                                {loading === plan.id ? 'Loading...' : authLoading ? 'Please wait...' : 'Get Started'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-text-muted text-sm">
                        Secure payment powered by Stripe. Cancel anytime.
                    </p>
                    {!user && (
                        <p className="text-text-muted text-sm mt-4">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-sage hover:underline">
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;
