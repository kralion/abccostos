import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { FolderPlus, GitCompareArrows, Pencil, Trash2 } from 'lucide-react'
import { estadoTypes, tipoTypes } from '../data/data'
import { type Proyecto } from '../data/schema'
import { useProyectos } from './proyectos-provider'

type ProyectoCardProps = {
  proyecto: Proyecto
}

export function ProyectoCard({ proyecto }: ProyectoCardProps) {
  const { setOpen, setCurrentRow } = useProyectos()

  const onAction = (action: 'edit' | 'create' | 'comparativa' | 'delete') => {
    setCurrentRow(proyecto)
    setOpen(action)
  }

  const estadoBadge = estadoTypes.get(proyecto.estado)
  const tipoBadge = tipoTypes.get(proyecto.tipo)

  return (
    <div className='border rounded-md p-4 bg-background flex flex-col gap-3'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-xs text-muted-foreground'>Código</div>
          <div className='font-medium'>{proyecto.codigo}</div>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <DotsHorizontalIcon className='h-4 w-4' />
              <span className='sr-only'>Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[180px]'>
            <DropdownMenuItem onClick={() => onAction('edit')}>
              <Pencil size={16} className='opacity-60' aria-hidden='true' />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('create')}>
              <FolderPlus size={16} className='opacity-60' aria-hidden='true' />
              Crear Presupuesto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('comparativa')}>
              <GitCompareArrows size={16} className='opacity-60' aria-hidden='true' />
              Comparativo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('delete')} className='text-red-500!'>
              <Trash2 size={16} className='opacity-60' aria-hidden='true' />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='space-y-1'>
        <div className='text-xs text-muted-foreground'>Nombre de Proyecto</div>
        <div className='font-semibold break-words'>{proyecto.nombreDeProyecto}</div>
      </div>

      <div className='space-y-1'>
        <div className='text-xs text-muted-foreground'>Nombre Corto</div>
        <div className='break-words'>{proyecto.nombreCorto}</div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Badge variant='outline' className={cn('capitalize', estadoBadge)}>
          {proyecto.estado}
        </Badge>
        <Badge variant='outline' className={cn('capitalize', tipoBadge)}>
          {proyecto.tipo}
        </Badge>
      </div>

      <div className='flex items-center justify-between text-sm text-muted-foreground'>
        <div>
          <span className='me-1'>Fecha Base:</span>
          <span className='text-foreground'>
            {format(proyecto.fechaBase, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
        <div>
          <span className='me-1'>Plazo:</span>
          <span className='text-foreground'>{proyecto.plazo}</span>
        </div>
      </div>
    </div>
  )
}


