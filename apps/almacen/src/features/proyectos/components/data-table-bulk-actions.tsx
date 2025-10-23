import { useState } from 'react'
import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons'
import { type Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import { type Proyecto } from '../data/schema'
import { ProyectosMultiDeleteDialog } from './proyectos-multi-delete-dialog'

type DataTableBulkActionsProps = {
  table: Table<Proyecto>
}

export function DataTableBulkActions({ table }: DataTableBulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const selectedRowsLength = table.getFilteredSelectedRowModel().rows.length

  if (selectedRowsLength === 0) return null

  return (
    <>
      <div className='fixed inset-x-0 bottom-4 z-50 mx-auto w-fit max-sm:px-4'>
        <div className='bg-background border-border flex w-full items-center gap-2 rounded-md border px-4 py-2 shadow-2xl'>
          <div className='flex h-7 items-center rounded-md border px-3 text-sm'>
            {selectedRowsLength} seleccionado(s)
          </div>
          <Button
            variant='outline'
            size='sm'
            className='h-7 gap-1.5 text-xs'
            onClick={() => setShowDeleteDialog(true)}
          >
            <TrashIcon className='size-3.5' />
            Eliminar
          </Button>
          <div className='bg-border mx-1 h-4 w-px' />
          <Button
            variant='outline'
            size='sm'
            className='h-7 gap-1.5 text-xs'
            onClick={() => table.toggleAllPageRowsSelected(false)}
          >
            <Cross2Icon className='size-3.5' />
            Limpiar
          </Button>
        </div>
      </div>

      <ProyectosMultiDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        table={table}
      />
    </>
  )
}
