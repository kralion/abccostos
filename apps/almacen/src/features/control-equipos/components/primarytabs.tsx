import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { ChartNoAxesCombinedIcon, FileIcon, FuelIcon, MonitorIcon, UsersIcon } from 'lucide-react'

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
            value='relacion-equipos'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <UsersIcon
 
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Relación de Equipos
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='pd-equipos'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <UsersIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              PD. Equipos
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='liquidacion-equipos'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <MonitorIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Liquidación de Equipos
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='combustible'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FuelIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Combustible
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='valorizaciones'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FileIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Valorizaciones
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='ratios'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FileIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Ratios
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='reportes'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <ChartNoAxesCombinedIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Reportes
            </span>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  )
}
