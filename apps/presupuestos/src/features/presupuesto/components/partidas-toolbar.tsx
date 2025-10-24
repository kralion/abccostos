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



export function PartidasToolbar() {
  return (
    <div className='flex md:flex-row flex-col md:justify-between justify-start gap-2 items-center '>
      <div className='flex items-center gap-2'>
        <div className='relative max-w-xs'>
          <Search className='absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar partida'
            className='pl-8'
          />
        </div>

        <Button variant='outline' size='sm' >
          <span className='hidden sm:inline mr-2'>Precios OK</span>
          <div className='size-2 rounded-full bg-green-500' />
        </Button>

        <Button variant='outline' size='sm' >
          <Calendar className='size-4' />
          <span className='hidden sm:inline text-xs'>Fecha base</span>
        </Button>

        <Button variant='outline' size='sm' className='flex items-center gap-2 rounded-md border px-3 '>
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

        <Button variant='outline' size='sm' >
          <Filter className='size-4' />
          <span className='hidden sm:inline text-xs'>Filter</span>
        </Button>
      </div>
<div className='flex items-center gap-1'>
          <Button variant='ghost' size='icon' >
            <Grid3x3 className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <List className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <Copy className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <Pencil className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <FileText className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <Upload className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <Download className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <ArrowUp className='size-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <ArrowDown className='size-4' />
          </Button>
          <Button variant='ghost' size='icon' >
            <Settings className='size-4' />
          </Button>
       
          <Button size='sm' >
            <Plus className='size-4' />
            <span className='hidden sm:inline text-xs'>Título</span>
          </Button>
          <Button size='sm' >
            <Plus className='size-4' />
            <span className='hidden sm:inline text-xs'>Elementos</span>
          </Button>
          <Button size='sm' >
            <Plus className='size-4' />
            <span className='hidden sm:inline text-xs'>Partida</span>
          </Button>
          <Button variant='outline' size='sm' >
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
    </div>
  )
}

