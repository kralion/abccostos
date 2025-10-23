import {
  ChartNoAxesCombinedIcon,
  HouseIcon,
  ReceiptIcon
} from "lucide-react"
import { useEffect, useState } from "react"

import { CustomEmpty } from "@/components/custom-empty"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { GastosGenerales } from "./gastos-generales"

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
    'gastos-generales': null,
    'pie-presupuestos': null,
    'formula-polinomica': null,
}

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'gastos-generales':
      return {
        title: "Sin Gastos Generales",
        description: "Aqui se mostrarán los gastos generales",
        icon: <ReceiptIcon />
      }
    case 'pie-presupuestos':
      return {
        title: "Sin Pie de Presupuesto",
        description: "Aqui se mostrarán el pie de presupuesto",
        icon: <ChartNoAxesCombinedIcon />
      }
    case 'formula-polinomica':
      return {
        title: "Sin Formula Polinomica",
        description: "Aqui se mostrarán la formula polinomica",
        icon: <ReceiptIcon />
      }
    default:
      return {
        title: "Sin Contenido",
        description: "Aqui se mostrarán los contenidos",
        icon: <HouseIcon />
      }
  }
}

interface SecondaryTabsComponentProps {
  activePrimaryTab: string
}

  export default function SecondaryTabs({ activePrimaryTab }: SecondaryTabsComponentProps) {
    const currentSecondaryTabs = secondaryTabs[activePrimaryTab] || []
    const [activeSecondaryTab, setActiveSecondaryTab] = useState(
      currentSecondaryTabs.length > 0 ? currentSecondaryTabs[0].value : ""
    )

    useEffect(() => {
      const newSecondaryTabs = secondaryTabs[activePrimaryTab] || []
      if (newSecondaryTabs.length > 0 && !newSecondaryTabs.find(tab => tab.value === activeSecondaryTab)) {
        setActiveSecondaryTab(newSecondaryTabs[0].value)
      }
    }, [activePrimaryTab, activeSecondaryTab])

    if (!currentSecondaryTabs || currentSecondaryTabs.length === 0) {
      if (activePrimaryTab === 'gastos-generales') {
        return <GastosGenerales />
      }
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }

    return (
      <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab}>
          <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
            {currentSecondaryTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {tab.icon}
                <span className="hidden group-data-[state=active]:inline md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        {currentSecondaryTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <CustomEmpty {...getEmptyContent(activePrimaryTab)} />
          </TabsContent>
        ))}
      </Tabs>
    )
  }
  
