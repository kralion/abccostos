import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

type UserRole = 'owner' | 'admin' | 'user'

const roleHierarchy: Record<UserRole, number> = {
  owner: 3,
  admin: 2,
  user: 1,
}

const getRoleDashboard = (role: UserRole): string => {
  switch (role) {
    case 'owner':
      return '/dashboard-propietario'
    case 'admin':
      return '/dashboard-admin'
    case 'user':
    default:
      return '/'
  }
}

export const requireRole = (allowedRoles: UserRole[]) => {
  const { profile } = useAuthStore.getState()
  const userRole = (profile?.role as UserRole) || 'user'

  if (!allowedRoles.includes(userRole)) {
    throw redirect({
      to: getRoleDashboard(userRole),
      replace: true,
    })
  }
}

export const requireMinRole = (minRole: UserRole) => {
  const { profile } = useAuthStore.getState()
  const userRole = (profile?.role as UserRole) || 'user'

  if (roleHierarchy[userRole] < roleHierarchy[minRole]) {
    throw redirect({
      to: getRoleDashboard(userRole),
      replace: true,
    })
  }
}
