import { Button } from '@workspace/ui/components/button'
import { UserPlus } from 'lucide-react'
import { useClientes } from './clientes-provider'

export function ClientesPrimaryButtons() {
  const { setOpen } = useClientes()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Nuevo Cliente</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
