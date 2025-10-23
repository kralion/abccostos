import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { Button } from '@workspace/ui/components/button'
import { MoreVerticalIcon, Printer, PrinterCheck, FilePenLine, CopyPlus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { Textarea } from '@workspace/ui/components/textarea'
import { Badge } from '@workspace/ui/components/badge'

interface Partida {
  id: string
  nombre: string
}

interface Trabajo {
  id: string
  nombre: string
}

interface PartidaTrabajo {
  id: string
  partida: string
  metrado: number
}

interface EstadoTrabajo {
  unidad: string
  tren: string
  responsable: string
  fechaInicio: string
  duracion: number
  fechaFinalizacion: string
  costo: number
  notas: string
}

const partidasData: Partida[] = [
  { id: '0001', nombre: 'OBRAS PROVISIONALES' },
  { id: '0002', nombre: 'MOVIMIENTO DE TIERRAS' },
  { id: '0003', nombre: 'CIMENTACIONES' },
  { id: '0004', nombre: 'ESTRUCTURAS' },
  { id: '0005', nombre: 'ALBAÑILERIA' },
  { id: '0006', nombre: 'ACABADOS' },
  { id: '0007', nombre: 'Cerco Perimetrico Provisional H=2.40m' },
  { id: '0008', nombre: 'Movilizacion Y Desmovilizacion De Equipos Y Herramientas' },
]

const trabajosData: Trabajo[] = [
  { id: '0001', nombre: 'Varios' },
  { id: '0002', nombre: 'Movimiento De Tierras' },
  { id: '0003', nombre: 'Cimentaciones' },
  { id: '0004', nombre: 'Desmontajes' },
  { id: '0005', nombre: 'Estructuras' },
  { id: '0006', nombre: 'Albañilería' },
  { id: '0007', nombre: 'Acabados' },
  { id: '0008', nombre: 'Plan De Monitoreo Arqueologico' },
]

const partidasTrabajoData: PartidaTrabajo[] = [
  { id: '0021', partida: 'Eliminacion De Arboles', metrado: 28 },
  { id: '0022', partida: 'Desmonte De Vegetacion', metrado: 15 },
  { id: '0023', partida: 'Excavacion Manual', metrado: 45 },
  { id: '0024', partida: 'Relleno Compactado', metrado: 32 },
]

export default function JobManagement() {
  const [selectedPartida, setSelectedPartida] = useState('0007')
  const [selectedTrabajo, setSelectedTrabajo] = useState('0004')
  const [metradoInput, setMetradoInput] = useState('0')
  const [estadoTrabajo, setEstadoTrabajo] = useState<EstadoTrabajo>({
    unidad: 'Varios',
    tren: 'Desmontajes',
    responsable: '',
    fechaInicio: '2025-09-01',
    duracion: 30,
    fechaFinalizacion: '2025-10-01',
    costo: 50717.04,
    notas: '',
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO']
    const dayName = days[date.getDay()]
    return `${date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${dayName}`
  }

  return (
    <div className='space-y-6'>


      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-900'>Partidas del proyecto</h3>
            <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
              <Printer className='w-5 h-5' />
            </div>
          </div>
          <div className='rounded-lg border bg-white'>
            <div className='max-h-96 overflow-y-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>ID PARTIDA</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>PARTIDA</th>
                  </tr>
                </thead>
                <tbody>
                  {partidasData.map((partida) => (
                    <tr
                      key={partida.id}
                      className={`border-b cursor-pointer hover:bg-gray-50 ${selectedPartida === partida.id ? 'bg-green-50' : ''
                        }`}
                      onClick={() => setSelectedPartida(partida.id)}
                    >
                      <td className='p-3 text-sm font-medium text-gray-900'>{partida.id}</td>
                      <td className='p-3 text-sm text-gray-700'>{partida.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='rounded-lg border bg-white p-4'>
            <h3 className='mb-4 font-semibold text-gray-900'>Agregar partida al trabajo</h3>
            <div className='space-y-4'>
              <div className='flex gap-2'>
                <Input
                  value={metradoInput}
                  onChange={(e) => setMetradoInput(e.target.value)}
                  className='flex-1'
                />
                <Button className='bg-[#0e1629] hover:bg-gray-600'>Agregar</Button>
              </div>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Metrado presupuestado:</span>
                  <span className='font-medium'>288.79</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Metrado programado:</span>
                  <span className='font-medium'>288.79</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Saldo por programar (Und):</span>
                  <span className='font-medium'>-</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Saldo por programar (%):</span>
                  <span className='font-medium'>-%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold text-gray-900'>Trabajos del proyecto</h3>
            <div className='flex gap-2'>
              <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
                <FilePenLine className='w-5 h-5' />
              </div>
              <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
                <CopyPlus className='w-5 h-5' />
              </div>
              <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
                <Printer className='w-5 h-5' />
              </div>
              <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
                <PrinterCheck className='w-5 h-5' />
              </div>
            </div>
          </div>
          <div className='rounded-lg border bg-white'>
            <div className='max-h-96 overflow-y-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>ID</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>TRABAJO</th>
                  </tr>
                </thead>
                <tbody>
                  {trabajosData.map((trabajo) => (
                    <tr
                      key={trabajo.id}
                      className={`border-b cursor-pointer hover:bg-gray-50 ${selectedTrabajo === trabajo.id ? 'bg-green-50' : ''
                        }`}
                      onClick={() => setSelectedTrabajo(trabajo.id)}
                    >
                      <td className='p-3 text-sm font-medium text-gray-900'>{trabajo.id}</td>
                      <td className='p-3 text-sm text-gray-700'>{trabajo.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className='rounded-lg border bg-white'>
            <div className='border-b bg-gray-50 p-4'>
              <h3 className='font-semibold text-gray-900'>Partidas del trabajo</h3>
            </div>
            <div className='max-h-96 overflow-y-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>ID</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>PARTIDA</th>
                    <th className='p-3 text-left text-sm font-semibold text-gray-900'>METRADO</th>
                    <th className='p-3 text-center text-sm font-semibold text-gray-900'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {partidasTrabajoData.map((partida) => (
                    <tr key={partida.id} className='border-b hover:bg-gray-50'>
                      <td className='p-3 text-sm font-medium text-gray-900'>{partida.id}</td>
                      <td className='p-3 text-sm text-gray-700'>{partida.partida}</td>
                      <td className='p-3 text-sm text-gray-700'>{partida.metrado}</td>
                      <td className='p-3 text-center'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='icon' className='h-8 w-8'>
                              <MoreVerticalIcon className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='bg-white px-4'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='font-semibold text-gray-900'>Estado del trabajo</h3>
              <div className='py-2 px-4 rounded-sm border-2 border-gray-200 cursor-pointer'>
                <Printer className='w-5 h-5' />
              </div>
            </div>
            <Badge variant='secondary' className='bg-[#fa913b] w-full mb-2 text-lg text-black'>
              PROGRAMADO
            </Badge>

            <div className='space-y-4'>
              <div className='w-full'>
                <Label
                  htmlFor='unidad'
                  className='w-full block text-sm font-medium text-gray-700'
                >
                  Unidad de producción
                </Label>
                <Select
                  value={estadoTrabajo.unidad}
                  onValueChange={(value) =>
                    setEstadoTrabajo({ ...estadoTrabajo, unidad: value })
                  }
                >
                  <SelectTrigger className='mt-1 w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Varios'>Varios</SelectItem>
                    <SelectItem value='Estructura'>Estructura</SelectItem>
                    <SelectItem value='Acabados'>Acabados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='w-full'>
                <Label htmlFor='tren' className='text-sm font-medium text-gray-700'>
                  Tren
                </Label>
                <Select value={estadoTrabajo.tren} onValueChange={(value) =>
                  setEstadoTrabajo({ ...estadoTrabajo, tren: value })
                }>
                  <SelectTrigger className='mt-1 w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Desmontajes'>Desmontajes</SelectItem>
                    <SelectItem value='Excavaciones'>Excavaciones</SelectItem>
                    <SelectItem value='Cimentaciones'>Cimentaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='w-full'>
                <Label htmlFor='responsable' className='text-sm font-medium text-gray-700'>
                  Responsable
                </Label>
                <Select value={estadoTrabajo.responsable} onValueChange={(value) =>
                  setEstadoTrabajo({ ...estadoTrabajo, responsable: value })
                }>
                  <SelectTrigger className='mt-1 w-full'>
                    <SelectValue placeholder='Seleccionar responsable' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Juan Pérez'>Juan Pérez</SelectItem>
                    <SelectItem value='María García'>María García</SelectItem>
                    <SelectItem value='Carlos López'>Carlos López</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor='fechaInicio' className='text-sm font-medium text-gray-700'>
                  Fecha inicio
                </Label>
                <div className='mt-1'>
                  <Input
                    id='fechaInicio'
                    type='date'
                    value={estadoTrabajo.fechaInicio}
                    onChange={(e) => setEstadoTrabajo({ ...estadoTrabajo, fechaInicio: e.target.value })}
                  />
                  <p className='mt-1 text-xs text-gray-500'>
                    {formatDate(estadoTrabajo.fechaInicio)}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor='duracion' className='text-sm font-medium text-gray-700'>
                  Duración
                </Label>
                <Input
                  id='duracion'
                  type='number'
                  value={estadoTrabajo.duracion}
                  onChange={(e) => setEstadoTrabajo({ ...estadoTrabajo, duracion: parseInt(e.target.value) })}
                  className='mt-1'
                />
              </div>

              <div>
                <Label htmlFor='fechaFinalizacion' className='text-sm font-medium text-gray-700'>
                  Fecha finalización
                </Label>
                <div className='mt-1'>
                  <Input
                    id='fechaFinalizacion'
                    type='date'
                    value={estadoTrabajo.fechaFinalizacion}
                    onChange={(e) => setEstadoTrabajo({ ...estadoTrabajo, fechaFinalizacion: e.target.value })}
                  />
                  <p className='mt-1 text-xs text-gray-500'>
                    {formatDate(estadoTrabajo.fechaFinalizacion)}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor='costo' className='text-sm font-medium text-gray-700'>
                  Costo del trabajo
                </Label>
                <Input
                  id='costo'
                  value={estadoTrabajo.costo.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  readOnly
                  className='mt-1 bg-gray-50'
                />
              </div>

              <div>
                <Label htmlFor='notas' className='text-sm font-medium text-gray-700'>
                  Notas del trabajo
                </Label>
                <Textarea
                  id='notas'
                  value={estadoTrabajo.notas}
                  onChange={(e) => setEstadoTrabajo({ ...estadoTrabajo, notas: e.target.value })}
                  className='mt-1'
                  rows={3}
                  placeholder='Agregar notas...'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

