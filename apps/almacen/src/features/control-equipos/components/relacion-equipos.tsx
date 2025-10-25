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

const equiposData = [
  { name: 'Excavadoras', cantidad: 12, estado: 'Activo', costo: 2500000 },
  { name: 'Grúas', cantidad: 8, estado: 'Activo', costo: 1800000 },
  { name: 'Bulldozers', cantidad: 6, estado: 'Mantenimiento', costo: 1200000 },
  { name: 'Camiones', cantidad: 15, estado: 'Activo', costo: 800000 },
  { name: 'Generadores', cantidad: 10, estado: 'Activo', costo: 450000 },
]

const estadoData = [
  { name: 'Activo', value: 45, color: '#10B981' },
  { name: 'Mantenimiento', value: 6, color: '#F59E0B' },
  { name: 'Fuera de Servicio', value: 2, color: '#EF4444' },
]

const rendimientoData = [
  { name: 'Enero', horas: 320, eficiencia: 85 },
  { name: 'Febrero', horas: 380, eficiencia: 92 },
  { name: 'Marzo', horas: 350, eficiencia: 88 },
  { name: 'Abril', horas: 410, eficiencia: 95 },
  { name: 'Mayo', horas: 390, eficiencia: 90 },
]

const mantenimientoData = [
  { name: 'Preventivo', cantidad: 8, costo: 120000 },
  { name: 'Correctivo', cantidad: 3, costo: 45000 },
  { name: 'Predictivo', cantidad: 2, costo: 30000 },
]

export default function RelacionEquipos() {
  return (
    <div className='space-y-6'>
      {/* Header con filtros */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex flex-col gap-2 md:flex-row md:items-center'>
          <h2 className='text-2xl font-bold'>Relación de Equipos</h2>
          <Badge variant='secondary' className='w-fit'>
            Total: {equiposData.reduce((sum, item) => sum + item.cantidad, 0)} equipos
          </Badge>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Exportar
          </Button>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Nuevo Equipo
          </Button>
        </div>
      </div>


      {/* Gráficos principales */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Gráfico de Estado de Equipos */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Equipos</CardTitle>
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

        {/* Gráfico de Rendimiento */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <ComposedChart data={rendimientoData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip />
                <Legend />
                <Bar yAxisId='left' dataKey='horas' fill='#3B82F6' />
                <Line yAxisId='right' type='monotone' dataKey='eficiencia' stroke='#10B981' strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Equipos */}
      <Card>
        <CardHeader>
          <CardTitle>Inventario de Equipos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipo</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Costo Unitario</TableHead>
                <TableHead>Costo Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equiposData.map((equipo, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium'>{equipo.name}</TableCell>
                  <TableCell>{equipo.cantidad}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={equipo.estado === 'Activo' ? 'default' : 'secondary'}
                      className={
                        equipo.estado === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {equipo.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>${equipo.costo.toLocaleString()}</TableCell>
                  <TableCell>${(equipo.costo * equipo.cantidad).toLocaleString()}</TableCell>
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

      {/* Gráfico de Mantenimiento */}
      <Card>
        <CardHeader>
          <CardTitle>Programa de Mantenimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={mantenimientoData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='cantidad' fill='#8B5CF6' />
              <Line yAxisId='right' type='monotone' dataKey='costo' stroke='#F59E0B' strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
