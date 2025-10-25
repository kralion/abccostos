import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { CustomEmpty } from '@/components/custom-empty'
import PrimaryTabs from './components/primarytabs'
import Concreto from './components/concreto'
import { BrainIcon, HouseIcon } from 'lucide-react'

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'guia-ingreso':
      return {
        title: "Sin Alimentación",
        description: "Aqui se mostrarán los datos de alimentación",
        icon: <BrainIcon />
      }
    case 'guia-salida':
      return {
        title: "Sin Varios",
        description: "Aqui se mostrarán los datos varios",
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
    case "orden-compra":
      return <Concreto />
    case "guia-ingreso":
      return <CustomEmpty {...getEmptyContent('guia-ingreso')} />
    case "guia-salida":
      return <CustomEmpty {...getEmptyContent('guia-salida')} />
    default: {
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }
  }
}

export function ControlVarios() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('orden-compra')

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
            Control Varios
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
