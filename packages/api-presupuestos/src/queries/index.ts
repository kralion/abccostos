import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as proyectosService from '../services/index.js'
import * as usuariosService from '../services/index.js'
import type { Proyecto, Usuario } from '../services/index.js'
import { toast } from 'sonner'

export const useProyectos = () => {
  return useQuery({
    queryKey: ['proyectos'],
    queryFn: proyectosService.getProyectos,
  })
}

export const useProyectoById = (id: string) => {
  return useQuery({
    queryKey: ['proyectos', id],
    queryFn: () => proyectosService.getProyectoById(id),
    enabled: !!id,
  })
}

export const useCreateProyecto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: proyectosService.createProyecto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proyectos'] })
      toast.success('Proyecto creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear el proyecto')
    },
  })
}

export const useUpdateProyecto = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: proyectosService.ProyectoUpdate }) => 
      proyectosService.updateProyecto(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proyectos'] })
      toast.success('Proyecto actualizado correctamente')
    },
    onError: () => {
      toast.error('Error al actualizar el proyecto')
    },
  })
}

export const useDeleteProyecto = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => proyectosService.deleteProyecto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proyectos'] })
      toast.success('Proyecto eliminado correctamente')
    },
    onError: () => {
      toast.error('Error al eliminar el proyecto')
    },
  })
}

// ===== USUARIOS QUERIES =====

export const useUsuarios = () => {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: usuariosService.getUsuarios,
  })
}

export const useUsuarioById = (id: string) => {
  return useQuery({
    queryKey: ['usuarios', id],
    queryFn: () => usuariosService.getUsuarioById(id),
    enabled: !!id,
  })
}

export const useCreateUsuario = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: usuariosService.createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuario creado exitosamente')
    },
    onError: () => {
      toast.error('Error al crear el usuario')
    },
  })
}

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: usuariosService.UsuarioUpdate }) => 
      usuariosService.updateUsuario(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuario actualizado correctamente')
    },
    onError: () => {
      toast.error('Error al actualizar el usuario')
    },
  })
}

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => usuariosService.deleteUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuario eliminado correctamente')
    },
    onError: () => {
      toast.error('Error al eliminar el usuario')
    },
  })
}