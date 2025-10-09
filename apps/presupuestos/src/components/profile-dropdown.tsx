import { Link } from '@tanstack/react-router'
import useDialogState from '@/hooks/use-dialog-state'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/avatar'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'
import { Badge } from '@workspace/ui/components/badge'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()

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
              <AvatarImage src='/avatars/01.png' alt='@shadcn' />
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
          <div className='flex-col hidden md:flex'>
          <p className='text-sm font-medium'>Alejandro Bravo</p>
          <p className='text-xs text-muted-foreground'>Control de Costos</p>
          </div>
          </div>
        </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>satnaing</p>
              <p className='text-muted-foreground text-xs leading-none'>
                satnaingdev@gmail.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to='/settings'>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Sign out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
