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

const configuracionData = [
  { name: 'Parámetros', cantidad: 25, modificados: 3 },
  { name: 'Permisos', cantidad: 15, modificados: 2 },
  { name: 'Plantillas', cantidad: 8, modificados: 1 },
]

const estadoConfigData = [
  { name: 'Activos', value: 85, color: '#4A5568' },
  { name: 'Inactivos', value: 10, color: '#60D5DC' },
  { name: 'Pendientes', value: 5, color: '#E53E3E' },
]

const cambiosData = [
  { name: 'Enero', cambios: 12, usuarios: 8 },
  { name: 'Febrero', cambios: 8, usuarios: 5 },
  { name: 'Marzo', cambios: 15, usuarios: 10 },
  { name: 'Abril', cambios: 6, usuarios: 4 },
  { name: 'Mayo', cambios: 10, usuarios: 7 },
]

export default function ConfiguracionCharts() {
  return (
    <div className='space-y-6'>
      {/* Gráfico de Configuraciones */}
      <div className='rounded-lg border bg-card p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Configuraciones del Sistema</h3>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart data={configuracionData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Bar yAxisId='left' dataKey='cantidad' fill='#8884d8' />
            <Line yAxisId='right' type='monotone' dataKey='modificados' stroke='#82ca9d' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Estado y Cambios */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Estado de Configuraciones</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={estadoConfigData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                dataKey='value'
              >
                {estadoConfigData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Cambios Mensuales</h3>
          <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={cambiosData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='cambios' fill='#8884d8' />
              <Line yAxisId='right' type='monotone' dataKey='usuarios' stroke='#82ca9d' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}