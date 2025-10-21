import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { HouseIcon, SettingsIcon, UsersIcon } from 'lucide-react'

interface PrimaryTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export default function PrimaryTabs({
  activeTab,
  onTabChange,
}: PrimaryTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <div className='flex items-center justify-between'>
        <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
          <TabsTrigger
            value='general'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <HouseIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Datos Generales
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='configurations'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <SettingsIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Configuraciones
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='usuarios'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <UsersIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Usuarios
            </span>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  )
}
