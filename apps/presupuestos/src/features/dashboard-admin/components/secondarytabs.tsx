import { useState, useEffect } from 'react'
import { Button } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import {
  BoxesIcon,
  BrainIcon,
  HouseIcon,
  PickaxeIcon,
  PlusIcon,
  Rows4Icon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
  proyectos: null,
  'ventas-vs-meta': null,
}

const getEmptyContent = (primaryTab: string, secondaryTab?: string) => {
  // If secondaryTab is provided, return content specific to that secondary tab
  if (secondaryTab) {
    switch (secondaryTab) {
      case 'especialidades':
        return {
          title: 'Sin Proyectos',
          description: 'Aqui se mostrarán los proyectos',
          icon: <BrainIcon />,
        }
      case 'ventas-vs-meta':
        return {
          title: 'Sin Ventas vs Meta',
          description: 'Aqui se mostrarán las ventas vs meta',
          icon: <SettingsIcon />,
        }
      default:
        return {
          title: 'Sin Contenido',
          description: 'Aqui se mostrarán los contenidos',
          icon: <HouseIcon />,
        }
    }
  }

  // Otherwise return content for primary tabs (when no secondary tabs exist)
  switch (primaryTab) {
    case 'proyectos':
      return {
        title: 'Sin Proyectos',
        description: 'Aqui se mostrarán los proyectos',
        icon: <HouseIcon />,
      }
    case 'ventas-vs-meta':
      return {
        title: 'Sin Ventas vs Meta',
        description: 'Aqui se mostrarán las ventas vs meta',
        icon: <SettingsIcon />,
      }
    default:
      return {
        title: 'Sin Contenido',
        description: 'Aqui se mostrarán los contenidos',
        icon: <HouseIcon />,
      }
  }
}

interface SecondaryTabsComponentProps {
  activePrimaryTab: string
}

export default function SecondaryTabs({
  activePrimaryTab,
}: SecondaryTabsComponentProps) {
  const currentSecondaryTabs = secondaryTabs[activePrimaryTab] || []
  const [activeSecondaryTab, setActiveSecondaryTab] = useState(
    currentSecondaryTabs.length > 0 ? currentSecondaryTabs[0].value : ''
  )

  useEffect(() => {
    const newSecondaryTabs = secondaryTabs[activePrimaryTab] || []
    if (
      newSecondaryTabs.length > 0 &&
      !newSecondaryTabs.find((tab) => tab.value === activeSecondaryTab)
    ) {
      setActiveSecondaryTab(newSecondaryTabs[0].value)
    }
  }, [activePrimaryTab, activeSecondaryTab])

  if (!currentSecondaryTabs || currentSecondaryTabs.length === 0) {
    const emptyContent = getEmptyContent(activePrimaryTab)
    return <CustomEmpty {...emptyContent} />
  }

  return (
    <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab}>
      <div className='flex items-center justify-between'>
        <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
          {currentSecondaryTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='group hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none'
            >
              {tab.icon}
              <span className='hidden group-data-[state=active]:inline md:inline'>
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
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
