import { Separator } from '@workspace/ui/components/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@workspace/ui/components/sidebar'
import { useAuthStore } from '@/stores/auth-store'
import { useLayout } from '@/context/layout-provider'
import { AppTitle } from './app-title'
import { getSidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

const getRoleGroupTitle = (rol: 'propietario' | 'principal' | 'secundario'): string => {
  switch (rol) {
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

export function AppSidebar() {
  const { collapsible } = useLayout()
  const { usuario, user } = useAuthStore()
  const rol = usuario?.rol || 'secundario'
  const groupTitle = getRoleGroupTitle(rol as 'propietario' | 'principal' | 'secundario')
  const sidebarData = getSidebarData(usuario, user?.email)

  const filteredNavGroups = sidebarData.navGroups.filter(
    (group) => group.title === groupTitle
  )

  return (
    <Sidebar collapsible={collapsible} variant='sidebar'>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        <Separator className='bg-violet-800' />
        {filteredNavGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
