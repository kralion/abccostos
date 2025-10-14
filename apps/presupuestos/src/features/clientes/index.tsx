import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { getRouteApi } from '@tanstack/react-router'
import { ClientesDialogs } from './components/clientes-dialogs'
import { ClientesPrimaryButtons } from './components/clientes-primary-buttons'
import { ClientesProvider } from './components/clientes-provider'
import { ClientesTable } from './components/clientes-table'
import { clientes } from './data/clientes'

const route = getRouteApi('/_authenticated/(propietario)/clientes/')

export function Clientes() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <ClientesProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Clientes</h2>
            <p className='text-muted-foreground'>Gestiona tus clientes aquí.</p>
          </div>
          <ClientesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <ClientesTable data={clientes} search={search} navigate={navigate} />
        </div>
      </Main>
      <ClientesDialogs />
    </ClientesProvider>
  )
}
