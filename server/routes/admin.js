import { Router } from "express";
import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "../supabaseAdmin.js";
import { writeBackup } from "../lib/backup.js";

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
            .select("id, user_id, email, accepted, accepted_at, user_agreement_version, terms_version, privacy_version, billing_version")
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
            // The email saved on the record is kept even after the account is deleted.
            records: (rows || []).map((r) => ({
                ...r,
                email: emails.get(r.user_id) || (r.email ? `${r.email} (account deleted)` : "(account deleted)"),
            })),
        });
    } catch (err) {
        console.error("Acceptances lookup failed:", err?.message || "unknown");
        res.status(500).json({ error: "Could not load the records just now." });
    }
});

// Full backup download (see lib/backup.js). The admin page first asks for a
// one-time link with the admin's session, then the browser opens that link, so
// a large ZIP downloads natively instead of being held in the page's memory.
const backupLinks = new Map(); // token -> expiry time
const BACKUP_LINK_MS = 5 * 60 * 1000;

router.post("/backup-link", async (req, res) => {
    try {
        const denied = await requireAdmin(req.body?.accessToken);
        if (denied) return res.status(denied.status).json({ error: denied.error });
        const now = Date.now();
        for (const [t, exp] of backupLinks) if (exp < now) backupLinks.delete(t);
        const token = randomUUID();
        backupLinks.set(token, now + BACKUP_LINK_MS);
        res.json({ path: `/admin/backup/${token}` });
    } catch (err) {
        console.error("Backup link failed:", err?.message || "unknown");
        res.status(500).json({ error: "Could not start the backup just now." });
    }
});

router.get("/backup/:token", async (req, res) => {
    const exp = backupLinks.get(req.params.token);
    backupLinks.delete(req.params.token); // one use only
    if (!exp || exp < Date.now()) {
        return res.status(410).send("This backup link has expired. Go back to the admin and press Download again.");
    }
    const day = new Date().toISOString().slice(0, 10);
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="uncoached-backup-${day}.zip"`);
    try {
        const summary = await writeBackup(supabaseAdmin, res);
        console.log("Backup made:", JSON.stringify({ tables: summary.tables, files: summary.buckets, problems: summary.problems.length }));
    } catch (err) {
        console.error("Backup failed:", err?.message || "unknown");
        res.destroy(err);
    }
});

export default router;
