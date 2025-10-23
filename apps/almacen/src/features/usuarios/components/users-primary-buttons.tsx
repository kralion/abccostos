import { Button } from '@workspace/ui/components/button'
import { UserPlus } from 'lucide-react'
import { useUsers } from './users-provider'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invitar Usuario</span> <MailPlus size={18} />
      </Button> */}
      
      <Button variant='ghost' className='space-x-1' onClick={() => setOpen('add')}>
        <UserPlus size={18} />
        <span>Registrar</span> 
      </Button>
    </div>
  )
}
