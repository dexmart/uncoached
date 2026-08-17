import "dotenv/config";
import express from "express";
import cors from "cors";
import audioRoutes from "./routes/audio.js";
import stripeRoutes from "./routes/stripe.js";
import practitionerRoutes from "./routes/practitioners.js";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow Vite dev ports + production frontends
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://uncoached.space",
    "https://www.uncoached.space",
    "https://uncoached.vercel.app",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// JSON parsing (except for Stripe webhook which needs raw body)
app.use((req, res, next) => {
    if (req.originalUrl === "/stripe/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/audio", audioRoutes);
app.use("/stripe", stripeRoutes);
app.use("/practitioners", practitionerRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Uncoached API running on http://localhost:${PORT}`);

    // Which config did this process actually receive? Presence only — never values.
    const need = [
        "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET", "FRONTEND_URL", "RESEND_API_KEY",
    ];
    console.log("CONFIG CHECK:", need.map((k) => `${k}=${process.env[k] ? "yes" : "NO"}`).join("  "));

    // Catch a key pasted with stray whitespace, which looks set but fails auth.
    const rk = process.env.RESEND_API_KEY;
    if (rk && rk !== rk.trim()) console.warn("RESEND_API_KEY has leading/trailing whitespace — trim it.");
});

// Keep the free-tier instance warm so the first login after a quiet spell isn't
// delayed by a ~50s cold start (which can bounce paying members to /pricing).
const SELF_URL = process.env.SELF_URL || process.env.RENDER_EXTERNAL_URL;
if (SELF_URL) {
    setInterval(() => {
        fetch(`${SELF_URL}/health`).catch(() => { /* ignore */ });
    }, 10 * 60 * 1000); // every 10 minutes
}
