-- Neon SQL Editor veya psql ile bir kez çalıştırın.
CREATE TABLE IF NOT EXISTS guestbook_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  message TEXT NOT NULL CHECK (
    char_length(trim(message)) > 0
    AND char_length(message) <= 2000
  ),
  github_id TEXT NOT NULL,
  github_username TEXT NOT NULL,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'approved', 'rejected')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_guestbook_approved_created
  ON guestbook_entry (created_at DESC)
  WHERE status = 'approved';

CREATE INDEX IF NOT EXISTS idx_guestbook_pending
  ON guestbook_entry (created_at ASC)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_guestbook_github_created_at
  ON guestbook_entry (github_id, created_at DESC);
