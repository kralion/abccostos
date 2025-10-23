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
import { roles } from '../data/data'
import { type User } from '../data/schema'
import { UserCard } from './user-card'

type UsersCardsProps = {
  data: User[]
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function UsersCards({ data, search, navigate }: UsersCardsProps) {
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
        columnId: 'firstName',
        searchKey: 'firstName',
        type: 'string',
      },
      {
        columnId: 'lastName',
        searchKey: 'lastName',
        type: 'string',
      },
      {
        columnId: 'email',
        searchKey: 'email',
        type: 'string',
      },
      { columnId: 'role', searchKey: 'role', type: 'array' },
      { columnId: 'status', searchKey: 'status', type: 'array' },
    ],
  })

  // Minimal columns for filtering pipeline only
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
      },
      {
        accessorKey: 'lastName',
      },
      {
        accessorKey: 'email',
      },
      {
        accessorKey: 'role',
        filterFn: (row: any, id: string, value: string[]) =>
          value.includes(row.getValue(id)),
      },
      {
        accessorKey: 'status',
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
        searchPlaceholder='Filtrar usuarios...'
        searchKey='firstName'
        filters={[
          {
            columnId: 'role',
            title: 'Rol',
            options: roles.map((r) => ({ ...r })),
          },
          {
            columnId: 'status',
            title: 'Estado',
            options: [
              { label: 'Habilitado', value: 'habilitado' },
              { label: 'Deshabilitado', value: 'deshabilitado' },
            ],
          },
        ]}
      />

      {(() => {
        const filteredRows = table.getPrePaginationRowModel().rows
        const habilitados = filteredRows.filter(
          (row) => row.original.status === 'habilitado'
        ).length
        const deshabilitados = filteredRows.filter(
          (row) => row.original.status === 'deshabilitado'
        ).length
        const total = habilitados + deshabilitados
        const habilitadosPercent = total > 0 ? (habilitados / total) * 100 : 50

        return (
          <div className='rounded-lg border bg-white p-4 shadow-sm'>
            <div className='flex items-center justify-between gap-4'>
              <div className='text-3xl font-bold text-gray-900'>{habilitados}</div>
              <div className='flex-1 text-center'>
                <div className='text-sm font-medium text-gray-600'>
                  Estado de usuarios
                </div>
              </div>
              <div className='text-3xl font-bold text-gray-900'>{deshabilitados}</div>
            </div>
            <div className='mt-2 flex h-2 overflow-hidden rounded-full'>
              <div
                className='bg-green-500'
                style={{ width: `${habilitadosPercent}%` }}
              />
              <div
                className='bg-red-500'
                style={{ width: `${100 - habilitadosPercent}%` }}
              />
            </div>
          </div>
        )
      })()}

      {currentRows.length === 0 ? (
        <div className='text-muted-foreground py-10 text-center text-sm'>
          No hay resultados.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {currentRows.map((row) => (
            <UserCard key={row.id} user={row.original as User} />
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
