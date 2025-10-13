import { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    setIsLoading(true)

    try {
      // TODO: Implement API call to delete proyecto
      console.log('Deleting proyecto:', currentRow.codigo)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success('Proyecto eliminado exitosamente')
      onOpenChange()
    } catch (error) {
      console.error('Error deleting proyecto:', error)
      toast.error('Error al eliminar el proyecto')
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
            Esta acción no se puede deshacer. Se eliminará permanentemente el
            proyecto <strong>{currentRow.nombreDeProyecto}</strong>.
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
              'Eliminar'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
