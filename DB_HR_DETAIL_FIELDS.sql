-- ================================================================
-- CADD CENTRE LANKA — HR Detail Fields Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
--
-- Safe to run multiple times (uses IF NOT EXISTS).
-- Adds NIC, join_date, contract_type, monthly_salary, employee_status
-- to the profiles table for detailed HR management.
-- ================================================================

-- 1. NIC (National Identity Card number)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS nic TEXT;

-- 2. Join Date (employment start date)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS join_date DATE;

-- 3. Contract Type (Full-time, Part-time, Contract, Intern)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS contract_type TEXT DEFAULT 'Full-time';

-- 4. Monthly Salary in LKR
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS monthly_salary NUMERIC(10,2);

-- 5. Employee Status (granular HR status beyond disabled flag)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS employee_status TEXT DEFAULT 'Active';

-- ================================================================
-- DONE. No existing data is affected.
-- ================================================================
