import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { MoreVerticalIcon } from 'lucide-react'
import { SubPresupuesto } from '../types'

interface SubPresupuestoCardProps {
  item: SubPresupuesto
  isSelected: boolean
  onSelect: (id: string, checked: boolean) => void
}

export function SubPresupuestoCard({ item }: SubPresupuestoCardProps) {
  return (
    <div className='rounded-lg border bg-white p-4 space-y-3'>
      {/* Header with checkbox and actions */}
      <div className='flex items-center justify-between'>
        
          <div>
            <h3 className='font-medium text-sm'>{item.nombre}</h3>
            <p className='text-xs text-muted-foreground'>ID: {item.id}</p>
          </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreVerticalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Duplicar</DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Financial details */}
      <div className='grid grid-cols-2 gap-3 text-sm'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Costo Directo</p>
          <p className='text-blue-600 font-medium'>{item.costoDirecto.toFixed(2)}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Gastos Generales</p>
          <p className='text-blue-600 font-medium'>{item.gastosGenerales.toFixed(2)}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Utilidad</p>
          <p className='font-medium'>
            {item.utilidad > 0 ? item.utilidad.toFixed(2) : '-'}
          </p>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Sub Total</p>
          <p className='font-medium'>{item.subTotal.toFixed(2)}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>IGV</p>
          <p className='font-medium'>{item.igv.toFixed(2)}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Total</p>
          <p className='text-orange-600 font-semibold'>{item.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
