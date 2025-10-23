import { format } from 'date-fns'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { Pencil, Power, Trash2 } from 'lucide-react'
import { type Cliente } from '../data/schema'
import { useClientes } from './clientes-provider'

type ClienteCardProps = {
  cliente: Cliente
}

const statusColors = {
  habilitado:
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
  deshabilitado:
    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
}

export function ClienteCard({ cliente }: ClienteCardProps) {
  const { setOpen, setCurrentRow } = useClientes()

  const onAction = (action: Parameters<typeof setOpen>[0]) => {
    setCurrentRow(cliente)
    setOpen(action)
  }


  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>ID</div>
          <div className='font-medium'>{cliente.id}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className={cn('capitalize', statusColors[cliente.estado])}
          >
            {cliente.estado}
          </Badge>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[180px]'>
              <DropdownMenuItem onClick={() => onAction('edit')}>
                <Pencil size={16} className='opacity-60' aria-hidden='true' />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  cliente.estado === 'habilitado' ? 'text-red-500' : 'text-green-500'
                )}
                onClick={() => onAction('edit')}
              >
                <Power size={16} className='opacity-60' aria-hidden='true' />
                {cliente.estado === 'habilitado' ? 'Deshabilitar' : 'Habilitar'}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAction('delete')}
                className='text-red-500!'
              >
                <Trash2 size={16} className='opacity-60' aria-hidden='true' />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Empresa</div>
        <div className='font-semibold break-words'>
          {cliente.nombreEmpresa}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Usuario Principal</div>
        <div className='break-words'>{cliente.usuarioPrincipal}</div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Email</div>
        <div className='break-words'>{cliente.email}</div>
      </div>

      <div className='flex flex-wrap items-center gap-4'>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Proyectos</div>
          <div className='font-semibold'>{cliente.proyectos}</div>
        </div>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Usuarios</div>
          <div className='font-semibold'>{cliente.usuarios}</div>
        </div>
        <div className='text-center'>
          <div className='text-muted-foreground text-xs'>Módulos</div>
          <div className='font-semibold'>{cliente.modulosActivos}</div>
        </div>
      </div>

      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <div>
          <span className='me-1'>Inicio:</span>
          <span className='text-foreground'>
            {format(cliente.fechaInicioFacturacion, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
        <div>
          <span className='me-1'>Fin:</span>
          <span className='text-foreground'>
            {format(cliente.fechaFinFacturacion, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
      </div>
    </div>
  )
}
