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
  ReferenceLine,
} from 'recharts'
import { calculateParetoData, getParetoColors, formatCurrency } from '@/lib/pareto-utils'

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
  const subPresupuestosPareto = calculateParetoData(subPresupuestosData, 'value', 'name')
  const distributionPareto = calculateParetoData(distributionData, 'value', 'name')
  const manoObraPareto = calculateParetoData(manoObraMaterialesData, 'value', 'name')
  const paretoPareto = calculateParetoData(paretoData, 'frequency', 'name')

  return (
    <div className='grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Sub-presupuestos - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Sub-presupuestos (Pareto)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={subPresupuestosPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return formatCurrency(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {subPresupuestosPareto.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getParetoColors(entry.isVitalFew)} />
                ))}
              </Bar>
              <Line 
                yAxisId='right' 
                type='monotone' 
                dataKey='cumulativePercent' 
                stroke='#EF4444' 
                strokeWidth={2}
                name='Cumulative %'
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <ReferenceLine yAxisId='right' y={80} stroke='#10B981' strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Pie Chart - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Distribución por Categoría (Pareto)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={distributionPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return `${value.toFixed(1)}%`
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {distributionPareto.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getParetoColors(entry.isVitalFew)} />
                ))}
              </Bar>
              <Line 
                yAxisId='right' 
                type='monotone' 
                dataKey='cumulativePercent' 
                stroke='#EF4444' 
                strokeWidth={2}
                name='Cumulative %'
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <ReferenceLine yAxisId='right' y={80} stroke='#10B981' strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
          <div className='mt-2 space-y-1'>
            {distributionPareto.map((item, index) => (
              <div key={index} className='flex items-center gap-2 text-xs'>
                <div
                  className='w-3 h-3 rounded'
                  style={{ backgroundColor: getParetoColors(item.isVitalFew) }}
                />
                <span>{item.name} ({item.value.toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pareto Diagram - Enhanced */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Causas de No Disponibilidad (Pareto)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={paretoPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Frecuencia') return value
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Frecuencia' radius={[4, 4, 0, 0]}>
                {paretoPareto.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getParetoColors(entry.isVitalFew)} />
                ))}
              </Bar>
              <Line 
                yAxisId='right' 
                type='monotone' 
                dataKey='cumulativePercent' 
                stroke='#EF4444' 
                strokeWidth={2}
                name='Cumulative %'
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <ReferenceLine yAxisId='right' y={80} stroke='#10B981' strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mano de Obra vs Materiales - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Mano de Obra vs Materiales (Pareto)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={manoObraPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return `${value.toFixed(1)}%`
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {manoObraPareto.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getParetoColors(entry.isVitalFew)} />
                ))}
              </Bar>
              <Line 
                yAxisId='right' 
                type='monotone' 
                dataKey='cumulativePercent' 
                stroke='#EF4444' 
                strokeWidth={2}
                name='Cumulative %'
                dot={{ fill: '#EF4444', r: 4 }}
              />
              <ReferenceLine yAxisId='right' y={80} stroke='#10B981' strokeDasharray='3 3' />
            </ComposedChart>
          </ResponsiveContainer>
          <div className='mt-2 space-y-1'>
            {manoObraPareto.map((item, index) => (
              <div key={index} className='flex items-center gap-2 text-xs'>
                <div
                  className='w-3 h-3 rounded'
                  style={{ backgroundColor: getParetoColors(item.isVitalFew) }}
                />
                <span>{item.name} ({item.value.toFixed(1)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

