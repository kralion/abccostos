import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const seguridadData = [
  { name: 'Incidentes', value: 5 },
  { name: 'Inspecciones', value: 12 },
  { name: 'Capacitaciones', value: 8 },
  { name: 'Auditorías', value: 3 },
]

const cumplimientoData = [
  { name: 'Cumplido', value: 85, color: '#4A5568' },
  { name: 'Pendiente', value: 12, color: '#60D5DC' },
  { name: 'Vencido', value: 3, color: '#E53E3E' },
]

const indicadoresData = [
  { name: 'Enero', seguridad: 92, salud: 88, ambiente: 85 },
  { name: 'Febrero', seguridad: 95, salud: 90, ambiente: 87 },
  { name: 'Marzo', seguridad: 89, salud: 85, ambiente: 82 },
  { name: 'Abril', seguridad: 94, salud: 92, ambiente: 89 },
  { name: 'Mayo', seguridad: 96, salud: 94, ambiente: 91 },
]

export default function SsommaCharts() {
  return (
    <div className='space-y-6'>
      {/* Gráfico de Actividades SSOMMA */}
      <div className='rounded-lg border bg-card p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Actividades SSOMMA</h3>
        <ResponsiveContainer width='100%' height={300}>
          <ComposedChart data={seguridadData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value' fill='#8884d8' />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos de Cumplimiento e Indicadores */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Estado de Cumplimiento</h3>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={cumplimientoData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                dataKey='value'
              >
                {cumplimientoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='rounded-lg border bg-card p-6'>
          <h3 className='mb-4 text-lg font-semibold'>Indicadores SSOMMA</h3>
          <ResponsiveContainer width='100%' height={250}>
            <ComposedChart data={indicadoresData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='seguridad' fill='#8884d8' />
              <Bar dataKey='salud' fill='#82ca9d' />
              <Bar dataKey='ambiente' fill='#ffc658' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}


