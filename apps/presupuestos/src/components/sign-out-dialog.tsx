import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@/lib/supabase'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { toast } from 'sonner'
import { useState } from 'react'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
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

      // Close dialog first
      onOpenChange(false)
      
      // Clear local auth state
      clearAuth()
      
      // Navigate to sign-in
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
