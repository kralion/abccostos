import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const unidadesProduccionData = [
  { name: 'Bloque 1', value: 850 },
  { name: 'Bloque 2', value: 200 },
  { name: 'Bloque C', value: 420 },
  { name: 'Bloque N', value: 280 },
  { name: 'Bloque S', value: 450 },
  { name: 'Bloque E', value: 520 },
]

const tramosData = [
  { name: 'Acero', value: 750 },
  { name: 'EnciOfrado', value: 150 },
  { name: 'Concreto', value: 450 },
  { name: 'Albañileria', value: 320 },
  { name: 'Revoque', value: 480 },
  { name: 'Enchape', value: 520 },
]

const fasesData = [
  { name: 'Estructura Horizontal', value: 1500 },
  { name: 'Estructura Vertical', value: 280 },
  { name: 'Acabados Húmedos', value: 520 },
  { name: 'Acabados Secos', value: 180 },
  { name: 'Terminaciones', value: 950 },
  { name: 'Equipamiento', value: 1150 },
]

export default function DetalleCharts() {
  return (
    <div className='grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-2'>
      {/* Unidades de Producción */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Unidades de Producción</h2>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={unidadesProduccionData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='value' fill='#4A5568' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tramos */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Tramos</h2>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={tramosData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='value' fill='#2D1B4E' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fases */}
      <div className='card bg-base-100 shadow-sm md:col-span-2'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Fases</h2>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={fasesData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='value' fill='#3C4F5C' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

