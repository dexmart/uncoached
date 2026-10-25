-- ============================================================================
-- Legal history: keep every version of every legal document, and keep every
-- acceptance record even if the member's account is deleted.
--
-- 1. legal_document_versions keeps a copy of the User Agreement, Terms,
--    Privacy and Billing texts each time Johanna saves a change in Website
--    Text. With an acceptance record's version and date, this shows the exact
--    wording that member accepted. Insert-only: nobody can edit or delete it
--    from the website.
-- 2. document_acceptances keeps the member's email on each record, and a
--    deleted account no longer deletes its records.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

-- ── 1. Acceptance records survive account deletion ──────────────────────────
alter table public.document_acceptances add column if not exists email text;

update public.document_acceptances a
   set email = u.email
  from auth.users u
 where u.id = a.user_id and a.email is null;

alter table public.document_acceptances alter column user_id drop not null;
alter table public.document_acceptances drop constraint if exists document_acceptances_user_id_fkey;
alter table public.document_acceptances
    add constraint document_acceptances_user_id_fkey
    foreign key (user_id) references auth.users(id) on delete set null;

-- The email is copied from the member's account at the moment they accept.
create or replace function public.stamp_acceptance_email()
returns trigger language plpgsql security definer set search_path = public as $$
begin
    select u.email into new.email from auth.users u where u.id = new.user_id;
    return new;
end $$;

drop trigger if exists stamp_acceptance_email on public.document_acceptances;
create trigger stamp_acceptance_email
    before insert on public.document_acceptances
    for each row execute function public.stamp_acceptance_email();

-- ── 2. Every version of every legal text ────────────────────────────────────
create table if not exists public.legal_document_versions (
    id        uuid primary key default gen_random_uuid(),
    doc       text not null check (doc in ('agreement', 'terms', 'privacy', 'billing')),
    version   text,
    body      text not null,
    saved_at  timestamptz not null default now()
);

create index if not exists legal_document_versions_doc_idx
    on public.legal_document_versions (doc, saved_at desc);

alter table public.legal_document_versions enable row level security;

-- Admins read it. Nobody writes it from the website: only the trigger below.
drop policy if exists "admins read legal versions" on public.legal_document_versions;
create policy "admins read legal versions"
    on public.legal_document_versions for select
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));

grant select on public.legal_document_versions to authenticated;
grant all on public.legal_document_versions to service_role;

-- When a legal text or its version changes in Website Text, save a copy.
-- An empty value means "use the original wording", so the last saved copy
-- stands in for it. A copy identical to the last one is not saved again.
create or replace function public.archive_legal_copy()
returns trigger language plpgsql security definer set search_path = public as $$
declare
    k text := coalesce(new.key, old.key);
    d text;
    v text;
    b text;
begin
    if k !~ '^legal\.(agreement|terms|privacy|billing)\.(body|version)$' then
        return null;
    end if;
    d := split_part(k, '.', 2);
    select nullif(trim(value), '') into v from site_copy where key = 'legal.' || d || '.version';
    select nullif(trim(value), '') into b from site_copy where key = 'legal.' || d || '.body';
    if v is null then
        select l.version into v from legal_document_versions l where l.doc = d order by l.saved_at desc limit 1;
    end if;
    if b is null then
        select l.body into b from legal_document_versions l where l.doc = d order by l.saved_at desc limit 1;
    end if;
    if b is null then
        return null;
    end if;
    if exists (
        select 1 from (
            select l.version, l.body from legal_document_versions l
             where l.doc = d order by l.saved_at desc limit 1
        ) last where last.version is not distinct from v and last.body = b
    ) then
        return null;
    end if;
    insert into legal_document_versions (doc, version, body) values (d, v, b);
    return null;
end $$;

drop trigger if exists archive_legal_copy on public.site_copy;
create trigger archive_legal_copy
    after insert or update or delete on public.site_copy
    for each row execute function public.archive_legal_copy();

-- ── 3. Baseline: the wording that is live right now ─────────────────────────
insert into public.legal_document_versions (doc, version, body)
select 'agreement', coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.agreement.version'), $legal$1.0$legal$), coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.agreement.body'), $legal$## What Uncoached is
Uncoached is a self-guided space for reflection. It is not therapy, counselling, coaching, or medical care, and it does not replace them. Nothing here is professional advice, diagnosis or treatment.

## Using it well
Uncoached is designed to support you between sessions with your own professionals. If you are struggling, please reach out to a qualified professional or your local emergency service.

