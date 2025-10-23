import { ClientesActionDialog } from './clientes-action-dialog'
import { ClientesDeleteDialog } from './clientes-delete-dialog'
import { useClientes } from './clientes-provider'

export function ClientesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useClientes()
  return (
    <>
      <ClientesActionDialog
        key='cliente-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ClientesActionDialog
            key={`cliente-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ClientesDeleteDialog
            key={`cliente-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
