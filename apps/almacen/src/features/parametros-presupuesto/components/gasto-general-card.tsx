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
import { Pencil, Trash2, Eye } from 'lucide-react'
import { type GastoGeneral } from '../data/schema'

type GastoGeneralCardProps = {
  gastoGeneral: GastoGeneral
}

const estadoColors = {
  'en-proceso': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
  'iniciado': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
  'terminado': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
}

const estadoLabels = {
  'en-proceso': 'En Proceso',
  'iniciado': 'Iniciado',
  'terminado': 'Terminado',
}

export function GastoGeneralCard({ gastoGeneral }: GastoGeneralCardProps) {
  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Item</div>
          <div className='font-medium'>{gastoGeneral.item}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className={cn('capitalize', estadoColors[gastoGeneral.estado])}
          >
            {estadoLabels[gastoGeneral.estado]}
          </Badge>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[180px]'>
              <DropdownMenuItem>
                <Eye size={16} className='opacity-60' aria-hidden='true' />
                Ver Detalles
              </DropdownMenuItem>
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
        <div className='text-muted-foreground text-xs'>Título</div>
        <div className='font-semibold break-words'>
          {gastoGeneral.titulo}
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Parcial</div>
          <div className='font-semibold'>S/. {gastoGeneral.parcial.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}
