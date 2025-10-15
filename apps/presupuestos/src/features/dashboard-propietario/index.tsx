import { Separator } from '@workspace/ui/components/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'

export function DashboardPropietario() {
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
        <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
          Dashboard
        </h1>
        <Separator className='mb-2' />
      </Main>
    </>
  )
}
