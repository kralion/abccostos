import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@workspace/ui/components/sidebar'
import { ChevronsUpDown } from 'lucide-react'

type ProjectSwitcherProps = {
  projects: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}

export function ProjectSwitcher({ projects }: ProjectSwitcherProps) {
  const { isMobile } = useSidebar()
  const [activeProject, setActiveProject] = React.useState(projects[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <span className='text-muted-foreground flex-1 truncate text-center font-semibold'>
                {activeProject.name}
              </span>
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Proyectos
            </DropdownMenuLabel>
            {projects.map((project, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setActiveProject(project)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <project.logo className='size-4 shrink-0' />
                </div>
                {project.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
