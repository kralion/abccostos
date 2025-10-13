import { ProyectosActionDialog } from './proyectos-action-dialog'
import { ProyectosDeleteDialog } from './proyectos-delete-dialog'
import { useProyectos } from './proyectos-provider'

export function ProyectosDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProyectos()
  return (
    <>
      <ProyectosActionDialog
        key='proyecto-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <ProyectosActionDialog
            key={`proyecto-edit-${currentRow.codigo}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ProyectosDeleteDialog
            key={`proyecto-delete-${currentRow.codigo}`}
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
