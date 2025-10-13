import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import { Separator } from '@workspace/ui/components/separator'
import { PlusIcon, UsersIcon } from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import ClientForm from './components/client-form'

export function Clientes() {
  const [openClientForm, setOpenClientForm] = useState(false)

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
        <ClientForm open={openClientForm} onOpenChange={setOpenClientForm} />
        <div className='flex items-center justify-between'>
          <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
            Clientes
          </h1>
          <Button onClick={() => setOpenClientForm(true)}>
            Nuevo Cliente <PlusIcon />
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
