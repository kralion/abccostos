import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Pencil, Trash2, Copy } from 'lucide-react'

interface Partida {
  codigo: string
  descripcion: string
  unidad: string
  ultimaModificacion: string
  fechaModificacion: string
}

type PartidaCardProps = {
  partida: Partida
}

export function PartidaCard({ partida }: PartidaCardProps) {
  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Código</div>
          <div className='font-medium'>{partida.codigo}</div>
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
        <div className='text-muted-foreground text-xs'>Descripción</div>
        <div className='font-semibold break-words'>
          {partida.descripcion}
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Unidad</div>
          <div className='font-semibold'>{partida.unidad}</div>
        </div>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Modificado por</div>
          <div className='font-semibold'>{partida.ultimaModificacion}</div>
        </div>
      </div>

      <div className='text-muted-foreground text-sm'>
        <span className='me-1'>Fecha Modificación:</span>
        <span className='text-foreground'>{partida.fechaModificacion}</span>
      </div>
    </div>
  )
}
