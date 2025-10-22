import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

type UserRole = 'propietario' | 'principal' | 'secundario'

const roleHierarchy: Record<UserRole, number> = {
  propietario: 3,
  principal: 2,
  secundario: 1,
}

const getRoleDashboard = (role: UserRole): string => {
  switch (role) {
    case 'propietario':
      return '/dashboard-propietario'
    case 'principal':
      return '/dashboard-principal'
    case 'secundario':
      return '/'
    default:
      return '/'
  }
}

export const requireRole = (allowedRoles: UserRole[]) => {
  const { usuario } = useAuthStore.getState()
  const userRole = (usuario?.rol as 'propietario' | 'principal' | 'secundario') || 'secundario'

  if (!allowedRoles.includes(userRole)) {
    throw redirect({
      to: getRoleDashboard(userRole),
      replace: true,
    })
  }
}

export const requireMinRole = (minRole: UserRole) => {
  const { usuario } = useAuthStore.getState()
  const userRole = (usuario?.rol as 'propietario' | 'principal' | 'secundario') || 'secundario'

  if (roleHierarchy[userRole] < roleHierarchy[minRole]) {
    throw redirect({
      to: getRoleDashboard(userRole),
      replace: true,
    })
  }
}
