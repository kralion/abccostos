import { createClient } from '@supabase/supabase-js'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from './types.js'

export type { User, Session, Database }

// Handle both Vite (import.meta.env) and Node.js (process.env) environments
const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_SUPABASE_URL!
  : process.env.VITE_SUPABASE_URL!

const supabaseKey = typeof import.meta !== 'undefined' && import.meta.env
  ? import.meta.env.VITE_SUPABASE_ANON_KEY!
  : process.env.VITE_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});