import { DataTableToolbar } from '@/components/data-table'
import { DataTablePaginationControls } from '@/components/data-table/pagination-controls'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { UsuarioCard } from './usuario-card'
import type { Usuario } from '@workspace/api-presupuestos/services'

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'provider', label: 'Provider' },
  { value: 'seller', label: 'Seller' },
  { value: 'registered', label: 'Registered' },
]

const estados = [
  { value: true, label: 'Habilitado' },
  { value: false, label: 'Deshabilitado' },
]

type UsuariosCardsProps = {
  data: Usuario[]
}

export function UsuariosCards({ data }: UsuariosCardsProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  // Minimal columns for filtering pipeline only
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nombres',
      },
      {
        accessorKey: 'apellidos',
      },
      {
        accessorKey: 'email',
      },
      {
        accessorKey: 'usuario',
      },
      {
        accessorKey: 'rol',
        filterFn: (row: any, id: string, value: string[]) =>
          value.includes(row.getValue(id)),
      },
      {
        accessorKey: 'estado_habilitado',
        filterFn: (row: any, id: string, value: boolean[]) =>
          value.includes(row.getValue(id)),
      },
    ],
    []
  ) as any

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const id = String(row.getValue('id')).toLowerCase()
      const nombres = String(row.getValue('nombres')).toLowerCase()
      const apellidos = String(row.getValue('apellidos')).toLowerCase()
      const email = String(row.getValue('email')).toLowerCase()
      const usuario = String(row.getValue('usuario')).toLowerCase()
      const searchValue = String(filterValue).toLowerCase()

      return (
        id.includes(searchValue) ||
        nombres.includes(searchValue) ||
        apellidos.includes(searchValue) ||
        email.includes(searchValue) ||
        usuario.includes(searchValue)
      )
    },
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const currentRows = table.getRowModel().rows

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table as any}
        searchPlaceholder='Filtrar por nombre, email o usuario...'
        filters={[
          {
            columnId: 'rol',
            title: 'Rol',
            options: roles,
          },
          {
            columnId: 'estado_habilitado',
            title: 'Estado',
            options: estados.map((estado) => ({
              label: estado.label,
              value: estado.value.toString(),
            })),
          },
        ]}
      />

      {currentRows.length === 0 ? (
        <div className='text-muted-foreground py-10 text-center text-sm'>
          No hay resultados.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {currentRows.map((row) => (
            <UsuarioCard key={row.id} usuario={row.original as Usuario} />
          ))}
        </div>
      )}

      <div className='flex items-center justify-between'>
        <div className='text-muted-foreground text-sm'>
          Total: {table.getPrePaginationRowModel().rows.length}
        </div>
        <DataTablePaginationControls table={table as any} />
      </div>
    </div>
  )
}
