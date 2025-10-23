import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import PrimaryTabs from './components/primarytabs'
import SecondaryTabs from './components/secondarytabs'
import Rqs from './components/rqs'
import { CustomEmpty } from '@/components/custom-empty'
import { FileTextIcon, HouseIcon } from 'lucide-react'

const getEmptyContent = (primaryTab: string) => {
  switch (primaryTab) {
    case 'rqs':
      return {
        title: 'Sin RqS',
        description: 'Aqui se mostrarán los RqS',
        icon: <FileTextIcon />
      }
    default:
      return {
        title: 'Sin Contenido',
        description: 'Aqui se mostrarán los contenidos',
        icon: <HouseIcon />
      }
  }
}

const renderTabContent = (activePrimaryTab: string) => {
  switch (activePrimaryTab) {
    case 'rqs':
      return <Rqs />
    default:
      return <CustomEmpty {...getEmptyContent(activePrimaryTab)} />
  }
}

export function Logistica() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('rqs')

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
            Logística
          </h1>
          <PrimaryTabs
            activeTab={activePrimaryTab}
            onTabChange={setActivePrimaryTab}
          />
        </div>
        <Separator />
        {renderTabContent(activePrimaryTab)}
        <SecondaryTabs activePrimaryTab={activePrimaryTab} />
      </Main>
    </>
  )
}
