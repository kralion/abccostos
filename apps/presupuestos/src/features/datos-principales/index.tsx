import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@workspace/ui/components/separator'
import { useState } from 'react'
import PrimaryTabs from './components/primarytabs'
import SecondaryTabs from './components/secondarytabs'

export function DatosPrincipales() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('general')

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main ===== */}
      <Main>
        <div className=' flex items-center justify-between'>
          <h1 className='text-2xl font-bold tracking-tight hidden md:block'>Datos Principales</h1>
        <PrimaryTabs
          activeTab={activePrimaryTab}
          onTabChange={setActivePrimaryTab}
        />
        </div>
        <Separator className='mb-4' />
        <SecondaryTabs activePrimaryTab={activePrimaryTab} />
      </Main>
    </>
  )
}


