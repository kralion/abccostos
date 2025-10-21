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
          email: string
          nombres: string
          usuario: string
          password: string
          billetera_id: string | null
          codigo_referido: string
          referido_id: string | null
          apellidos: string
          telefono: string | null
          rol: 'provider' | 'admin' | 'seller' | 'registered'
          created_at: string
          updated_at: string
          estado_habilitado: boolean
        }
        Insert: {
          id?: string
          email: string
          nombres: string
          usuario: string
          password?: string
          billetera_id?: string | null
          codigo_referido?: string
          referido_id?: string | null
          apellidos: string
          telefono?: string | null
          rol?: 'provider' | 'admin' | 'seller' | 'registered'
          created_at?: string
          updated_at?: string
          estado_habilitado?: boolean
        }
        Update: {
          id?: string
          email?: string
          nombres?: string
          usuario?: string
          password?: string
          billetera_id?: string | null
          codigo_referido?: string
          referido_id?: string | null
          apellidos?: string
          telefono?: string | null
          rol?: 'provider' | 'admin' | 'seller' | 'registered'
          created_at?: string
          updated_at?: string
          estado_habilitado?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_referido_id_fkey"
            columns: ["referido_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          }
        ]
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