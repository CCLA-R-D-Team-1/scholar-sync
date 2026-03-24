-- ============================================================
-- SCHOLAR SYNC — COMPLETE SUPABASE SCHEMA
-- Run this entire script in your Supabase SQL Editor
-- ============================================================

-- ── EXTENSIONS ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── PROFILES ────────────────────────────────────────────────
-- Extends Supabase auth.users with application-level data
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  full_name     TEXT,
  phone         TEXT,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  avatar_url    TEXT,
  university    TEXT,
  year_of_study TEXT,
  major         TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── COURSES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.courses (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  short_description TEXT,
  price           NUMERIC(10, 2) NOT NULL DEFAULT 0,
  original_price  NUMERIC(10, 2),
  duration        TEXT,
  level           TEXT NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category        TEXT NOT NULL DEFAULT '',
  instructor      TEXT NOT NULL DEFAULT '',
  seats           INTEGER NOT NULL DEFAULT 30,
  enrolled_count  INTEGER NOT NULL DEFAULT 0,
  rating          NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count    INTEGER NOT NULL DEFAULT 0,
  image_url       TEXT,
  tags            TEXT[] NOT NULL DEFAULT '{}',
  syllabus        TEXT[] NOT NULL DEFAULT '{}',
  start_date      DATE,
  end_date        DATE,
  schedule        TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── EVENTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug             TEXT UNIQUE NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  short_description TEXT,
  start_date       DATE NOT NULL,
  end_date         DATE,
  start_time       TIME,
  end_time         TIME,
  venue            TEXT NOT NULL,
  capacity         INTEGER NOT NULL DEFAULT 100,
  booked_count     INTEGER NOT NULL DEFAULT 0,
  price            NUMERIC(10, 2) NOT NULL DEFAULT 0,
  category         TEXT NOT NULL DEFAULT '',
  organizer        TEXT NOT NULL DEFAULT '',
  image_url        TEXT,
  tags             TEXT[] NOT NULL DEFAULT '{}',
  agenda           JSONB NOT NULL DEFAULT '[]',
  speakers         JSONB NOT NULL DEFAULT '[]',
  is_active        BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── ENROLLMENTS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.enrollments (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id      UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status         TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  amount_paid    NUMERIC(10, 2) NOT NULL DEFAULT 0,
  progress       INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- ── EVENT REGISTRATIONS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id       UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  quantity       INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  status         TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  amount_paid    NUMERIC(10, 2) NOT NULL DEFAULT 0,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── CONTACT MESSAGES ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_courses_is_active    ON public.courses(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_is_featured  ON public.courses(is_featured);
CREATE INDEX IF NOT EXISTS idx_courses_slug         ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_events_is_active     ON public.events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_is_featured   ON public.events(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_slug          ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_start_date    ON public.events(start_date);
CREATE INDEX IF NOT EXISTS idx_enrollments_user     ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course   ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_user       ON public.event_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_event      ON public.event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read     ON public.contact_messages(is_read);

-- ── TRIGGERS: updated_at ──────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_profiles_updated_at    ON public.profiles;
DROP TRIGGER IF EXISTS trg_courses_updated_at     ON public.courses;
DROP TRIGGER IF EXISTS trg_events_updated_at      ON public.events;
DROP TRIGGER IF EXISTS trg_enrollments_updated_at ON public.enrollments;
DROP TRIGGER IF EXISTS trg_event_reg_updated_at   ON public.event_registrations;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_enrollments_updated_at
  BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_event_reg_updated_at
  BEFORE UPDATE ON public.event_registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── HELPER FUNCTIONS (RPC) ────────────────────────────────────

-- Safely increment enrolled_count for a course
CREATE OR REPLACE FUNCTION increment_enrolled_count(course_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.courses
  SET enrolled_count = enrolled_count + 1
  WHERE id = course_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely increment booked_count for an event
CREATE OR REPLACE FUNCTION increment_booked_count(event_id UUID, qty INTEGER DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE public.events
  SET booked_count = booked_count + qty
  WHERE id = event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── AUTO-CREATE PROFILE ON SIGNUP ─────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    'student',
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────

ALTER TABLE public.profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages    ENABLE ROW LEVEL SECURITY;

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ── PROFILES RLS ──────────────────────────────────────────────
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

-- ── COURSES RLS ───────────────────────────────────────────────
DROP POLICY IF EXISTS "courses_select_active"  ON public.courses;
DROP POLICY IF EXISTS "courses_select_admin"   ON public.courses;
DROP POLICY IF EXISTS "courses_insert_admin"   ON public.courses;
DROP POLICY IF EXISTS "courses_update_admin"   ON public.courses;
DROP POLICY IF EXISTS "courses_delete_admin"   ON public.courses;

-- Anyone can read active courses (public listing)
CREATE POLICY "courses_select_active"
  ON public.courses FOR SELECT
  USING (is_active = TRUE);

-- Admins can read all courses (incl. inactive)
CREATE POLICY "courses_select_admin"
  ON public.courses FOR SELECT
  USING (is_admin());

CREATE POLICY "courses_insert_admin"
  ON public.courses FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "courses_update_admin"
  ON public.courses FOR UPDATE
  USING (is_admin());

CREATE POLICY "courses_delete_admin"
  ON public.courses FOR DELETE
  USING (is_admin());

-- ── EVENTS RLS ────────────────────────────────────────────────
DROP POLICY IF EXISTS "events_select_active" ON public.events;
DROP POLICY IF EXISTS "events_select_admin"  ON public.events;
DROP POLICY IF EXISTS "events_insert_admin"  ON public.events;
DROP POLICY IF EXISTS "events_update_admin"  ON public.events;
DROP POLICY IF EXISTS "events_delete_admin"  ON public.events;

CREATE POLICY "events_select_active"
  ON public.events FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "events_select_admin"
  ON public.events FOR SELECT
  USING (is_admin());

CREATE POLICY "events_insert_admin"
  ON public.events FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "events_update_admin"
  ON public.events FOR UPDATE
  USING (is_admin());

CREATE POLICY "events_delete_admin"
  ON public.events FOR DELETE
  USING (is_admin());

-- ── ENROLLMENTS RLS ───────────────────────────────────────────
DROP POLICY IF EXISTS "enrollments_select_own"   ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_select_admin" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_insert_own"   ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_update_admin" ON public.enrollments;

CREATE POLICY "enrollments_select_own"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "enrollments_select_admin"
  ON public.enrollments FOR SELECT
  USING (is_admin());

CREATE POLICY "enrollments_insert_own"
  ON public.enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "enrollments_update_admin"
  ON public.enrollments FOR UPDATE
  USING (is_admin());

-- ── EVENT REGISTRATIONS RLS ───────────────────────────────────
DROP POLICY IF EXISTS "event_reg_select_own"   ON public.event_registrations;
DROP POLICY IF EXISTS "event_reg_select_admin" ON public.event_registrations;
DROP POLICY IF EXISTS "event_reg_insert_own"   ON public.event_registrations;
DROP POLICY IF EXISTS "event_reg_update_admin" ON public.event_registrations;

CREATE POLICY "event_reg_select_own"
  ON public.event_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "event_reg_select_admin"
  ON public.event_registrations FOR SELECT
  USING (is_admin());

CREATE POLICY "event_reg_insert_own"
  ON public.event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "event_reg_update_admin"
  ON public.event_registrations FOR UPDATE
  USING (is_admin());

-- ── CONTACT MESSAGES RLS ─────────────────────────────────────
DROP POLICY IF EXISTS "messages_insert_any"  ON public.contact_messages;
DROP POLICY IF EXISTS "messages_select_admin" ON public.contact_messages;
DROP POLICY IF EXISTS "messages_update_admin" ON public.contact_messages;

-- Anyone (even anon) can submit a contact message
CREATE POLICY "messages_insert_any"
  ON public.contact_messages FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "messages_select_admin"
  ON public.contact_messages FOR SELECT
  USING (is_admin());

CREATE POLICY "messages_update_admin"
  ON public.contact_messages FOR UPDATE
  USING (is_admin());

-- ── SEED: MAKE A USER ADMIN ───────────────────────────────────
-- After you register your first account, run this to make it admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';

-- ── SAMPLE DATA ───────────────────────────────────────────────
INSERT INTO public.courses (slug, title, description, short_description, price, original_price, duration, level, category, instructor, seats, image_url, tags, syllabus, start_date, end_date, schedule, is_active, is_featured)
VALUES
(
  'advanced-web-development',
  'Advanced Web Development with React & Next.js',
  'Master modern web development with React, Next.js, and TypeScript. Build production-ready applications with best practices and industry-standard tooling. This comprehensive course takes you from intermediate to advanced level through hands-on projects and real-world scenarios.',
  'Build production-ready apps with React, Next.js & TypeScript',
  45000, 60000, '12 weeks', 'Advanced', 'Web Development', 'Mr. Imamdeen', 30,
  NULL,
  ARRAY['React', 'Next.js', 'TypeScript', 'Full Stack'],
  ARRAY['React Fundamentals & Hooks', 'Next.js App Router & Server Components', 'TypeScript Integration', 'State Management with Zustand', 'Database Integration with Supabase', 'Authentication & Authorization', 'Deployment & Performance Optimization'],
  '2025-08-01', '2025-10-26', 'Mon, Wed, Fri — 9:00 AM to 3:00 PM', TRUE, TRUE
),
(
  'data-science-python',
  'Data Science & Machine Learning with Python',
  'Comprehensive course covering data analysis, visualization, and machine learning using Python and popular libraries including NumPy, Pandas, Scikit-learn and TensorFlow. Includes 3 real-world capstone projects.',
  'Comprehensive data analysis & ML with Python',
  55000, 75000, '16 weeks', 'Intermediate', 'Data Science', 'Ms. Hiruni Piyumika', 25,
  NULL,
  ARRAY['Python', 'Machine Learning', 'Data Analysis', 'AI', 'TensorFlow'],
  ARRAY['Python for Data Science', 'NumPy & Pandas', 'Data Visualization with Matplotlib & Seaborn', 'Statistical Analysis', 'Machine Learning Algorithms', 'Deep Learning Basics', 'Real-world Capstone Projects'],
  '2025-09-15', '2026-01-07', 'Tue, Thu — 9:00 AM to 3:00 PM, Sat — 10:00 AM to 5:00 PM', TRUE, TRUE
),
(
  'ui-ux-design-fundamentals',
  'UI/UX Design Fundamentals & Figma Mastery',
  'Learn design thinking, user research, wireframing, prototyping and visual design using Figma. Create beautiful, user-centred digital products with industry-standard workflows.',
  'Design stunning products with Figma & design thinking',
  35000, 50000, '8 weeks', 'Beginner', 'UI/UX Design', 'Ms. Amaya Silva', 20,
  NULL,
  ARRAY['Figma', 'UI Design', 'UX Research', 'Prototyping'],
  ARRAY['Design Thinking & User Research', 'Wireframing & Information Architecture', 'Visual Design Principles', 'Figma Advanced Features', 'Prototyping & Animations', 'Usability Testing', 'Portfolio Development'],
  '2025-10-01', '2025-11-26', 'Mon, Wed — 2:00 PM to 6:00 PM', TRUE, TRUE
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.events (slug, title, description, short_description, start_date, end_date, start_time, end_time, venue, capacity, price, category, organizer, tags, agenda, speakers, is_active, is_featured)
VALUES
(
  'tech-summit-2025',
  'Scholar Sync Tech Summit 2025',
  'Join us for the biggest technology conference of the year featuring industry leaders, innovative workshops, and networking opportunities. Hear from top professionals about the latest trends in AI, Web3, and enterprise technology.',
  'The biggest tech conference with industry leaders and workshops.',
  '2025-09-20', '2025-09-21', '09:00', '17:00',
  'BMICH — Bandaranaike Memorial International Conference Hall, Colombo 07',
  500, 2500, 'Technology', 'Scholar Sync Events Team',
  ARRAY['Technology', 'AI', 'Networking', 'Innovation'],
  '[{"time":"09:00","title":"Registration & Welcome Coffee"},{"time":"09:30","title":"Opening Keynote: Future of AI","speaker":"Dr. Rajesh Kumar"},{"time":"11:00","title":"Panel: Building Scalable Products","speaker":"Industry Leaders"},{"time":"13:00","title":"Networking Lunch"},{"time":"14:00","title":"Workshop: Hands-on ML","speaker":"Ms. Hiruni Piyumika"},{"time":"16:00","title":"Startup Showcase & Closing"}]',
  '[{"name":"Dr. Rajesh Kumar","title":"AI Research Lead, Google","bio":"Leading AI research with 15+ years experience","image":""},{"name":"Ms. Nadia Hassan","title":"CTO, TechStart Lanka","bio":"Serial entrepreneur and tech innovator","image":""}]',
  TRUE, TRUE
),
(
  'web3-workshop-august',
  'Introduction to Web3 & Blockchain Development',
  'A hands-on full-day workshop exploring the world of blockchain, smart contracts, and decentralised applications (dApps). Build and deploy your first smart contract on Ethereum testnet.',
  'Hands-on blockchain & smart contract development workshop.',
  '2025-08-15', NULL, '09:00', '17:00',
  'Scholar Sync Campus, 123 Education Lane, Colombo 03',
  80, 1500, 'Workshop', 'Scholar Sync Dev Team',
  ARRAY['Blockchain', 'Web3', 'Ethereum', 'Smart Contracts'],
  '[{"time":"09:00","title":"Introduction to Blockchain"},{"time":"10:30","title":"Solidity Basics"},{"time":"12:00","title":"Lunch Break"},{"time":"13:00","title":"Build a Smart Contract"},{"time":"15:00","title":"Deploy to Testnet"},{"time":"16:00","title":"Q&A and Wrap-up"}]',
  '[]',
  TRUE, TRUE
)
ON CONFLICT (slug) DO NOTHING;
