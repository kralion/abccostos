import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  SearchIcon,
  MoreVerticalIcon,
  FileTextIcon,
  PackageIcon,
  Upload,
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
  tren: string
  costoTotal: number
  manoObra: number
  material: number
  equipo: number
  varios: number
}

const mockData: UnidadProduccion[] = [
  {
    id: '001',
    tren: 'Acero',
    costoTotal: 60.0,
    manoObra: 60.0,
    material: 60.0,
    equipo: 60.0,
    varios: 60.0,
  },
  {
    id: '002',
    tren: 'Encofrado',
    costoTotal: 100.0,
    manoObra: 100.0,
    material: 100.0,
    equipo: 100.0,
    varios: 100.0,
  },
  {
    id: '003',
    tren: 'Concreto',
    costoTotal: 200.0,
    manoObra: 200.0,
    material: 200.0,
    equipo: 200.0,
    varios: 200.0,
  },
]

export default function TrenesData() {
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
                  Tren
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
                  <td className='p-3 text-sm'>{item.tren}</td>
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

