import { type Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Copy,
  Download,
  FileText,
  Filter,
  Grid3x3,
  List,
  Pencil,
  Plus,
  Search,
  Settings,
  Upload,
} from 'lucide-react'
import { type Partida } from '../data/schema'

interface PartidasToolbarProps {
  table: Table<Partida>
}

export function PartidasToolbar({ table }: PartidasToolbarProps) {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='relative flex-1 max-w-xs'>
          <Search className='absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar partida'
            className='h-9 pl-8'
          />
        </div>

        <Button variant='outline' size='sm' className='h-9'>
          <span className='hidden sm:inline mr-2'>Precios OK</span>
          <div className='size-2 rounded-full bg-green-500' />
        </Button>

        <Button variant='outline' size='sm' className='h-9 gap-2'>
          <Calendar className='size-4' />
          <span className='hidden sm:inline'>Fecha base</span>
        </Button>

        <div className='flex items-center gap-2 rounded-md border px-3 h-9'>
          <span className='text-sm text-muted-foreground'>Jornada</span>
          <span className='font-semibold text-red-600'>8.0</span>
        </div>

        <Select defaultValue='soles'>
          <SelectTrigger className='w-[120px] h-9'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='soles'>Soles</SelectItem>
            <SelectItem value='dolares'>Dólares</SelectItem>
          </SelectContent>
        </Select>

        <Button variant='outline' size='sm' className='h-9 gap-2'>
          <Filter className='size-4' />
          <span className='hidden sm:inline'>Filter</span>
        </Button>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex items-center gap-1'>
          <Button variant='ghost' size='icon' className='size-8'>
            <Grid3x3 className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <List className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <Copy className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <Pencil className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <FileText className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <Upload className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <Download className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <ArrowUp className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <ArrowDown className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' className='size-8'>
            <Settings className='size-4' />
          </Button>
        </div>

        <div className='ml-auto flex items-center gap-2'>
          <Button size='sm' className='h-8 gap-2'>
            <Plus className='size-4' />
            <span className='hidden sm:inline'>Título</span>
          </Button>
          <Button size='sm' className='h-8 gap-2'>
            <Plus className='size-4' />
            <span className='hidden sm:inline'>Elementos</span>
          </Button>
          <Button size='sm' className='h-8 gap-2'>
            <Plus className='size-4' />
            <span className='hidden sm:inline'>Partida</span>
          </Button>
          <Button variant='outline' size='sm' className='h-8'>
            Tarjeta de precios
          </Button>
          <Button variant='outline' size='sm' className='h-8'>
            Precio Meta
          </Button>
        </div>
      </div>
    </div>
  )
}

