-- 1) Position for display ordering
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- 2) Sold flag
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS is_sold BOOLEAN DEFAULT false;

-- 3) WhatsApp in contact_settings
ALTER TABLE contact_settings
  ADD COLUMN IF NOT EXISTS whatsapp TEXT DEFAULT '';

-- 4) Drop work schedule columns
ALTER TABLE contact_settings
  DROP COLUMN IF EXISTS work_days,
  DROP COLUMN IF EXISTS work_time_open,
  DROP COLUMN IF EXISTS work_time_close;
