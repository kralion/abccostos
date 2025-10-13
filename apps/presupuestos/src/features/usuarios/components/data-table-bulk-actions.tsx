import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserX, UserCheck, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui/components/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type User } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleBulkStatusChange = (status: 'habilitado' | 'deshabilitado') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: `${status === 'habilitado' ? 'Habilitando' : 'Deshabilitando'} usuarios...`,
      success: () => {
        table.resetRowSelection()
        return `${status === 'habilitado' ? 'Se habilitaron' : 'Se deshabilitaron'} ${selectedUsers.length} usuario${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: `Error al ${status === 'habilitado' ? 'habilitar' : 'deshabilitar'} usuarios`,
    })
    table.resetRowSelection()
  }

  const handleBulkInvite = () => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    toast.promise(sleep(2000), {
      loading: 'Invitando usuarios...',
      success: () => {
        table.resetRowSelection()
        return `Se invitaron ${selectedUsers.length} usuario${selectedUsers.length > 1 ? 's' : ''}`
      },
      error: 'Error al invitar usuarios',
    })
    table.resetRowSelection()
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='usuario'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={handleBulkInvite}
              className='size-8'
              aria-label='Invitar usuarios seleccionados'
              title='Invitar usuarios seleccionados'
            >
              <Mail />
              <span className='sr-only'>Invitar usuarios seleccionados</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invitar usuarios seleccionados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('habilitado')}
              className='size-8'
              aria-label='Habilitar usuarios seleccionados'
              title='Habilitar usuarios seleccionados'
            >
              <UserCheck />
              <span className='sr-only'>Habilitar usuarios seleccionados</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Habilitar usuarios seleccionados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('deshabilitado')}
              className='size-8'
              aria-label='Deshabilitar usuarios seleccionados'
              title='Deshabilitar usuarios seleccionados'
            >
              <UserX />
              <span className='sr-only'>Deshabilitar usuarios seleccionados</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deshabilitar usuarios seleccionados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Eliminar usuarios seleccionados'
              title='Eliminar usuarios seleccionados'
            >
              <Trash2 />
              <span className='sr-only'>Eliminar usuarios seleccionados</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Eliminar usuarios seleccionados</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
