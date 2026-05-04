-- ================================================================
-- CADD CENTRE LANKA — Backfill Missing Student IDs
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
--
-- Updates the generate_student_id() function to CADDSTU-YYYY-NNNN
-- and assigns IDs to any existing students that don't have one.
-- Safe to run multiple times.
-- ================================================================

-- 1. Update generate_student_id function to CADDSTU-YYYY-NNNN format
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  last_num INTEGER;
  yr TEXT;
BEGIN
  yr := TO_CHAR(NOW(), 'YYYY');
  SELECT COALESCE(MAX(CAST(SPLIT_PART(student_id, '-', 3) AS INTEGER)), 0) + 1
    INTO last_num
    FROM public.profiles
    WHERE student_id LIKE 'CADDSTU-' || yr || '-%';
  new_id := 'CADDSTU-' || yr || '-' || LPAD(last_num::TEXT, 4, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update handle_new_user to auto-generate student_id on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_student_id TEXT;
BEGIN
  new_student_id := generate_student_id();
  INSERT INTO public.profiles (id, email, full_name, role, student_id, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'student',
    new_student_id,
    TRUE
  )
  ON CONFLICT (id) DO UPDATE SET
    student_id = COALESCE(public.profiles.student_id, EXCLUDED.student_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Backfill: assign CADDSTU-YYYY-NNNN IDs to existing students who lack one
DO $$
DECLARE
  r RECORD;
  next_num INTEGER;
  yr TEXT;
BEGIN
  yr := TO_CHAR(NOW(), 'YYYY');

  -- Find the current max for this year
  SELECT COALESCE(MAX(CAST(SPLIT_PART(student_id, '-', 3) AS INTEGER)), 0)
    INTO next_num
    FROM public.profiles
    WHERE student_id LIKE 'CADDSTU-' || yr || '-%';

  FOR r IN
    SELECT id FROM public.profiles
    WHERE role = 'student' AND (student_id IS NULL OR student_id = '')
    ORDER BY created_at ASC
  LOOP
    next_num := next_num + 1;
    UPDATE public.profiles
      SET student_id = 'CADDSTU-' || yr || '-' || LPAD(next_num::TEXT, 4, '0')
      WHERE id = r.id;
  END LOOP;
END $$;

-- ================================================================
-- DONE. All students now have CADDSTU-YYYY-NNNN format IDs.
-- ================================================================
