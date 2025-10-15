import { createClient } from '@supabase/supabase-js'
import type { User, Session } from '@supabase/supabase-js'

export type { User, Session }

const supabaseUrl =  import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});