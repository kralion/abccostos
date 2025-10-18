import { clientes } from '@/features/clientes/data/clientes'
import { calculateParetoData, formatNumber, getParetoColors } from '@/lib/pareto-utils'
import { useMemo } from 'react'
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const COLORS = ['#5B7EC5', '#60D5DC', '#7BC9E0', '#4A5568', '#EF4444', '#10B981']

export default function ClientesCharts() {
  const {
    customersPerMonth,
    statusBreakdown,
    projectsPareto,
    statusPareto,
  } = useMemo(() => {
    // Monthly customers based on fechaInicioFacturacion month counts
    const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'short' })
    const monthCounts = new Map<string, number>()
    for (const c of clientes) {
      const key = `${monthFormatter.format(c.fechaInicioFacturacion)} ${c.fechaInicioFacturacion.getFullYear()}`
      monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1)
    }
    const customersPerMonth = Array.from(monthCounts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => {
        const [ma, ya] = a.name.split(' ')
        const [mb, yb] = b.name.split(' ')
        const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic']
        const ia = months.findIndex((m) => ma.toLowerCase().startsWith(m))
        const ib = months.findIndex((m) => mb.toLowerCase().startsWith(m))
        const yaNum = Number(ya)
        const ybNum = Number(yb)
        return yaNum === ybNum ? ia - ib : yaNum - ybNum
      })

    // Projects by company (top N)
    const projectsByCompany = clientes
      .map((c) => ({ name: c.nombreEmpresa, proyectos: c.proyectos }))
      .sort((a, b) => b.proyectos - a.proyectos)
      .slice(0, 10)

    // Status breakdown
    const statusCounts = clientes.reduce<Record<string, number>>((acc, c) => {
      acc[c.estado] = (acc[c.estado] ?? 0) + 1
      return acc
    }, {})
    const statusBreakdown = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

    // Pareto analysis
    const projectsPareto = calculateParetoData(projectsByCompany, 'proyectos', 'name')
    const statusPareto = calculateParetoData(statusBreakdown, 'value', 'name')

    return { customersPerMonth, projectsByCompany, statusBreakdown, projectsPareto, statusPareto }
  }, [])

  return (
    <div className='grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3'>
      {/* Customers per Month */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Clientes por mes</h2>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={customersPerMonth}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='value' stroke='#5B7EC5' strokeWidth={2} dot={{ r: 3 }} name='Clientes' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects by Company - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Proyectos por Empresa (Pareto)</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={projectsPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Proyectos') return formatNumber(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Proyectos' radius={[4, 4, 0, 0]}>
                {projectsPareto.map((entry, index) => (
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

      {/* Status Breakdown Pie Chart */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Estado de Clientes</h2>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie data={statusBreakdown} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80} innerRadius={40} label>
                {statusBreakdown.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Breakdown - Pareto */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Análisis Pareto - Estado</h2>
          <ResponsiveContainer width='100%' height={300}>
            <ComposedChart data={statusPareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={70}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                formatter={(value: any, name: string) => {
                  if (name === 'Clientes') return formatNumber(value)
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Clientes' radius={[4, 4, 0, 0]}>
                {statusPareto.map((entry, index) => (
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
            {statusPareto.map((item, index) => (
              <div key={index} className='flex items-center gap-2 text-xs'>
                <div
                  className='w-3 h-3 rounded'
                  style={{ backgroundColor: getParetoColors(item.isVitalFew) }}
                />
                <span>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


