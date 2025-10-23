import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { useState } from 'react'
import PrimaryTabs from './components/primarytabs'
import { Separator } from '@workspace/ui/components/separator'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('almacen')
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
          <PrimaryTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
      </Main>
    </>
  )
}
