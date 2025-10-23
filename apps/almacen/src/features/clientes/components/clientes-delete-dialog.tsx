'use client'

import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Cliente } from '../data/schema'

type ClienteDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Cliente
}

export function ClientesDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ClienteDeleteDialogProps) {
  const handleDelete = () => {
    onOpenChange(false)
    showSubmittedData(currentRow, 'El siguiente cliente ha sido eliminado:')
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
          Eliminar Cliente
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p>
            ¿Estás seguro de que deseas eliminar a{' '}
            <span className='font-bold'>{currentRow.nombreEmpresa}</span>?
          </p>
        </div>
      }
      confirmText='Eliminar'
      destructive
      cancelBtnText='Cancelar'
    />
  )
}
