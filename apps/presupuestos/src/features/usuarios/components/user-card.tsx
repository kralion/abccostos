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
import { Pencil, Power, Trash2, UserPlus } from 'lucide-react'
import { type User } from '../data/schema'
import { useUsers } from './users-provider'

type UserCardProps = {
  user: User
}

const roleLabels = {
  supervisor_general: 'Supervisor General',
  produccion: 'Producción',
  gerente_general: 'Gerente General',
  gerente_proyecto: 'Gerente de Proyecto',
  control_costos: 'Control de Costos',
  secundario: 'Secundario',
  no_asignado: 'No asignado',
}

const statusColors = {
  habilitado:
    'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
  deshabilitado:
    'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
}

const roleColors = {
  supervisor_general: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200',
  produccion: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
  gerente_general: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
  gerente_proyecto: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200',
  control_costos: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200',
  secundario: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200',
  no_asignado: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200',
}

export function UserCard({ user }: UserCardProps) {
  const { setOpen, setCurrentRow } = useUsers()

  const onAction = (action: Parameters<typeof setOpen>[0]) => {
    setCurrentRow(user)
    setOpen(action)
  }

  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Username</div>
          <div className='font-medium'>{user.username}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className={cn('capitalize', statusColors[user.status])}
          >
            {user.status}
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
              <DropdownMenuItem onClick={() => onAction('invite')}>
                <UserPlus size={16} className='opacity-60' aria-hidden='true' />
                Invitar
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  user.status === 'habilitado' ? 'text-red-500' : 'text-green-500'
                )}
                onClick={() => onAction('toggle-status')}
              >
                <Power size={16} className='opacity-60' aria-hidden='true' />
                {user.status === 'habilitado' ? 'Deshabilitar' : 'Habilitar'}
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
        <div className='text-muted-foreground text-xs'>Nombre Completo</div>
        <div className='font-semibold break-words'>
          {user.firstName} {user.lastName}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Email</div>
        <div className='break-words'>{user.email}</div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Teléfono</div>
        <div className='break-words'>{user.phoneNumber}</div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Badge
          variant='outline'
          className={cn('capitalize', roleColors[user.role])}
        >
          {roleLabels[user.role]}
        </Badge>
      </div>

      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <div>
          <span className='me-1'>Creado:</span>
          <span className='text-foreground'>
            {format(user.createdAt, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
        <div>
          <span className='me-1'>Actualizado:</span>
          <span className='text-foreground'>
            {format(user.updatedAt, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
      </div>
    </div>
  )
}
