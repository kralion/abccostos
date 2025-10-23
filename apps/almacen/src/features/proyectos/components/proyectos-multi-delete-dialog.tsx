import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@workspace/ui/components/alert-dialog'
import { Button } from '@workspace/ui/components/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { type Proyecto } from '../data/schema'

interface ProyectosMultiDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<Proyecto>
}

export function ProyectosMultiDeleteDialog({
  open,
  onOpenChange,
  table,
}: ProyectosMultiDeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedCount = selectedRows.length

  async function handleDelete() {
    setIsLoading(true)

    try {
      // TODO: Implement API call to delete multiple proyectos
      const ids = selectedRows.map((row) => row.original.codigo)
      console.log('Deleting proyectos:', ids)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success(`${selectedCount} proyectos eliminados exitosamente`)
      table.resetRowSelection()
      onOpenChange(false)
    } catch (error) {
      console.error('Error deleting proyectos:', error)
      toast.error('Error al eliminar los proyectos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminarán permanentemente{' '}
            <strong>{selectedCount}</strong> proyecto
            {selectedCount > 1 ? 's' : ''}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Eliminando...
              </>
            ) : (
              `Eliminar ${selectedCount}`
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
