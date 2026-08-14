import { Router } from "express";
import { supabaseAdmin } from "../supabaseAdmin.js";

const router = Router();

const NOTIFY_TO = process.env.PARTNERSHIP_NOTIFY_TO || "hello@uncoached.space";
// Until the domain is verified in Resend, their shared sender works for testing.
const NOTIFY_FROM = process.env.PARTNERSHIP_NOTIFY_FROM || "onboarding@resend.dev";

const esc = (s) =>
    String(s ?? "")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const FIELDS = [
    ["Name", "full_name"], ["Credentials", "credentials"], ["Email", "email"],
    ["Short bio", "bio"], ["Areas of focus", "areas_of_focus"],
    ["Countries", "countries"], ["Virtual / in-person", "delivery"],
    ["Languages", "languages"], ["Website / booking", "website_url"],
    ["Social media", "social_url"], ["Expertise to contribute", "expertise_area"],
    ["Resource ideas", "resource_ideas"],
];

async function sendNotification(app) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
        console.log("RESEND_API_KEY not set — application saved, notification email skipped.");
        return { sent: false, reason: "no_api_key" };
    }

    const rows = FIELDS
        .filter(([, k]) => app[k])
        .map(([label, k]) => `<tr>
            <td style="padding:6px 12px 6px 0;color:#5E6A65;vertical-align:top;white-space:nowrap"><strong>${label}</strong></td>
            <td style="padding:6px 0;color:#1F2422">${esc(app[k]).replace(/\n/g, "<br>")}</td>
        </tr>`).join("");

    const html = `
        <div style="font-family:Helvetica,Arial,sans-serif;max-width:640px">
            <h2 style="color:#3F5D4D;margin-bottom:4px">New Practitioner Application</h2>
            <p style="color:#8C857A;margin-top:0">${esc(app.full_name)} applied via the Partnership guide.</p>
            ${app.photo_url ? `<p><img src="${esc(app.photo_url)}" alt="" style="max-width:180px;border-radius:12px"></p>` : ""}
            <table style="border-collapse:collapse;font-size:14px">${rows}</table>
            <p style="color:#8C857A;font-size:12px;margin-top:24px">
                Permission to display profile: ${app.consent ? "Yes" : "No"}<br>
                Review and approve in the Uncoached admin.
            </p>
        </div>`;

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: `Uncoached <${NOTIFY_FROM}>`,
                to: [NOTIFY_TO],
                reply_to: app.email,
                subject: `New practitioner application — ${app.full_name}`,
                html,
            }),
        });
        if (!res.ok) {
            console.error("Resend error:", res.status, await res.text());
            return { sent: false, reason: "resend_error" };
        }
        return { sent: true };
    } catch (err) {
        console.error("Notification send failed:", err);
        return { sent: false, reason: "exception" };
    }
}

// Public: submit a practitioner partnership application
router.post("/apply", async (req, res) => {
    const b = req.body || {};

    if (!b.full_name?.trim() || !b.email?.trim()) {
        return res.status(400).json({ error: "Name and email are required." });
    }
    if (!b.consent) {
        return res.status(400).json({ error: "Please confirm permission to display your profile." });
    }

    const application = {
        full_name: b.full_name.trim(),
        credentials: b.credentials?.trim() || null,
        email: b.email.trim(),
        photo_url: b.photo_url || null,
        bio: b.bio?.trim() || null,
        areas_of_focus: b.areas_of_focus?.trim() || null,
        countries: b.countries?.trim() || null,
        delivery: b.delivery || null,
        languages: b.languages?.trim() || null,
        website_url: b.website_url?.trim() || null,
        social_url: b.social_url?.trim() || null,
        expertise_area: b.expertise_area?.trim() || null,
        resource_ideas: b.resource_ideas?.trim() || null,
        consent: true,
    };

    try {
        const { error } = await supabaseAdmin.from("practitioner_applications").insert(application);
        if (error) {
            console.error("Failed to save application:", error);
            return res.status(500).json({ error: "We couldn't save your application. Please try again." });
        }

        // Saved successfully — notify, but never fail the request on email trouble.
        const notice = await sendNotification(application);
        res.json({ success: true, emailed: notice.sent });
    } catch (err) {
        console.error("Application error:", err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

export default router;
