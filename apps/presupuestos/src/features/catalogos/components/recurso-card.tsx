import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Pencil, Trash2, Copy } from 'lucide-react'

interface Recurso {
  codigo: string
  nombre: string
}

type RecursoCardProps = {
  recurso: Recurso
}

export function RecursoCard({ recurso }: RecursoCardProps) {
  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Código</div>
          <div className='font-medium'>{recurso.codigo}</div>
        </div>
        <div className='flex items-center gap-2'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[180px]'>
              <DropdownMenuItem>
                <Pencil size={16} className='opacity-60' aria-hidden='true' />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy size={16} className='opacity-60' aria-hidden='true' />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-500!'>
                <Trash2 size={16} className='opacity-60' aria-hidden='true' />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Nombre</div>
        <div className='font-semibold break-words'>
          {recurso.nombre}
        </div>
      </div>
    </div>
  )
}
