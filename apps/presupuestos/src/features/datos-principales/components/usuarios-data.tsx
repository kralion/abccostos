import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { PlusIcon, SearchIcon, MoreVerticalIcon } from 'lucide-react'
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

interface Usuario {
  id: string
  nombreCompleto: string
  rol: string
}

const mockData: Usuario[] = [
  {
    id: '001',
    nombreCompleto: 'Alejandro Bravo',
    rol: 'Metrados',
  },
  {
    id: '002',
    nombreCompleto: 'Cesar Alejandro Falla',
    rol: 'Presupuesto',
  },
  {
    id: '003',
    nombreCompleto: 'Miguel Carilocla',
    rol: 'Asistente',
  },
  {
    id: '004',
    nombreCompleto: 'Alfredo Ramirez Santos',
    rol: 'Presupuesto',
  },
  {
    id: '005',
    nombreCompleto: 'Anderson Risco More',
    rol: 'Presupuesto',
  },
]

export default function UsuariosData() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='space-y-4'>
      {/* Search and Actions */}
      <div className='flex items-center justify-between gap-4'>
        <div className='relative flex-1 max-w-sm'>
          <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Buscar Sub-presupuesto'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' className='gap-2'>
            <PlusIcon className='h-4 w-4' />
            Registrar usuario
          </Button>
          <Select defaultValue='10'>
            <SelectTrigger className='w-20'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
              <SelectItem value='50'>50</SelectItem>
              <SelectItem value='100'>100</SelectItem>
            </SelectContent>
          </Select>
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
                  Nombre completo
                </th>
                <th className='p-3 text-left text-sm font-semibold'>Rol</th>
                <th className='p-3 text-center text-sm font-semibold'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((usuario, index) => (
                <tr
                  key={usuario.id}
                  className={`border-b last:border-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className='p-3 text-sm'>{usuario.id}</td>
                  <td className='p-3 text-sm'>{usuario.nombreCompleto}</td>
                  <td className='p-3 text-sm'>{usuario.rol}</td>
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

