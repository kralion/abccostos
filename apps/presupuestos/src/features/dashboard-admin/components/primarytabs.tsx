import { Separator } from '@workspace/ui/components/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { FoldersIcon, HouseIcon } from 'lucide-react'
import ProyectosCharts from './proyectos-charts'
import VentasVsMetaCharts from './ventas-vs-meta-charts'

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
        <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
          Dashboard Administrador
        </h1>
        <div className='md:hidden' />
        <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
          <TabsTrigger
            value='proyectos'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <HouseIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Proyectos
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='ventas-vs-meta'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FoldersIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Ventas vs Meta
            </span>
          </TabsTrigger>
        </TabsList>
      </div>
      <Separator />
      <TabsContent value='proyectos'>
        <ProyectosCharts />
      </TabsContent>
      <TabsContent value='ventas-vs-meta'>
        <VentasVsMetaCharts />
      </TabsContent>
    </Tabs>
  )
}
