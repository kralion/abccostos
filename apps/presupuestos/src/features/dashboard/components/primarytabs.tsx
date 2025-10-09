import {
  ChartNoAxesGanttIcon,
  FolderSearch
} from "lucide-react"

  import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@workspace/ui/components/tabs"
import { CustomEmpty } from "@/components/custom-empty"

interface PrimaryTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

  export default function PrimaryTabs({ activeTab, onTabChange }: PrimaryTabsProps) {
    return (
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className="mb-2 flex items-center justify-between space-y-2">
        <h1 className='text-2xl font-bold tracking-tight hidden md:block'>Dashboard</h1>
          <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
            <TabsTrigger
              value="resumen"
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <ChartNoAxesGanttIcon
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Resumen
            </TabsTrigger>
            <TabsTrigger
              value="detalle"
              className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <FolderSearch
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Detalle
             
            </TabsTrigger>
            
          </TabsList></div>
          <TabsContent value="resumen">
        <CustomEmpty title="Sin Resumen" description="Aquí se mostrarán gráficos para el resumen de los datos" icon={<ChartNoAxesGanttIcon />} />
      </TabsContent>
      <TabsContent value="detalle">
        <CustomEmpty title="Sin Detalle" description="Aquí se mostrarán gráficos para la sección de detalle" icon={<FolderSearch />} />
      </TabsContent>
      </Tabs>
    )
  }
  
