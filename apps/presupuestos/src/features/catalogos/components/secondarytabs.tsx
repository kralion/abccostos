import {
  ChartNoAxesCombinedIcon,
  HouseIcon,
  ReceiptIcon
} from "lucide-react"
import { useEffect, useState } from "react"

import { CustomEmpty } from "@/components/custom-empty"
import { useIsMobile } from "@/hooks/use-mobile"
import TitulosTable from "./titulos-table"
import TitulosCards from "./titulos-cards"
import ElementosTable from "./elementos-table"
import ElementosCards from "./elementos-cards"
import PartidasTable from "./partidas-table"
import PartidasCards from "./partidas-cards"
import RecursosTable from "./recursos-table"
import RecursosCards from "./recursos-cards"
import UnidadesTable from "./unidades-table"
import UnidadesCards from "./unidades-cards"
import IndicesUnificadosTable from "./indices-unificados-table"
import IndicesUnificadosCards from "./indices-unificados-cards"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
    'titulos': null,
    'elementos': null,
    'partidas': null,
    'recursos': null,
    'unidades': null,
    'indices-unificados': null,
}

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'titulos':
      return {
        title: "Sin Titulos",
        description: "Aqui se mostrarán los titulos",
        icon: <ReceiptIcon />
      }
    case 'elementos':
      return {
        title: "Sin Elementos",
        description: "Aqui se mostrarán los elementos",
        icon: <ReceiptIcon />
      }
    case 'partidas':
      return {
        title: "Sin Partidas",
        description: "Aqui se mostrarán las partidas",
        icon: <ChartNoAxesCombinedIcon />
      }
    case 'recursos':
      return {
        title: "Sin Recursos",
        description: "Aqui se mostrarán los recursos",
        icon: <ReceiptIcon />
      }
    case 'unidades':
      return {
        title: "Sin Unidades",
        description: "Aqui se mostrarán las unidades",
        icon: <ReceiptIcon />
      }
    case 'indices-unificados':
      return {
        title: "Sin Índices Unificados",
        description: "Aqui se mostrarán los índices unificados",
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
    const isMobile = useIsMobile()

    useEffect(() => {
      const newSecondaryTabs = secondaryTabs[activePrimaryTab] || []
      if (newSecondaryTabs.length > 0 && !newSecondaryTabs.find(tab => tab.value === activeSecondaryTab)) {
        setActiveSecondaryTab(newSecondaryTabs[0].value)
      }
    }, [activePrimaryTab, activeSecondaryTab])

    if (!currentSecondaryTabs || currentSecondaryTabs.length === 0) {
      if (activePrimaryTab === 'titulos') {
        return isMobile ? <TitulosCards /> : <TitulosTable />
      }
      if (activePrimaryTab === 'elementos') {
        return isMobile ? <ElementosCards /> : <ElementosTable />
      }
      if (activePrimaryTab === 'partidas') {
        return isMobile ? <PartidasCards /> : <PartidasTable />
      }
      if (activePrimaryTab === 'recursos') {
        return isMobile ? <RecursosCards /> : <RecursosTable />
      }
      if (activePrimaryTab === 'unidades') {
        return isMobile ? <UnidadesCards /> : <UnidadesTable />
      }
      if (activePrimaryTab === 'indices-unificados') {
        return isMobile ? <IndicesUnificadosCards /> : <IndicesUnificadosTable />
      }
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }

    return (
      <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab}>
          <TabsList className="text-foreground h-auto rounded-none border-b bg-transparent px-0 ">
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
  
