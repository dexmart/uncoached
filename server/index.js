import "dotenv/config";
import express from "express";
import cors from "cors";
import audioRoutes from "./routes/audio.js";
import stripeRoutes from "./routes/stripe.js";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration - allow Vite dev ports + production frontend
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
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

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Uncoached API running on http://localhost:${PORT}`);
});
