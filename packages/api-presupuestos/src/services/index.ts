import { supabase } from '@workspace/supabase/client'
import type { Database } from '@workspace/supabase/client'

export type Proyecto = Database['public']['Tables']['proyectos']['Row']
export type ProyectoInsert = Database['public']['Tables']['proyectos']['Insert']
export type ProyectoUpdate = Database['public']['Tables']['proyectos']['Update']

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

  return data || []
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

  return data
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

  return data
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

  return data
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