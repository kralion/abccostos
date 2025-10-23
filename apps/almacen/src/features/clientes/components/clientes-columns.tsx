import { format } from 'date-fns'
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@workspace/ui/components/badge'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { DataTableColumnHeader } from '@/components/data-table'
import { LongText } from '@/components/long-text'
import { estadoTypes } from '../data/data'
import { type Cliente } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const clientesColumns: ColumnDef<Cliente>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => (
      <div className='w-fit ps-3 text-nowrap'>{row.getValue('id')}</div>
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
    accessorKey: 'nombreEmpresa',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Empresa' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>{row.getValue('nombreEmpresa')}</LongText>
    ),
  },
  {
    accessorKey: 'usuarioPrincipal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='U. Principal' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-48'>
        {row.getValue('usuarioPrincipal')}
      </LongText>
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
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Correo' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'proyectos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Proyectos' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('proyectos')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'usuarios',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Usuarios' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('usuarios')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'modulosActivos',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Módulos Activos' />
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('modulosActivos')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'fechaInicioFacturacion',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Fecha de Inicio facturación'
      />
    ),
    cell: ({ row }) => {
      const fecha = row.getValue('fechaInicioFacturacion') as Date
      return (
        <div className='w-fit text-nowrap'>
          {format(fecha, 'dd/MM/yyyy', { locale: es })}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'fechaFinFacturacion',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fecha de fin facturación' />
    ),
    cell: ({ row }) => {
      const fecha = row.getValue('fechaFinFacturacion') as Date
      return (
        <div className='w-fit text-nowrap'>
          {format(fecha, 'dd/MM/yyyy', { locale: es })}
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
