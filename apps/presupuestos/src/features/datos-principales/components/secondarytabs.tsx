import { useState, useEffect } from "react"
import {
  BoxesIcon,
  HouseIcon,
  PickaxeIcon,
  PlusIcon,
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
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
  general: null,
  configurations: [
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
  roles: null
}

const getEmptyContent = (primaryTab: string, secondaryTab?: string) => {
  // If secondaryTab is provided, return content specific to that secondary tab
  if (secondaryTab) {
    switch (secondaryTab) {
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
    case 'roles':
      return {
        title: "No hay Roles",
        description: "Aqui se mostrarán los roles",
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
          {activeSecondaryTab === "unidades-produccion" && (
            <CustomNewButton trigger="unidades-produccion" title="Nueva U.P." />
          )}
          {activeSecondaryTab === "trenes" && (
            <CustomNewButton trigger="trenes" title="Nuevo Tren" />
          )}
          {activeSecondaryTab === "fases" && (
            <CustomNewButton trigger="fases" title="Nueva Fase" />
          )}
        </div>
        <Separator /> 
        {currentSecondaryTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <CustomEmpty {...getEmptyContent(activePrimaryTab, tab.value)} />
          </TabsContent>
        ))}
      </Tabs>
    )
  }
  

  interface CustomNewButtonProps {
    trigger: string
    title: string
}
  function CustomNewButton({ trigger, title }: CustomNewButtonProps) {
    return (
      <Button
        variant="secondary"
        onClick={() => console.log(trigger)}
      >
        <PlusIcon />
        {title}
      </Button>
    )
  }