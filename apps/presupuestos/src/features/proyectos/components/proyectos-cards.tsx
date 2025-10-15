import { useEffect, useMemo, useState } from 'react'
import {
  flexRender,
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
import { estados } from '../data/data'
import { type Proyecto } from '../data/schema'
import { ProyectoCard } from './proyecto-card'
import { DataTablePaginationControls } from '@/components/data-table/pagination-controls'

type ProyectosCardsProps = {
  data: Proyecto[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function ProyectosCards({ data, search, navigate }: ProyectosCardsProps) {
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
        columnId: 'nombreDeProyecto',
        searchKey: 'nombreDeProyecto',
        type: 'string',
      },
      { columnId: 'estado', searchKey: 'estado', type: 'array' },
    ],
  })

  // Minimal columns for filtering pipeline only
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nombreDeProyecto',
      },
      {
        accessorKey: 'estado',
        filterFn: (row: any, id: string, value: string[]) => value.includes(row.getValue(id)),
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
        searchPlaceholder='Filtrar proyectos...'
        searchKey='nombreDeProyecto'
        filters={[
          {
            columnId: 'estado',
            title: 'Estado',
            options: estados.map((e) => ({ ...e })),
          },
        ]}
      />

      {currentRows.length === 0 ? (
        <div className='text-center text-sm text-muted-foreground py-10'>
          No hay resultados.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {currentRows.map((row) => (
            <ProyectoCard key={row.id} proyecto={row.original as Proyecto} />
          ))}
        </div>
      )}

      <div className='flex items-center justify-end'>
        <DataTablePaginationControls table={table as any} />
      </div>
    </div>
  )
}


