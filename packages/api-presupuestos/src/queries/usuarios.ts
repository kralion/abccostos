import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as usuariosService from '../services/usuarios'
import { toast } from 'sonner'

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
