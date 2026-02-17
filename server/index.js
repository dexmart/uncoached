import "dotenv/config";
import express from "express";
import cors from "cors";
import audioRoutes from "./routes/audio.js";
import stripeRoutes from "./routes/stripe.js";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow both common Vite ports
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
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

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Uncoached API running on http://localhost:${PORT}`);
});
