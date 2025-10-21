import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  PlusIcon,
  SearchIcon,
  MoreVerticalIcon,
  FileTextIcon,
  PackageIcon,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

interface Tren {
  id: string
  nombre: string
  costoDirecto: number
  gastosGenerales: number
  utilidad: number
  subTotal: number
  igv: number
  total: number
}

const mockData: Tren[] = [
  {
    id: '001',
    nombre: 'Tren 1',
    costoDirecto: 60.0,
    gastosGenerales: 60.0,
    utilidad: 60.0,
    subTotal: 60.0,
    igv: 60.0,
    total: 60.0,
  },
  {
    id: '002',
    nombre: 'Tren 2',
    costoDirecto: 100.0,
    gastosGenerales: 100.0,
    utilidad: 100.0,
    subTotal: 100.0,
    igv: 100.0,
    total: 100.0,
  },
]

export default function TrenesData() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='space-y-4'>
      {/* Search and Actions */}
      <div className='flex items-center justify-between gap-4'>
        <div className='relative flex-1 max-w-sm'>
          <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar Tren'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon'>
            <FileTextIcon className='h-5 w-5' />
          </Button>
          <Button variant='ghost' size='icon'>
            <PackageIcon className='h-5 w-5' />
          </Button>
          <Button variant='ghost' className='gap-2'>
            <PlusIcon className='h-4 w-4' />
            Tren
          </Button>
          <Button variant='ghost'>Ver Resumen</Button>
          <Button variant='ghost'>Ver Recursos</Button>
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
                  Unidad de Produccion
                </th>
                <th className='p-3 text-right text-sm font-semibold'>
                  Costo Directo
                </th>
                <th className='p-3 text-right text-sm font-semibold'>
                  Gastos Generales
                </th>
                <th className='p-3 text-right text-sm font-semibold'>
                  Utilidad
                </th>
                <th className='p-3 text-right text-sm font-semibold'>
                  Sub total
                </th>
                <th className='p-3 text-right text-sm font-semibold'>Igv</th>
                <th className='p-3 text-right text-sm font-semibold'>Total</th>
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
                  <td className='p-3 text-sm'>{item.nombre}</td>
                  <td className='p-3 text-right text-sm text-blue-600'>
                    {item.costoDirecto.toFixed(2)}
                  </td>
                  <td className='p-3 text-right text-sm text-blue-600'>
                    {item.gastosGenerales.toFixed(2)}
                  </td>
                  <td className='p-3 text-right text-sm'>
                    {item.utilidad.toFixed(2)}
                  </td>
                  <td className='p-3 text-right text-sm'>
                    {item.subTotal.toFixed(2)}
                  </td>
                  <td className='p-3 text-right text-sm'>
                    {item.igv.toFixed(2)}
                  </td>
                  <td className='p-3 text-right text-sm'>
                    {item.total.toFixed(2)}
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

