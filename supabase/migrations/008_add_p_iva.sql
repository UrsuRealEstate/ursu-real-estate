-- Add P.IVA field to contact_settings
ALTER TABLE contact_settings
  ADD COLUMN IF NOT EXISTS p_iva VARCHAR(27) DEFAULT '';