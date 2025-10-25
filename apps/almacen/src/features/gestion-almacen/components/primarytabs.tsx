import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { BoxIcon, BoxesIcon, BriefcaseIcon, FileTextIcon, ListIcon, PickaxeIcon } from 'lucide-react'

interface PrimaryTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export default function PrimaryTabs({
  activeTab,
  onTabChange,
}: PrimaryTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <div className='flex items-center justify-between'>
        <TabsList className='text-foreground h-auto rounded-none border-b bg-transparent px-0'>
          <TabsTrigger
            value='orden-compra'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <BoxIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Orden de Compra
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='guia-ingreso'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <BoxesIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              G. de Ingreso
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='guia-salida'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <PickaxeIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              G. de Salida
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='salida-campo'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <BriefcaseIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              S. de Campo
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='salida-ssomma'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <ListIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              S. de Ssomma
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='auditoria-consumo-material'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FileTextIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              A. de Consumo de Material
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='control-herramientas'
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            <FileTextIcon
              className='me-1.5 opacity-60 md:-ms-0.5'
              size={16}
              aria-hidden='true'
            />
            <span className='hidden group-data-[state=active]:inline md:inline'>
              Control Herramientas
            </span>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  )
}
