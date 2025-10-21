import { useDeleteProyecto } from '@workspace/api-presupuestos/queries'
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
import { type Proyecto } from '../data/schema'

interface ProyectosDeleteDialogProps {
  open: boolean
  onOpenChange: () => void
  currentRow: Proyecto
}

export function ProyectosDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ProyectosDeleteDialogProps) {
  const deleteProyecto = useDeleteProyecto()

  async function handleDelete() {
    try {
      await deleteProyecto.mutateAsync(currentRow.id)
      onOpenChange()
    } catch (error) {
      console.error('Error deleting proyecto:', error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el
            proyecto <strong>{currentRow.nombreDeProyecto}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteProyecto.isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteProyecto.isPending}
          >
            {deleteProyecto.isPending ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
