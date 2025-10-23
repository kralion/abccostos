import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { CircleDot, ExternalLink, MoreVertical } from 'lucide-react'
import { type GastoGeneral } from '../data/schema'

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    'en-proceso': { label: 'En Proceso', variant: 'destructive', className: '' },
    'iniciado': { label: 'Iniciado', variant: 'default', className: 'bg-orange-500 text-white border-transparent' },
    'terminado': { label: 'Terminado', variant: 'default', className: 'bg-green-500 text-white border-transparent' },
  } as const

  const config = variants[status as keyof typeof variants]

  return (
    <Badge variant={config.variant as 'destructive' | 'default'} className={`font-normal ${config.className}`}>
      {config.label}
    </Badge>
  )
}

export const gastosGeneralesColumns: ColumnDef<GastoGeneral>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'item',
    header: 'Item',
    cell: ({ row }) => <div className='w-20'>{row.getValue('item')}</div>,
  },
  {
    accessorKey: 'titulo',
    header: 'Titulo',
    cell: ({ row }) => (
      <div className='max-w-lg'>
        {row.getValue('titulo')}
      </div>
    ),
  },
  {
    accessorKey: 'parcial',
    header: 'Parcial',
    cell: ({ row }) => {
      const value = row.getValue('parcial') as number
      return <div className='text-center font-medium'>{value.toFixed(2)}</div>
    },
  },
  {
    accessorKey: 'estado',
    header: '',
    cell: ({ row }) => <StatusBadge status={row.getValue('estado')} />,
  },
  {
    id: 'actions-icons',
    header: '',
    cell: () => (
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon' className='size-8'>
          <CircleDot className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <ExternalLink className='size-4' />
        </Button>
      </div>
    ),
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Duplicar</DropdownMenuItem>
          <DropdownMenuItem className='text-destructive'>Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

