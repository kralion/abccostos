import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { Download, Plus } from 'lucide-react'

// Datos de ejemplo para el inventario
const inventarioData = [
  { 
    codigo: 'MAT001', 
    descripcion: 'Cemento Portland Tipo I', 
    unidad: 'Bolsa', 
    stockActual: 150, 
    stockMinimo: 50, 
    stockMaximo: 200, 
    precioUnitario: 25.50, 
    valorTotal: 3825.00,
    categoria: 'Materiales',
    estado: 'Disponible',
    ubicacion: 'Almacén A'
  },
  { 
    codigo: 'MAT002', 
    descripcion: 'Acero de Refuerzo Ø12mm', 
    unidad: 'Varilla', 
    stockActual: 85, 
    stockMinimo: 30, 
    stockMaximo: 120, 
    precioUnitario: 18.75, 
    valorTotal: 1593.75,
    categoria: 'Materiales',
    estado: 'Disponible',
    ubicacion: 'Almacén B'
  },
  { 
    codigo: 'MAT003', 
    descripcion: 'Arena Fina', 
    unidad: 'm³', 
    stockActual: 12, 
    stockMinimo: 20, 
    stockMaximo: 50, 
    precioUnitario: 45.00, 
    valorTotal: 540.00,
    categoria: 'Materiales',
    estado: 'Stock Bajo',
    ubicacion: 'Almacén A'
  },
  { 
    codigo: 'MAT004', 
    descripcion: 'Piedra Chancada 3/4"', 
    unidad: 'm³', 
    stockActual: 0, 
    stockMinimo: 15, 
    stockMaximo: 40, 
    precioUnitario: 38.50, 
    valorTotal: 0.00,
    categoria: 'Materiales',
    estado: 'Agotado',
    ubicacion: 'Almacén B'
  },
  { 
    codigo: 'MAT005', 
    descripcion: 'Tubos PVC Ø4"', 
    unidad: 'Unidad', 
    stockActual: 45, 
    stockMinimo: 20, 
    stockMaximo: 80, 
    precioUnitario: 12.30, 
    valorTotal: 553.50,
    categoria: 'Instalaciones',
    estado: 'Disponible',
    ubicacion: 'Almacén C'
  },
]

const estadoData = [
  { name: 'Disponible', value: 3, color: '#10B981' },
  { name: 'Stock Bajo', value: 1, color: '#F59E0B' },
  { name: 'Agotado', value: 1, color: '#EF4444' },
]

const categoriaData = [
  { name: 'Materiales', cantidad: 4, valor: 5958.75 },
  { name: 'Instalaciones', cantidad: 1, valor: 553.50 },
]

const movimientoData = [
  { name: 'Enero', ingresos: 120, salidas: 95, stock: 25 },
  { name: 'Febrero', ingresos: 150, salidas: 110, stock: 40 },
  { name: 'Marzo', ingresos: 180, salidas: 140, stock: 40 },
  { name: 'Abril', ingresos: 200, salidas: 160, stock: 40 },
  { name: 'Mayo', ingresos: 220, salidas: 180, stock: 40 },
]

export default function Inventario() {
  const totalValorInventario = inventarioData.reduce((sum, item) => sum + item.valorTotal, 0)
  const totalItems = inventarioData.length

  return (
    <div className='space-y-6'>
      {/* Header con filtros */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center'>
          <h2 className='text-2xl font-bold'>Inventario de Materiales</h2>
          <div className='flex gap-2'>
            <Badge variant='secondary' className='w-fit'>
              Total: {totalItems} items
            </Badge>
            <Badge variant='outline' className='w-fit'>
              Valor: ${totalValorInventario.toLocaleString()}
            </Badge>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Exportar
          </Button>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Nuevo Item
          </Button>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Gráfico de Estado de Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Estado del Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={estadoData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                  dataKey='value'
                >
                  {estadoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Movimientos */}
        <Card>
          <CardHeader>
            <CardTitle>Movimientos de Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <ComposedChart data={movimientoData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip />
                <Legend />
                <Bar yAxisId='left' dataKey='ingresos' fill='#10B981' name='Ingresos' />
                <Bar yAxisId='left' dataKey='salidas' fill='#EF4444' name='Salidas' />
                <Line yAxisId='right' type='monotone' dataKey='stock' stroke='#3B82F6' strokeWidth={2} name='Stock Final' />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Inventario */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle del Inventario</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Unidad</TableHead>
                <TableHead>Stock Actual</TableHead>
                <TableHead>Stock Mín.</TableHead>
                <TableHead>Stock Máx.</TableHead>
                <TableHead>Precio Unit.</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventarioData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{item.codigo}</TableCell>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell>{item.unidad}</TableCell>
                  <TableCell className={item.stockActual <= item.stockMinimo ? 'text-yellow-600 font-semibold' : ''}>
                    {item.stockActual}
                  </TableCell>
                  <TableCell>{item.stockMinimo}</TableCell>
                  <TableCell>{item.stockMaximo}</TableCell>
                  <TableCell>${item.precioUnitario.toFixed(2)}</TableCell>
                  <TableCell>${item.valorTotal.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.estado === 'Disponible' ? 'default' : 
                        item.estado === 'Stock Bajo' ? 'secondary' : 'destructive'
                      }
                      className={
                        item.estado === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : item.estado === 'Stock Bajo'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {item.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.ubicacion}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button variant='outline' size='sm'>
                        Ver Detalles
                      </Button>
                      <Button variant='outline' size='sm'>
                        Editar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Gráfico de Valor por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle>Valor del Inventario por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={categoriaData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='cantidad' fill='#8B5CF6' name='Cantidad de Items' />
              <Line yAxisId='right' type='monotone' dataKey='valor' stroke='#F59E0B' strokeWidth={2} name='Valor Total' />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