## Your account
Your membership is for you alone. Please keep your sign-in details private and do not share access with anyone else.

## Field, and what you write
Field is an AI companion. It is not a person, not a professional, and its replies are not advice. Your Field conversation stays in your browser for that session only and is not stored by Uncoached.

## Practitioners
Practitioners listed on Uncoached work independently. Uncoached does not employ them and is not responsible for their services. Any arrangement you make with a practitioner is between you and them.

## Changes
If this agreement changes in a meaningful way, you will be asked to read and accept the new version the next time you sign in.$legal$)
where not exists (select 1 from public.legal_document_versions where doc = 'agreement');

insert into public.legal_document_versions (doc, version, body)
select 'terms', coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.terms.version'), $legal$1.0$legal$), coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.terms.body'), $legal$Welcome to Uncoached, a product of Emergyng Energy (a sole proprietorship registered in Canada). These Terms of Use govern your access to and use of our digital tools, including Field, our AI companion, and the Clarity Toolkit.

## 1. Acceptance of Terms
By using our website and digital tools, and downloadable resources (“Services”), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.

## 2. Description of Services & Disclaimers
Uncoached offers self-guided digital wellness tools, including downloadable content and AI-powered reflections. Our tools are designed to support personal reflection. They are not a substitute for professional therapy, counseling, or medical advice. Emergyng Energy is not liable for any damages, emotional or otherwise, that result from use of our tools or platform.

Our Services are for self-reflection and clarity-building only. They are not intended to diagnose, treat, or cure any condition. If you're experiencing emotional distress, please seek support from a qualified professional.

Use of Uncoached does not create a therapist-client, coach-client, healthcare provider-patient, fiduciary, or other professional relationship between you and Emergyng Energy.

Our AI assistant, Field, offers reflective conversation support but is not a therapist, coach, or licensed professional. You use Field at your own discretion, and we make no guarantees about outcomes. Field may occasionally generate inaccurate, incomplete, or inappropriate information. You should use your own judgment and should not rely on Field for medical, legal, financial, or other professional advice.

Features, tools, and content available may evolve over time as part of ongoing updates to the service.

## 3. Payment & Access
Except where required by applicable law, all sales are final. Due to the digital nature of our Services, we do not offer refunds once a payment has been processed.

Your subscription provides access to Field and the Clarity Toolkit, and other tools and add-on tools for the duration of your active billing cycle. If you choose to cancel, you will retain access until the end of your current paid month(s) or paid year. Future tools, expansions, or card bundles may be included in your subscription or offered separately at our discretion.

## 4. User Conduct
You agree not to misuse our tools. You will not share copyrighted content outside of its intended use or engage in any behavior that harms the experience for others. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

You agree not to use Field or any part of the Uncoached experience to share harmful, illegal, threatening, or abusive content. Any such use is strictly prohibited.

## 5. Intellectual Property
All content provided by Uncoached, including AI tools, printable cards, and digital experiences are owned by Emergyng Energy. You're granted a limited, non-transferable license for personal use only. Reproduction, resale, redistribution, or unauthorized sharing is prohibited without written permission.

## 6. Eligibility
You must be at least 18 years old to use Uncoached. If you are under 18, you may only use the Services with the permission and supervision of a parent or legal guardian, where permitted by applicable law.

## 7. Modifications to Terms
We may revise these Terms, including subscription pricing, at any time. Continued use of the service after changes implies acceptance of the updated terms.

## 8. Limitation of Liability
Emergyng Energy is not liable for any indirect or incidental damages, emotional or otherwise, that result from use (or inability to use) of our tools or platform.

## 9. Contact
For support, email us at hello@uncoached.space.

## 10. Governing Law
These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.$legal$)
where not exists (select 1 from public.legal_document_versions where doc = 'terms');

