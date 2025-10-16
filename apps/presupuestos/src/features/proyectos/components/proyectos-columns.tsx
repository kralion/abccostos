import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@workspace/ui/components/badge'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { estadoTypes } from '../data/data'
import { type Proyecto } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const proyectosColumns: ColumnDef<Proyecto>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Seleccionar todo'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn('sticky md:table-cell start-0 z-10 rounded-tl-[inherit]'),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Seleccionar fila'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'codigo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-3 text-nowrap'>{row.getValue('codigo')}</div>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)]',
        'sticky start-6 @4xl/content:table-cell @4xl/content:drop-shadow-none'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'nombreDeProyecto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre De Proyecto' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>
        {row.getValue('nombreDeProyecto')}
      </LongText>
    ),
  },
  {
    accessorKey: 'nombreCorto',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nombre Corto' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('nombreCorto')}</LongText>
    ),
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Estado' />
    ),
    cell: ({ row }) => {
      const { estado } = row.original
      const badgeColor = estadoTypes.get(estado)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('estado')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'fechaBase',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha Base' />
    ),
    cell: ({ row }) => {
      const fecha = row.getValue('fechaBase') as Date
      return (
        <div className='w-fit text-nowrap'>
          {format(fecha, 'dd/MM/yyyy', { locale: es })}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'plazo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Plazo' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('plazo')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'presupuestos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Presupuestos' />
    ),
    cell: ({ row }) => {
      const { meta, venta } = row.original
      return (
        <div className='flex items-center gap-2'>
          {meta && (
            <Badge
              variant='outline'
              className='border-green-200 bg-green-100/50 text-green-800 dark:text-green-200'
            >
              Meta
            </Badge>
          )}
          {venta && (
            <Badge
              variant='outline'
              className='border-orange-200 bg-orange-100/50 text-orange-800 dark:text-orange-200'
            >
              Venta
            </Badge>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
