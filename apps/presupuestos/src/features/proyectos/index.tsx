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
import { ProyectosCards } from './components/proyectos-cards'
import { ProyectosDialogs } from './components/proyectos-dialogs'
import { ProyectosPrimaryButtons } from './components/proyectos-primary-buttons'
import { ProyectosProvider } from './components/proyectos-provider'
import { ProyectosTable } from './components/proyectos-table'
import { ProyectosTableArchived } from './components/proyectos-table-archived'
import { useProyectos } from '@workspace/api-presupuestos/queries'
import type { Proyecto } from '@workspace/api-presupuestos/services'

const route = getRouteApi('/_authenticated/(principal)/proyectos/')

export function Proyectos() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [activePrimaryTab, setActivePrimaryTab] = useState('activos')
  const [activeSecondaryTab, _setActiveSecondaryTab] = useState<
    'all' | 'activo' | 'terminado' | 'en ejecucion'
  >('all')
  const isMobile = useIsMobile()

  const { data: proyectos = [], isLoading, error } = useProyectos()

  if (isLoading) {
    return (
      <ProyectosProvider>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-muted-foreground'>Cargando proyectos...</div>
          </div>
        </Main>
      </ProyectosProvider>
    )
  }

  if (error) {
    return (
      <ProyectosProvider>
        <Header fixed>
          <div className='ms-auto flex items-center space-x-4'>
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <div className='flex items-center justify-center h-64'>
            <div className='text-destructive'>Error al cargar los proyectos</div>
          </div>
        </Main>
      </ProyectosProvider>
    )
  }

  // Filter proyectos for active tab (non-archived projects)
  const activeProyectos = proyectos.filter(
    (proyecto) => proyecto.estado !== 'archivado'
  )

  // Filter proyectos based on secondary tab selection
  const filteredActiveProyectos =
    activeSecondaryTab === 'all'
      ? activeProyectos
      : activeProyectos.filter(
          (proyecto) => proyecto.estado === activeSecondaryTab
        )

  // Filter archived proyectos
  const archivedProyectos = proyectos.filter(
    (proyecto) => proyecto.estado === 'archivado'
  )

  return (
    <ProyectosProvider>
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
            Proyectos
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
                <FileTextIcon
                  className='me-1.5 opacity-60 md:-ms-0.5'
                  size={16}
                  aria-hidden='true'
                />
                <span className='hidden group-data-[state=active]:inline md:inline'>
                  Activos
                </span>
              </TabsTrigger>
              <TabsTrigger
                value='archivados'
                className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
              >
                <FileTextIcon
                  className='me-1.5 opacity-60 md:-ms-0.5'
                  size={16}
                  aria-hidden='true'
                />
                <span className='hidden group-data-[state=active]:inline md:inline'>
                  Archivados
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator className='my-2' />
        <div className='flex items-center justify-end'>
          <ProyectosPrimaryButtons />
        </div>
        <Separator className='my-2' />
        <Tabs value={activePrimaryTab} onValueChange={setActivePrimaryTab}>
          <TabsContent value='activos' className='mt-0'>
            {isMobile ? (
              <ProyectosCards
                data={filteredActiveProyectos}
                search={search}
                navigate={navigate}
              />
            ) : (
              <ProyectosTable
                data={filteredActiveProyectos}
                search={search}
                navigate={navigate}
              />
            )}
          </TabsContent>
          <TabsContent value='archivados' className='mt-0'>
            {isMobile ? (
              <ProyectosCards
                data={archivedProyectos}
                search={search}
                navigate={navigate}
              />
            ) : (
              <ProyectosTableArchived
                data={archivedProyectos}
                search={search}
                navigate={navigate}
              />
            )}
          </TabsContent>
        </Tabs>
      </Main>
      <ProyectosDialogs />
    </ProyectosProvider>
  )
}
