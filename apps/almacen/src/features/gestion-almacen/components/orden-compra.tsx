import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  SearchIcon,
  MoreVerticalIcon,
  Plus,
  Printer,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

interface UnidadProduccion {
  id: string
  fecha: string
  proveedor: string
  codigoOC: number
  monto: number
  igv: number
  total: number
  observacion: string
}

const mockData: UnidadProduccion[] = [
  {
    id: '001',
    fecha: '2025-01-01',
    proveedor: 'Alvares Flores Jimmy Wilbert',
    codigoOC: 1020,
    monto: 100.0,
    igv: 18.0,
    total: 118.0,
    observacion: 'Se compro por pedido de oficina',
  },
  {
    id: '002',
    fecha: '2025-01-02',
    proveedor: 'Empresa Constructora S.A.C',
    codigoOC: 1021,
    monto: 100.0,
    igv: 18.0,
    total: 118.0,
    observacion: 'Material para frente 2',
  },
  {
    id: '003',
    fecha: '2025-01-03',
    proveedor: 'Construcciones S.A.C',
    codigoOC: 1022,
    monto: 100.0,
    igv: 18.0,
    total: 118.0,
    observacion: 'Para equipos',
  },
  {
    id: '004',
    fecha: '2025-01-04',
    proveedor: 'Empresa Constructora S.A.C',
    codigoOC: 1023,
    monto: 100.0,
    igv: 18.0,
    total: 118.0,
    observacion: 'Se compro para material de oficina',
  },
  {
    id: '005',
    fecha: '2025-01-05',
    proveedor: 'Empresa Constructora S.A.C',
    codigoOC: 1024,
    monto: 100.0,
    igv: 18.0,
    total: 118.0,
    observacion: 'Se pedió para instalaciones',
  },
]

export default function OrdenCompra() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='space-y-4'>
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
          <Button variant='ghost' className='gap-2'>
            <Plus className='h-5 w-5' />
            <span className="hidden sm:inline">Nuevo</span>
          </Button>
          <Button variant='ghost' className='gap-2'>
            <Printer className='h-5 w-5' />
            <span className="hidden sm:inline">Imprimir</span>
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
                  Fecha
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Proveedor
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Código OC
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Monto
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  IGV
                </th>
                <th className='p-3 text-left text-sm font-semibold'>Total</th>
                <th className='p-3 text-left text-sm font-semibold'>Observación</th>
                <th className='p-3 text-center text-sm font-semibold'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b last:border-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className='p-3 text-sm'>{item.id}</td>
                  <td className='p-3 text-sm'>{item.fecha}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.proveedor}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.codigoOC}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.monto.toFixed(2)}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.igv.toFixed(2)}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.total.toFixed(2)}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.observacion}</td>
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
  )
}

