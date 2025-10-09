import { Separator } from '@workspace/ui/components/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '@workspace/ui/components/sidebar'
import { AppTitle } from './app-title'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
      <Separator />
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
     
      <SidebarRail />
    </Sidebar>
  )
}
