import { create } from 'zustand'
import type { User, Session } from '@workspace/supabase/client'
import { supabase } from '@workspace/supabase/client'
import { type Database } from '@workspace/supabase/types'

type Usuario = Database['public']['Tables']['usuarios']['Row']

interface AuthState {
  user: User | null
  session: Session | null
  usuario: Usuario | null
  isLoading: boolean
  setAuth: (user: User | null, session: Session | null) => Promise<void>
  clearAuth: () => void
  initialize: () => Promise<void>
  fetchUsuario: (userId: string) => Promise<Usuario | null>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  session: null,
  usuario: null,
  isLoading: true,
  
  fetchUsuario: async (idAuth: string) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, id_auth, nombres, apellidos, avatar, rol, created_at, estado')
        .eq('id_auth', idAuth)
        .single()

      if (error) {
        console.error('Error fetching usuario:', error)
        return null
      }

      return data as unknown as Usuario
    } catch (error) {
      console.error('Error fetching usuario:', error)
      return null
    }
  },
  
  setAuth: async (user, session) => {
    if (user) {
      const usuario = await get().fetchUsuario(user.id)
      set({ user, session, usuario, isLoading: false })
    } else {
      set({ user, session, usuario: null, isLoading: false })
    }
  },
  
  clearAuth: () => set({ user: null, session: null, usuario: null, isLoading: false }),
  
  initialize: async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        const usuario = await get().fetchUsuario(session.user.id)
        set({ user: session.user, session, usuario, isLoading: false })
      } else {
        set({ user: null, session: null, usuario: null, isLoading: false })
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          const usuario = await get().fetchUsuario(session.user.id)
          set({ user: session.user, session, usuario, isLoading: false })
        } else {
          set({ user: null, session: null, usuario: null, isLoading: false })
        }
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ user: null, session: null, usuario: null, isLoading: false })
    }
  },
}))
