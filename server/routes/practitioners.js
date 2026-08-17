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

async function send({ to, subject, html, replyTo }) {
    const key = process.env.RESEND_API_KEY;
    if (!key) return { ok: false, reason: "no_api_key" };
    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: `Uncoached <${NOTIFY_FROM}>`,
                to: [to],
                ...(replyTo ? { reply_to: replyTo } : {}),
                subject,
                html,
            }),
        });
        if (!res.ok) {
            console.error("Resend error:", res.status, await res.text());
            return { ok: false, reason: "resend_error" };
        }
        return { ok: true };
    } catch (err) {
        console.error("Send failed:", err);
        return { ok: false, reason: "exception" };
    }
}

/** Warm confirmation to the practitioner who applied. */
function applicantConfirmation(app) {
    const first = (app.full_name || "there").trim().split(/\s+/)[0];
    return `
    <div style="font-family:Georgia,'Times New Roman',serif;max-width:560px;color:#1F2422;line-height:1.7">
        <p style="font-size:17px;color:#3F5D4D;margin:0 0 18px">Thank you, ${esc(first)}.</p>
        <p style="margin:0 0 16px">
            Your application to the Uncoached Practitioner Partnership has arrived safely, and
            I'm really glad you reached out.
        </p>
        <p style="margin:0 0 16px">
            I read every application personally, so it may take me a little time to come back to
            you. If it feels like a good fit, I'll be in touch by email with a link to book a call
            so we can talk through your idea together.
        </p>
        <p style="margin:0 0 16px">
            In the meantime there's nothing you need to do. Thank you for being willing to share
            your work with the people who need it.
        </p>
        <p style="margin:24px 0 4px;color:#3F5D4D">Warmly,</p>
        <p style="margin:0;font-size:17px;color:#3F5D4D">Johanna</p>
        <p style="margin:2px 0 0;font-size:12px;color:#8C857A">Founder, Uncoached · uncoached.space</p>
    </div>`;
}

async function sendNotification(app) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
        console.log("RESEND_API_KEY not set — application saved, emails skipped.");
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

    // Notify Johanna, and confirm receipt to the applicant. Independent of each
    // other so one failing never blocks the other.
    const [toOwner, toApplicant] = await Promise.all([
        send({
            to: NOTIFY_TO,
            replyTo: app.email,
            subject: `New practitioner application — ${app.full_name}`,
            html,
        }),
        send({
            to: app.email,
            replyTo: NOTIFY_TO,
            subject: "Thank you — your Uncoached Practitioner application",
            html: applicantConfirmation(app),
        }),
    ]);

    return { sent: toOwner.ok, confirmed: toApplicant.ok };
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

        // Saved successfully — email, but never fail the request on email trouble.
        const notice = await sendNotification(application);
        res.json({ success: true, emailed: notice.sent, confirmed: notice.confirmed });
    } catch (err) {
        console.error("Application error:", err);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
});

export default router;
