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

const usuariosData = [
  { name: 'Activos', cantidad: 45, nuevos: 5 },
  { name: 'Inactivos', cantidad: 8, nuevos: 1 },
  { name: 'Suspendidos', cantidad: 3, nuevos: 0 },
]

const rolesData = [
  { name: 'Administradores', value: 5, color: '#4A5568' },
  { name: 'Usuarios', value: 35, color: '#60D5DC' },
  { name: 'Operadores', value: 15, color: '#7BC9E0' },
]

const actividadData = [
  { name: 'Enero', logins: 120, actividades: 85 },
  { name: 'Febrero', logins: 135, actividades: 92 },
  { name: 'Marzo', logins: 118, actividades: 78 },
  { name: 'Abril', logins: 142, actividades: 95 },
  { name: 'Mayo', logins: 130, actividades: 88 },
]

export default function UsuariosCharts() {
  return (
    <div className='space-y-6'>
      {/* Gráfico de Estado de Usuarios */}
      <div className='rounded-lg border bg-card p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Estado de Usuarios</h3>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart data={usuariosData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Bar yAxisId='left' dataKey='cantidad' fill='#8884d8' />
            <Line yAxisId='right' type='monotone' dataKey='nuevos' stroke='#82ca9d' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Roles y Actividad */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Distribución por Roles</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={rolesData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                dataKey='value'
              >
                {rolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Actividad Mensual</h3>
          <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={actividadData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis yAxisId='left' />
              <YAxis yAxisId='right' orientation='right' />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='logins' fill='#8884d8' />
              <Line yAxisId='right' type='monotone' dataKey='actividades' stroke='#82ca9d' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}