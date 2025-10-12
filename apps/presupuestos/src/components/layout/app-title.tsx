import { Link } from '@tanstack/react-router'
import { Badge } from '@workspace/ui/components/badge'
import { useSidebar } from '@workspace/ui/components/sidebar'
import { useAuthStore } from '@/stores/auth-store'
import { sidebarData } from './data/sidebar-data'
import { ProjectSwitcher } from './project-switcher'

export function AppTitle() {
  const { setOpenMobile, state } = useSidebar()
  const profile = useAuthStore((state) => state.profile)
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Link
        to='/'
        onClick={() => setOpenMobile(false)}
        className='grid flex-1 text-center text-sm leading-tight'
      >
        <h3 className='truncate text-2xl font-bold'>CP360°</h3>
        {state !== 'collapsed' && (
          <span className='truncate'>Presupuestos</span>
        )}
      </Link>
      {state !== 'collapsed' && profile?.role === 'user' && (
        <ProjectSwitcher projects={sidebarData.projects} />
      )}

      {state !== 'collapsed' && profile?.role === 'user' && (
        <Badge className='truncate bg-green-500'>Activo</Badge>
      )}
    </div>
  )
}
