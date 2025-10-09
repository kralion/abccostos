import { SignOutDialog } from '@/components/sign-out-dialog'
import useDialogState from '@/hooks/use-dialog-state'
import { useAuthStore } from '@/stores/auth-store'
import { Link } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()
  const { profile } = useAuthStore()

  const roles = [
    { value: 'user', label: 'Usuario' },
    { value: 'admin', label: 'Administrador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'cashier', label: 'Cajero' },
    { value: 'superadmin', label: 'Superadministrador' },
  ]

  const roleLabel =
    profile?.role === 'user'
      ? 'Usuario'
      : profile?.role
      ? roles.find((role) => role.value === profile.role)?.label || 'Usuario'
      : 'Usuario'

  return (
    <>
      <DropdownMenu modal={false}>
        <div className='flex items-center space-x-2'> 

          <span className='text-xs text-muted-foreground hidden md:block'>
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <Badge>
          {(() => {
            const now = new Date()
            // Get first day of year
            const start = new Date(now.getFullYear(), 0, 1)
            // Calculate number of days between now and start of year
            const diff = (now.getTime() - start.getTime()) / 86400000
            // Get week number (ISO-8601, but simple version: week starts on Jan 1)
            const week = Math.ceil((diff + start.getDay() + 1) / 7)
            return `${now.getFullYear()}.${week.toString().padStart(2, '0')}`
          })()}
          </Badge>
        </div>

        <div className='flex items-center space-x-2'>

        <DropdownMenuTrigger asChild>
          <div className='flex items-center space-x-2'>

          <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={profile?.image_url || '/avatars/01.png'} alt={profile?.name || 'User'} />
              <AvatarFallback>
                {profile?.name?.[0]}{profile?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div className='flex-col hidden md:flex'>
          <p className='text-sm font-medium'>
            {profile ? `${profile.name} ${profile.last_name}` : 'Usuario'}
          </p>
          <p className='text-xs text-muted-foreground'>{roleLabel}</p>
          </div>
          </div>
        </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>
                {profile ? `${profile.name} ${profile.last_name}` : 'Usuario'}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {roleLabel}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Configuración
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive' onClick={() => setOpen(true)}>
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
