import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import {
  BarChart3Icon,
  ListIcon,
  TableIcon,
} from 'lucide-react'
import ResumenTab from './resumen-tab'
import DetalleTab from './detalle-tab'
import ConsolidadoTab from './consolidado-tab'


export default function Rqs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('resumen')

  return (
    <div className='space-y-4 pt-5'>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="text-foreground h-auto rounded-none border-b bg-transparent px-0">
          <TabsTrigger
            value="resumen"
            className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <BarChart3Icon className="me-1.5 opacity-60 md:-ms-0.5" size={16} />
            <span className="hidden group-data-[state=active]:inline md:inline">Resumen</span>
          </TabsTrigger>
          <TabsTrigger
            value="detalle"
            className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <ListIcon className="me-1.5 opacity-60 md:-ms-0.5" size={16} />
            <span className="hidden group-data-[state=active]:inline md:inline">Detalle</span>
          </TabsTrigger>
          <TabsTrigger
            value="consolidado"
            className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <TableIcon className="me-1.5 opacity-60 md:-ms-0.5" size={16} />
            <span className="hidden group-data-[state=active]:inline md:inline">Consolidado</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <ResumenTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </TabsContent>

        <TabsContent value="detalle">
          <DetalleTab />
        </TabsContent>

        <TabsContent value="consolidado">
          <ConsolidadoTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

