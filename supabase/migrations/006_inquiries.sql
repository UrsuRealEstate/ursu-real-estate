CREATE TABLE IF NOT EXISTS inquiries (
  id             uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name           text        NOT NULL,
  email          text        NOT NULL,
  phone          text,
  message        text,
  property_title text,
  lang           text        DEFAULT 'en',
  is_read        boolean     DEFAULT false,
  created_at     timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
