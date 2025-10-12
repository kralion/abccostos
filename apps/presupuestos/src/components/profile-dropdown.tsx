import { Link } from '@tanstack/react-router'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { useAuthStore } from '@/stores/auth-store'
import useDialogState from '@/hooks/use-dialog-state'
import { SignOutDialog } from '@/components/sign-out-dialog'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()
  const { profile } = useAuthStore()

  const roles = [
    { value: 'user', label: 'Secundario' },
    { value: 'admin', label: 'Principal' },
    { value: 'owner', label: 'Propietario' },
  ]
  const roleLabel =
    roles.find((role) => role.value === profile?.role)?.label || 'Principal'
  return (
    <>
      <DropdownMenu modal={false}>
        <div className='flex items-center space-x-2'>
          <span className='text-muted-foreground hidden text-xs md:block'>
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
              const start = new Date(now.getFullYear(), 0, 1)
              const diff = (now.getTime() - start.getTime()) / 86400000
              const week = Math.ceil((diff + start.getDay() + 1) / 7)
              return `${now.getFullYear()}.${week.toString().padStart(2, '0')}`
            })()}
          </Badge>
        </div>

        <div className='flex items-center space-x-2'>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center space-x-2'>
              <Button
                variant='ghost'
                className='relative h-10 w-10 rounded-full'
              >
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={
                      profile?.image_url ||
                      'https://img.icons8.com/?size=100&id=p8UFrp2VUgHR&format=png&color=000000'
                    }
                    alt='avatar'
                  />
                  <AvatarFallback>
                    {profile?.name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
              <div className='hidden flex-col md:flex'>
                <p className='text-sm font-medium'>
                  {profile
                    ? `${profile.name} ${profile.last_name}`
                    : 'Sin Nombres'}
                </p>
                <p className='text-muted-foreground text-xs'>{roleLabel}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>
                {profile
                  ? `${profile.name} ${profile.last_name}`
                  : 'Sin Nombres'}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {roleLabel}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings'>Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>Configuración</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to='/settings'>Ir a Módulos</Link>
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
