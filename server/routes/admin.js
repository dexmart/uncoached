import { Router } from "express";
import { supabaseAdmin } from "../supabaseAdmin.js";

const router = Router();

// The caller must be a signed-in admin, checked from their own session token.
async function requireAdmin(accessToken) {
    if (!accessToken) return { status: 401, error: "Please sign in again." };
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    if (error || !user) return { status: 401, error: "Your session is invalid. Please sign in again." };
    const { data: roleRow } = await supabaseAdmin
        .from("user_roles").select("role").eq("id", user.id).maybeSingle();
    if (roleRow?.role !== "admin") return { status: 403, error: "Admins only." };
    return null;
}

// User Agreement acceptance records, newest first, with each member's email
// alongside. Emails live in Supabase's auth system, which the browser can't
// read, so this is the one place they're joined up. Read-only: the records
// themselves can't be changed by anyone.
router.post("/acceptances", async (req, res) => {
    try {
        const denied = await requireAdmin(req.body?.accessToken);
        if (denied) return res.status(denied.status).json({ error: denied.error });

        const { data: rows, error } = await supabaseAdmin
            .from("document_acceptances")
            .select("id, user_id, accepted, accepted_at, user_agreement_version, terms_version, privacy_version, billing_version")
            .order("accepted_at", { ascending: false })
            .limit(5000);
        if (error) return res.status(500).json({ error: error.message });

        const emails = new Map();
        for (let page = 1; page <= 20; page++) {
            const { data } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
            const users = data?.users || [];
            users.forEach((u) => emails.set(u.id, u.email || ""));
            if (users.length < 1000) break;
        }

        res.json({
            records: (rows || []).map((r) => ({ ...r, email: emails.get(r.user_id) || "(account deleted)" })),
        });
    } catch (err) {
        console.error("Acceptances lookup failed:", err?.message || "unknown");
        res.status(500).json({ error: "Could not load the records just now." });
    }
});

export default router;
