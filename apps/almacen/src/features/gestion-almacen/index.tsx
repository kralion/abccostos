import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { CustomEmpty } from '@/components/custom-empty'
import PrimaryTabs from './components/primarytabs'
import OrdenCompra from './components/orden-compra'
import GuiaIngreso from './components/guia-ingreso'
import GuiaSalida from './components/guia-salida'
import SalidaCampo from './components/salida-campo'
import SalidaSsomma from './components/salida-ssomma'
import { BrainIcon, HouseIcon } from 'lucide-react'

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'orden-compra':
      return {
        title: "Sin Orden de Compra",
        description: "Aqui se mostrarán las ordenes de compra",
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
      return <OrdenCompra />
    case "guia-ingreso":
      return <GuiaIngreso />
    case "guia-salida":
      return <GuiaSalida />
    case "salida-campo":
      return <SalidaCampo />
    case "salida-ssomma":
      return <SalidaSsomma />
    default: {
      const emptyContent = getEmptyContent(activePrimaryTab)
      return <CustomEmpty {...emptyContent} />
    }
  }
}

export function GestionAlmacen() {
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
            Gestión de Almacén
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
