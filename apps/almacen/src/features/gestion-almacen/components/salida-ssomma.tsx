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
  trabajo: string
  trabajador: string
  categoria: string
  responsable: string
  estado: 'Entregado' | 'Pendiente'  | 'Rechazado'
  observacion: string
}

const getEstadoStyles = (estado: UnidadProduccion['estado']) => {
  switch (estado) {
    case 'Pendiente':
      return 'bg-[#fef5e3] text-[#f7b940] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Entregado':
      return 'bg-[#def2e6] text-[#16a24a] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Rechazado':
      return 'bg-[#e4534e] text-[#ffff] px-2 py-1 rounded-[4px] text-xs font-medium'
    default:
      return 'bg-[#f5f5f5] text-[#64748b] px-2 py-1 rounded-[4px] text-xs font-medium'
  }
}

const mockData: UnidadProduccion[] = [
  {
    id: '001',
    fecha: '2025-01-01',
    trabajo: 'Acero - Bloque 1',
    trabajador: 'Juan Perez',
    categoria: 'Operario',
    responsable: 'Juan Perez',
    estado: 'Entregado',
    observacion: 'Se compro por pedido de oficina',
  },
  {
    id: '002',
    fecha: '2025-01-02',
    trabajo: 'Acero - Bloque 1',
    trabajador: 'Juan Perez',
    categoria: 'Operario',
    responsable: 'Juan Perez',
    estado: 'Rechazado',
    observacion: 'Se compro por pedido de oficina',
  },
  {
    id: '003',
    fecha: '2025-01-03',
    trabajo: 'Acero - Bloque 1',
    trabajador: 'Juan Perez',
    categoria: 'Operario',
    responsable: 'Juan Perez',
    estado: 'Pendiente',
    observacion: 'Se compro por pedido de oficina',
  },
]

export default function SalidaSsomma() {
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
        <div className="flex items-center gap-2">
          <Button variant='ghost' className='gap-2'>
            <Plus className='h-5 w-5' />
            <span className="hidden sm:inline">Nuevo vale</span>
          </Button>
          <Button variant='ghost' className='gap-2'>
            <Printer className='h-5 w-5' />
            <span className="hidden sm:inline">Imprimir</span>
          </Button>
        </div>
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
                  Trabajo
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Trabajador
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Categoría
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Responsable
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Estado
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Observación
                </th>
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
                  <td className='p-3 text-left text-sm'>{item.trabajo}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.trabajador}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.categoria}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.responsable}</td>
                  <td className='p-3 text-left text-sm'>
                    <span className={getEstadoStyles(item.estado)}>
                      {item.estado}
                    </span>
                  </td>
                  <td className='p-3 text-left text-sm'>{item.observacion}</td>
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

