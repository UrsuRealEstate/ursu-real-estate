CREATE TABLE contact_settings (
  id         BIGINT PRIMARY KEY DEFAULT 1,
  email      TEXT NOT NULL DEFAULT 'info@ursurealestate.com',
  phone      TEXT NOT NULL DEFAULT '+39 02 1234 5678',
  address    TEXT NOT NULL DEFAULT 'Via Roma 15, 20121 Milano, Italy',
  work_hours TEXT NOT NULL DEFAULT 'Mon — Fri: 9:00 — 18:00',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO contact_settings (id, email, phone, address, work_hours)
VALUES (1, 'info@ursurealestate.com', '+39 02 1234 5678', 'Via Roma 15, 20121 Milano, Italy', 'Mon — Fri: 9:00 — 18:00')
ON CONFLICT DO NOTHING;

ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON contact_settings
  FOR SELECT TO anon, authenticated USING (true);
