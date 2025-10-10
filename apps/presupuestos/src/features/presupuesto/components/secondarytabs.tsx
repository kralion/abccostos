import { useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import { ChartNoAxesCombinedIcon, HouseIcon, ReceiptIcon } from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
  subpresupuestos: [
    {
      label: 'Arquitectura',
      value: 'arquitectura',
      icon: (
        <ReceiptIcon
          size={16}
          className='me-1.5 opacity-60 md:-ms-0.5'
          aria-hidden='true'
        />
      ),
    },
    {
      label: 'Estructura',
      value: 'estructura',
      icon: (
        <ReceiptIcon
          size={16}
          className='me-1.5 opacity-60 md:-ms-0.5'
          aria-hidden='true'
        />
      ),
    },
    {
      label: 'Ins Eléctricas',
      value: 'ins-electricas',
      icon: (
        <ReceiptIcon
          size={16}
          className='me-1.5 opacity-60 md:-ms-0.5'
          aria-hidden='true'
        />
      ),
    },
    {
      label: 'Ins Sanitarias',
      value: 'ins-sanitarias',
      icon: (
        <ReceiptIcon
          size={16}
          className='me-1.5 opacity-60 md:-ms-0.5'
          aria-hidden='true'
        />
      ),
    },
    {
      label: 'Consolidado',
      value: 'consolidado',
      icon: (
        <ReceiptIcon
          size={16}
          className='me-1.5 opacity-60 md:-ms-0.5'
          aria-hidden='true'
        />
      ),
    },
  ],
  reportes: null,
}

const getEmptyContent = (primaryTab: string, secondaryTab?: string) => {
  // If secondaryTab is provided, return content specific to that secondary tab
  if (secondaryTab) {
    switch (secondaryTab) {
      case 'arquitectura':
        return {
          title: 'Sin Arquitectura',
          description: 'Aqui se mostrarán la arquitectura',
          icon: <ReceiptIcon />,
        }
      case 'estructura':
        return {
          title: 'Sin Estructura',
          description: 'Aqui se mostrarán la estructura',
          icon: <ReceiptIcon />,
        }
      case 'ins-electricas':
        return {
          title: 'Sin Ins Eléctricas',
          description: 'Aqui se mostrarán las ins eléctricas',
          icon: <ReceiptIcon />,
        }
      case 'ins-sanitarias':
        return {
          title: 'Sin Ins Sanitarias',
          description: 'Aqui se mostrarán las ins sanitarias',
          icon: <ReceiptIcon />,
        }
      case 'consolidado':
        return {
          title: 'Sin Consolidado',
          description: 'Aqui se mostrarán el consolidado',
          icon: <ReceiptIcon />,
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
    case 'subpresupuestos':
      return {
        title: 'Sin Sub Presupuestos',
        description: 'Aqui se mostrarán los sub presupuestos',
        icon: <ReceiptIcon />,
      }
    case 'reportes':
      return {
        title: 'Sin Reportes',
        description: 'Aqui se mostrarán los reportes',
        icon: <ChartNoAxesCombinedIcon />,
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
      <TabsList className='text-foreground h-auto w-full rounded-none border-b bg-transparent px-0 md:w-fit'>
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
      {currentSecondaryTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <CustomEmpty {...getEmptyContent(activePrimaryTab, tab.value)} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
