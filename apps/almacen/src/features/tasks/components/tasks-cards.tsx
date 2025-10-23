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
import { priorities, statuses } from '../data/data'
import { TaskCard } from './task-card'

type TaskWithExtendedFields = {
  id: string
  title: string
  status: string
  label: string
  priority: string
  createdAt: Date
  updatedAt: Date
  assignee: string
  description: string
  dueDate: Date
}

type TasksCardsProps = {
  data: TaskWithExtendedFields[]
}

export function TasksCards({ data }: TasksCardsProps) {
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
        accessorKey: 'title',
      },
      {
        accessorKey: 'status',
        filterFn: (row: any, id: string, value: string[]) =>
          value.includes(row.getValue(id)),
      },
      {
        accessorKey: 'priority',
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
      const title = String(row.getValue('title')).toLowerCase()
      const searchValue = String(filterValue).toLowerCase()

      return id.includes(searchValue) || title.includes(searchValue)
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
        searchPlaceholder='Filter by title or ID...'
        filters={[
          {
            columnId: 'status',
            title: 'Status',
            options: statuses,
          },
          {
            columnId: 'priority',
            title: 'Priority',
            options: priorities,
          },
        ]}
      />

      {currentRows.length === 0 ? (
        <div className='text-muted-foreground py-10 text-center text-sm'>
          No results.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {currentRows.map((row) => (
            <TaskCard key={row.id} task={row.original as TaskWithExtendedFields} />
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
