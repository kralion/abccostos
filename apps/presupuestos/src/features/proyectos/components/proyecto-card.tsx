import { format } from 'date-fns'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { FolderPlus, GitCompareArrows, Pencil, Trash2 } from 'lucide-react'
import { estadoTypes } from '../data/data'
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

  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Código</div>
          <div className='font-medium'>{proyecto.codigo}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge variant='outline' className={cn('capitalize', estadoBadge)}>
            {proyecto.estado}
          </Badge>
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
                <FolderPlus
                  size={16}
                  className='opacity-60'
                  aria-hidden='true'
                />
                Crear Presupuesto
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAction('comparativa')}>
                <GitCompareArrows
                  size={16}
                  className='opacity-60'
                  aria-hidden='true'
                />
                Comparativo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAction('delete')}
                className='text-red-500!'
              >
                <Trash2 size={16} className='opacity-60' aria-hidden='true' />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Nombre de Proyecto</div>
        <div className='font-semibold break-words'>
          {proyecto.nombreDeProyecto}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Nombre Corto</div>
        <div className='break-words'>{proyecto.nombreCorto}</div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {/* Mostrar etiquetas sólo si venta existe */}
        {proyecto.venta && (
          <>
            <Badge
              variant='outline'
              className={cn(
                'capitalize',
                'border-orange-200 bg-orange-100/50 text-orange-800 dark:text-orange-200'
              )}
            >
              Venta
            </Badge>
            <Badge
              variant='outline'
              className={cn(
                'capitalize',
                'border-green-200 bg-green-100/50 text-green-800 dark:text-green-200'
              )}
            >
              Meta
            </Badge>
            <Badge
              variant='outline'
              className='border-orange-200 bg-orange-200 text-orange-800 dark:text-orange-200'
            >
              Desviación: S/. {proyecto.desviacion.toFixed(2)}
            </Badge>
          </>
        )}
        {!proyecto.venta && (
          <Badge
            variant='outline'
            className='border-gray-300 bg-gray-100/70 text-gray-500 dark:text-gray-200'
          >
            Sin presupuestos
          </Badge>
        )}
      </div>

      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <div>
          <span className='me-1'>Fecha Inicio:</span>
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
