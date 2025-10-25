import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Input } from '@workspace/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { Toggle } from '@workspace/ui/components/toggle'
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Filter,
  List,
  PanelBottom,
  Pencil,
  Plus,
  Search,
  Settings,
  Upload
} from 'lucide-react'

interface PartidasToolbarProps {
  enableRowExpansion: boolean
  onToggleRowExpansion: (enabled: boolean) => void
}

export function PartidasToolbar({ enableRowExpansion, onToggleRowExpansion }: PartidasToolbarProps) {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-3 items-start lg:items-center'>
      {/* Search and filters section */}
      <div className='flex flex-wrap items-center gap-2'>
        <div className='relative max-w-[220px] lg:max-w-xs'>
          <Search className='absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar partida'
            className='pl-8'
          />
        </div>

        {/* Toggle button - visible on both mobile and desktop */}
        

        {/* Desktop: Individual buttons */}
        <div className='hidden lg:flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <span className='mr-2'>Precios OK</span>
            <div className='size-2 rounded-full bg-green-500' />
          </Button>

          <Button variant='outline' size='sm'>
            <Calendar className='size-4' />
            <span className='text-xs'>Fecha base</span>
          </Button>

          <Button variant='outline' size='sm' className='flex items-center gap-2 rounded-md border px-3'>
            <span className='text-xs text-muted-foreground'>Jornada</span>
            <span className='text-xs font-semibold text-red-600'>8.0</span>
          </Button>

          <Select defaultValue='soles'>
            <SelectTrigger className='w-[120px]' size='sm'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='soles'>Soles</SelectItem>
              <SelectItem value='dolares'>Dólares</SelectItem>
            </SelectContent>
          </Select>

          <Button variant='outline' size='sm'>
            <Filter className='size-4' />
            <span className='text-xs'>Filter</span>
          </Button>
        </div>

        {/* Mobile: Grouped dropdown */}
        <div className='lg:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <span className='text-xs'>Filtros</span>
                <ChevronDown className='size-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-48'>
              <DropdownMenuItem>
                <div className='size-2 rounded-full bg-green-500 mr-2' />
                Precios OK
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className='size-4 mr-2' />
                Fecha base
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className='text-xs text-muted-foreground mr-2'>Jornada</span>
                <span className='text-xs font-semibold text-red-600'>8.0</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className='size-4 mr-2' />
                Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div><Toggle
          aria-label="Toggle row expansion"
          size="sm"
          pressed={enableRowExpansion}
          onPressedChange={onToggleRowExpansion}
          className='data-[state=on]:*:[svg]:stroke-primary'
        >
          <PanelBottom className='size-4' />
        </Toggle>
      </div>

      {/* Actions section */}
      <div className='flex items-center gap-1 w-full lg:w-auto'>
        {/* Desktop: All buttons visible */}
        <div className='hidden lg:flex items-center gap-1'>
          <Button variant='ghost' size='icon'>
            <List className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Copy className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Pencil className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <FileText className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Upload className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Download className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <ArrowUp className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <ArrowDown className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <Settings className='size-4' />
          </Button>

          <Button size='sm'>
            <Plus className='size-4' />
            <span className='text-xs'>Título</span>
          </Button>
          <Button size='sm'>
            <Plus className='size-4' />
            <span className='text-xs'>Elementos</span>
          </Button>
          <Button size='sm'>
            <Plus className='size-4' />
            <span className='text-xs'>Partida</span>
          </Button>
          <Button variant='outline' size='sm'>
            <span className='text-xs'>Tarjeta de precios</span>
          </Button>
          <Select defaultValue='precio-meta'>
            <SelectTrigger className='w-[120px] h-8' size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='precio-meta'>Precio Meta</SelectItem>
              <SelectItem value='precio-ofertado'>Precio Ofertado</SelectItem>
              <SelectItem value='precio-referencial'>Precio Referencial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mobile: Grouped dropdowns */}
        <div className='lg:hidden flex items-center gap-2 w-full'>
          {/* Actions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='flex-1'>
                <span className='text-xs'>Acciones</span>
                <ChevronDown className='size-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-48'>
              <DropdownMenuItem>
                <List className='size-4 mr-2' />
                Vista lista
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className='size-4 mr-2' />
                Copiar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className='size-4 mr-2' />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className='size-4 mr-2' />
                Documento
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className='size-4 mr-2' />
                Subir
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className='size-4 mr-2' />
                Descargar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowUp className='size-4 mr-2' />
                Mover arriba
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDown className='size-4 mr-2' />
                Mover abajo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='size-4 mr-2' />
                Configuración
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add items dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm' className='flex-1'>
                <Plus className='size-4' />
                <span className='text-xs'>Agregar</span>
                <ChevronDown className='size-3' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-48'>
              <DropdownMenuItem>
                <Plus className='size-4 mr-2' />
                Título
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className='size-4 mr-2' />
                Elementos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className='size-4 mr-2' />
                Partida
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price card and selector */}
          <div className='flex gap-1'>
            <Button variant='outline' size='sm'>
              <span className='text-xs'>Tarjeta</span>
            </Button>
            <Select defaultValue='precio-meta'>
              <SelectTrigger className='w-[100px] h-8' size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='precio-meta'>Meta</SelectItem>
                <SelectItem value='precio-ofertado'>Ofertado</SelectItem>
                <SelectItem value='precio-referencial'>Referencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

