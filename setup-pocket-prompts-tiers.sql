-- ================================================================================================
-- UNCOACHED - POCKET PROMPTS UPGRADE: FREE & PREMIUM TIERS
-- Details: Renames the existing `prompt` column to `content_free` so old data is kept as the free tier.
--          Adds a new `content_premium` TEXT column for subscribers.
--          Updates the "member read access" RLS policy so non-subscribers can freely query it. (UI handles locking)
-- ================================================================================================

-- 1. Rename existing column to preserve the seed data as the "free" part
ALTER TABLE public.pocket_prompts RENAME COLUMN prompt TO content_free;

-- 2. Add the new premium column
ALTER TABLE public.pocket_prompts ADD COLUMN IF NOT EXISTS content_premium TEXT;
