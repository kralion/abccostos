import { Button } from '@workspace/ui/components/button'
import { PlusIcon } from 'lucide-react'
import { useProyectos } from './proyectos-provider'

export function ProyectosPrimaryButtons() {
  const { setOpen } = useProyectos()
  return (
    <Button variant='ghost' className='space-x-1' onClick={() => setOpen('add')}>
      <PlusIcon size={18} />
      <span>Registrar</span>
    </Button>
  )
}

