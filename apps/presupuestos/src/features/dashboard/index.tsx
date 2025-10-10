import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { useState } from 'react'
import PrimaryTabs from './components/primarytabs'
import { Separator } from '@workspace/ui/components/separator'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('resumen')
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
        <Separator className='mb-2' />
          <PrimaryTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
      </Main>
    </>
  )
}
