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
import { Pencil, Trash2, Eye, ChevronRight } from 'lucide-react'
import { type Partida } from '../data/schema'

type PartidaCardProps = {
  partida: Partida
}

const estadoColors = {
  'pending': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
  'completed': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
}

const estadoLabels = {
  'pending': 'Pendiente',
  'in-progress': 'En Progreso',
  'completed': 'Completado',
}

export function PartidaCard({ partida }: PartidaCardProps) {
  const canExpand = !partida.hasChildren && partida.especialidad

  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Código</div>
          <div className='font-medium'>{partida.codigo}</div>
        </div>
        <div className='flex items-center gap-2'>
          {partida.estado && (
            <Badge
              variant='outline'
              className={cn('capitalize', estadoColors[partida.estado])}
            >
              {estadoLabels[partida.estado]}
            </Badge>
          )}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[180px]'>
              {canExpand && (
                <DropdownMenuItem>
                  <Eye size={16} className='opacity-60' aria-hidden='true' />
                  Ver Análisis de Costos
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Pencil size={16} className='opacity-60' aria-hidden='true' />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-500!'>
                <Trash2 size={16} className='opacity-60' aria-hidden='true' />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Item</div>
        <div className='font-semibold break-words'>
          {partida.item}
        </div>
      </div>

      {partida.especialidad && (
        <div className='space-y-1'>
          <div className='text-muted-foreground text-xs'>Especialidad</div>
          <div className='break-words'>{partida.especialidad}</div>
        </div>
      )}

      <div className='flex flex-wrap items-center gap-4'>
        {partida.unidad && (
          <div className='text-center'>
            <div className='text-muted-foreground text-xs'>Unidad</div>
            <div className='font-semibold'>{partida.unidad}</div>
          </div>
        )}
        {partida.precioUnitario && (
          <div className='text-center'>
            <div className='text-muted-foreground text-xs'>Precio Unit.</div>
            <div className='font-semibold'>S/. {partida.precioUnitario.toFixed(2)}</div>
          </div>
        )}
        {partida.metrado && (
          <div className='text-center'>
            <div className='text-muted-foreground text-xs'>Metrado</div>
            <div className='font-semibold'>{partida.metrado}</div>
          </div>
        )}
        {partida.parcial && (
          <div className='text-center'>
            <div className='text-muted-foreground text-xs'>Parcial</div>
            <div className='font-semibold'>S/. {partida.parcial.toFixed(2)}</div>
          </div>
        )}
      </div>

      {partida.total && (
        <div className='text-muted-foreground flex items-center justify-between text-sm'>
          <div>
            <span className='me-1'>Total:</span>
            <span className='text-foreground font-semibold'>S/. {partida.total.toFixed(2)}</span>
          </div>
          {canExpand && (
            <div className='flex items-center gap-1 text-blue-600'>
              <span className='text-xs'>Ver detalles</span>
              <ChevronRight className='h-3 w-3' />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
