-- ============================================================
-- SCHOLAR SYNC — PHASE 1 & 2 MIGRATION
-- Run this in your Supabase SQL Editor AFTER the main schema
-- ============================================================

-- ── ADD PROGRESS FIELD TO ENROLLMENTS ────────────────────────
ALTER TABLE public.enrollments
  ADD COLUMN IF NOT EXISTS progress INTEGER NOT NULL DEFAULT 0
    CHECK (progress >= 0 AND progress <= 100);

-- ── ENROLLMENT: allow students to update their OWN progress ──
DROP POLICY IF EXISTS "enrollments_update_own" ON public.enrollments;

CREATE POLICY "enrollments_update_own"
  ON public.enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- ── EVENT REGISTRATIONS: allow students to cancel own ────────
DROP POLICY IF EXISTS "event_reg_update_own" ON public.event_registrations;

CREATE POLICY "event_reg_update_own"
  ON public.event_registrations FOR UPDATE
  USING (auth.uid() = user_id);

-- ── PROFILES: ensure select_own and admin are not duplicated ─
-- (Idempotent — safe to re-run)
DROP POLICY IF EXISTS "profiles_select_own"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own"   ON public.profiles;

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin"
  ON public.profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_admin"
  ON public.profiles FOR UPDATE
  USING (is_admin());

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── STORAGE BUCKET FOR AVATARS ────────────────────────────────
-- Run this to allow avatar uploads (adjust to your project)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
-- ON CONFLICT DO NOTHING;

-- Storage policy: authenticated users can upload their own avatar
-- CREATE POLICY "avatars_insert_own" ON storage.objects
--   FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ── VERIFICATION ──────────────────────────────────────────────
-- Check column was added:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'enrollments' AND column_name = 'progress';
