import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { getRouteApi } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { ClientesCards } from './components/clientes-cards'
import { ClientesDialogs } from './components/clientes-dialogs'
import { ClientesPrimaryButtons } from './components/clientes-primary-buttons'
import { ClientesProvider } from './components/clientes-provider'
import { ClientesTable } from './components/clientes-table'
import { clientes } from './data/clientes'
import { Separator } from '@workspace/ui/components/separator'

const route = getRouteApi('/_authenticated/(propietario)/clientes/')

export function Clientes() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const isMobile = useIsMobile()

  return (
    <ClientesProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <Separator className='mb-2' />
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div className='md:hidden' />
            <h2 className='text-2xl font-bold tracking-tight hidden md:block'>Clientes</h2>
          <ClientesPrimaryButtons />
        </div>
        <Separator className='mb-4' />
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {isMobile ? (
            <ClientesCards data={clientes} search={search} navigate={navigate} />
          ) : (
            <ClientesTable data={clientes} search={search} navigate={navigate} />
          )}
        </div>
      </Main>
      <ClientesDialogs />
    </ClientesProvider>
  )
}
