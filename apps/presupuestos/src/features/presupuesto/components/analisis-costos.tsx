import { useState } from 'react'
import { Card } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table'
import {
  User,
  Package,
  Wrench,
  Briefcase,
  CirclePlus,
  Edit,
  Trash2,
} from 'lucide-react'
import { type Recurso } from '../data/recursos-schema'
import { type Partida } from '../data/schema'

interface AnalisisCostosProps {
  partida: Partida
  recursos: Recurso[]
}

const TipoIcon = ({ tipo }: { tipo: Recurso['tipo'] }) => {
  const iconMap = {
    'mano-obra': User,
    'material': Package,
    'equipo': Wrench,
    'subcontrato': Briefcase,
  }
  
  const Icon = iconMap[tipo]
  return <Icon className='size-4 text-red-600' />
}

export function AnalisisCostos({ partida, recursos }: AnalisisCostosProps) {
  const [unidad, setUnidad] = useState('m2')
  const [rendimiento, setRendimiento] = useState('20.00')
  
  // Calculate totals
  const totales = recursos.reduce(
    (acc, recurso) => {
      acc.total += recurso.parcial
      if (recurso.tipo === 'mano-obra') acc.manoObra += recurso.parcial
      if (recurso.tipo === 'material') acc.materiales += recurso.parcial
      if (recurso.tipo === 'equipo') acc.equipos += recurso.parcial
      if (recurso.tipo === 'subcontrato') acc.subcontrato += recurso.parcial
      return acc
    },
    { manoObra: 0, materiales: 0, equipos: 0, subcontrato: 0, total: 0 }
  )


  return (
    <Card className='mt-4 border-l-4 border-l-purple-500 pt-0'>
      <div className='bg-primary/20 px-4 py-3 border-b'>
        <div className='space-y-4'>
          {/* Header info */}
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
            <div className='flex items-center gap-2 sm:gap-4'>
              <span className='font-semibold text-purple-700'>{partida.codigo}</span>
              <span className='font-medium text-sm sm:text-base'>{partida.item}</span>
            </div>
          </div>
          
          {/* Controls - responsive layout */}
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            {/* Input controls */}
            <div className='flex flex-wrap items-center gap-3 sm:gap-6'>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground'>Unidad</span>
                <Input
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                  className='h-7 w-16 text-center'
                />
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground'>Rendimiento</span>
                <Input
                  value={rendimiento}
                  onChange={(e) => setRendimiento(e.target.value)}
                  className='h-7 w-20 text-center'
                />
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-muted-foreground'>Precio Unitario</span>
                <span className='font-semibold rounded bg-purple-600 px-3 py-1 text-white text-sm'>
                  20.00
                </span>
              </div>
            </div>
            
            {/* Action buttons and indicators */}
            <div className='flex items-center gap-2'>
              <div className='flex gap-1'>
                <Button variant='ghost' size='icon' className='size-8'>
                  <CirclePlus className='size-4' />
                </Button>
                <Button variant='ghost' size='icon' className='size-8'>
                  <Edit className='size-4' />
                </Button>
                <Button variant='ghost' size='icon' className='size-8'>
                  <Trash2 className='size-4' />
                </Button>
              </div>
              <div className='flex gap-1 ml-2'>
                <div className='size-6 rounded-full bg-red-500' />
                <div className='size-6 rounded-full bg-gray-400' />
                <div className='size-6 rounded-full bg-orange-500' />
                <div className='size-6 rounded-full bg-green-500' />
                <div className='size-6 rounded-full border-2 border-gray-300 bg-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-3'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' className='gap-2'>
              <CirclePlus className='size-4' />
              <span className='hidden sm:inline'>Nuevo Recurso</span>
            </Button>
          </div>
          <Button variant='ghost' size='sm' className='gap-2 text-purple-600'>
            <CirclePlus className='size-4' />
            Agregar
          </Button>
        </div>

        {/* Responsive table wrapper */}
        <div className='overflow-x-auto'>
          <Table className='min-w-[600px]'>
            <TableHeader className='bg-primary/50'>
              <TableRow>
                <TableHead className='w-12'></TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className='w-16'>Und</TableHead>
                <TableHead className='w-20'>Cuadrilla</TableHead>
                <TableHead className='w-20'>Cantidad</TableHead>
                <TableHead className='w-24'>Precio</TableHead>
                <TableHead className='w-24'>Parcial</TableHead>
                <TableHead className='w-12'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recursos.map((recurso) => (
                <TableRow key={recurso.id}>
                  <TableCell>
                    <TipoIcon tipo={recurso.tipo} />
                  </TableCell>
                  <TableCell className='min-w-[150px]'>
                    <span className='text-sm'>{recurso.descripcion}</span>
                  </TableCell>
                  <TableCell className='text-center'>
                    <span className='text-sm'>{recurso.unidad}</span>
                  </TableCell>
                  <TableCell>
                    {recurso.cuadrilla !== undefined ? (
                      <Input
                        type='number'
                        defaultValue={recurso.cuadrilla}
                        className='h-7 w-20 text-center text-sm'
                        step='0.01'
                      />
                    ) : (
                      <div className='text-center text-sm'>-</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      type='number'
                      defaultValue={recurso.cantidad}
                      className='h-7 w-20 text-sm'
                      step='0.01'
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type='number'
                      defaultValue={recurso.precio}
                      className='h-7 w-24 text-sm'
                      step='0.01'
                    />
                  </TableCell>
                  <TableCell className='font-medium text-sm'>
                    {recurso.parcial.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='icon' className='size-6'>
                      <Trash2 className='size-3 text-red-600' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  )
}

