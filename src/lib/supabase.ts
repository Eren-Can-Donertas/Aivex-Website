import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Module-level singleton. Safe to import from client components.
// If env vars are missing we still construct a stub so importing this file
// never throws at build time — submissions will fail loudly at the call site
// with a clearer error than a TypeError on `undefined`.
export const supabase: SupabaseClient = createClient(
  url ?? 'http://invalid.local',
  anonKey ?? 'invalid-anon-key',
);

export const isSupabaseConfigured = Boolean(url && anonKey);
