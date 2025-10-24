import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { MoreVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { SubPresupuesto } from '../types'

interface SubPresupuestosTableProps {
  data: SubPresupuesto[]
  selectedRows: Set<string>
  onSelectAll: (checked: boolean) => void
  onSelectRow: (id: string, checked: boolean) => void
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function SubPresupuestosTable({
  data,
  selectedRows,
  onSelectAll,
  onSelectRow,
  globalFilter,
  onGlobalFilterChange,
}: SubPresupuestosTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<SubPresupuesto>[] = [
    {
      id: 'select',
      header: () => (
        <Checkbox
          checked={selectedRows.size === data.length}
          onCheckedChange={onSelectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedRows.has(row.original.id)}
          onCheckedChange={(checked) =>
            onSelectRow(row.original.id, checked as boolean)
          }
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ getValue }) => <div className='text-sm'>{getValue() as string}</div>,
    },
    {
      accessorKey: 'nombre',
      header: 'Sub presupuestos',
      cell: ({ getValue }) => <div className='text-sm'>{getValue() as string}</div>,
    },
    {
      accessorKey: 'costoDirecto',
      header: 'Costo Directo',
      cell: ({ getValue }) => (
        <div className='text-center text-sm text-blue-600'>
          {(getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'gastosGenerales',
      header: 'Gastos Generales',
      cell: ({ getValue }) => (
          <div className='text-center text-sm text-blue-600'>
          {(getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'utilidad',
      header: 'Utilidad',
      cell: ({ getValue }) => {
        const value = getValue() as number
        return (
          <div className='text-center text-sm'>
            {value > 0 ? value.toFixed(2) : ''}
          </div>
        )
      },
    },
    {
      accessorKey: 'subTotal',
      header: 'Sub total',
      cell: ({ getValue }) => (
        <div className='text-center text-sm'>
          {(getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'igv',
      header: 'Igv',
      cell: ({ getValue }) => (
        <div className='text-center text-sm'>
          {(getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ getValue }) => (
        <div className='text-center text-sm text-orange-600'>
          {(getValue() as number).toFixed(2)}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: () => (
        <div className='text-center'>
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
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className='rounded-lg border'>
      <Table>
        <TableHeader className='bg-primary/20'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className='text-center'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className='text-center'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
