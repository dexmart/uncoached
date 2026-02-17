import { Router } from "express";
import express from "express";
import Stripe from "stripe";
import { supabaseAdmin } from "../supabaseAdmin.js";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20"
});

// Stripe webhook endpoint
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const sig = req.headers["stripe-signature"];

        let event;
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.error("Webhook signature verification failed:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle checkout session completed
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const userId = session.client_reference_id;
            const subId = session.subscription;

            if (userId && subId) {
                const sub = await stripe.subscriptions.retrieve(subId);

                const { error } = await supabaseAdmin.from("subscriptions").upsert({
                    user_id: userId,
                    stripe_subscription_id: sub.id,
                    status: sub.status,
                    plan: sub.items.data[0]?.price?.nickname || "monthly",
                    current_period_end: new Date(sub.current_period_end * 1000).toISOString()
                });

                if (error) {
                    console.error("Failed to update subscription:", error);
                } else {
                    console.log(`Subscription created for user ${userId}`);
                }
            }
        }

        // Handle subscription updated
        if (event.type === "customer.subscription.updated") {
            const sub = event.data.object;

            const { error } = await supabaseAdmin
                .from("subscriptions")
                .update({
                    status: sub.status,
                    current_period_end: new Date(sub.current_period_end * 1000).toISOString()
                })
                .eq("stripe_subscription_id", sub.id);

            if (error) {
                console.error("Failed to update subscription:", error);
            }
        }

        // Handle subscription deleted/cancelled
        if (event.type === "customer.subscription.deleted") {
            const sub = event.data.object;

            const { error } = await supabaseAdmin
                .from("subscriptions")
                .update({ status: "cancelled" })
                .eq("stripe_subscription_id", sub.id);

            if (error) {
                console.error("Failed to cancel subscription:", error);
            }
        }

        res.json({ received: true });
    }
);

// Create checkout session
router.post("/create-checkout-session", async (req, res) => {
    const { priceId, userId, userEmail } = req.body;

    if (!priceId || !userId) {
        return res.status(400).json({ error: "Missing priceId or userId" });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            allow_promotion_codes: true,
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing?cancelled=true`,
            client_reference_id: userId,
            customer_email: userEmail
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Checkout session error:", err);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

// Create customer portal session
router.post("/create-portal-session", async (req, res) => {
    const { customerId } = req.body;

    if (!customerId) {
        return res.status(400).json({ error: "Missing customerId" });
    }

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.FRONTEND_URL}/dashboard`
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Portal session error:", err);
        res.status(500).json({ error: "Failed to create portal session" });
    }
});

// Verify subscription status directly from Stripe
router.post("/verify-subscription", async (req, res) => {
    const { userId, userEmail } = req.body;

    if (!userId || !userEmail) {
        return res.status(400).json({ error: "Missing userId or userEmail" });
    }

    try {
        // Search for the customer in Stripe by email
        const customers = await stripe.customers.list({
            email: userEmail,
            limit: 1
        });

        if (customers.data.length === 0) {
            return res.json({ subscribed: false });
        }

        const customer = customers.data[0];

        // Get active subscriptions for this customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: "active",
            limit: 1
        });

        if (subscriptions.data.length === 0) {
            // Also check for trialing status
            const trialingSubs = await stripe.subscriptions.list({
                customer: customer.id,
                status: "trialing",
                limit: 1
            });

            if (trialingSubs.data.length === 0) {
                return res.json({ subscribed: false });
            }

            subscriptions.data = trialingSubs.data;
        }

        const sub = subscriptions.data[0];

        // Upsert into Supabase so the frontend can detect it
        const { error } = await supabaseAdmin.from("subscriptions").upsert({
            user_id: userId,
            stripe_subscription_id: sub.id,
            stripe_customer_id: customer.id,
            status: sub.status,
            plan: sub.items.data[0]?.price?.nickname || "monthly",
            current_period_end: new Date(sub.current_period_end * 1000).toISOString()
        }, { onConflict: "user_id" });

        if (error) {
            console.error("Failed to upsert subscription:", error);
        }

        res.json({
            subscribed: true,
            status: sub.status,
            plan: sub.items.data[0]?.price?.nickname || "monthly"
        });
    } catch (err) {
        console.error("Verify subscription error:", err);
        res.status(500).json({ error: "Failed to verify subscription" });
    }
});

export default router;
