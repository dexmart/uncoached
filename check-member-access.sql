-- ============================================================================
-- Why does each account behave differently? (Final audit, item 2)
--
-- Read-only. Changes nothing. Run in the Supabase SQL editor and send Boye the
-- result.
--
-- What decides whether someone gets into the members area, in this order:
--   1. an `subscriptions` row for them with status 'active' or 'trialing'
--   2. OR they are an admin in `user_roles` — admins always get in, by design
--   3. failing both, the site asks Stripe directly by email address, and if
--      Stripe has a live subscription it writes the row and lets them in
-- The same rule guards the content itself in the database (has_membership()),
-- so there is no way past it by fiddling with the browser.
-- ============================================================================

select
    u.email,
    u.id                                            as user_id,
    u.created_at                                    as account_created,
    coalesce(r.role, '—')                           as role,
    case when r.role = 'admin'
         then 'ADMIN — gets in without paying, by design'
         else '' end                                as admin_note,
    coalesce(s.status, 'no subscription row')       as subscription_status,
    coalesce(s.plan, '—')                           as plan,
    s.current_period_end,
    coalesce(s.stripe_customer_id, '—')             as stripe_customer,
    coalesce(s.stripe_subscription_id, '—')         as stripe_subscription,
    (select count(*) from public.prompt_purchases p where p.user_id = u.id) as prompts_bought,
    case
        when r.role = 'admin'                                   then 'IN (admin)'
        when s.status in ('active', 'trialing')                 then 'IN (paid/gift)'
        else 'OUT — sent to pricing'
    end                                             as verdict
from auth.users u
left join public.user_roles     r on r.id      = u.id
left join public.subscriptions  s on s.user_id = u.id
where lower(u.email) in (
    'jjckomar@gmail.com',
    'johanna.komar.va@gmail.com',
    'johanna.komar@va.thevirtualgurus.com'
)
order by u.created_at;


-- ── Everyone who can currently reach the members area ───────────────────────
-- Sanity check before launch: this should be Johanna's admin account(s) plus
-- anyone genuinely paying. Anybody else here is a problem.
select
    u.email,
    coalesce(r.role, '—')                     as role,
    coalesce(s.status, 'none')                as subscription_status,
    coalesce(s.plan, '—')                     as plan,
    case when r.role = 'admin' then 'admin bypass' else 'subscription' end as why_in
from auth.users u
left join public.user_roles    r on r.id      = u.id
left join public.subscriptions s on s.user_id = u.id
where r.role = 'admin'
   or s.status in ('active', 'trialing')
order by why_in, u.email;


-- ── Every admin ─────────────────────────────────────────────────────────────
-- Admins skip payment. If a test account is listed here that shouldn't be,
-- remove it with:  delete from public.user_roles where id = '<user_id>';
select u.email, r.role
from public.user_roles r
join auth.users u on u.id = r.id
order by u.email;
