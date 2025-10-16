import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import PrimaryTabs from './components/primarytabs'
import { useState } from 'react'

export function DashboardAdmin() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('proyectos')
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
        <PrimaryTabs
          activeTab={activePrimaryTab}
          onTabChange={setActivePrimaryTab}
        />
      </Main>
    </>
  )
}
