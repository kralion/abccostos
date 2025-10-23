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

const inventarioData = [
  { name: 'Materiales', value: 1500 },
  { name: 'Herramientas', value: 800 },
  { name: 'Equipos', value: 1200 },
  { name: 'Suministros', value: 600 },
  { name: 'Repuestos', value: 400 },
]

const movimientosData = [
  { name: 'Entradas', value: 65, color: '#4A5568' },
  { name: 'Salidas', value: 35, color: '#60D5DC' },
]

const stockData = [
  { name: 'Enero', stock: 1200, movimientos: 45 },
  { name: 'Febrero', stock: 1350, movimientos: 52 },
  { name: 'Marzo', stock: 1180, movimientos: 38 },
  { name: 'Abril', stock: 1420, movimientos: 61 },
  { name: 'Mayo', stock: 1300, movimientos: 48 },
]

export default function AlmacenCharts() {
  return (
    <div className='space-y-6'>
      {/* Gráfico de Inventario */}
      <div className='rounded-lg border bg-card p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Inventario por Categoría</h3>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart data={inventarioData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' fill='#8884d8' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Movimientos */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Distribución de Movimientos</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={movimientosData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                dataKey='value'
              >
                {movimientosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Stock vs Movimientos</h3>
          <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={stockData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='stock' fill='#8884d8' />
              <Line yAxisId='right' type='monotone' dataKey='movimientos' stroke='#82ca9d' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
