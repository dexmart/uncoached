// GiftUp gift card redemption. See docs/superpowers/specs/2026-09-08-giftup-redeem-design.md
import { Router } from "express";
import Stripe from "stripe";
import { supabaseAdmin } from "../supabaseAdmin.js";
import { createGiftUpClient, membershipMonths, redemptionProblem } from "../lib/giftup.js";
import { redeemGift, RedeemError } from "../lib/redeemGift.js";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// Built per request so a key added in Render is picked up without a restart.
function giftupClient() {
    const apiKey = (process.env.GIFTUP_API_KEY || "").trim();
    if (!apiKey) return null;
    return createGiftUpClient({ apiKey, testMode: process.env.GIFTUP_TEST_MODE === "true" });
}

const NOT_CONFIGURED = "Gift card redemption isn't switched on yet. Please contact hello@uncoached.space.";

const cleanCode = (code) => String(code || "").trim().toUpperCase();

// What is this code worth? Public and read-only — nothing is redeemed here.
router.post("/check", async (req, res) => {
    const code = cleanCode(req.body?.code);
    if (!code) return res.status(400).json({ ok: false, error: "Enter your gift card code." });

    const giftup = giftupClient();
    if (!giftup) return res.status(503).json({ ok: false, error: NOT_CONFIGURED });

    try {
        const card = await giftup.lookup(code);
        if (!card) return res.status(404).json({ ok: false, error: "We couldn't find a gift card with that code. Check it against the email GiftUp sent you." });

        const problem = redemptionProblem(card);
        if (problem) return res.status(400).json({ ok: false, error: problem });

        const months = membershipMonths(card);
        if (!months) return res.status(400).json({ ok: false, error: "This gift card isn't a membership card we recognise. Please contact hello@uncoached.space." });

        res.json({ ok: true, title: card.title || "", months });
    } catch (err) {
        console.error("Gift check error:", err.message);
        res.status(502).json({ ok: false, error: "We couldn't reach the gift card service. Please try again in a moment." });
    }
});

// Redeem the card for the signed-in user. Identity comes from the JWT, never the body.
router.post("/redeem", async (req, res) => {
    const { accessToken } = req.body || {};
    const code = cleanCode(req.body?.code);
    if (!accessToken) return res.status(401).json({ ok: false, error: "Please sign in to redeem your gift card." });
    if (!code) return res.status(400).json({ ok: false, error: "Enter your gift card code." });

    const giftup = giftupClient();
    if (!giftup) return res.status(503).json({ ok: false, error: NOT_CONFIGURED });

    try {
        const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(accessToken);
        if (authErr || !user) return res.status(401).json({ ok: false, error: "Your session has expired — please sign in again." });

        const result = await redeemGift({ user, code, deps: { giftup, stripe, db: supabaseAdmin } });
        console.log(`Gift ${code} redeemed by ${user.id}: ${result.months} month(s) until ${result.endsOn}`);
        res.json({ ok: true, ...result });
    } catch (err) {
        if (err instanceof RedeemError) return res.status(err.status).json({ ok: false, error: err.message });
        console.error("Gift redeem error:", err);
        res.status(500).json({ ok: false, error: "Something went wrong redeeming your gift card. Nothing has been charged. Please try again or contact hello@uncoached.space." });
    }
});

export default router;
