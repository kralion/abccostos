import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import PrimaryTabs from './components/primarytabs'
import GestionTrabajos from './components/job-management'
import UnidadesProduccionData from './components/unidades-produccion-data'
import TrenesData from './components/trenes-data'
import JobsData from './components/jobs-data'
import PartidasData from './components/partidas-data'
import { CustomEmpty } from '@/components/custom-empty'
import { BrainIcon, HouseIcon, Rows4Icon, SettingsIcon } from 'lucide-react'

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'trabajos':
      return {
        title: "Sin Trabajos",
        description: "Aqui se mostrarán los trabajos",
        icon: <BrainIcon />
      }
    case 'partidas':
      return {
        title: "Sin Partidas",
        description: "Aqui se mostrarán las partidas",
        icon: <Rows4Icon />
      }
    case 'trabajos-partidas':
      return {
        title: "Sin Trabajos y Partidas",
        description: "Aqui se mostrarán los trabajos y partidas",
        icon: <SettingsIcon />
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
    case "general":
      return <GestionTrabajos />
    case "configurations":
      return <UnidadesProduccionData />
    case "usuarios":
      return <TrenesData />
    case "trabajos":
      return <JobsData />
    case "partidas":
      return <PartidasData />
    case "trabajos-partidas": {
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }
    default: {
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }
  }
}

export function DatosPrincipales() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('general')

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
            Datos Principales
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
