-- ============================================================
-- Migration: Add progress column to enrollments table
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Add progress column (defaults to 0, so existing rows are unaffected)
ALTER TABLE public.enrollments
  ADD COLUMN IF NOT EXISTS progress INTEGER NOT NULL DEFAULT 0
    CHECK (progress >= 0 AND progress <= 100);

-- Reload PostgREST schema cache so the new column is immediately visible
-- (fixes "Could not find the 'progress' column in the schema cache" error)
NOTIFY pgrst, 'reload schema';
