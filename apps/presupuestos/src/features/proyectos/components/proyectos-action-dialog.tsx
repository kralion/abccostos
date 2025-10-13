import { type Proyecto } from '../data/schema'
import ProyectoForm from './proyecto-form'

interface ProyectosActionDialogProps {
  open: boolean
  onOpenChange: () => void
  currentRow?: Proyecto | null
}

export function ProyectosActionDialog({
  open,
  onOpenChange,
  currentRow,
}: ProyectosActionDialogProps) {
  return (
    <ProyectoForm
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onOpenChange()
      }}
      currentRow={currentRow}
    />
  )
}
