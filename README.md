# ASMS — Academic & Student Management System
### CADD Centre Lanka

A centralized system for managing the full student lifecycle at CADD Centre Lanka, built with Next.js 14 (App Router) and Supabase.

---

## 🎯 System Overview

Aligned to the **CADD Centre Lanka SRD** — covers:

| Module | Description |
|---|---|
| Student Management | Registration, profiles, student ID generation |
| Course & Program Management | BIM / CAD / PM courses with Proficient / Master / Expert levels |
| Module Management | Sub-modules per course (Revit Architecture, MEP, Navisworks, etc.) |
| Batch & Scheduling | Batch creation, timetable, classroom / online / hybrid modes |
| Trainer Management | Trainer profiles, allocation to batches/modules |
| Enrollment | Student enrollment with batch allocation + payment tracking |
| Attendance | Daily attendance marking (present/absent/late/excused) |
| Academic Progress | Module-wise progress tracking, practical + theory scoring |
| Assessments & Exams | Module tests, practicals, final project evaluations |
| Certification | Auto certificate generation with QR code + unique cert number |
| Learning Resources | E-books, video tutorials, BIM practice guides per module |
| Student Portal | View progress, attendance, results, certificates, resources |
| Reports | Enrollment, attendance, course-wise performance, certification |

---

## 👥 User Roles

| Role | Access |
|---|---|
| `admin` | Full system control |
| `academic_manager` | Courses, batches, trainers |
| `trainer` | Attendance, progress marking |
| `student` | Student portal (own data only) |
| `coordinator` | Enrollment, scheduling |

---

## 🏗️ Course Structure

CADD programmes follow 3 certificate levels:

- **Proficient Certificate** — ~80 hours
- **Master Certificate** — ~160 hours
- **Expert Certificate** — ~240 hours

### BIM Programme (148h — Master Certificate)
Modules:
1. Revit Architecture (40h) — 3D Modeling, Views, Families, Rendering
2. Revit MEP (40h) — HVAC, Plumbing, Electrical, Quantity take-off
3. Navisworks (35h) — Clash detection, 4D simulation, Coordination
4. Project Management (33h) — Scheduling, Resource planning, WBS

---

## 🗄️ Database Setup

1. Go to your [Supabase project](https://supabase.com) → SQL Editor
2. Run `SUPABASE_SCHEMA.sql` (fresh install), **or**
3. Run `MIGRATION_PHASE1.sql` (upgrading from scholar-sync)

---

## ⚙️ Environment

Copy `.env.local` and set:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🚀 Running

```bash
npm install
npm run dev
```

Admin panel: `/admin`  
Student portal: `/dashboard`

---

## 🔑 First Admin

After signing up, run in Supabase SQL Editor:
```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
```

---

## 📋 Student Lifecycle Flow

```
Registration → Enrollment → Batch Allocation → Module Learning
    → Attendance Tracking → Assessment → Certification
```
