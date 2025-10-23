import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import { Button } from '@workspace/ui/components/button'
import {
  Copy,
  List,
  Grid3x3,
  CircleX,
  ExternalLink,
  Circle,
  CircleDot,
} from 'lucide-react'
import { type GastoGeneral } from '../data/schema'
import { type DetalleData } from '../data/detail-schema'

interface DetalleGastoProps {
  gasto: GastoGeneral
  detalle: DetalleData
}

export function DetalleGasto({ gasto, detalle }: DetalleGastoProps) {
  const [formato, setFormato] = useState(detalle.formato)

  return (
    <div className='bg-muted/20 p-4'>
      <div className='space-y-4'>
        {/* Header */}
        <div className='flex items-center justify-between border-b pb-2'>
          <div className='flex items-center gap-4'>
            <h3 className='text-sm font-semibold text-pink-600'>
              {gasto.item} <span className='ml-2 text-purple-600'>Detalle datos generales</span>
            </h3>
          </div>
        </div>

        {/* Title and Format */}
        <div className='flex items-center gap-4'>
          <div className='flex-1'>
            <div className='text-sm font-medium text-blue-600'>
              {gasto.titulo}
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-muted-foreground'>Formato</span>
            <Select value={formato} onValueChange={setFormato}>
              <SelectTrigger className='w-[180px] h-8'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Ensayos'>Ensayos</SelectItem>
                <SelectItem value='Equipos'>Equipos</SelectItem>
                <SelectItem value='Personal'>Personal</SelectItem>
                <SelectItem value='Seguros'>Seguros</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Toolbar */}
        <div className='flex items-center justify-between border-y bg-muted/30 px-2 py-1.5'>
          <div className='flex items-center gap-1'>
            <Button variant='ghost' size='icon' className='size-7'>
              <Copy className='size-3.5' />
            </Button>
            <Button variant='ghost' size='icon' className='size-7'>
              <List className='size-3.5' />
            </Button>
            <Button variant='ghost' size='icon' className='size-7'>
              <Grid3x3 className='size-3.5' />
            </Button>
            <Button variant='ghost' size='icon' className='size-7'>
              <List className='size-3.5' />
            </Button>
            <Button variant='ghost' size='icon' className='size-7'>
              <List className='size-3.5' />
            </Button>
            <Button variant='ghost' size='icon' className='size-7'>
              <List className='size-3.5' />
            </Button>
          </div>
          <div className='flex items-center gap-1'>
            <Button variant='ghost' size='sm' className='h-7 gap-1 px-2 text-xs'>
              <CircleDot className='size-3' />
              <span>Agregar Item</span>
            </Button>
            <div className='flex items-center gap-0.5'>
              <Button variant='ghost' size='icon' className='size-6 rounded-full bg-red-500 hover:bg-red-600'>
                <Circle className='size-3 fill-red-500 text-white' />
              </Button>
              <Button variant='ghost' size='icon' className='size-6 rounded-full bg-yellow-500 hover:bg-yellow-600'>
                <Circle className='size-3 fill-yellow-500 text-white' />
              </Button>
              <Button variant='ghost' size='icon' className='size-6 rounded-full bg-orange-500 hover:bg-orange-600'>
                <Circle className='size-3 fill-orange-500 text-white' />
              </Button>
              <Button variant='ghost' size='icon' className='size-6 rounded-full bg-green-500 hover:bg-green-600'>
                <Circle className='size-3 fill-green-500 text-white' />
              </Button>
              <Button variant='ghost' size='icon' className='size-6 rounded-full bg-blue-500 hover:bg-blue-600'>
                <Circle className='size-3 fill-blue-500 text-white' />
              </Button>
              <Button variant='ghost' size='icon' className='size-6 rounded-full border-2 border-gray-400 bg-transparent hover:bg-gray-100'>
                <Circle className='size-3 text-gray-400' />
              </Button>
            </div>
          </div>
        </div>

        {/* Detail Table */}
        <div className='rounded-md border bg-white'>
          <Table>
            <TableHeader className='bg-muted/50'>
              <TableRow>
                <TableHead className='w-[120px]'>Id</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className='w-[100px] text-center'>Und</TableHead>
                <TableHead className='w-[120px] text-center'>Cantidad</TableHead>
                <TableHead className='w-[120px] text-center'>Precio</TableHead>
                <TableHead className='w-[120px] text-center'>Parcial</TableHead>
                <TableHead className='w-[100px] text-center'>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detalle.items.map((item) => (
                <TableRow key={item.id} className='hover:bg-muted/30'>
                  <TableCell className='font-mono text-xs'>{item.id}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell className='text-center text-sm'>{item.und}</TableCell>
                  <TableCell>
                    <Input
                      type='number'
                      defaultValue={item.cantidad.toFixed(2)}
                      className='h-7 border-blue-500 text-center text-sm'
                      step='0.01'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type='number'
                      defaultValue={item.precio.toFixed(2)}
                      className='h-7 border-blue-500 text-center text-sm'
                      step='0.01'
                    />
                  </TableCell>
                  <TableCell className='text-center font-medium'>{item.parcial.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center gap-1'>
                      <Button variant='ghost' size='icon' className='size-7'>
                        <CircleX className='size-4 text-red-500' />
                      </Button>
                      <Button variant='ghost' size='icon' className='size-7'>
                        <ExternalLink className='size-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

