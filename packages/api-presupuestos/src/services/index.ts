import { supabase } from '@workspace/supabase/client'
import type { Database } from '@workspace/supabase/types'

export type ProyectoRow = Database['public']['Tables']['proyectos']['Row']
export type ProyectoInsert = Database['public']['Tables']['proyectos']['Insert']
export type ProyectoUpdate = Database['public']['Tables']['proyectos']['Update']

// Transformed type with Date for fechaBase
export type Proyecto = Omit<ProyectoRow, 'fechaBase'> & { fechaBase: Date }

// Usuarios types
export type UsuarioRow = Database['public']['Tables']['usuarios']['Row']
export type UsuarioInsert = Database['public']['Tables']['usuarios']['Insert']
export type UsuarioUpdate = Database['public']['Tables']['usuarios']['Update']

// Transformed type with Date for created_at and updated_at
export type Usuario = Omit<UsuarioRow, 'created_at' | 'updated_at'> & { 
  created_at: Date
  updated_at: Date
}

// Get all proyectos
export const getProyectos = async (): Promise<Proyecto[]> => {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching proyectos:', error)
    return []
  }

  // Transform fechaBase from string to Date
  return (data || []).map(proyecto => ({
    ...proyecto,
    fechaBase: new Date(proyecto.fechaBase)
  }))
}

// Get proyecto by ID
export const getProyectoById = async (id: string): Promise<Proyecto | null> => {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching proyecto:', error)
    return null
  }

  // Transform fechaBase from string to Date
  return {
    ...data,
    fechaBase: new Date(data.fechaBase)
  }
}

// Create a new proyecto
export const createProyecto = async (proyecto: ProyectoInsert): Promise<Proyecto | null> => {
  const { data, error } = await supabase
    .from('proyectos')
    .insert(proyecto)
    .select()
    .single()

  if (error) {
    console.error('Error creating proyecto:', error)
    return null
  }

  // Transform fechaBase from string to Date
  return {
    ...data,
    fechaBase: new Date(data.fechaBase)
  }
}

// Update proyecto
export const updateProyecto = async (id: string, updates: ProyectoUpdate): Promise<Proyecto | null> => {
  const { data, error } = await supabase
    .from('proyectos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating proyecto:', error)
    return null
  }

  // Transform fechaBase from string to Date
  return {
    ...data,
    fechaBase: new Date(data.fechaBase)
  }
}

// Delete proyecto
export const deleteProyecto = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting proyecto:', error)
    return false
  }

  return true
}

// ===== USUARIOS SERVICES =====

// Get all usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .order('created_at', { ascending: false })

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