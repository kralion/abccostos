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

const transporteData = [
  { name: 'Camiones', value: 12 },
  { name: 'Montacargas', value: 8 },
  { name: 'Grúas', value: 4 },
  { name: 'Carretillas', value: 15 },
]

const rutasData = [
  { name: 'Ruta A', eficiencia: 85, tiempo: 45 },
  { name: 'Ruta B', eficiencia: 92, tiempo: 38 },
  { name: 'Ruta C', eficiencia: 78, tiempo: 52 },
  { name: 'Ruta D', eficiencia: 88, tiempo: 42 },
]

const entregasData = [
  { name: 'Completadas', value: 75, color: '#4A5568' },
  { name: 'Pendientes', value: 15, color: '#60D5DC' },
  { name: 'Retrasadas', value: 10, color: '#E53E3E' },
]

export default function LogisticaCharts() {
  return (
    <div className='space-y-6'>
      {/* Gráfico de Flota */}
      <div className='rounded-lg border bg-card p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Flota de Transporte</h3>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart data={transporteData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' fill='#8884d8' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Rendimiento */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Eficiencia de Rutas</h3>
          <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={rutasData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='eficiencia' fill='#8884d8' />
              <Line yAxisId='right' type='monotone' dataKey='tiempo' stroke='#82ca9d' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Estado de Entregas</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={entregasData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                dataKey='value'
              >
                {entregasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
