import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@workspace/supabase/client'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  //TODO: Debe eliminar todo lo del local storage y cookies porque al cambiar de usuario, el redirect basado en el role redirige a la ruta por defecto del usuario anterior.
  const navigate = useNavigate()
  const { clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.error('Error al cerrar sesión')
        console.error('Sign out error:', error)
        setIsLoading(false)
        return
      }

      onOpenChange(false)

      clearAuth()

      await navigate({
        to: '/sign-in',
        replace: true,
      })
    } catch (error) {
      console.error('Unexpected sign out error:', error)
      toast.error('Error inesperado al cerrar sesión')
      setIsLoading(false)
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Cerrar sesión'
      desc='¿Estás seguro de que quieres cerrar sesión? Deberás iniciar sesión nuevamente para acceder a tu cuenta.'
      confirmText='Cerrar sesión'
      destructive
      isLoading={isLoading}
      handleConfirm={handleSignOut}
      cancelBtnText='Cancelar'
      className='sm:max-w-sm'
    />
  )
}
