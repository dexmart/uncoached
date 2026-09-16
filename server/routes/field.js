// Field chat proxy. See lib/fieldChat.js for the privacy rules.
// Deliberately never logs request or response bodies.
import { Router } from "express";
import { supabaseAdmin } from "../supabaseAdmin.js";
import { buildChatbaseRequest, memberCanChat } from "../lib/fieldChat.js";

const router = Router();

const DEFAULT_AGENT = "ZQ2IY-75iqOVAi4nuCUFU";

router.post("/chat", async (req, res) => {
    const { accessToken, messages } = req.body || {};
    if (!accessToken) return res.status(401).json({ error: "Please sign in to talk to Field." });

    const apiKey = (process.env.CHATBASE_API_KEY || "").trim();
    if (!apiKey) return res.status(503).json({ error: "Field isn't switched on yet. Please contact hello@uncoached.space." });

    try {
        const { data: { user }, error: authErr } = await supabaseAdmin.auth.getUser(accessToken);
        if (authErr || !user) return res.status(401).json({ error: "Your session has expired — please sign in again." });

        if (!(await memberCanChat(user, supabaseAdmin))) {
            return res.status(403).json({ error: "Field is part of the membership." });
        }

        let request;
        try {
            request = buildChatbaseRequest({
                messages,
                chatbotId: (process.env.CHATBASE_AGENT_ID || DEFAULT_AGENT).trim(),
                apiKey,
                stream: true,
            });
        } catch (e) {
            return res.status(400).json({ error: e.message });
        }

        const upstream = await fetch(request.url, request.init);
        if (!upstream.ok || !upstream.body) {
            // Status only — never the body, which could contain the member's words.
            console.error("Field: ChatBase responded", upstream.status);
            return res.status(502).json({ error: "Field couldn't answer just now. Please try again in a moment." });
        }

        // Stream ChatBase's plain-text chunks straight through to the browser.
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("X-Accel-Buffering", "no");
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            res.write(decoder.decode(value, { stream: true }));
        }
        res.end();
    } catch (err) {
        // Message only — err objects from fetch don't carry bodies, but be safe.
        console.error("Field chat error:", err?.message || "unknown");
        if (!res.headersSent) res.status(500).json({ error: "Field couldn't answer just now. Please try again." });
        else res.end();
    }
});

export default router;
