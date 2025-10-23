import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'
import { FolderPlus, GitCompareArrows, Pencil, Trash2 } from 'lucide-react'
import { type Proyecto } from '../data/schema'
import { useProyectos } from './proyectos-provider'

type DataTableRowActionsProps = {
  row: Row<Proyecto>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useProyectos()
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
          >
            <Pencil size={16} className="opacity-60" aria-hidden="true" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('create')
            }}
          >
            <FolderPlus size={16} className="opacity-60" aria-hidden="true" />
            Crear Presupuesto
          </DropdownMenuItem>
          <DropdownMenuItem
       
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('comparativa')
            }}
          >
            <GitCompareArrows size={16} className="opacity-60" aria-hidden="true" />
            Comparativo
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            <Trash2 size={16} className="opacity-60" aria-hidden="true" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
