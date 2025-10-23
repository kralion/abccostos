import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  SearchIcon,
  MoreVerticalIcon,
  FileTextIcon,
  Download,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

interface UnidadProduccion {
  id: string
  responsable: string
  area: string
  especialidad: string
  fecharq: string
  fechallegada: string
  estado: 'Anulado' | 'Atendido' | 'A. Parcialmente' | 'Sin Atender'
  cumplimiento: number
  monto: number
}

const mockData: UnidadProduccion[] = [
  {
    id: '001 - 01',
    responsable: 'Juan Perez',
    area: 'Area 1',
    especialidad: 'Especialidad 1',
    fecharq: '2025-01-01',
    fechallegada: '2025-01-01',
    estado: 'Atendido',
    cumplimiento: 100,
    monto: 1000,
  },
  {
    id: '001 - 02',
    responsable: 'Maria Lopez',
    area: 'Area 2',
    especialidad: 'Especialidad 2',
    fecharq: '2025-01-02',
    fechallegada: '2025-01-02',
    estado: 'A. Parcialmente',
    cumplimiento: 50,
    monto: 500,
  },
  {
    id: '001 - 03',
    responsable: 'Carlos Mendoza',
    area: 'Area 3',
    especialidad: 'Especialidad 3',
    fecharq: '2025-01-03',
    fechallegada: '2025-01-03',
    estado: 'Sin Atender',
    cumplimiento: 0,
    monto: 0,
  },
]

export default function DetalleTab() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='space-y-4'>
      {/* Search and Actions */}
      <div className="flex items-end justify-end gap-4">
        <div className="relative flex-1 max-w-sm hidden sm:block">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar detalles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="sm:hidden border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const input = prompt('Buscar detalles', searchQuery)
              if (input !== null) setSearchQuery(input)
            }}
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant='ghost'>
            <FileTextIcon className='h-5 w-5' />
            <span className="hidden sm:inline">Exportar Detalles</span>
          </Button>
          <Button variant='ghost' className='gap-2'>
            <Download className='h-5 w-5' />
            <span className="hidden sm:inline">Importar</span>
          </Button>
        </div>
      </div>

      {/* Tabla de detalles más específicos */}
      <div className='rounded-lg border bg-white'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b bg-gray-100'>
              <tr>
                <th className='p-3 text-left text-sm font-semibold'>ID Detalle</th>
                <th className='p-3 text-left text-sm font-semibold'>ID Principal</th>
                <th className='p-3 text-left text-sm font-semibold'>Descripción</th>
                <th className='p-3 text-left text-sm font-semibold'>Cantidad</th>
                <th className='p-3 text-left text-sm font-semibold'>Unidad</th>
                <th className='p-3 text-left text-sm font-semibold'>Precio Unit.</th>
                <th className='p-3 text-left text-sm font-semibold'>Total</th>
                <th className='p-3 text-left text-sm font-semibold'>Proveedor</th>
                <th className='p-3 text-center text-sm font-semibold'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr
                  key={`${item.id}-detail`}
                  className={`border-b last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='p-3 text-sm'>{item.id}-DET</td>
                  <td className='p-3 text-sm'>{item.id}</td>
                  <td className='p-3 text-sm'>Descripción detallada del item {item.id}</td>
                  <td className='p-3 text-sm'>{Math.floor(Math.random() * 10) + 1}</td>
                  <td className='p-3 text-sm'>Unidad</td>
                  <td className='p-3 text-sm'>${item.monto / (Math.floor(Math.random() * 10) + 1)}</td>
                  <td className='p-3 text-sm'>${item.monto}</td>
                  <td className='p-3 text-sm'>Proveedor {index + 1}</td>
                  <td className='p-3 text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <MoreVerticalIcon className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
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
