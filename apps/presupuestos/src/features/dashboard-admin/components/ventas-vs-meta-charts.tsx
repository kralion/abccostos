import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  ReferenceLine,
} from 'recharts'
import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { calculateParetoData, getParetoColors, formatCurrency } from '@/lib/pareto-utils'

const projectOptions = [
  { id: '1', name: 'Edificio Central' },
  { id: '2', name: 'Torre Norte' },
  { id: '3', name: 'Residencial Sur' },
  { id: '4', name: 'Complejo Este' },
  { id: '5', name: 'Plaza Oeste' },
]

const comparisonTypeOptions = [
  { id: 'partida', name: 'Por Partida' },
  { id: 'especialidad', name: 'Por Especialidad' },
  { id: 'fase', name: 'Por Fase' },
  { id: 'mensual', name: 'Evolución Mensual' },
]

// Mock data generators
const getPartidasData = () => [
  { name: 'Estructura', meta: 450000, venta: 420000 },
  { name: 'Arquitectura', meta: 320000, venta: 345000 },
  { name: 'Ins. Eléctricas', meta: 180000, venta: 175000 },
  { name: 'Ins. Sanitarias', meta: 150000, venta: 160000 },
  { name: 'Acabados', meta: 280000, venta: 265000 },
  { name: 'Equipamiento', meta: 120000, venta: 125000 },
]

const getEspecialidadesData = () => [
  { name: 'Concreto', meta: 380000, venta: 365000 },
  { name: 'Acero', meta: 290000, venta: 310000 },
  { name: 'Albañilería', meta: 220000, venta: 215000 },
  { name: 'Carpintería', meta: 180000, venta: 195000 },
  { name: 'Pintura', meta: 150000, venta: 145000 },
  { name: 'Enchape', meta: 280000, venta: 260000 },
]

const getFasesData = () => [
  { name: 'Cimentación', meta: 420000, venta: 405000 },
  { name: 'Estructura', meta: 580000, venta: 590000 },
  { name: 'Cerramientos', meta: 280000, venta: 275000 },
  { name: 'Instalaciones', meta: 320000, venta: 335000 },
  { name: 'Acabados', meta: 400000, venta: 385000 },
]

const getMensualData = () => [
  { month: 'Ene', meta: 500000, venta: 480000 },
  { month: 'Feb', meta: 520000, venta: 535000 },
  { month: 'Mar', meta: 550000, venta: 542000 },
  { month: 'Abr', meta: 580000, venta: 595000 },
  { month: 'May', meta: 600000, venta: 588000 },
  { month: 'Jun', meta: 620000, venta: 635000 },
]

