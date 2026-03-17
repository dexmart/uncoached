-- Add field_integration_prompt column to guided_shifts table
ALTER TABLE public.guided_shifts
ADD COLUMN IF NOT EXISTS field_integration_prompt TEXT;
