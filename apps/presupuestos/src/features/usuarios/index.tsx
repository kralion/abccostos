import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Separator } from '@workspace/ui/components/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import { FileTextIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { UsersCards } from './components/users-cards'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { UsersTableSecundarios } from './components/users-table-secundarios'
import { users } from './data/users'

const route = getRouteApi('/_authenticated/(principal)/usuarios/')

export function Usuarios() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [activePrimaryTab, setActivePrimaryTab] = useState('principales')
  const isMobile = useIsMobile()

  // Filter users for principales tab (non-secundario users)
  const principalesUsers = users.filter((user) => user.role !== 'secundario')

  // Filter secundario users
  const secundariosUsers = users.filter((user) => user.role === 'secundario')

  return (
    <UsersProvider activePrimaryTab={activePrimaryTab}>
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <Separator className='mb-2' />
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>Usuarios</h2>

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
          </div>
          <Separator className='mb-2' />
          <div className='flex items-center justify-end'>
            <UsersPrimaryButtons />
          </div>
          <Separator className='my-2' />
          <Tabs value={activePrimaryTab} onValueChange={setActivePrimaryTab}>
            <TabsContent value='principales' className='mt-0'>
              {isMobile ? (
                <UsersCards
                  data={principalesUsers}
                  search={search}
                  navigate={navigate}
                />
              ) : (
                <UsersTable
                  data={principalesUsers}
                  search={search}
                  navigate={navigate}
                />
              )}
            </TabsContent>
            <TabsContent value='secundarios' className='mt-0'>
              {isMobile ? (
                <UsersCards
                  data={secundariosUsers}
                  search={search}
                  navigate={navigate}
                />
              ) : (
                <UsersTableSecundarios
                  data={secundariosUsers}
                  search={search}
                  navigate={navigate}
                />
              )}
            </TabsContent>
          </Tabs>
        </Main>
        <UsersDialogs />
      </>
    </UsersProvider>
  )
}
