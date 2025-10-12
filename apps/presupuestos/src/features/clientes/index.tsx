import { Button } from '@workspace/ui/components/button'
import { PlusIcon, UsersIcon } from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

export function Clientes() {
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
        <div className='flex items-center justify-between'>
          <div className='md:hidden' />
          <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
            Clientes
          </h1>
          <Button>
            Registrar <PlusIcon />
          </Button>
        </div>
        <CustomEmpty
          title='Sin Clientes'
          description='Aqui se mostrarán los clientes de CP360 Presupuestos'
          icon={<UsersIcon />}
        />
      </Main>
    </>
  )
}
