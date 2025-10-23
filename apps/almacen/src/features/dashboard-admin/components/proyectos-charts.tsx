import { calculateParetoData, formatCurrency, getParetoColors } from '@/lib/pareto-utils'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const project1Data = {
  name: 'Edificio Central',
  progress: 85,
  budget: 950000,
  spent: 807500,
  subPresupuestos: [
    { name: 'Estructura', value: 320000, color: '#5B7EC5' },
    { name: 'Arquitectura', value: 180000, color: '#60D5DC' },
    { name: 'Instalaciones', value: 150000, color: '#10B981' },
    { name: 'Acabados', value: 157500, color: '#F59E0B' },
  ],
  monthlyProgress: [
    { month: 'Ene', avance: 15 },
    { month: 'Feb', avance: 28 },
    { month: 'Mar', avance: 42 },
    { month: 'Abr', avance: 58 },
    { month: 'May', avance: 72 },
    { month: 'Jun', avance: 85 },
  ],
}

const project2Data = {
  name: 'Torre Norte',
  progress: 65,
  budget: 1200000,
  spent: 780000,
  subPresupuestos: [
    { name: 'Estructura', value: 420000, color: '#5B7EC5' },
    { name: 'Arquitectura', value: 180000, color: '#60D5DC' },
    { name: 'Instalaciones', value: 100000, color: '#10B981' },
    { name: 'Acabados', value: 80000, color: '#F59E0B' },
  ],
  monthlyProgress: [
    { month: 'Ene', avance: 10 },
    { month: 'Feb', avance: 20 },
    { month: 'Mar', avance: 32 },
    { month: 'Abr', avance: 45 },
    { month: 'May', avance: 55 },
    { month: 'Jun', avance: 65 },
  ],
}

