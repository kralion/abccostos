import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { CustomEmpty } from '@/components/custom-empty'
import PrimaryTabs from './components/primarytabs'
import RelacionEquipos from './components/relacion-equipos'
import { BrainIcon, HouseIcon } from 'lucide-react'

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'pd-equipos':
      return {
        title: "Sin PD. Equipos",
        description: "Aqui se mostrarán los datos de PD. Equipos",
        icon: <BrainIcon />
      }
    case 'liquidacion-equipos':
      return {
        title: "Sin Liquidación de Equipos",
        description: "Aqui se mostrarán los datos de liquidación de equipos",
        icon: <BrainIcon />
      }
    default:
      return {
        title: "Sin Contenido",
        description: "Aqui se mostrarán los contenidos",
        icon: <HouseIcon />
      }
  }
}

const renderTabContent = (activePrimaryTab: string) => {
  switch (activePrimaryTab) {
    case "relacion-equipos":
      return <RelacionEquipos />
    case "pd-equipos":
      return <CustomEmpty {...getEmptyContent('pd-equipos')} />
    case "liquidacion-equipos":
      return <CustomEmpty {...getEmptyContent('liquidacion-equipos')} />
    case "combustible":
      return <CustomEmpty {...getEmptyContent('combustible')} />
    case "valorizaciones":
      return <CustomEmpty {...getEmptyContent('valorizaciones')} />
    case "ratios":
      return <CustomEmpty {...getEmptyContent('ratios')} />
    case "reportes":
      return <CustomEmpty {...getEmptyContent('reportes')} />
    default: {
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }
  }
}

export function ControlEquipos() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('relacion-equipos')

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <Separator className='mb-2' />
        <div className='flex items-center justify-between'>
          <div className='md:hidden' />
          <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
            Control Equipos
          </h1>
          <PrimaryTabs
            activeTab={activePrimaryTab}
            onTabChange={setActivePrimaryTab}
          />
        </div>
        <Separator className='mb-4' />
        {renderTabContent(activePrimaryTab)}
      </Main>
    </>
  )
}
