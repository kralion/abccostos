import { useState } from 'react'
import { Separator } from '@workspace/ui/components/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
import { UsersIcon } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { UsuariosCards } from './components/usuarios-cards'
import { UsuariosTable } from './components/usuarios-table'
import { useUsuarios } from '@workspace/api-presupuestos/queries'

export function Usuarios() {
  const [activePrimaryTab, setActivePrimaryTab] = useState('activos')
  const isMobile = useIsMobile()

  const { data: usuarios = [], isLoading, error } = useUsuarios()

  if (isLoading) {
    return (
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-muted-foreground'>Cargando usuarios...</div>
          </div>
        </Main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-destructive'>Error al cargar los usuarios</div>
          </div>
        </Main>
      </>
    )
  }

  // Filter usuarios for active tab (enabled users)
  const activeUsuarios = usuarios.filter(
    (usuario) => usuario.estado_habilitado === true
  )

  // Filter disabled usuarios
  const disabledUsuarios = usuarios.filter(
    (usuario) => usuario.estado_habilitado === false
  )

  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <Separator className='mb-2' />
        <div className='flex items-center justify-between space-y-2'>
          <div className='md:hidden' />

          <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
            Usuarios
          </h1>

          <Tabs
            value={activePrimaryTab}
            onValueChange={setActivePrimaryTab}
            className='flex items-center justify-between'
          >
            <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
              <TabsTrigger
                value='activos'
                className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
              >
                <UsersIcon
                  className='me-1.5 opacity-60 md:-ms-0.5'
                  size={16}
                  aria-hidden='true'
                />
                <span className='hidden group-data-[state=active]:inline md:inline'>
                  Activos
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='deshabilitados'
                className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
              >
                <UsersIcon
                  className='me-1.5 opacity-60 md:-ms-0.5'
                  size={16}
                  aria-hidden='true'
                />
                <span className='hidden group-data-[state=active]:inline md:inline'>
                  Deshabilitados
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator className='my-2' />
        <Tabs value={activePrimaryTab} onValueChange={setActivePrimaryTab}>
          <TabsContent value='activos' className='mt-0'>
            {isMobile ? (
              <UsuariosCards data={activeUsuarios} />
            ) : (
              <UsuariosTable data={activeUsuarios} />
            )}
          </TabsContent>
          <TabsContent value='deshabilitados' className='mt-0'>
            {isMobile ? (
              <UsuariosCards data={disabledUsuarios} />
            ) : (
              <UsuariosTable data={disabledUsuarios} />
            )}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
