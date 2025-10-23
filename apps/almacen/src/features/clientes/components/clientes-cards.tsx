import { useEffect, useMemo, useState } from 'react'
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
} from '@tanstack/react-table'
import { type NavigateFn, useTableUrlState } from '@/hooks/use-table-url-state'
import { DataTableToolbar } from '@/components/data-table'
import { DataTablePaginationControls } from '@/components/data-table/pagination-controls'
import { estados } from '../data/data'
import { type Cliente } from '../data/schema'
import { ClienteCard } from './cliente-card'

type ClientesCardsProps = {
  data: Cliente[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function ClientesCards({ data, search, navigate }: ClientesCardsProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    columnFilters,
    onColumnFiltersChange,
    pagination,
    onPaginationChange,
    ensurePageInRange,
  } = useTableUrlState({
    search,
    navigate,
    pagination: { defaultPage: 1, defaultPageSize: 10 },
    globalFilter: { enabled: false },
    columnFilters: [
      {
        columnId: 'nombreEmpresa',
        searchKey: 'nombreEmpresa',
        type: 'string',
      },
      { columnId: 'estado', searchKey: 'estado', type: 'array' },
    ],
  })

  // Minimal columns for filtering pipeline only
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nombreEmpresa',
      },
      {
        accessorKey: 'estado',
        filterFn: (row: any, id: string, value: string[]) =>
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
    },
    onPaginationChange,
    onColumnFiltersChange,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  useEffect(() => {
    ensurePageInRange(table.getPageCount())
  }, [table, ensurePageInRange])

  const currentRows = table.getRowModel().rows

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table as any}
        searchPlaceholder='Filtrar clientes...'
        searchKey='nombreEmpresa'
        filters={[
          {
            columnId: 'estado',
            title: 'Estado',
            options: estados.map((e) => ({ ...e })),
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
            <ClienteCard key={row.id} cliente={row.original as Cliente} />
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
