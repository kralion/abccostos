import { useEffect, useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import {
  ChartNoAxesCombinedIcon,
  HouseIcon,
  PlusIcon,
  ReceiptIcon,
} from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: Record<string, SecondaryTab[] | null> = {
  principales: null,
  secundarios: null,
}

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'principales':
      return {
        title: 'Sin UsuariosPrincipales',
        description: 'Aqui se mostrarán los usuarios principales',
        icon: <ReceiptIcon />,
      }
    case 'secundarios':
      return {
        title: 'Sin Usuarios Secundarios',
        description: 'Aqui se mostrarán los usuarios secundarios',
        icon: <ChartNoAxesCombinedIcon />,
      }
    default:
      return {
        title: 'Sin Contenido',
        description: 'Aqui se mostrarán los usuarios',
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
        <Button variant='secondary' onClick={() => console.log('Registrar')}>
          <PlusIcon />
          Registrar
        </Button>
      </div>
      {currentSecondaryTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <CustomEmpty {...getEmptyContent(activePrimaryTab)} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
