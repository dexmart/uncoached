-- Add new descriptive columns to pocket_prompts
ALTER TABLE pocket_prompts
ADD COLUMN IF NOT EXISTS when_to_use TEXT,
ADD COLUMN IF NOT EXISTS purpose TEXT,
ADD COLUMN IF NOT EXISTS example_scenario TEXT,
ADD COLUMN IF NOT EXISTS what_free_offers TEXT,
ADD COLUMN IF NOT EXISTS what_premium_offers TEXT;
