import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Label } from '@workspace/ui/components/label'
import { Button } from '@workspace/ui/components/button'
import { PlusIcon, SearchIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { SubPresupuestosView } from './sub-presupuestos-view'
import { SubPresupuesto } from '../types'

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
      <div className="rounded-lg border bg-white p-6">
        <div
          className="
            grid
            gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-6
            w-full
          "
        >
          {/* Codigo */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="codigo">Codigo</Label>
            <Input id="codigo" />
          </div>
          {/* Descripción */}
          <div className="flex flex-col sm:col-span-2 xl:col-span-2 gap-2 ">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input id="descripcion" />
          </div>
          {/* Direccion */}
          <div className="flex flex-col sm:col-span-2 xl:col-span-2 gap-2 ">
            <Label htmlFor="direccion">Direccion</Label>
            <Input id="direccion" />
          </div>
          {/* Cliente */}
          <div className="flex flex-col sm:col-span-2 xl:col-span-2 gap-2 ">
            <Label htmlFor="cliente">Cliente</Label>
            <Input id="cliente" />
          </div>
          {/* Distrito */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="distrito">Distrito</Label>
            <Input id="distrito" />
          </div>
          {/* Provincia */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="provincia">Provincia</Label>
            <Input id="provincia" />
          </div>
          {/* Departamento */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="departamento">Departamento</Label>
            <Input id="departamento" />
          </div>
          {/* Fecha Base */}
          <div className="flex flex-col sm:col-span-2 xl:col-span-2 gap-2 ">
            <Label htmlFor="fechaBase">Fecha Base</Label>
            <Input id="fechaBase" type="date" />
          </div>
          {/* Plazo */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="plazo">Plazo</Label>
            <Input id="plazo" />
          </div>
          {/* Jornada */}
          <div className="flex flex-col gap-2 ">
            <Label htmlFor="jornada">Jornada</Label>
            <Input id="jornada" />
          </div>
          {/* Moneda */}
          <div className="flex flex-col sm:col-span-2 xl:col-span-2 gap-2 ">
            <Label htmlFor="moneda">Moneda</Label>
            <Input id="moneda" />
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
              Nuevo
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

        {/* Table/Cards */}
        <SubPresupuestosView
          data={mockData}
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          globalFilter={searchQuery}
          onGlobalFilterChange={setSearchQuery}
        />
      </div>
    </div>
  )
}

