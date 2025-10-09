
import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/button'
import { sidebarData } from './data/sidebar-data'
import type { NavLink } from './types'

export default function AppBottomTabs() {
  const location = useLocation()
  const pathname = location.pathname || '/'

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {sidebarData.navGroups[0]?.items
          .filter((item): item is NavLink => 'url' in item)
          .map((item) => {
          const isActive = pathname === item.url ||
            (item.url && item.url !== '/' && pathname.startsWith(item.url))

          const IconComponent = item.icon as React.ComponentType<{ className?: string }>

          return (
            <Button
              key={item.title}
              variant="ghost"
              size="sm"
              className={`flex-1 h-full rounded-none ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              asChild
            >
              <Link to={item.url}>
                {IconComponent && <IconComponent className="h-6 w-6" />}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
