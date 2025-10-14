import { Link } from '@tanstack/react-router'
import { Badge } from '@workspace/ui/components/badge'
import { useSidebar } from '@workspace/ui/components/sidebar'
import { useAuthStore } from '@/stores/auth-store'
import { getSidebarData } from './data/sidebar-data'
import { ProjectSwitcher } from './project-switcher'
import { useState } from 'react'

export function AppTitle() {
  const { setOpenMobile, state } = useSidebar()
  const { profile, user } = useAuthStore()
  const sidebarData = getSidebarData(profile, user?.email)
  //TODO: Cambiar por el tipo de presupuesto
  const [typePresupuesto, _setTypePresupuesto] = useState('venta')

  return (
    <div className='flex flex-col items-center justify-center gap-2 mb-4'>
      <Link
        to='/'
        onClick={() => setOpenMobile(false)}
        className='grid flex-1 text-center text-sm leading-tight'
      >
        <h3 className='truncate text-2xl font-bold'>CP360°</h3>
        {state !== 'collapsed' && profile?.role === 'owner' && (
          <span className='block truncate py-2 text-wrap'>
            Sistema Integral
            <br />
            de Gestión de Proyectos
          </span>
        )}
        {state !== 'collapsed' && profile?.role !== 'owner' && (
          <span className='truncate'>Presupuestos</span>
        )}
        {state !== 'collapsed' && profile?.role === 'admin' && (
          <span className='text-muted-foreground truncate py-2'>
            Consorcio ABC
          </span>
        )}
      </Link>
      {state !== 'collapsed' && profile?.role === 'user' && (
        <ProjectSwitcher projects={sidebarData.projects} />
      )}

      {state !== 'collapsed' && profile?.role === 'user' && (
        <Badge className='truncate bg-green-500'>Activo</Badge>
      )}
      {state !== 'collapsed' && profile?.role === 'user' && (
        <Badge className='truncate bg-orange-500'>Presupuesto {typePresupuesto}</Badge>
      )}
    </div>
  )
}
