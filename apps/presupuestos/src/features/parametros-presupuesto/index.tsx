import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@workspace/ui/components/separator'
import { useState } from 'react'
import PrimaryTabs from './components/primarytabs'
import SecondaryTabs from './components/secondarytabs'

export function ParametrosPresupuesto() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('gastos-generales')

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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight hidden md:block'>Parámetros Presupuesto</h1>
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


