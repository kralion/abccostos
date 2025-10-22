import { supabase } from '@workspace/supabase/client'
import type { Database } from '@workspace/supabase/types'

export type ProyectoRow = Database['public']['Tables']['proyectos']['Row']
export type ProyectoInsert = Database['public']['Tables']['proyectos']['Insert']
export type ProyectoUpdate = Database['public']['Tables']['proyectos']['Update']

// Transformed type with Date for fechaBase
export type Proyecto = Omit<ProyectoRow, 'fechaBase'> & { fechaBase: Date }

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
