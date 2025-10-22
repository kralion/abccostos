export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          id_auth: string | null
          nombres: string
          avatar: string | null
          apellidos: string
          telefono: string | null
          rol: 'supervisor_general' | 'produccion' | 'gerente_general' | 'gerente_proyecto' | 'control_costos' | 'secundario' | 'principal' | 'propietario'
          created_at: string
          estado: 'habilitado' | 'deshabilitado'
        }
        Insert: {
          id?: string
          id_auth?: string | null
          nombres: string
          avatar?: string | null
          apellidos: string
          telefono?: string | null
          rol?: 'supervisor_general' | 'produccion' | 'gerente_general' | 'gerente_proyecto' | 'control_costos' | 'secundario' | 'principal' | 'propietario'
          created_at?: string
          estado?: 'habilitado' | 'deshabilitado'
        }
        Update: {
          id?: string
          id_auth?: string | null
          nombres?: string
          avatar?: string | null
          apellidos?: string
          telefono?: string | null
          rol?: 'supervisor_general' | 'produccion' | 'gerente_general' | 'gerente_proyecto' | 'control_costos' | 'secundario' | 'principal' | 'propietario'
          created_at?: string
          estado?: 'habilitado' | 'deshabilitado'
        }
       
      }
  
      proyectos: {
        Row: {
          id: string
          codigo: string
          nombreDeProyecto: string
          nombreCorto: string
          ubicacion: string
          estado: 'activo' | 'terminado' | 'en ejecucion' | 'archivado'
          fechaBase: string
          plazo: string
          meta: boolean
          venta: boolean
          desviacion: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          codigo: string
          nombreDeProyecto: string
          nombreCorto: string
          ubicacion: string
          estado?: 'activo' | 'terminado' | 'en ejecucion' | 'archivado'
          fechaBase: string
          plazo: string
          meta?: boolean
          venta?: boolean
          desviacion?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          codigo?: string
          nombreDeProyecto?: string
          nombreCorto?: string
          ubicacion?: string
          estado?: 'activo' | 'terminado' | 'en ejecucion' | 'archivado'
          fechaBase?: string
          plazo?: string
          meta?: boolean
          venta?: boolean
          desviacion?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_user_balance: {
        Args: {
          user_id: string
          amount: number
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}