import { useLayout } from '@/context/layout-provider'
import { Separator } from '@workspace/ui/components/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from '@workspace/ui/components/sidebar'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  const {collapsible, variant} = useLayout()
  const {isMobile} = useSidebar()
  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
      <Separator className='bg-zinc-700' />
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      {!isMobile && <SidebarRail />}
    </Sidebar>
  )
}
