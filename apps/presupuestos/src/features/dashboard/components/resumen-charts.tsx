import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'

const subPresupuestosData = [
  { name: 'Estructura', value: 2000 },
  { name: 'Arquitectura', value: 1500 },
  { name: 'Ins Electricas', value: 1200 },
  { name: 'Ins Sanitarias', value: 800 },
  { name: 'Equipamiento', value: 700 },
  { name: 'Contingencia', value: 600 },
]

const distributionData = [
  { name: 'Estructura', value: 47.6, color: '#4A5568' },
  { name: 'Ins Electricas', value: 2.2, color: '#60D5DC' },
  { name: 'Arquitectura', value: 1.8, color: '#5B7EC5' },
  { name: 'Ins Sanitarias', value: 3.0, color: '#7BC9E0' },
]

const paretoData = [
  { name: 'Materiales', frequency: 45, cumulative: 45 },
  { name: 'Medios', frequency: 25, cumulative: 70 },
  { name: 'Mano de Obra', frequency: 20, cumulative: 90 },
  { name: 'Métodos', frequency: 10, cumulative: 100 },
  { name: 'Medio Ambiente', frequency: 5, cumulative: 105 },
  { name: 'Varios', frequency: 5, cumulative: 110 },
]

const manoObraMaterialesData = [
  { name: 'Mano de Obra', value: 23.8, color: '#5B7EC5' },
  { name: 'Materiales', value: 19.0, color: '#60D5DC' },
  { name: 'Electrico', value: 3.5, color: '#7BC9E0' },
]

export default function ResumenCharts() {
  return (
    <div className='grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Sub-presupuestos */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Sub-presupuestos</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={subPresupuestosData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='value' fill='#5B7EC5' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Pie Chart */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Distribución por Categoría</h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className='mt-2 space-y-1'>
            {distributionData.map((item, index) => (
              <div key={index} className='flex items-center gap-2 text-xs'>
                <div
                  className='w-3 h-3 rounded'
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pareto Diagram */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Diagrama de Pareto</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={paretoData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId='left' dataKey='frequency' fill='#5B7EC5' name='Frecuencia' radius={[4, 4, 0, 0]} />
              <Line 
                yAxisId='right' 
                type='monotone' 
                dataKey='cumulative' 
                stroke='#EF4444' 
                strokeWidth={2}
                name='Cumulative %'
                dot={{ fill: '#EF4444', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mano de Obra vs Materiales */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Mano de Obra vs Materiales</h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={manoObraMaterialesData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ percent }: any) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {manoObraMaterialesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className='mt-2 space-y-1'>
            {manoObraMaterialesData.map((item, index) => (
              <div key={index} className='flex items-center gap-2 text-xs'>
                <div
                  className='w-3 h-3 rounded'
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Causas de No Disponibilidad */}
      <div className='card bg-base-100 shadow-sm md:col-span-2'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Causas de No Disponibilidad</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={paretoData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis dataKey='name' tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey='frequency' fill='#5B7EC5' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

