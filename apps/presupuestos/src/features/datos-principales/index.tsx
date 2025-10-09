import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Separator } from '@workspace/ui/components/separator'
import PrimaryTabs from './components/primarytabs'
import SecondaryTabs from './components/secondarytabs'

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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Datos Principales</h1>
        <PrimaryTabs
          activeTab={activePrimaryTab}
          onTabChange={setActivePrimaryTab}
        />
        </div>
        <Separator className='my-4' />
        <SecondaryTabs activePrimaryTab={activePrimaryTab} />
      </Main>
    </>
  )
}


