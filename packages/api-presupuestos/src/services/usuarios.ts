import { supabase } from '@workspace/supabase/client'
import type { Database } from '@workspace/supabase/types'

// Usuarios types
export type UsuarioRow = Database['public']['Tables']['usuarios']['Row']
export type UsuarioInsert = Database['public']['Tables']['usuarios']['Insert']
export type UsuarioUpdate = Database['public']['Tables']['usuarios']['Update']

// Transformed type with Date for created_at and updated_at
export type Usuario = Omit<UsuarioRow, 'created_at' | 'updated_at'> & { 
  created_at: Date
  updated_at: Date
}

// Get all usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .neq('rol', 'propietario')
    .order('created_at', { ascending: false })

    console.log(data)

  if (error) {
    console.error('Error fetching usuarios:', error)
    return []
  }

  // Transform created_at and updated_at from string to Date
  return (data || []).map(usuario => ({
    ...usuario,
    created_at: new Date(usuario.created_at),
    updated_at: new Date(usuario.updated_at)
  }))
}

// Get usuario by ID
export const getUsuarioById = async (id: string): Promise<Usuario | null> => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching usuario:', error)
    return null
  }

  // Transform created_at and updated_at from string to Date
  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  }
}

// Create a new usuario
export const createUsuario = async (usuario: UsuarioInsert): Promise<Usuario | null> => {
  const { data, error } = await supabase
    .from('usuarios')
    .insert(usuario)
    .select()
    .single()

  if (error) {
    console.error('Error creating usuario:', error)
    return null
  }

  // Transform created_at and updated_at from string to Date
  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  }
}

// Update usuario
export const updateUsuario = async (id: string, updates: UsuarioUpdate): Promise<Usuario | null> => {
  const { data, error } = await supabase
    .from('usuarios')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating usuario:', error)
    return null
  }

  // Transform created_at and updated_at from string to Date
  return {
    ...data,
    created_at: new Date(data.created_at),
    updated_at: new Date(data.updated_at)
  }
}

// Delete usuario
export const deleteUsuario = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting usuario:', error)
    return false
  }

  return true
}
