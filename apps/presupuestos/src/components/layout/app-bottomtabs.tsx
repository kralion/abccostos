import { useAuthStore } from '@/stores/auth-store'
import { Link, useLocation } from '@tanstack/react-router'
import { getSidebarData } from './data/sidebar-data'
import type { NavLink } from './types'

const getRoleGroupTitle = (role: 'propietario' | 'principal' | 'secundario'): string => {
  switch (role) {
    case 'propietario':
      return 'Propietario'
    case 'principal':
      return 'Principal'
    case 'secundario':
      return 'Proyecto'
    default:
      return 'Proyecto'
  }
}

export default function AppBottomTabs() {
  const location = useLocation()
  const pathname = location.pathname || '/'
  const { usuario, user } = useAuthStore()
  const sidebarData = getSidebarData(usuario, user?.email)

  const userRole = usuario?.rol || 'secundario'
  const groupTitle = getRoleGroupTitle(userRole as 'propietario' | 'principal' | 'secundario')

  const navGroup = sidebarData.navGroups.find(
    (group) => group.title === groupTitle
  )

  return (
    <div className='bg-sidebar border-border fixed right-0 bottom-0 left-0 z-50 border-t'>
      <div className='flex h-16 items-center justify-around px-2'>
        {navGroup?.items
          .filter((item): item is NavLink => 'url' in item)
          .map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url && item.url !== '/' && pathname.startsWith(item.url))

            const IconComponent = item.icon as React.ComponentType<{
              className?: string
            }>

            return (
              <button
                key={item.title}
                className={`h-full flex-1 rounded-none text-muted-foreground hover:text-foreground hover:bg-accent ${
                  isActive
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Link
                  className='flex flex-col items-center justify-center mx-auto h-full w-full'
                  to={item.url}
                > 
                <div className='flex flex-col gap-1 items-center justify-center mx-auto h-full w-full'>

                  {IconComponent && <IconComponent className='h-6 w-6' />}
                  <span className='text-[10px] text-center w-full flex justify-center items-center'>
                    {item.title === 'Datos Principales' ? 'Datos' : item.title}
                  </span>
                </div>
                </Link>
              </button>
            )
          })}
      </div>
    </div>
  )
}
