import { type Cliente } from '../data/schema'
import ClientForm from './client-form'

interface ClientesActionDialogProps {
  open: boolean
  onOpenChange: () => void
  currentRow?: Cliente | null
}

export function ClientesActionDialog({
  open,
  onOpenChange,
  currentRow,
}: ClientesActionDialogProps) {
  return (
    <ClientForm
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onOpenChange()
      }}
      currentRow={currentRow}
    />
  )
}
