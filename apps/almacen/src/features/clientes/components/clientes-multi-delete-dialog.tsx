'use client'

import { type Table } from '@tanstack/react-table'
import { sleep } from '@workspace/ui/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'

type ClienteMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

export function ClientesMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: ClienteMultiDeleteDialogProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: 'Eliminando clientes...',
      success: () => {
        table.resetRowSelection()
        return `Se ${
          selectedRows.length > 1 ? 'eliminaron' : 'eliminó'
        } ${selectedRows.length} ${
          selectedRows.length > 1 ? 'clientes' : 'cliente'
        }`
      },
      error: 'Error',
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Eliminar {selectedRows.length}{' '}
          {selectedRows.length > 1 ? 'clientes' : 'cliente'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p>
            ¿Estás seguro de que deseas eliminar los clientes seleccionados?{' '}
            Esta acción no se puede deshacer.
          </p>
        </div>
      }
      confirmText='Eliminar'
      cancelBtnText='Cancelar'
      destructive
    />
  )
}
