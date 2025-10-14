import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { getRouteApi } from '@tanstack/react-router'
import { Separator } from '@workspace/ui/components/separator'
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { FileTextIcon } from 'lucide-react'
import { useState } from 'react'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { users } from './data/users'

const route = getRouteApi('/_authenticated/(principal)/usuarios/')

export function Usuarios() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [activePrimaryTab, setActivePrimaryTab] = useState('principales')

 
  return (
    <UsersProvider>
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <Separator className='mb-2' />
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Usuarios</h2>
              <p className='text-muted-foreground'>
                Gestiona tus usuarios y sus roles aquí.
              </p>
            </div>
            <div className='flex items-center'>
              <Tabs
                value={activePrimaryTab}
                onValueChange={setActivePrimaryTab}
                className='flex items-center justify-between'
              >
                <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
                  <TabsTrigger
                    value='principales'
                    className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
                  >
                    <FileTextIcon
                      className='me-1.5 opacity-60 md:-ms-0.5'
                      size={16}
                      aria-hidden='true'
                    />
                    <span className='hidden group-data-[state=active]:inline md:inline'>
                      Principales
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value='secundarios'
                    className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
                  >
                    <FileTextIcon
                      className='me-1.5 opacity-60 md:-ms-0.5'
                      size={16}
                      aria-hidden='true'
                    />
                    <span className='hidden group-data-[state=active]:inline md:inline'>
                   Secundarios
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <UsersPrimaryButtons />
            </div>
          </div>
          <Separator className='mb-4' />
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <UsersTable data={users} search={search} navigate={navigate} />
          </div>
        </Main>
        <UsersDialogs />
      </>
    </UsersProvider>
  )
}
