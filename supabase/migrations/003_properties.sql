CREATE TABLE properties (
  id             TEXT PRIMARY KEY,
  title_en       TEXT NOT NULL DEFAULT '',
  title_ru       TEXT NOT NULL DEFAULT '',
  title_it       TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ru TEXT NOT NULL DEFAULT '',
  description_it TEXT NOT NULL DEFAULT '',
  location_en    TEXT NOT NULL DEFAULT '',
  location_ru    TEXT NOT NULL DEFAULT '',
  location_it    TEXT NOT NULL DEFAULT '',
  city_en        TEXT NOT NULL DEFAULT '',
  city_ru        TEXT NOT NULL DEFAULT '',
  city_it        TEXT NOT NULL DEFAULT '',
  features_en    TEXT NOT NULL DEFAULT '',
  features_ru    TEXT NOT NULL DEFAULT '',
  features_it    TEXT NOT NULL DEFAULT '',
  price          BIGINT NOT NULL DEFAULT 0,
  currency       TEXT NOT NULL DEFAULT '€',
  area           INTEGER NOT NULL DEFAULT 0,
  rooms          SMALLINT NOT NULL DEFAULT 0,
  bathrooms      SMALLINT NOT NULL DEFAULT 0,
  image          TEXT NOT NULL DEFAULT '',
  images         TEXT[] NOT NULL DEFAULT '{}',
  is_active      BOOLEAN DEFAULT true,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active" ON properties
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- Storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties', 'properties', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'properties');

CREATE POLICY "Auth upload storage" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'properties');

CREATE POLICY "Auth update storage" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'properties')
  WITH CHECK (bucket_id = 'properties');

CREATE POLICY "Auth delete storage" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'properties');
