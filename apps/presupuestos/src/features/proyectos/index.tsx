import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { getRouteApi } from '@tanstack/react-router'
import { Separator } from '@workspace/ui/components/separator'
import {
  Tabs,
  TabsList,
  TabsTrigger
} from '@workspace/ui/components/tabs'
import { FileTextIcon } from 'lucide-react'
import { useState } from 'react'
import { ProyectosDialogs } from './components/proyectos-dialogs'
import { ProyectosPrimaryButtons } from './components/proyectos-primary-buttons'
import { ProyectosProvider } from './components/proyectos-provider'
import { ProyectosTable } from './components/proyectos-table'
import { proyectos } from './data/proyectos'

const route = getRouteApi('/_authenticated/(principal)/proyectos/')

export function Proyectos() {
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const [activePrimaryTab, setActivePrimaryTab] = useState('activos')
  const [activeSecondaryTab, _setActiveSecondaryTab] = useState<
    'all' | 'activo' | 'terminado' | 'en ejecucion'
  >('all')

  // Filter proyectos based on secondary tab selection
  const filteredProyectos =
    activeSecondaryTab === 'all'
      ? proyectos
      : proyectos.filter((proyecto) => proyecto.estado === activeSecondaryTab)

  return (
    <ProyectosProvider>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <Separator className='mb-2' />
        <div className='flex items-center justify-between'>
          <div className='md:hidden' />

          <h1 className='hidden text-2xl font-bold tracking-tight md:block'>
            Portafolio de proyectos
          </h1>

          {/* Primary Tabs: Activos / Archivados */}
          <div className='flex items-center '>
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
            <ProyectosPrimaryButtons />
            </div>
        </div>
        <Separator className='mb-4' />
            <ProyectosTable
              data={filteredProyectos}
              search={search}
              navigate={navigate}
            />
      </Main>
      <ProyectosDialogs />
    </ProyectosProvider>
  )
}
