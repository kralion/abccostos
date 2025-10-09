import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: async ({ location }) => {
    const { isLoading } = useAuthStore.getState()
    
    // Wait for auth to initialize
    if (isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    const { user: currentUser } = useAuthStore.getState()
    
    if (!currentUser) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})
