import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, ComposedChart, Line, ReferenceLine, Cell, Legend, CartesianGrid, Tooltip } from 'recharts'
import { calculateParetoData, getParetoColors, formatCurrency } from '@/lib/pareto-utils'

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function Overview() {
  const paretoData = calculateParetoData(data, 'total', 'name')

  return (
    <ResponsiveContainer width='100%' height={350}>
      <ComposedChart data={paretoData}>
        <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          yAxisId='left'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <Tooltip 
          formatter={(value: any, name: string) => {
            if (name === 'Total') return formatCurrency(value)
            if (name === 'Cumulative %') return `${value.toFixed(1)}%`
            return value
          }}
        />
        <Legend />
        <Bar
          yAxisId='left'
          dataKey='value'
          name='Total'
          radius={[4, 4, 0, 0]}
        >
          {paretoData.map((entry, index) => (
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
  )
}
