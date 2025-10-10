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
import { Separator } from "@workspace/ui/components/separator"

interface PrimaryTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

  export default function PrimaryTabs({ activeTab, onTabChange }: PrimaryTabsProps) {
    return (
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <div className=" flex items-center justify-between">
        <h1 className='text-2xl font-bold tracking-tight hidden md:block'>Dashboard</h1>
          <TabsList className="text-foreground  h-auto rounded-none border-b bg-transparent px-0 ">
            <TabsTrigger
              value="resumen"
              className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <ChartNoAxesGanttIcon
                className="me-1.5 opacity-60 md:-ms-0.5"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden group-data-[state=active]:inline md:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger
              value="detalle"
              className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <FolderSearch
                className="me-1.5 opacity-60 md:-ms-0.5"
                size={16}
                aria-hidden="true"
              />
              <span className="hidden group-data-[state=active]:inline md:inline">Detalle</span>
            </TabsTrigger>
            
          </TabsList>
          </div>
        <Separator />
      <TabsContent value="resumen">
        <CustomEmpty title="Sin Resumen" description="Aquí se mostrarán gráficos para el resumen de los datos" icon={<ChartNoAxesGanttIcon />} />
      </TabsContent>
      <TabsContent value="detalle">
        <CustomEmpty title="Sin Detalle" description="Aquí se mostrarán gráficos para la sección de detalle" icon={<FolderSearch />} />
      </TabsContent>
      </Tabs>
    )
  }
  