insert into public.legal_document_versions (doc, version, body)
select 'privacy', coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.privacy.version'), $legal$1.0$legal$), coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.privacy.body'), $legal$Uncoached (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, downloadable tools, and our AI companion, Field.

By using Uncoached, you agree to the terms of this Privacy Policy.

## 1. Information We Collect
We collect two main types of information.

Information you provide:
• When you purchase The Uncoached Essentials (via Stripe), we collect your name, email address, and payment details. Payment information is processed securely by Stripe and is never stored by us.
• When you interact with Field, you may provide personal reflections, journal-like entries, or other text responses.
• When you apply to the Practitioner Partnership, we collect the details and headshot you submit in the application form.

Automatically collected information:
• Basic usage data, such as browser type, device type, IP address, and pages visited on our site.
• Email opt-ins (if you subscribe), which include your name and email address.

## 2. How We Use Your Information
• Provide and deliver Uncoached products (printable toolkits, add-on tools, rituals, AI access).
• Enable and improve your experience with Field, our AI companion.
• Review Practitioner Partnership applications and administer the partnership.
• Send you updates you've opted into (e.g., new cards, behind-the-scenes tools, or Field's secret features).
• Maintain and improve site performance and user experience.

## 3. AI Assistant (Field) and Chatbase
When you interact with Field, your entries are processed by our service provider Chatbase, which hosts the AI model on our behalf.
• You do not need a Chatbase account; everything happens directly inside the Uncoached website.
• Your messages are used to generate responses within Field and to operate, maintain, and improve the functionality and quality of the Services. Your entries are not used to train public AI models.
• Chatbase processes information on our behalf in accordance with its applicable privacy and security practices.
• If you delete your cookies, Field will refresh and you will lose any previously stored memories within Field.

We recommend avoiding sensitive personal details (such as medical, financial, or legal information) when using Field.

## 4. How We Share Information
We do not sell your personal data. We only share information in the following limited ways:
• Service providers: With trusted partners like Stripe (for payments) and Chatbase (for Field's AI responses).
• Legal compliance: If required by law or to protect our rights and safety.

## 5. Data Retention
• Email and purchase details are retained as long as necessary for customer support, tax, and legal obligations.
• Entries shared with Field are processed by Chatbase and may be stored for a limited period as necessary to provide the Service and improve reliability.
• Practitioner applications are retained so we can review them and maintain the practitioner community.

## 6. Your Rights
Depending on your location, you may have the right to:
• Access, correct, or delete your personal information.
• Opt out of communications at any time (unsubscribe link provided in every email).
• Request that we limit or stop processing your data.

To exercise these rights, email us at hello@uncoached.space.

## 7. Security
We use reasonable measures to protect your personal information. However, no system is 100% secure, and we cannot guarantee absolute security of your data.

## 8. Children's Privacy
Uncoached is not intended for individuals under 18. We do not knowingly collect personal information from children.

## 9. Updates to This Policy
We may update this Privacy Policy from time to time. When we do, we'll update the effective date at the top of this page. Significant changes will be communicated clearly.

## 10. Contact
For privacy concerns, email us at hello@uncoached.space.$legal$)
where not exists (select 1 from public.legal_document_versions where doc = 'privacy');

insert into public.legal_document_versions (doc, version, body)
select 'billing', coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.billing.version'), $legal$1.0$legal$), coalesce((select nullif(trim(value), '') from public.site_copy where key = 'legal.billing.body'), $legal$## Payment Processing
All payments for Uncoached are securely processed through Stripe. Your membership renews automatically at the end of each billing period, according to the plan you chose, unless you cancel before your next renewal date.

Gift memberships are different: they are paid for once, they do not renew, and they end by themselves on the date shown when the gift is redeemed.

## Refund Policy
Except where required by applicable law, all sales are final. Because our Services are digital and available immediately, we do not offer refunds for membership payments once a payment has been processed.

If you no longer wish to continue, you can cancel at any time. Cancellation takes effect at the end of the period you have already paid for, so you keep your access until then, and no further payments are taken.

## Managing Your Membership
You can view and download your invoices, update your payment method, or cancel your membership at any time from the Billing page inside your membership area.

Signed in? Open Billing & invoices from your membership area, or from your Profile page.

## Questions
If you believe a charge was made in error, or you have any billing concern, please write to us at hello@uncoached.space and we will look into it.$legal$)
where not exists (select 1 from public.legal_document_versions where doc = 'billing');


-- ── Evidence query ──────────────────────────────────────────────────────────
-- The exact wording each member accepted: the last saved copy of that
-- document's version from before they accepted.
--
-- select a.email, a.accepted_at, 'terms' as doc, a.terms_version as version,
--        (select l.body from public.legal_document_versions l
--          where l.doc = 'terms' and l.version is not distinct from a.terms_version
--            and l.saved_at <= a.accepted_at
--          order by l.saved_at desc limit 1) as wording
--   from public.document_acceptances a
--  order by a.accepted_at desc;
