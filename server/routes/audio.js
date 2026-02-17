import { Router } from "express";
import { supabaseAdmin } from "../supabaseAdmin.js";

const router = Router();

// Get signed URL for protected audio files
router.post("/signed-url", async (req, res) => {
    const { userId, path } = req.body;

    if (!userId || !path) {
        return res.status(400).json({ error: "Missing userId or path" });
    }

    // Check if user has active subscription
    const { data: sub, error: subError } = await supabaseAdmin
        .from("subscriptions")
        .select("status")
        .eq("user_id", userId)
        .maybeSingle();

    if (subError) {
        console.error("Subscription check error:", subError);
        return res.status(500).json({ error: "Failed to check subscription" });
    }

    if (!sub || sub.status !== "active") {
        return res.status(403).json({ error: "Subscription inactive or not found" });
    }

    // Create signed URL (expires in 10 minutes)
    const { data, error } = await supabaseAdmin.storage
        .from("audio-files")
        .createSignedUrl(path, 600);

    if (error) {
        console.error("Signed URL error:", error);
        return res.status(500).json({ error: "Failed to create signed URL" });
    }

    res.json({ signedUrl: data.signedUrl });
});

export default router;
