import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip'
import { Trash2 } from 'lucide-react'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { ClientesMultiDeleteDialog } from './clientes-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <>
      <BulkActionsToolbar table={table} entityName='cliente'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Eliminar clientes seleccionados'
              title='Eliminar clientes seleccionados'
            >
              <Trash2 />
              <span className='sr-only'>Eliminar clientes seleccionados</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar clientes seleccionados</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ClientesMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
