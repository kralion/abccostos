import { useState, useEffect } from "react"
import {
  BoxesIcon,
  BrainIcon,
  HouseIcon,
  PickaxeIcon,
  Rows4Icon,
  SettingsIcon,
  UsersIcon
} from "lucide-react"

import { CustomEmpty } from "@/components/custom-empty"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Separator } from "@workspace/ui/components/separator"
import GeneralData from "./general-data"
import UsuariosData from "./usuarios-data"
import EspecialidadesData from "./especialidades-data"
import UnidadesProduccionData from "./unidades-produccion-data"
import TrenesData from "./trenes-data"
import FasesData from "./fases-data"

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
  general: null,
  configurations: [
    {
      label: "Especialidades",
      value: "especialidades",
      icon: <BrainIcon size={16} className="me-1.5 opacity-60 md:-ms-0.5" aria-hidden="true" />,
    },
    {
      label: "U.P.",
      value: "unidades-produccion",
      icon: <BoxesIcon size={16} className="me-1.5 opacity-60 md:-ms-0.5" aria-hidden="true" />,
    },
    {
      label: "Trenes",
      value: "trenes",
      icon: <PickaxeIcon size={16} className="me-1.5 opacity-60 md:-ms-0.5" aria-hidden="true" />,
    },
    {
      label: "Fases",
      value: "fases",
      icon: <Rows4Icon size={16} className="me-1.5 opacity-60 md:-ms-0.5" aria-hidden="true" />,
    },
  ],
  usuarios: null
}

const getEmptyContent = (primaryTab: string, secondaryTab?: string) => {
  // If secondaryTab is provided, return content specific to that secondary tab
  if (secondaryTab) {
    switch (secondaryTab) {
      case 'especialidades':
        return {
          title: "Sin Especialidades",
          description: "Aqui se mostrarán las especialidades",
          icon: <BrainIcon />
        }
      case 'unidades-produccion':
        return {
          title: "Sin Unidades de Producción",
          description: "Aqui se mostrarán las unidades de producción",
          icon: <BoxesIcon />
        }
      case 'trenes':
        return {
          title: "Sin Trenes",
          description: "Aqui se mostrarán los trenes",
          icon: <PickaxeIcon />
        }
      case 'fases':
        return {
          title: "Sin Fases",
          description: "Aqui se mostrarán las fases",
          icon: <Rows4Icon />
        }
      default:
        return {
          title: "Sin Contenido",
          description: "Aqui se mostrarán los contenidos",
          icon: <HouseIcon />
        }
    }
  }

  // Otherwise return content for primary tabs (when no secondary tabs exist)
  switch (primaryTab) {
    case 'general':
      return {
        title: "Sin Datos Generales",
        description: "Aqui se mostrarán los datos generales",
        icon: <HouseIcon />
      }
    case 'configurations':
      return {
        title: "Sin Configuraciones",
        description: "Aqui se mostrarán las configuraciones",
        icon: <SettingsIcon />
      }
    case 'usuarios':
      return {
        title: "No hay Usuarios",
        description: "Aqui se mostrarán los usuarios",
        icon: <UsersIcon />
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
      if (activePrimaryTab === "general") {
        return <GeneralData />
      }
      if (activePrimaryTab === "usuarios") {
        return <UsuariosData />
      }
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }

    return (
      <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab}>
        <div className="flex items-center justify-between">
        <TabsList className="text-foreground h-auto  rounded-none border-b bg-transparent px-0 ">
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
        </div>
        <Separator /> 
        {currentSecondaryTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.value === 'especialidades' && <EspecialidadesData />}
            {tab.value === 'unidades-produccion' && <UnidadesProduccionData />}
            {tab.value === 'trenes' && <TrenesData />}
            {tab.value === 'fases' && <FasesData />}
            {!['especialidades', 'unidades-produccion', 'trenes', 'fases'].includes(tab.value) && (
              <CustomEmpty {...getEmptyContent(activePrimaryTab, tab.value)} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    )
  }