export default function VentasVsMetaCharts() {
  const [selectedProject, setSelectedProject] = useState(projectOptions[0].id)
  const [comparisonType, setComparisonType] = useState(
    comparisonTypeOptions[0].id
  )

  const currentData = useMemo(() => {
    switch (comparisonType) {
      case 'partida':
        return getPartidasData()
      case 'especialidad':
        return getEspecialidadesData()
      case 'fase':
        return getFasesData()
      case 'mensual':
        return getMensualData()
      default:
        return getPartidasData()
    }
  }, [comparisonType])

  const dataWithVariance = useMemo(() => {
    return currentData.map((item) => {
      const label = 'month' in item ? item.month : item.name
      return {
        ...item,
        label,
        variance: ((item.venta - item.meta) / item.meta) * 100,
        difference: item.venta - item.meta,
      }
    })
  }, [currentData])

  // Pareto analysis of variance (absolute values)
  const variancePareto = useMemo(() => {
    const varianceData = dataWithVariance.map(item => ({
      name: item.label,
      value: Math.abs(item.variance)
    }))
    return calculateParetoData(varianceData, 'value', 'name')
  }, [dataWithVariance])

  const totalMeta = currentData.reduce((sum, item) => sum + item.meta, 0)
  const totalVenta = currentData.reduce((sum, item) => sum + item.venta, 0)
  const totalVariance = ((totalVenta - totalMeta) / totalMeta) * 100
  const totalDifference = totalVenta - totalMeta

  const selectedProjectName =
    projectOptions.find((p) => p.id === selectedProject)?.name || ''
  const selectedComparisonName =
    comparisonTypeOptions.find((c) => c.id === comparisonType)?.name || ''

  return (
    <div className='space-y-6 pt-6'>
      {/* Filters Section */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base mb-4'>
            Configuración del Reporte
          </h2>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>1. Seleccionar Proyecto</label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Seleccionar proyecto' />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>2. Tipo de Comparación</label>
              <Select value={comparisonType} onValueChange={setComparisonType}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Seleccionar tipo' />
                </SelectTrigger>
                <SelectContent>
                  {comparisonTypeOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='mt-4 p-4 bg-base-200 rounded-lg'>
            <p className='text-sm'>
              <span className='font-semibold'>Reporte activo:</span>{' '}
              {selectedProjectName} - {selectedComparisonName}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Presupuesto Meta</div>
            <div className='stat-value text-primary text-xl'>
              ${(totalMeta / 1000).toFixed(0)}K
            </div>
            <div className='stat-desc'>Total planeado</div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Presupuesto Venta</div>
            <div className='stat-value text-secondary text-xl'>
              ${(totalVenta / 1000).toFixed(0)}K
            </div>
            <div className='stat-desc'>Total ejecutado</div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Diferencia</div>
            <div
              className={`stat-value text-xl ${
                totalDifference >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              {totalDifference >= 0 ? '+' : ''}${(totalDifference / 1000).toFixed(0)}K
            </div>
            <div className='stat-desc'>
              {totalDifference >= 0 ? 'Superávit' : 'Déficit'}
            </div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Variación</div>
            <div
              className={`stat-value text-xl ${
                totalVariance >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              {totalVariance >= 0 ? '+' : ''}
              {totalVariance.toFixed(1)}%
            </div>
            <div className='stat-desc'>Respecto a la meta</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className='grid gap-6 lg:grid-cols-2'>
        {/* Meta vs Venta Comparison */}
        <div className='card bg-base-100 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-base'>Meta vs Venta</h2>
            <ResponsiveContainer width='100%' height={400}>
              {comparisonType === 'mensual' ? (
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                  <XAxis dataKey={comparisonType === 'mensual' ? 'month' : 'name'} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line
                    type='monotone'
                    dataKey='meta'
                    stroke='#5B7EC5'
                    strokeWidth={3}
                    name='Meta'
                    dot={{ fill: '#5B7EC5', r: 5 }}
                  />
                  <Line
                    type='monotone'
                    dataKey='venta'
                    stroke='#10B981'
                    strokeWidth={3}
                    name='Venta'
                    dot={{ fill: '#10B981', r: 5 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                  <XAxis
                    dataKey='name'
                    tick={{ fontSize: 10 }}
                    angle={-15}
                    textAnchor='end'
                    height={80}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey='meta' fill='#5B7EC5' name='Meta' radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey='venta'
                    fill='#10B981'
                    name='Venta'
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Variance Analysis */}
        <div className='card bg-base-100 shadow-sm'>
          <div className='card-body'>
            <h2 className='card-title text-base'>Análisis de Variación (%)</h2>
            <ResponsiveContainer width='100%' height={400}>
              <ComposedChart data={dataWithVariance}>
                <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                <XAxis
                  dataKey={comparisonType === 'mensual' ? 'month' : 'name'}
                  tick={{ fontSize: 10 }}
                  angle={-15}
                  textAnchor='end'
                  height={80}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any, name: string) => {
                    if (name === 'Variación %') return `${value.toFixed(2)}%`
                    return `$${value.toLocaleString()}`
                  }}
                />
                <Legend />
                <Bar dataKey='variance' name='Variación %' radius={[4, 4, 0, 0]}>
                  {dataWithVariance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.variance >= 0 ? '#10B981' : '#EF4444'}
                    />
                  ))}
                </Bar>
                <Line
                  type='monotone'
                  dataKey='difference'
                  stroke='#F59E0B'
                  strokeWidth={2}
                  name='Diferencia $'
                  dot={{ fill: '#F59E0B', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pareto Analysis of Variance */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base'>Análisis Pareto de Variaciones</h2>
          <p className='text-sm text-gray-600 mb-4'>
            Identifica qué elementos contribuyen más a las variaciones del presupuesto (80/20 rule)
          </p>
          <ResponsiveContainer width='100%' height={400}>
            <ComposedChart data={variancePareto}>
              <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 10 }}
                angle={-15}
                textAnchor='end'
                height={80}
              />
              <YAxis yAxisId='left' tick={{ fontSize: 11 }} />
              <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                formatter={(value: any, name: string) => {
                  if (name === 'Variación Absoluta') return `${value.toFixed(2)}%`
                  if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                  return value
                }}
              />
              <Legend />
              <Bar yAxisId='left' dataKey='value' name='Variación Absoluta' radius={[4, 4, 0, 0]}>
                {variancePareto.map((entry, index) => (
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

      {/* Detailed Table */}
      <div className='card bg-base-100 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title text-base mb-4'>Detalle Comparativo</h2>
          <div className='overflow-x-auto'>
            <table className='table table-sm'>
              <thead>
                <tr>
                  <th>{selectedComparisonName.replace('Por ', '')}</th>
                  <th className='text-right'>Meta</th>
                  <th className='text-right'>Venta</th>
                  <th className='text-right'>Diferencia</th>
                  <th className='text-right'>Variación %</th>
                  <th className='text-center'>Estado</th>
                </tr>
              </thead>
              <tbody>
                {dataWithVariance.map((item, index) => (
                  <tr key={index}>
                    <td className='font-medium'>
                      {item.label}
                    </td>
                    <td className='text-right'>${item.meta.toLocaleString()}</td>
                    <td className='text-right'>${item.venta.toLocaleString()}</td>
                    <td className='text-right'>
                      <span
                        className={
                          item.difference >= 0 ? 'text-success' : 'text-error'
                        }
                      >
                        {item.difference >= 0 ? '+' : ''}$
                        {item.difference.toLocaleString()}
                      </span>
                    </td>
                    <td className='text-right'>
                      <span
                        className={
                          item.variance >= 0 ? 'text-success' : 'text-error'
                        }
                      >
                        {item.variance >= 0 ? '+' : ''}
                        {item.variance.toFixed(2)}%
                      </span>
                    </td>
                    <td className='text-center'>
                      <span
                        className={`badge badge-sm ${
                          item.variance >= 5
                            ? 'badge-success'
                            : item.variance >= -5
                              ? 'badge-warning'
                              : 'badge-error'
                        }`}
                      >
                        {item.variance >= 5
                          ? 'Excelente'
                          : item.variance >= -5
                            ? 'Normal'
                            : 'Atención'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='font-bold'>
                  <td>Total</td>
                  <td className='text-right'>${totalMeta.toLocaleString()}</td>
                  <td className='text-right'>${totalVenta.toLocaleString()}</td>
                  <td className='text-right'>
                    <span
                      className={
                        totalDifference >= 0 ? 'text-success' : 'text-error'
                      }
                    >
                      {totalDifference >= 0 ? '+' : ''}$
                      {totalDifference.toLocaleString()}
                    </span>
                  </td>
                  <td className='text-right'>
                    <span
                      className={
                        totalVariance >= 0 ? 'text-success' : 'text-error'
                      }
                    >
                      {totalVariance >= 0 ? '+' : ''}
                      {totalVariance.toFixed(2)}%
                    </span>
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
