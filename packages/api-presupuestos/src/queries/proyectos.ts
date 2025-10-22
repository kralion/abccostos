import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as proyectosService from '../services/proyectos'
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
