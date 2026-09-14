-- ============================================================================
-- Afformations, wired to the database so Johanna can edit them.
--
-- Until now the Afformations section was the one member area whose content was
-- hardcoded in the website, so it couldn't be edited from the admin. This
-- creates real tables for it, gated behind an active membership like every
-- other content table, plus the admin's manage rights. The seed below is the
-- exact content that was hardcoded, so the page looks identical afterwards.
--
-- Depends on public.has_membership() from gate-member-content.sql (run that
-- first). Run in the Supabase SQL editor. Safe to run more than once.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────
create table if not exists public.afformation_cards (
    id          uuid primary key default gen_random_uuid(),
    title       text not null,
    tags        text[] not null default '{}',
    sort_order  int not null default 0,
    is_active   boolean not null default true,
    created_at  timestamptz not null default now()
);

create table if not exists public.afformation_questions (
    id          uuid primary key default gen_random_uuid(),
    card_id     uuid not null references public.afformation_cards(id) on delete cascade,
    text        text not null,
    sort_order  int not null default 0,
    created_at  timestamptz not null default now()
);

create index if not exists afformation_questions_card_idx
    on public.afformation_questions(card_id);

-- ── Row-level security ──────────────────────────────────────────────────────
alter table public.afformation_cards enable row level security;
alter table public.afformation_questions enable row level security;

drop policy if exists "Members can view afformation cards" on public.afformation_cards;
drop policy if exists "Admins manage afformation cards" on public.afformation_cards;
drop policy if exists "Members can view afformation questions" on public.afformation_questions;
drop policy if exists "Admins manage afformation questions" on public.afformation_questions;

create policy "Members can view afformation cards" on public.afformation_cards
    for select using (is_active = true and public.has_membership());
create policy "Admins manage afformation cards" on public.afformation_cards
    for all
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'))
    with check (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));

create policy "Members can view afformation questions" on public.afformation_questions
    for select using (public.has_membership());
create policy "Admins manage afformation questions" on public.afformation_questions
    for all
    using (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'))
    with check (exists (select 1 from public.user_roles r where r.id = auth.uid() and r.role = 'admin'));

-- ── Seed (only if empty) ────────────────────────────────────────────────────
do $$
declare c uuid;
begin
    if exists (select 1 from public.afformation_cards) then
        return;
    end if;

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When Anxiety Shows Up', array['Calm','Regulation'], 1);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why does my body know how to return to calm so naturally?', 1),
        (c, 'Why am I becoming so good at settling my nervous system?', 2),
        (c, 'How is calm becoming my natural response more and more?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You''re Waiting for an Answer', array['Trust'], 2);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why do things tend to work out in my favour?', 1),
        (c, 'Why am I so good at trusting the timing of my life?', 2),
        (c, 'Why does patience come more easily to me now?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You Feel Invisible', array['Self-Worth'], 3);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why am I allowed to take up space exactly as I am?', 1),
        (c, 'Why do people naturally appreciate what I bring to a room?', 2),
        (c, 'Why does my presence matter more than I realize?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You Feel Like You Messed Something Up', array['Strength','Self-Trust'], 4);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why am I so good at learning and growing from mistakes?', 1),
        (c, 'Why do challenges keep making me stronger?', 2),
        (c, 'Why do I bounce back more easily than I expect?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You''re Comparing Yourself', array['Self-Worth'], 5);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why is my path unfolding in exactly the right way for me?', 1),
        (c, 'Why do I trust my own timeline more every year?', 2),
        (c, 'Why are my gifts so uniquely valuable?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You Need Permission to Rest', array['Calm','Permission'], 6);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why is it becoming easier for me to honour my need for rest?', 1),
        (c, 'Why does slowing down actually help me thrive?', 2),
        (c, 'Why do I respect my energy more and more?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You''re Overthinking a Decision', array['Trust'], 7);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why does clarity always find me when I give it space?', 1),
        (c, 'Why do I trust myself to make the right choice for me right now?', 2),
        (c, 'Why is it safe for me to move forward, even without all the answers?', 3);

    c := gen_random_uuid();
    insert into public.afformation_cards (id, title, tags, sort_order) values
        (c, 'When You''re Afraid to Take a Risk', array['Strength','Resilience'], 8);
    insert into public.afformation_questions (card_id, text, sort_order) values
        (c, 'Why am I so capable of handling whatever comes next?', 1),
        (c, 'Why does stepping into the unknown keep expanding my life beautifully?', 2),
        (c, 'Why do I believe in my ability to figure things out along the way?', 3);
end $$;
