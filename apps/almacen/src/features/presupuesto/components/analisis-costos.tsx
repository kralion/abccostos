import { useState } from 'react'
import { Card } from '@workspace/ui/components/card'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Separator } from '@workspace/ui/components/separator'
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
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
  ExternalLink,
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

  const porcentajes = {
    manoObra: totales.total > 0 ? (totales.manoObra / totales.total) * 100 : 0,
    materiales: totales.total > 0 ? (totales.materiales / totales.total) * 100 : 0,
    equipos: totales.total > 0 ? (totales.equipos / totales.total) * 100 : 0,
  }

  return (
    <Card className='mt-4 border-l-4 border-l-purple-500'>
      <div className='bg-gray-50 px-4 py-3 border-b'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <span className='font-semibold text-purple-700'>{partida.codigo}</span>
            <span className='font-medium'>{partida.item}</span>
          </div>
          <div className='flex items-center gap-6'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Unidad</span>
              <Input
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className='h-7 w-16 text-center'
              />
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Rendimiento</span>
              <Input
                value={rendimiento}
                onChange={(e) => setRendimiento(e.target.value)}
                className='h-7 w-20 text-center'
              />
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>Precio Unitario</span>
              <span className='font-semibold rounded bg-purple-600 px-3 py-1 text-white'>
                20.00
              </span>
            </div>
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
              <div className='flex gap-1 ml-2'>
                <div className='size-8 rounded-full bg-red-500' />
                <div className='size-8 rounded-full bg-gray-400' />
                <div className='size-8 rounded-full bg-orange-500' />
                <div className='size-8 rounded-full bg-green-500' />
                <div className='size-8 rounded-full border-2 border-gray-300 bg-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='size-8'>
              <CirclePlus className='size-4' />
            </Button>
            <span className='text-sm font-medium'>Nuevo Recurso</span>
          </div>
          <Button variant='ghost' size='sm' className='gap-2 text-purple-600'>
            <CirclePlus className='size-4' />
            Agregar
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className='bg-gray-50'>
              <TableHead className='w-12'></TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className='text-center'>Und</TableHead>
              <TableHead className='text-center'>Cuadrilla</TableHead>
              <TableHead className='text-center'>Cantidad</TableHead>
              <TableHead className='text-center'>Precio</TableHead>
              <TableHead className='text-center'>Parcial</TableHead>
              <TableHead className='w-12'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recursos.map((recurso) => (
              <TableRow key={recurso.id}>
                <TableCell>
                  <TipoIcon tipo={recurso.tipo} />
                </TableCell>
                <TableCell>{recurso.descripcion}</TableCell>
                <TableCell className='text-center'>{recurso.unidad}</TableCell>
                <TableCell>
                  {recurso.cuadrilla !== undefined ? (
                    <Input
                      type='number'
                      defaultValue={recurso.cuadrilla}
                      className='h-7 w-20 text-center'
                      step='0.01'
                    />
                  ) : (
                    <div className='text-center'>-</div>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    type='number'
                    defaultValue={recurso.cantidad}
                    className='h-7 w-20 text-center'
                    step='0.01'
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type='number'
                    defaultValue={recurso.precio}
                    className='h-7 w-24 text-center'
                    step='0.01'
                  />
                </TableCell>
                <TableCell className='text-center font-medium'>
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

        <div className='mt-6'>
          <Tabs defaultValue='presupuesto' className='w-full'>
            <div className='flex items-center justify-between border-t pt-4'>
              <TabsList className='bg-transparent'>
                <TabsTrigger value='repositorio' className='data-[state=active]:bg-accent'>
                  Repositorio
                </TabsTrigger>
                <TabsTrigger value='notas' className='data-[state=active]:bg-accent'>
                  Notas del presupuesto
                </TabsTrigger>
                <TabsTrigger value='estructura' className='data-[state=active]:bg-accent'>
                  Estructura de costos
                </TabsTrigger>
                <TabsTrigger value='presupuesto' className='data-[state=active]:bg-accent'>
                  Presupuesto
                </TabsTrigger>
                <Button variant='ghost' size='icon' className='size-8 ml-2'>
                  <ExternalLink className='size-4' />
                </Button>
              </TabsList>
            </div>
          </Tabs>

          <div className='mt-4 grid grid-cols-4 gap-6'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Materiales</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>
                    {totales.materiales.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                  <div className='h-6 w-12 rounded bg-pink-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>
                {porcentajes.materiales.toFixed(2)}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Herramientas</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-green-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>2.12</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Costo directo</span>
                <span className='text-sm font-medium'>
                  {totales.total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className='text-xs text-muted-foreground text-right'>Igv %</div>
              <div className='text-xs text-muted-foreground text-right'>18.00</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-semibold'>Presupuesto Total</span>
                <span className='text-sm font-semibold'>7,497,138.88</span>
              </div>
            </div>
          </div>

          <Separator className='my-4' />

          <div className='grid grid-cols-4 gap-6'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Mano de obra</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>
                    {totales.manoObra.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                  <div className='h-6 w-12 rounded bg-orange-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>
                {porcentajes.manoObra.toFixed(2)}
              </div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Varios/Subcontrata</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>
                    {totales.subcontrato.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                  <div className='h-6 w-12 rounded bg-purple-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>0.17</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Gastos Generales %</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-red-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>10.00</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Equipos</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>
                    {totales.equipos.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              <div className='text-xs text-muted-foreground text-right'>
                {porcentajes.equipos.toFixed(2)}
              </div>
            </div>
          </div>

          <div className='mt-4 grid grid-cols-3 gap-4'>
            <div className='flex items-center justify-between rounded-md bg-purple-100 px-3 py-2'>
              <span className='text-sm font-medium'>Utilidad</span>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>%</span>
                <div className='h-6 w-16 rounded bg-purple-500' />
                <span className='text-sm font-medium'>10.00</span>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-md bg-purple-100 px-3 py-2'>
              <span className='text-sm font-medium'>Utilidad</span>
              <span className='text-sm font-medium'>498,297.24</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

