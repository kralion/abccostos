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
  responsable: string
  area: string
  especialidad: string
  fecharq: string
  fechallegada: string
  estado: 'Anulado' | 'Atendido' | 'A. Parcialmente' | 'Sin Atender'
  cumplimiento: number
  monto: number
}

const getEstadoStyles = (estado: UnidadProduccion['estado']) => {
  switch (estado) {
    case 'Anulado':
      return 'bg-[#f5dddd] text-[#ac0405] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Atendido':
      return 'bg-[#def2e6] text-[#16a24a] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'A. Parcialmente':
      return 'bg-[#fef5e3] text-[#f7b940] px-2 py-1 rounded-[4px] text-xs font-medium'
    case 'Sin Atender':
      return 'bg-[#fff4ec] text-[#ff904d] px-2 py-1 rounded-[4px] text-xs font-medium'
    default:
      return 'bg-[#f5f5f5] text-[#64748b] px-2 py-1 rounded-[4px] text-xs font-medium'
  }
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

interface ResumenTabProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function ResumenTab({ searchQuery, setSearchQuery }: ResumenTabProps) {
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
                  Responsable
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Area
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Especialidad
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Fecha de Rq
                </th>
                <th className='p-3 text-left text-sm font-semibold'>
                  Fecha de Llegada
                </th>
                <th className='p-3 text-left text-sm font-semibold'>Estado</th>
                <th className='p-3 text-left text-sm font-semibold'>% Cumplimiento</th>
                <th className='p-3 text-left text-sm font-semibold'>Monto aproximado</th>
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
                  <td className='p-3 text-sm'>{item.responsable}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.area}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.especialidad}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.fecharq}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.fechallegada}</td>
                  <td className='p-3 text-left text-sm'>
                    <span className={getEstadoStyles(item.estado)}>
                      {item.estado}
                    </span>
                  </td>
                  <td className='p-3 text-left text-sm'>
                    {item.cumplimiento}</td>
                  <td className='p-3 text-left text-sm'>
                    {item.monto}</td>
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
