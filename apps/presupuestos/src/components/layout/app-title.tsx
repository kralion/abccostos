import { useAuthStore } from '@/stores/auth-store'
import { Link } from '@tanstack/react-router'
import { Badge } from '@workspace/ui/components/badge'
import { useSidebar } from '@workspace/ui/components/sidebar'
import { getSidebarData } from './data/sidebar-data'
import { ProjectSwitcher } from './project-switcher'

export function AppTitle() {
  const { setOpenMobile, state } = useSidebar()
  const { usuario, user } = useAuthStore()
  const sidebarData = getSidebarData(usuario, user?.email)
  //TODO: Cambiar por el tipo de presupuesto

  return (
    <div className='flex flex-col items-center justify-center gap-2 mb-4'>
      <Link
        to='/'
        onClick={() => setOpenMobile(false)}
        className='grid flex-1 text-center text-sm leading-tight'
      >
        <h3 className='truncate text-2xl font-bold'>CP360°</h3>
        {state !== 'collapsed' && (usuario?.rol as string) === 'propietario' && (
          <span className='block truncate py-2 text-wrap'>
            Sistema Integral
            <br />
            de Gestión de Proyectos
          </span>
        )}
        {state !== 'collapsed' && (usuario?.rol as string) !== 'propietario' && (
          <span className='truncate'>Presupuestos</span>
        )}
        {state !== 'collapsed' && (usuario?.rol as string) === 'principal' && (
          <span className='text-muted-foreground truncate py-2'>
            Consorcio ABC
          </span>
        )}
      </Link>
      {state !== 'collapsed' && usuario?.rol === 'secundario' && (
        <ProjectSwitcher projects={sidebarData.projects} />
      )}

      {state !== 'collapsed' && usuario?.rol === 'secundario' && (
        <Badge className='truncate bg-green-500'>Activo</Badge>
      )}
    
    </div>
  )
}
