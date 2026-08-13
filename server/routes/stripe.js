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

        // Acknowledge Stripe immediately so a slow DB/Stripe call can never cause a
        // timeout — timeouts are what got this endpoint auto-disabled before. Then process.
        res.json({ received: true });

        try {
            // Handle checkout session completed
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;

                // One-time high-level Pocket Prompt purchase ($2)
                if (session.metadata?.type === "prompt_purchase") {
                    const { userId: buyerId, promptId } = session.metadata;
                    if (buyerId && promptId) {
                        const { error } = await supabaseAdmin.from("prompt_purchases").upsert(
                            { user_id: buyerId, prompt_id: promptId },
                            { onConflict: "user_id,prompt_id" }
                        );
                        if (error) console.error("Failed to record prompt purchase:", error);
                        else console.log(`Prompt ${promptId} purchased by ${buyerId}`);
                    }
                    return;
                }

                const userId = session.client_reference_id;
                const subId = session.subscription;

                if (userId && subId) {
                    const sub = await stripe.subscriptions.retrieve(subId);

                    const { error } = await supabaseAdmin.from("subscriptions").upsert({
                        user_id: userId,
                        stripe_subscription_id: sub.id,
                        stripe_customer_id: session.customer,
                        status: sub.status,
                        plan: sub.items.data[0]?.price?.nickname || "monthly",
                        current_period_end: new Date(sub.current_period_end * 1000).toISOString()
                    }, { onConflict: "user_id" });

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
        } catch (err) {
            console.error("Webhook processing error:", err);
        }
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

// Create a one-time $2 checkout for a single high-level Pocket Prompt
router.post("/create-prompt-checkout", async (req, res) => {
    const { userId, userEmail, promptId, promptTitle } = req.body;

    if (!userId || !promptId) {
        return res.status(400).json({ error: "Missing userId or promptId" });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    unit_amount: 200, // $2.00
                    product_data: {
                        name: promptTitle ? `High-Level Prompt: ${promptTitle}` : "High-Level Pocket Prompt"
                    }
                },
                quantity: 1
            }],
            success_url: `${process.env.FRONTEND_URL}/dashboard/pocket-prompts?unlocked=${promptId}`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard/pocket-prompts`,
            client_reference_id: userId,
            customer_email: userEmail,
            metadata: { type: "prompt_purchase", userId, promptId }
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Prompt checkout error:", err);
        res.status(500).json({ error: "Failed to create prompt checkout" });
    }
});

// Create customer portal session.
// Accepts a customerId, or resolves the Stripe customer by userEmail.
router.post("/create-portal-session", async (req, res) => {
    const { customerId, userEmail } = req.body;

    try {
        let custId = customerId;

        if (!custId && userEmail) {
            const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
            if (customers.data.length > 0) {
                custId = customers.data[0].id;
            }
        }

        if (!custId) {
            return res.status(404).json({ error: "No Stripe customer found for this account." });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: custId,
            return_url: `${process.env.FRONTEND_URL}/dashboard/profile`
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Portal session error:", err);
        res.status(500).json({ error: "Failed to create portal session" });
    }
});

// Admin-only: repair a member's access by pulling their live Stripe subscription
// and saving the durable record. Caller must be an admin (verified via their JWT).
router.post("/repair-subscription", async (req, res) => {
    const { accessToken, targetEmail } = req.body;

    if (!accessToken || !targetEmail) {
        return res.status(400).json({ error: "Missing accessToken or targetEmail" });
    }

    try {
        // 1. Verify the caller is a signed-in admin
        const { data: { user: caller }, error: authErr } = await supabaseAdmin.auth.getUser(accessToken);
        if (authErr || !caller) return res.status(401).json({ error: "Your session is invalid — please sign in again." });

        const { data: roleRow } = await supabaseAdmin
            .from("user_roles").select("role").eq("id", caller.id).maybeSingle();
        if (roleRow?.role !== "admin") return res.status(403).json({ error: "Admins only." });

        // 2. Find the target user by email
        const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        const target = (list?.users || []).find(
            (u) => (u.email || "").toLowerCase() === targetEmail.trim().toLowerCase()
        );
        if (!target) return res.status(404).json({ error: `No account found for ${targetEmail}` });

        // 3. Find their active Stripe subscription (by email)
        const customers = await stripe.customers.list({ email: targetEmail.trim(), limit: 10 });
        let sub = null, customerId = null;
        for (const c of customers.data) {
            const subs = await stripe.subscriptions.list({ customer: c.id, status: "all", limit: 10 });
            const active = subs.data.find((s) => s.status === "active" || s.status === "trialing");
            if (active) { sub = active; customerId = c.id; break; }
        }
        if (!sub) {
            return res.status(404).json({ error: `No active Stripe subscription found for ${targetEmail}. Check the email they paid with.` });
        }

        // 4. Save the durable record keyed to the user
        const { error: upErr } = await supabaseAdmin.from("subscriptions").upsert({
            user_id: target.id,
            stripe_subscription_id: sub.id,
            stripe_customer_id: customerId,
            status: sub.status,
            plan: sub.items.data[0]?.price?.nickname || "monthly",
            current_period_end: new Date(sub.current_period_end * 1000).toISOString()
        }, { onConflict: "user_id" });
        if (upErr) return res.status(500).json({ error: `Save failed (is the user_id unique constraint added?): ${upErr.message}` });

        res.json({ success: true, email: target.email, status: sub.status });
    } catch (err) {
        console.error("Repair subscription error:", err);
        res.status(500).json({ error: "Repair failed — see server logs." });
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
