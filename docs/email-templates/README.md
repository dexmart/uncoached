# Uncoached auth emails

Branded replacements for Supabase's default auth emails (the plain "Confirm Your
Signup" one). Each file is ready to paste into the Supabase dashboard, and each
keeps Supabase's own link placeholder so sign-in and reset links keep working.

`_base-preview.html` is only a browser preview — do not paste it anywhere.

## 1. Use the branded templates

Supabase dashboard → **Authentication → Emails → Templates**. For each template
below, switch the editor to HTML (the `</>` / "Source" view), delete what's
there, paste the file's contents, and Save.

| Supabase template   | File                  |
|---------------------|-----------------------|
| Confirm signup      | `confirm-signup.html` |
| Reset password      | `reset-password.html` |
| Magic Link          | `magic-link.html`     |
| Change Email Address| `change-email.html`   |

The link placeholder inside each file is `{{ .ConfirmationURL }}` — leave it
exactly as-is, that is what Supabase fills in per email.

## 2. Send them through Resend (so they come from Uncoached, not "Supabase")

By default these send from Supabase's shared mail server, which is why they read
as "Supabase Auth" and often land in spam. Point Supabase at Resend instead —
the same service the partnership emails already use, on the verified
`uncoached.space` domain.

Supabase dashboard → **Project Settings → Authentication → SMTP Settings** →
enable **Custom SMTP** and enter:

| Field          | Value                     |
|----------------|---------------------------|
| Host           | `smtp.resend.com`         |
| Port           | `465`                     |
| Username       | `resend`                  |
| Password       | a Resend API key          |
| Sender email   | `noreply@uncoached.space` |
| Sender name    | `Uncoached`               |

The Resend API key can be the existing one or a new one made at
resend.com → API Keys. `uncoached.space` is already verified in Resend, so
`noreply@uncoached.space` will send without extra setup.

After saving, send yourself a password reset from the site to confirm it arrives
from Uncoached and looks right.
