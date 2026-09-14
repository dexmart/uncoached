-- ============================================================================
-- Gate member content behind an active membership (fixes: content readable
-- without paying).
--
-- The problem: every member content table — audio_breaths, guided_shifts,
-- pocket_prompts, clarity_cards, voice_notes, affirmations — has a row-level
-- security policy of "FOR SELECT USING (true)". That means the data is readable
-- by anyone with the public anon key, subscription or not. The only thing
-- stopping a non-member is the website's own redirect, which hides the screen
-- but not the underlying data.
--
-- The fix: a single membership check, applied as the read rule on each content
-- table. A row is readable only if the person asking has an active or trialing
-- subscription, or is an admin. Categories and family/label tables stay public
-- (they are just names, no premium content, and the member pages need them to
-- render).
--
-- Only member and admin screens read these tables — no public marketing page
-- does — so gating them does not affect the public site.
--
-- Run in the Supabase SQL editor. Safe to run more than once.
-- AFTER RUNNING, verify immediately (see the checks at the bottom).
-- ============================================================================

-- One membership check, used by every policy below. SECURITY DEFINER lets it
-- read subscriptions and user_roles regardless of the caller's own row rules,
-- so there is no recursion and it behaves the same for every table.
create or replace function public.has_membership()
    returns boolean
    language sql
    stable
    security definer
    set search_path = public
as $$
    select
        exists (
            select 1 from public.subscriptions s
             where s.user_id = auth.uid()
               and s.status in ('active', 'trialing')
        )
        or exists (
            select 1 from public.user_roles r
             where r.id = auth.uid()
               and r.role = 'admin'
        );
$$;

-- Reset each content table to a clean, known state: members-with-a-membership
-- can read, admins can manage. Server-side writes use the service-role key,
-- which bypasses row rules entirely, so the Stripe webhook and uploads are
-- unaffected.
do $$
declare
    t text;
    p record;
    -- guided_shifts stays unfiltered by is_active so "coming soon" rows still
    -- show to members (with their badge); the rest hide drafts from members.
    read_rule text;
begin
    foreach t in array array[
        'audio_breaths', 'guided_shifts', 'pocket_prompts',
        'clarity_cards', 'voice_notes', 'affirmations'
    ]
    loop
        -- drop whatever policies exist now (named in the dashboard or the repo)
        for p in
            select policyname from pg_policies
             where schemaname = 'public' and tablename = t
        loop
            execute format('drop policy if exists %I on public.%I', p.policyname, t);
        end loop;

        execute format('alter table public.%I enable row level security', t);

        if t in ('audio_breaths', 'guided_shifts') then
            read_rule := 'public.has_membership()';
        else
            read_rule := 'is_active = true and public.has_membership()';
        end if;

        execute format(
            'create policy "Members can view %1$s" on public.%1$s for select using (%2$s)',
            t, read_rule
        );

        execute format($f$
            create policy "Admins manage %1$s" on public.%1$s for all
              using (exists (select 1 from public.user_roles r
                              where r.id = auth.uid() and r.role = 'admin'))
              with check (exists (select 1 from public.user_roles r
                                   where r.id = auth.uid() and r.role = 'admin'))
        $f$, t);
    end loop;
end $$;


-- ── Verify (run these after, as checks) ─────────────────────────────────────
-- 1. As the anon/public key (e.g. a logged-out browser), these should now
--    return ZERO rows:
--       select count(*) from audio_breaths;
--    Before this migration they returned every row.
--
-- 2. Signed in as a paying member, the members area should look exactly as
--    before — every audio, shift, prompt, card, and voice note still loads.
--
-- 3. Signed in as a brand-new account with no membership, the members area
--    should show no content (and the site already redirects it to /pricing).
--
-- ── Rollback (only if members lose access) ──────────────────────────────────
-- Re-open one table to everyone while you investigate:
--    drop policy if exists "Members can view audio_breaths" on public.audio_breaths;
--    create policy "Public read audio_breaths" on public.audio_breaths
--        for select using (true);
