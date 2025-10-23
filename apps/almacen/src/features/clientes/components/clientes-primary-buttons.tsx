import { Button } from '@workspace/ui/components/button'
import { Plus } from 'lucide-react'
import { useClientes } from './clientes-provider'

export function ClientesPrimaryButtons() {
  const { setOpen } = useClientes()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' variant='ghost' onClick={() => setOpen('add')}>
         <Plus size={18} />
        <span>Nuevo Cliente</span>
      </Button>
    </div>
  )
}
