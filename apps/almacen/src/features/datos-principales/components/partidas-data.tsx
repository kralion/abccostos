import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { Switch } from '@workspace/ui/components/switch'
import { Label } from '@workspace/ui/components/label'
import {
  SearchIcon,
  MoreVerticalIcon,
  FileTextIcon,
  PackageIcon,
  Upload,
  Download,
  Trash2,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

interface UnidadProduccion {
  id: string
  trabajos: string
  costoTotal: number
  manoObra: number
  material: number
  equipo: number
  varios: number
  estado: 'Programado' | 'Ejecutando' | 'Terminado'
}

interface Partida {
  idPartida: string
  item: string
  partida: string
  und: string
  metrado: number
  metradoAsignado: number
  precioU: number
  saldoPorAsignar: number
  parcial: number
}

const getEstadoStyles = (estado: UnidadProduccion['estado']) => {
  switch (estado) {
    case 'Programado':
      return 'bg-[#fef5e3] text-[#f7b940] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Ejecutando':
      return 'bg-[#def2e6] text-[#16a24a] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Terminado':
      return 'bg-[#f5dddd] text-[#ac0405] px-2 py-1 rounded-[4px] text-xs font-medium'
    default:
      return 'bg-[#f5f5f5] text-[#64748b] px-2 py-1 rounded-[4px] text-xs font-medium'
  }
}

const mockData: UnidadProduccion[] = [
  {
    id: '001',
    trabajos: 'Acero - Bloque 1',
    costoTotal: 60.0,
    manoObra: 60.0,
    material: 60.0,
    equipo: 60.0,
    varios: 60.0,
    estado: 'Programado',
  },
  {
    id: '002',
    trabajos: 'Encofrado - Bloque 2',
    costoTotal: 100.0,
    manoObra: 100.0,
    material: 100.0,
    equipo: 100.0,
    varios: 100.0,
    estado: 'Ejecutando',
  },
  {
    id: '003',
    trabajos: 'Concreto - Bloque 3',
    costoTotal: 200.0,
    manoObra: 200.0,
    material: 200.0,
    equipo: 200.0,
    varios: 200.0,
    estado: 'Terminado',
  },
  {
    id: '004',
    trabajos: 'Albañilería - Bloque 4',
    costoTotal: 200.0,
    manoObra: 200.0,
    material: 200.0,
    equipo: 200.0,
    varios: 200.0,
    estado: 'Terminado',
  },
  {
    id: '005',
    trabajos: 'Revoques - Bloque 5',
    costoTotal: 200.0,
    manoObra: 200.0,
    material: 200.0,
    equipo: 200.0,
    varios: 200.0,
    estado: 'Terminado',
  },
]

const mockPartidasData: Partida[] = [
  {
    idPartida: '0001',
    item: '001',
    partida: 'OBRAS PROVISIONALES',
    und: '-',
    metrado: 0,
    metradoAsignado: 0,
    precioU: 0,
    saldoPorAsignar: 0,
    parcial: 0,
  },
  {
    idPartida: '0002',
    item: '1.01',
    partida: 'CONSTRUCCIONES PROVISIONALES',
    und: '-',
    metrado: 0,
    metradoAsignado: 0,
    precioU: 0,
    saldoPorAsignar: 0,
    parcial: 0,
  },
  {
    idPartida: '0003',
    item: '001.01.01',
    partida: 'Alquiler, Oficina Y Caseta De Guardiania',
    und: 'm2',
    metrado: 48.50,
    metradoAsignado: 48.50,
    precioU: 84.56,
    saldoPorAsignar: 0,
    parcial: 4101.16,
  },
  {
    idPartida: '0004',
    item: '001.01.02',
    partida: 'Cartel De Indentificacion De La Obra 3.60x2.40m',
    und: 'und',
    metrado: 1.00,
    metradoAsignado: 1.00,
    precioU: 1400.00,
    saldoPorAsignar: 0,
    parcial: 1400.00,
  },
  {
    idPartida: '0005',
    item: '001.01.03',
    partida: 'Servicios Higienicos Provisionales',
    und: 'mes',
    metrado: 12.00,
    metradoAsignado: 12.00,
    precioU: 900.00,
    saldoPorAsignar: 0,
    parcial: 10800.00,
  },
  {
    idPartida: '0006',
    item: '001.01.04',
    partida: 'Instalacion Electricas Provisionales',
    und: 'glb',
    metrado: 1.00,
    metradoAsignado: 1.00,
    precioU: 4500.00,
    saldoPorAsignar: 0,
    parcial: 4500.00,
  },
  {
    idPartida: '0007',
    item: '001.01.05',
    partida: 'Cerco Perimetrico Provisional H=2.40m',
    und: 'ml',
    metrado: 288.79,
    metradoAsignado: 288.79,
    precioU: 79.02,
    saldoPorAsignar: 0,
    parcial: 22820.19,
  },
  {
    idPartida: '0008',
    item: '001.01.06',
    partida: 'Movilizacion Y Desmovilizacion De Equipos Y Herramientas',
    und: 'glb',
    metrado: 1.00,
    metradoAsignado: 1.00,
    precioU: 4692.24,
    saldoPorAsignar: 0,
    parcial: 4692.24,
  },
  {
    idPartida: '0009',
    item: '001.01.07',
    partida: 'Flete Terrestre',
    und: 'glb',
    metrado: 1.00,
    metradoAsignado: 1.00,
    precioU: 22043.98,
    saldoPorAsignar: 0,
    parcial: 22043.98,
  },
  {
    idPartida: '0010',
    item: '2',
    partida: 'SEGURIDAD Y SALUD',
    und: '-',
    metrado: 0,
    metradoAsignado: 0,
    precioU: 0,
    saldoPorAsignar: 0,
    parcial: 0,
  },
]

export default function PartidasData() {
  const [searchQuery, setSearchQuery] = useState('')
  const [partidasSearchQuery, setPartidasSearchQuery] = useState('')
  const [verPartidaConSaldo, setVerPartidaConSaldo] = useState(false)

  // Calcular totales para la tabla de partidas
  const totalPresupuesto = mockPartidasData.reduce((sum, item) => sum + item.parcial, 0)
  const parcialTotal = mockPartidasData.reduce((sum, item) => sum + item.parcial, 0)

  return (
    <div className='space-y-8'>
      {/* Primera tabla - Unidades de Producción */}
      <div className='space-y-4'>
        <h2 className="text-lg font-semibold">Unidades de Producción</h2>

        {/* Search and Actions */}
        <div className="flex items-end justify-end gap-4">
          {/* Caja de búsqueda en desktop, solo ícono en mobile */}
          <div className="relative flex-1 max-w-sm hidden sm:block">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Código/Nombre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {/* Botón de buscar sólo en mobile */}
          <div className="sm:hidden border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const input = prompt('Buscar por código o nombre', searchQuery)
                if (input !== null) setSearchQuery(input)
              }}
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant='ghost'>
              <FileTextIcon className='h-5 w-5' />
              <span className="hidden sm:inline">Imp. Sec. General</span>
            </Button>
            <Button variant='ghost'>
              <PackageIcon className='h-5 w-5' />
              <span className="hidden sm:inline">Ver Sec. General</span>
            </Button>
            <Button variant='ghost' className='gap-2'>
              <Download className='h-5 w-5' />
              <span className="hidden sm:inline">Importar</span>
            </Button>
            <Button variant='ghost' className='gap-2'>
              <Upload className='h-5 w-5' />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className='rounded-lg border bg-white'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b bg-gray-100'>
                <tr>
                  <th className='p-3 text-left text-sm font-semibold'>Id</th>
                  <th className='p-3 text-left text-sm font-semibold'>
                    Trabajos
                  </th>
                  <th className='p-3 text-right text-sm font-semibold'>
                    Costo Total
                  </th>
                  <th className='p-3 text-right text-sm font-semibold'>
                    Mano de Obra
                  </th>
                  <th className='p-3 text-right text-sm font-semibold'>
                    Material
                  </th>
                  <th className='p-3 text-right text-sm font-semibold'>
                    Equipo
                  </th>
                  <th className='p-3 text-right text-sm font-semibold'>Varios</th>
                  <th className='p-3 text-right text-sm font-semibold'>Estado</th>
                  <th className='p-3 text-center text-sm font-semibold'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                  >
                    <td className='p-3 text-sm'>{item.id}</td>
                    <td className='p-3 text-sm'>{item.trabajos}</td>
                    <td className='p-3 text-right text-sm'>
                      {item.costoTotal.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.manoObra.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.material.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.equipo.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.varios.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      <span className={getEstadoStyles(item.estado)}>
                        {item.estado}
                      </span>
                    </td>
                    <td className='p-3 text-center'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <MoreVerticalIcon className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className='text-destructive'>
                            Eliminar
                          </DropdownMenuItem>
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

      {/* Segunda tabla - Partidas */}
      <div className='space-y-4'>
        <h2 className="text-lg font-semibold">Partidas</h2>

        {/* Search and Actions para Partidas */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por código / nom"
                value={partidasSearchQuery}
                onChange={(e) => setPartidasSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Switch para ver partida con saldo */}
            <div className="flex items-center space-x-2">
              <Switch
                id="ver-saldo"
                checked={verPartidaConSaldo}
                onCheckedChange={setVerPartidaConSaldo}
              />
              <Label htmlFor="ver-saldo" className="text-sm">
                Ver partida con saldo
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant='destructive' className='gap-2'>
              <Trash2 className='h-4 w-4' />
              <span className="hidden sm:inline">Borrar datos</span>
            </Button>
            <Button variant='outline' className='gap-2'>
              <Download className='h-4 w-4' />
              <span className="hidden sm:inline">Exportar datos</span>
            </Button>
            <Button className='gap-2'>
              <Trash2 className='h-4 w-4' />
              <span className="hidden sm:inline">Registrar</span>
            </Button>
          </div>
        </div>

        {/* Resumen de totales */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Total presupuesto: {totalPresupuesto.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">10</span>
              <span className="text-sm text-gray-600">Parcial ({parcialTotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })})</span>
            </div>
          </div>
        </div>

        {/* Table de Partidas */}
        <div className='rounded-lg border bg-white'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='border-b bg-gray-100'>
                <tr>
                  <th className='p-3 text-left text-sm font-semibold'>Id Partida</th>
                  <th className='p-3 text-left text-sm font-semibold'>Item</th>
                  <th className='p-3 text-left text-sm font-semibold'>Partida</th>
                  <th className='p-3 text-center text-sm font-semibold'>UND</th>
                  <th className='p-3 text-right text-sm font-semibold'>Metrado</th>
                  <th className='p-3 text-right text-sm font-semibold'>Metrado Asignado</th>
                  <th className='p-3 text-right text-sm font-semibold'>Precio U.</th>
                  <th className='p-3 text-right text-sm font-semibold'>Saldo por asignar</th>
                  <th className='p-3 text-right text-sm font-semibold'>Parcial</th>
                  <th className='p-3 text-center text-sm font-semibold'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {mockPartidasData.map((item, index) => (
                  <tr
                    key={item.idPartida}
                    className={`border-b last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                  >
                    <td className='p-3 text-sm'>{item.idPartida}</td>
                    <td className='p-3 text-sm'>{item.item}</td>
                    <td className='p-3 text-sm'>{item.partida}</td>
                    <td className='p-3 text-center text-sm'>{item.und}</td>
                    <td className='p-3 text-right text-sm'>
                      {item.metrado === 0 ? '-' : item.metrado.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.metradoAsignado === 0 ? '-' : item.metradoAsignado.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.precioU === 0 ? '-' : item.precioU.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.saldoPorAsignar === 0 ? '-' : item.saldoPorAsignar.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.parcial === 0 ? '-' : item.parcial.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </td>
                    <td className='p-3 text-center'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon' className='h-8 w-8'>
                            <MoreVerticalIcon className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem className='text-destructive'>
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer con totales y paginación */}
          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Total: {mockPartidasData.length}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeftIcon className='h-4 w-4' />
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="bg-blue-500 text-white">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-2">...</span>
                <Button variant="outline" size="sm">19</Button>
              </div>
              <Button variant="outline" size="sm">
                <ChevronRightIcon className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

