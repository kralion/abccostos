import { createClient } from '@supabase/supabase-js'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from './types.js'

export type { User, Session, Database }

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});