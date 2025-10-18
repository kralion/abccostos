import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  ReferenceLine,
  Cell,
  Legend,
} from 'recharts'
import { calculateParetoData, getParetoColors, formatNumber } from '@/lib/pareto-utils'

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
  const unidadesPareto = calculateParetoData(unidadesProduccionData, 'value', 'name')
  const tramosPareto = calculateParetoData(tramosData, 'value', 'name')
  const fasesPareto = calculateParetoData(fasesData, 'value', 'name')

  return (
    <div className='grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-2'>
      {/* Unidades de Producción - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Unidades de Producción (Pareto)</h2>
          <ResponsiveContainer width='100%' height={350}>
            <ComposedChart data={unidadesPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return formatNumber(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {unidadesPareto.map((entry, index) => (
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

      {/* Tramos - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Tramos (Pareto)</h2>
          <ResponsiveContainer width='100%' height={350}>
            <ComposedChart data={tramosPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return formatNumber(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {tramosPareto.map((entry, index) => (
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

      {/* Fases - Pareto */}
      <div className='card bg-base-100 shadow-sm md:col-span-2'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Fases (Pareto)</h2>
          <ResponsiveContainer width='100%' height={350}>
            <ComposedChart data={fasesPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis 
                dataKey='name' 
                tick={{ fontSize: 10 }}
                angle={-10}
                textAnchor='end'
                height={60}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Valor') return formatNumber(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Valor' radius={[4, 4, 0, 0]}>
                {fasesPareto.map((entry, index) => (
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
    </div>
  )
}

