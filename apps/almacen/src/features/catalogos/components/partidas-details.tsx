import { useState } from 'react'
import { FileDown, Download, Calculator, List, Plus, X, Edit } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { User, Package, Wrench, Briefcase } from 'lucide-react'

interface Partida {
  codigo: string
  descripcion: string
  unidad: string
  ultimaModificacion: string
  fechaModificacion: string
}

interface Recurso {
  id: string
  tipo: 'mano-obra' | 'material' | 'equipo' | 'subcontrato'
  descripcion: string
  unidad: string
  cuadrilla?: number
  cantidad: number
  precio: number
  parcial: number
}

interface PartidasDetailsProps {
  partida: Partida
}

const TipoIcon = ({ tipo }: { tipo: string }) => {
  const iconMap = {
    'mano-obra': User,
    'material': Package,
    'equipo': Wrench,
    'subcontrato': Briefcase,
  }
  
  const Icon = iconMap[tipo as keyof typeof iconMap] || User
  return <Icon className='size-4 text-red-600' />
}

const mockRecursos: Recurso[] = [
  { id: '1', tipo: 'mano-obra', descripcion: 'Operario', unidad: 'h.h.', cuadrilla: 2.50, cantidad: 2.50, precio: 3.50, parcial: 8.75 },
  { id: '2', tipo: 'mano-obra', descripcion: 'Oficial', unidad: 'h.h.', cuadrilla: 5.00, cantidad: 5.00, precio: 30.00, parcial: 150.00 },
  { id: '3', tipo: 'material', descripcion: 'Arena Gruesa', unidad: 'm3', cantidad: 0.50, precio: 45.00, parcial: 22.50 },
  { id: '4', tipo: 'material', descripcion: 'Piedra Chancada de 1/2"', unidad: 'm3', cantidad: 0.30, precio: 80.00, parcial: 24.00 },
  { id: '5', tipo: 'equipo', descripcion: 'Trompo', unidad: 'h.e.', cantidad: 0.10, precio: 25.00, parcial: 2.50 },
  { id: '6', tipo: 'equipo', descripcion: 'Excavadora', unidad: 'h.e.', cantidad: 0.05, precio: 150.00, parcial: 7.50 },
  { id: '7', tipo: 'subcontrato', descripcion: 'Suministro', unidad: 'und', cantidad: 1.00, precio: 15.00, parcial: 15.00 },
  { id: '8', tipo: 'subcontrato', descripcion: 'Elaboracion', unidad: 'und', cantidad: 1.00, precio: 8.00, parcial: 8.00 },
]

export default function PartidasDetails({ partida }: PartidasDetailsProps) {
  const [unidad, setUnidad] = useState('m2')
  const [rendimiento, setRendimiento] = useState('20.00')
  
  // Calculate totals
  const totales = mockRecursos.reduce(
    (acc, recurso) => {
      acc.total += recurso.parcial
      if (recurso.tipo === 'mano-obra') acc.manoObra += recurso.parcial
      if (recurso.tipo === 'material') acc.materiales += recurso.parcial
      if (recurso.tipo === 'equipo') acc.equipos += recurso.parcial
      if (recurso.tipo === 'subcontrato') acc.subcontrato += recurso.parcial
      return acc
    },
    { manoObra: 0, materiales: 0, equipos: 0, subcontrato: 0, total: 0 }
  )

  const porcentajes = {
    manoObra: totales.total > 0 ? (totales.manoObra / totales.total) * 100 : 0,
    materiales: totales.total > 0 ? (totales.materiales / totales.total) * 100 : 0,
    equipos: totales.total > 0 ? (totales.equipos / totales.total) * 100 : 0,
  }

  return (
    <div className="mt-6 border-l-4 border-l-purple-500 bg-muted/20 p-4 rounded-r-md">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-purple-700">
          {partida.codigo} Análisis de costos unitarios
        </h3>
        <p className="text-sm text-muted-foreground">{partida.descripcion}</p>
      </div>

      {/* Summary Info */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Unidad:</span>
          <Input
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
            className="w-16 h-8 text-center"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Rendimiento:</span>
          <Input
            value={rendimiento}
            onChange={(e) => setRendimiento(e.target.value)}
            className="w-20 h-8 text-center"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Precio Unitario:</span>
          <Button variant="outline" className="h-8 bg-purple-100 text-purple-700 border-purple-300">
            {totales.total.toFixed(2)}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <User className="size-4 text-red-600" />
            <span className="text-sm font-medium">{porcentajes.manoObra.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="size-4 text-red-600" />
            <span className="text-sm font-medium">{porcentajes.materiales.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wrench className="size-4 text-red-600" />
            <span className="text-sm font-medium">{porcentajes.equipos.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="size-4 text-red-600" />
            <span className="text-sm font-medium">{(100 - porcentajes.manoObra - porcentajes.materiales - porcentajes.equipos).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm">
          <FileDown className="h-4 w-4 mr-2" />
          PDF
        </Button>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Excel
        </Button>
        <Button variant="outline" size="sm">
          <Calculator className="h-4 w-4 mr-2" />
          Calcular
        </Button>
        <Button variant="outline" size="sm">
          <List className="h-4 w-4 mr-2" />
          Lista
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Recurso
        </Button>
        <Button variant="outline" size="sm">
          Agregar
        </Button>
      </div>

      {/* Details Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12"></TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-20">Und</TableHead>
              <TableHead className="w-24">Cuadrilla</TableHead>
              <TableHead className="w-24">Cantidad</TableHead>
              <TableHead className="w-24">Precio</TableHead>
              <TableHead className="w-24">Parcial</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRecursos.map((recurso) => (
              <TableRow key={recurso.id}>
                <TableCell>
                  <TipoIcon tipo={recurso.tipo} />
                </TableCell>
                <TableCell>{recurso.descripcion}</TableCell>
                <TableCell className="text-center">{recurso.unidad}</TableCell>
                <TableCell>
                  {recurso.cuadrilla !== undefined ? (
                    <Input
                      type="number"
                      defaultValue={recurso.cuadrilla}
                      className="h-7 w-20 text-center"
                      step="0.01"
                    />
                  ) : (
                    <div className="text-center">-</div>
                  )}
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    defaultValue={recurso.cantidad}
                    className="h-7 w-20 text-center"
                    step="0.01"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    defaultValue={recurso.precio}
                    className="h-7 w-24 text-center"
                    step="0.01"
                  />
                </TableCell>
                <TableCell className="text-center font-medium">
                  {recurso.parcial.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-6">
                      <X className="size-3 text-red-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-6">
                      <Edit className="size-3 text-blue-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Total: {mockRecursos.length}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Anterior</Button>
          <Button variant="outline" size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">Siguiente</Button>
        </div>
      </div>
    </div>
  )
}