const globalStats = {
  activeProjects: 28,
  newThisMonth: 4,
  totalBudget: 6800000,
  budgetIncrease: 12,
  averageProgress: 65,
  progressIncrease: 8,
  completedProjects: 8,
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize={12}
      fontWeight='bold'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function ProjectCard({ projectData }: { projectData: typeof project1Data }) {
  const usagePercent = (projectData.spent / projectData.budget) * 100
  const paretoData = calculateParetoData(projectData.subPresupuestos, 'value', 'name')

  return (
    <div className='card bg-base-100 shadow-sm'>
      <div className='card-body'>
        <div className='flex items-start justify-between mb-4'>
          <div>
            <h2 className='card-title text-xl mb-2'>{projectData.name}</h2>
            <div className='flex gap-6 text-sm'>
              <div>
                <p className='text-gray-500'>Presupuesto</p>
                <p className='font-semibold text-lg'>
                  ${projectData.budget.toLocaleString()}
                </p>
              </div>
              <div>
                <p className='text-gray-500'>Ejecutado</p>
                <p className='font-semibold text-lg'>
                  ${projectData.spent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className='text-gray-500'>Progreso</p>
                <p className='font-semibold text-lg text-primary'>
                  {projectData.progress}%
                </p>
              </div>
            </div>
          </div>
          <div className='text-right'>
            <div
              className={`badge ${
                usagePercent > 90
                  ? 'badge-error'
                  : usagePercent > 75
                    ? 'badge-warning'
                    : 'badge-success'
              } badge-lg`}
            >
              {usagePercent.toFixed(1)}% usado
            </div>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {/* Distribution Pie Chart */}
          <div>
            <h3 className='font-semibold mb-3 text-sm'>
              Distribución del Presupuesto
            </h3>
            <ResponsiveContainer width='100%' height={250}>
              <PieChart>
                <Pie
                  data={projectData.subPresupuestos}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  innerRadius={40}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {projectData.subPresupuestos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className='mt-2 space-y-1'>
              {projectData.subPresupuestos.map((item, index) => (
                <div key={index} className='flex items-center gap-2 text-xs'>
                  <div
                    className='w-3 h-3 rounded'
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                  <span className='ml-auto font-medium'>
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Chart - Pareto */}
          <div>
            <h3 className='font-semibold mb-3 text-sm'>
              Análisis Pareto
            </h3>
            <ResponsiveContainer width='100%' height={250}>
              <ComposedChart data={paretoData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                <XAxis 
                  dataKey='name' 
                  tick={{ fontSize: 9 }}
                  angle={-15}
                  textAnchor='end'
                  height={50}
                />
                <YAxis yAxisId='left' tick={{ fontSize: 10 }} />
                <YAxis yAxisId='right' orientation='right' tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  formatter={(value: any, name: string) => {
                    if (name === 'Valor') return formatCurrency(value)
                    if (name === 'Cumulative %') return `${value.toFixed(1)}%`
                    return value
                  }}
                />
                <Legend />
                <Bar yAxisId='left' dataKey='value' name='Valor' radius={[2, 2, 0, 0]}>
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
                  dot={{ fill: '#EF4444', r: 3 }}
                />
                <ReferenceLine yAxisId='right' y={80} stroke='#10B981' strokeDasharray='3 3' />
              </ComposedChart>
            </ResponsiveContainer>
            <div className='mt-2 space-y-1'>
              {paretoData.map((item, index) => (
                <div key={index} className='flex items-center gap-2 text-xs'>
                  <div
                    className='w-3 h-3 rounded'
                    style={{ backgroundColor: getParetoColors(item.isVitalFew) }}
                  />
                  <span>{item.name}</span>
                  <span className='ml-auto font-medium'>
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Progress */}
          <div>
            <h3 className='font-semibold mb-3 text-sm'>Avance Mensual</h3>
            <ResponsiveContainer width='100%' height={250}>
              <AreaChart data={projectData.monthlyProgress}>
                <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                <XAxis dataKey='month' tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Area
                  type='monotone'
                  dataKey='avance'
                  stroke='#5B7EC5'
                  fill='#5B7EC5'
                  name='Avance %'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Budget Comparison */}
          <div>
            <h3 className='font-semibold mb-3 text-sm'>
              Presupuesto vs Ejecutado
            </h3>
            <ResponsiveContainer width='100%' height={250}>
              <BarChart
                data={[
                  {
                    name: 'Presupuesto',
                    Planeado: projectData.budget,
                    Ejecutado: projectData.spent,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
                <XAxis dataKey='name' tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey='Planeado' fill='#5B7EC5' radius={[4, 4, 0, 0]} />
                <Bar dataKey='Ejecutado' fill='#10B981' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className='mt-2 space-y-1 text-xs'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Restante:</span>
                <span className='font-semibold'>
                  ${(projectData.budget - projectData.spent).toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>Eficiencia:</span>
                <span
                  className={`font-semibold ${
                    usagePercent > 100 ? 'text-error' : 'text-success'
                  }`}
                >
                  {usagePercent > 100 ? 'Sobrepresupuesto' : 'Dentro del plan'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProyectosCharts() {
  return (
    <div className='space-y-6 pt-6'>
      {/* Global Stats */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Proyectos Activos</div>
            <div className='stat-value text-primary'>
              {globalStats.activeProjects}
            </div>
            <div className='stat-desc'>
              ↗︎ {globalStats.newThisMonth} nuevos este mes
            </div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Presupuesto Total</div>
            <div className='stat-value text-secondary'>
              ${(globalStats.totalBudget / 1000000).toFixed(1)}M
            </div>
            <div className='stat-desc'>
              ↗︎ {globalStats.budgetIncrease}% vs mes anterior
            </div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Promedio Progreso</div>
            <div className='stat-value text-accent'>
              {globalStats.averageProgress}%
            </div>
            <div className='stat-desc'>
              ↗︎ {globalStats.progressIncrease}% este mes
            </div>
          </div>
        </div>
        <div className='stats shadow-sm'>
          <div className='stat'>
            <div className='stat-title'>Proyectos Completados</div>
            <div className='stat-value'>{globalStats.completedProjects}</div>
            <div className='stat-desc'>En lo que va del año</div>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className='space-y-6'>
        <ProjectCard projectData={project1Data} />
        <ProjectCard projectData={project2Data} />
      </div>
    </div>
  )
}
