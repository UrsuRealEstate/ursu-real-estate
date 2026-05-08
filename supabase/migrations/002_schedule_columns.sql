ALTER TABLE contact_settings
  ADD COLUMN IF NOT EXISTS work_days       TEXT DEFAULT 'Mon,Tue,Wed,Thu,Fri',
  ADD COLUMN IF NOT EXISTS work_time_open  TEXT DEFAULT '09:00',
  ADD COLUMN IF NOT EXISTS work_time_close TEXT DEFAULT '18:00';

ALTER TABLE contact_settings DROP COLUMN IF EXISTS work_hours;
