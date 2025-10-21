import { type Table } from '@tanstack/react-table'
import { Button } from '@workspace/ui/components/button'
import {
  Copy,
  ArrowUp,
  ArrowDown,
  Grid3x3,
  List,
  Pencil,
  Minus,
  Filter,
  Repeat2,
} from 'lucide-react'
import { type GastoGeneral } from '../data/schema'

interface GastosGeneralesToolbarProps {
  table: Table<GastoGeneral>
}

export function GastosGeneralesToolbar({ table }: GastosGeneralesToolbarProps) {
  return (
    <div className='flex items-center justify-between border-b bg-muted/30 px-4 py-2'>
      <div className='flex items-center gap-1'>
        <Button variant='ghost' size='icon' className='size-8'>
          <Grid3x3 className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <List className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <ArrowUp className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <ArrowDown className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <Minus className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <Copy className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <Pencil className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <Filter className='size-4' />
        </Button>
        <Button variant='ghost' size='icon' className='size-8'>
          <Repeat2 className='size-4' />
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='icon' className='size-8'>
          <Repeat2 className='size-4' />
        </Button>
        <span className='text-sm font-medium'>Titulo</span>
      </div>
    </div>
  )
}

