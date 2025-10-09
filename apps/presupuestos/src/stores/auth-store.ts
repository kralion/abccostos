import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export interface Profile {
  id: string
  name: string
  last_name: string
  image_url: string | null
  role: string
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  setAuth: (user: User | null, session: Session | null) => Promise<void>
  clearAuth: () => void
  initialize: () => Promise<void>
  fetchProfile: (userId: string) => Promise<Profile | null>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  
  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, last_name, image_url, role')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data as Profile
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  },
  
  setAuth: async (user, session) => {
    if (user) {
      const profile = await get().fetchProfile(user.id)
      set({ user, session, profile, isLoading: false })
    } else {
      set({ user, session, profile: null, isLoading: false })
    }
  },
  
  clearAuth: () => set({ user: null, session: null, profile: null, isLoading: false }),
  
  initialize: async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        const profile = await get().fetchProfile(session.user.id)
        set({ user: session.user, session, profile, isLoading: false })
      } else {
        set({ user: null, session: null, profile: null, isLoading: false })
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const profile = await get().fetchProfile(session.user.id)
          set({ user: session.user, session, profile, isLoading: false })
        } else {
          set({ user: null, session: null, profile: null, isLoading: false })
        }
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ user: null, session: null, profile: null, isLoading: false })
    }
  },
}))
