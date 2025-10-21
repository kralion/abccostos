import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
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
import { Checkbox } from '@workspace/ui/components/checkbox'

interface SubPresupuesto {
  id: string
  nombre: string
  costoDirecto: number
  gastosGenerales: number
  utilidad: number
  subTotal: number
  igv: number
  total: number
}

const mockData: SubPresupuesto[] = [
  {
    id: '001',
    nombre: 'Estructura',
    costoDirecto: 60.0,
    gastosGenerales: 60.0,
    utilidad: 60.0,
    subTotal: 60.0,
    igv: 60.0,
    total: 60.0,
  },
  {
    id: '002',
    nombre: 'Arquitectua',
    costoDirecto: 100.0,
    gastosGenerales: 100.0,
    utilidad: 100.0,
    subTotal: 100.0,
    igv: 100.0,
    total: 100.0,
  },
  {
    id: '003',
    nombre: 'Ins Electricas',
    costoDirecto: 200.0,
    gastosGenerales: 200.0,
    utilidad: 0,
    subTotal: 200.0,
    igv: 200.0,
    total: 200.0,
  },
  {
    id: '004',
    nombre: 'Ins Sanitarias',
    costoDirecto: 60.0,
    gastosGenerales: 60.0,
    utilidad: 60.0,
    subTotal: 60.0,
    igv: 60.0,
    total: 60.0,
  },
  {
    id: '005',
    nombre: 'Equipamiento',
    costoDirecto: 100.0,
    gastosGenerales: 100.0,
    utilidad: 100.0,
    subTotal: 100.0,
    igv: 100.0,
    total: 100.0,
  },
]

export default function GeneralData() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(mockData.map((item) => item.id)))
    } else {
      setSelectedRows(new Set())
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)
  }

  return (
    <div className='space-y-6'>
      {/* Form Section */}
      <div className='space-y-4 rounded-lg border bg-white p-6'>
        <div className='grid grid-cols-12 gap-4'>
          {/* Row 1 */}
          <div className='col-span-2'>
            <Label htmlFor='codigo'>Codigo</Label>
            <Input id='codigo' />
          </div>
          <div className='col-span-4'>
            <Label htmlFor='descripcion'>Descripción</Label>
            <Input id='descripcion' />
          </div>
          <div className='col-span-6'>
            <Label htmlFor='direccion'>Direccion</Label>
            <Input id='direccion' />
          </div>

          {/* Row 2 */}
          <div className='col-span-3'>
            <Label htmlFor='cliente'>Cliente</Label>
            <Input id='cliente' />
          </div>
          <div className='col-span-2'>
            <Label htmlFor='distrito'>Distrito</Label>
            <Input id='distrito' />
          </div>
          <div className='col-span-2'>
            <Label htmlFor='provincia'>Provincia</Label>
            <Input id='provincia' />
          </div>
          <div className='col-span-2'>
            <Label htmlFor='departamento'>Departamento</Label>
            <Input id='departamento' />
          </div>
          <div className='col-span-3'>
            <Label htmlFor='fechaBase'>Fecha Base</Label>
            <Input id='fechaBase' type='date' />
          </div>

          {/* Row 3 */}
          <div className='col-span-2'>
            <Label htmlFor='plazo'>Plazo</Label>
            <Input id='plazo' />
          </div>
          <div className='col-span-2'>
            <Label htmlFor='jornada'>Jornada</Label>
            <Input id='jornada' />
          </div>
          <div className='col-span-3'>
            <Label htmlFor='moneda'>Moneda</Label>
            <Input id='moneda' />
          </div>
        </div>
      </div>

      {/* Sub-presupuestos Section */}
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
              Nuevo Sub-presupuesto
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
              <thead className='border-b bg-gray-50'>
                <tr>
                  <th className='w-12 p-3 text-left'>
                    <Checkbox
                      checked={selectedRows.size === mockData.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className='p-3 text-left text-sm font-semibold'>Id</th>
                  <th className='p-3 text-left text-sm font-semibold'>
                    Sub presupuestos
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
                    <td className='p-3'>
                      <Checkbox
                        checked={selectedRows.has(item.id)}
                        onCheckedChange={(checked) =>
                          handleSelectRow(item.id, checked as boolean)
                        }
                      />
                    </td>
                    <td className='p-3 text-sm'>{item.id}</td>
                    <td className='p-3 text-sm'>{item.nombre}</td>
                    <td className='p-3 text-right text-sm text-blue-600'>
                      {item.costoDirecto.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm text-blue-600'>
                      {item.gastosGenerales.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.utilidad > 0 ? item.utilidad.toFixed(2) : ''}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.subTotal.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm'>
                      {item.igv.toFixed(2)}
                    </td>
                    <td className='p-3 text-right text-sm text-orange-600'>
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
    </div>
  )
}

