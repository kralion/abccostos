import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { Input } from '@workspace/ui/components/input'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Partida } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

const StatusIndicator = ({ status }: { status?: string }) => {
  if (!status) return null
  
  const colorMap = {
    pending: 'bg-red-500',
    'in-progress': 'bg-orange-500',
    completed: 'bg-green-500',
  }

  return (
    <div className={`size-3 rounded-full ${colorMap[status as keyof typeof colorMap]}`} />
  )
}

export const partidasColumns: ColumnDef<Partida>[] = [
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
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <StatusIndicator status={row.original.estado} />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => <div className='w-16'>{row.getValue('id')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'codigo',
    header: 'Item',
    cell: ({ row }) => {
      const level = row.original.level
      const hasChildren = row.original.hasChildren
      const codigo = row.getValue('codigo') as string

      return (
        <div
          className='flex items-center'
          style={{ paddingLeft: `${level * 1}rem` }}
        >
          <span className={hasChildren ? 'font-semibold text-orange-600' : ''}>
            {codigo}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'item',
    header: 'Item',
    cell: ({ row }) => {
      const hasChildren = row.original.hasChildren
      return (
        <div className={hasChildren ? 'font-semibold text-orange-600' : ''}>
          {row.getValue('item')}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'especialidad',
    header: 'Especialidad',
    cell: ({ row }) => <div>{row.getValue('especialidad') || '-'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'unidad',
    header: 'Und',
    cell: ({ row }) => <div className='text-center'>{row.getValue('unidad') || '-'}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'precioUnitario',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Precio Unitario' className='justify-center' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('precioUnitario') as number | undefined
      return value ? (
        <div className='text-center'>{value.toFixed(2)}</div>
      ) : (
        <div className='text-center'>-</div>
      )
    },
  },
  {
    accessorKey: 'metrado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Metrado' className='justify-center' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('metrado') as number | undefined
      return value !== undefined ? (
        <Input
          type='number'
          defaultValue={value}
          className='h-8 w-24 text-center'
          step='0.01'
        />
      ) : (
        <div className='text-center'>-</div>
      )
    },
  },
  {
    accessorKey: 'parcial',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parcial' className='justify-center' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('parcial') as number | undefined
      return value ? (
        <div className='text-center font-medium text-blue-600'>{value.toFixed(1)}</div>
      ) : (
        <div className='text-center'>-</div>
      )
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total' className='justify-center' />
    ),
    cell: ({ row }) => {
      const value = row.getValue('total') as number | undefined
      return value ? (
        <div className='text-center font-semibold'>{value.toFixed(2)}</div>
      ) : (
        <div className='text-center'>-</div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: DataTableRowActions,
    enableSorting: false,
  },
]

