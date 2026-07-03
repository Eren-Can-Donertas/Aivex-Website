-- ============================================================================
-- AIVEX Website — Supabase Schema
-- ============================================================================
-- Run this once in the Supabase SQL Editor for your project.
-- Idempotent: safe to re-run.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- contact_submissions: persists the public contact form on /contact.
-- The anon (browser) key can INSERT but cannot SELECT/UPDATE/DELETE — read
-- access is restricted to the service role (Supabase dashboard, server-side
-- jobs). This keeps the public anon key safe to ship in the browser bundle.
-- ---------------------------------------------------------------------------

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null check (char_length(name) between 1 and 200),
  email         text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and char_length(email) <= 254),
  message       text not null check (char_length(message) between 1 and 4000),
  organization  text     check (organization is null or char_length(organization) <= 200),
  role          text     check (role         is null or char_length(role)         <= 200),
  interest_type text     check (interest_type in (
                  'research_access',
                  'investor_inquiry',
                  'partnership',
                  'technical_eval',
                  'other'
                )),
  submitted_at  timestamptz not null default now()
);

create index if not exists contact_submissions_submitted_at_idx
  on public.contact_submissions (submitted_at desc);

alter table public.contact_submissions enable row level security;

-- Anyone with the anon key (i.e. any browser) may insert. CHECK constraints
-- above enforce shape; size limits prevent abuse. Add Supabase rate limits or
-- a hCaptcha/Turnstile gate in the form if spam becomes an issue.
drop policy if exists "anon can insert contact submissions" on public.contact_submissions;
create policy "anon can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No select/update/delete policies for anon → those operations are blocked.
-- The service role bypasses RLS and can read submissions from the dashboard.
