-- İletişim formu oranı (Neon) — günlük e-posta başına güvenlik için
CREATE TABLE IF NOT EXISTS contact_submission_guard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  email_normalized TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_guard_email_created
  ON contact_submission_guard (email_normalized, created_at DESC);
