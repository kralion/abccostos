import { Link } from '@tanstack/react-router'
import { Badge } from '@workspace/ui/components/badge'
import {
  useSidebar
} from '@workspace/ui/components/sidebar'
import { sidebarData } from './data/sidebar-data'
import { ProjectSwitcher } from './project-switcher'

export function AppTitle() {
  const { setOpenMobile } = useSidebar()
  return (
    
          <div className='flex flex-col items-center justify-center gap-4 '>
            <Link
              to='/'
              onClick={() => setOpenMobile(false)}
              className='grid flex-1 text-center text-sm leading-tight'
            >
              <h3 className='truncate text-2xl font-bold'>CP360°</h3>
              <span className='truncate'>Presupuestos</span>
            </Link>

            <ProjectSwitcher projects={sidebarData.projects} />


            <Badge className='bg-green-500 truncate'>Activo</Badge>
          </div>
       
  )
}
