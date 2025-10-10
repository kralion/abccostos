import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/button'
import { sidebarData } from './data/sidebar-data'
import type { NavLink } from './types'

export default function AppBottomTabs() {
  const location = useLocation()
  const pathname = location.pathname || '/'

  return (
    <div className='bg-sidebar border-border fixed right-0 bottom-0 left-0 z-50 border-t'>
      <div className='flex h-16 items-center justify-around px-2'>
        {sidebarData.navGroups[0]?.items
          .filter((item): item is NavLink => 'url' in item)
          .map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url && item.url !== '/' && pathname.startsWith(item.url))

            const IconComponent = item.icon as React.ComponentType<{
              className?: string
            }>

            return (
              <Button
                key={item.title}
                variant='ghost'
                size='sm'
                className={`h-full flex-1 rounded-none ${
                  isActive
                    ? 'text-sidebar-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                asChild
              >
                <Link
                  className='flex-col items-center justify-center'
                  to={item.url}
                >
                  {IconComponent && <IconComponent className='h-6 w-6' />}
                  <span className='text-[10px]'>
                    {item.title === 'Datos Principales' ? 'Datos' : item.title}
                  </span>
                </Link>
              </Button>
            )
          })}
      </div>
    </div>
  )
}
