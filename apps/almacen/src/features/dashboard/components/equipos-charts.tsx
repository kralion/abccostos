import { useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui/components/tabs'
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
import { Fuel, Computer, Calculator } from 'lucide-react'
import { CustomEmpty } from '@/components/custom-empty'

interface SecondaryTab {
  label: string
  value: string
  icon: React.ReactNode
}

const secondaryTabs: SecondaryTab[] = [
  {
    label: 'Combustible',
    value: 'combustible',
    icon: (
      <Fuel
        size={16}
        className='me-1.5 opacity-60 md:-ms-0.5'
        aria-hidden='true'
      />
    ),
  },
  {
    label: 'Equipos',
    value: 'equipos',
    icon: (
      <Computer
        size={16}
        className='me-1.5 opacity-60 md:-ms-0.5'
        aria-hidden='true'
      />
    ),
  },
  {
    label: 'Valorizaciones',
    value: 'valorizaciones',
    icon: (
      <Calculator
        size={16}
        className='me-1.5 opacity-60 md:-ms-0.5'
        aria-hidden='true'
      />
    ),
  },
]

const equiposData = [
  { name: 'Computadoras', cantidad: 25, mantenimiento: 3 },
  { name: 'Impresoras', cantidad: 12, mantenimiento: 2 },
  { name: 'Servidores', cantidad: 8, mantenimiento: 1 },
  { name: 'Redes', cantidad: 15, mantenimiento: 4 },
]

const estadoEquiposData = [
  { name: 'Operativo', value: 80, color: '#4A5568' },
  { name: 'Mantenimiento', value: 15, color: '#60D5DC' },
  { name: 'Fuera de Servicio', value: 5, color: '#E53E3E' },
]

const rendimientoData = [
  { name: 'Enero', uptime: 98, rendimiento: 92 },
  { name: 'Febrero', uptime: 95, rendimiento: 88 },
  { name: 'Marzo', uptime: 99, rendimiento: 95 },
  { name: 'Abril', uptime: 97, rendimiento: 90 },
  { name: 'Mayo', uptime: 96, rendimiento: 89 },
]

const combustibleData = [
  { name: 'Gasolina', consumo: 120, costo: 450 },
  { name: 'Diesel', consumo: 200, costo: 800 },
  { name: 'Gas', consumo: 80, costo: 320 },
]

const valorizacionesData = [
  { name: 'Enero', valor: 15000, depreciacion: 5 },
  { name: 'Febrero', valor: 14800, depreciacion: 5.2 },
  { name: 'Marzo', valor: 14600, depreciacion: 5.5 },
  { name: 'Abril', valor: 14400, depreciacion: 5.8 },
  { name: 'Mayo', valor: 14200, depreciacion: 6.0 },
]

const getEmptyContent = (secondaryTab: string) => {
  switch (secondaryTab) {
    case 'combustible':
      return {
        title: 'Sin Datos de Combustible',
        description: 'Aquí se mostrarán los datos de combustible',
        icon: <Fuel />,
      }
    case 'equipos':
      return {
        title: 'Sin Datos de Equipos',
        description: 'Aquí se mostrarán los datos de equipos',
        icon: <Computer />,
      }
    case 'valorizaciones':
      return {
        title: 'Sin Datos de Valorizaciones',
        description: 'Aquí se mostrarán los datos de valorizaciones',
        icon: <Calculator />,
      }
    default:
      return {
        title: 'Sin Contenido',
        description: 'Aquí se mostrarán los contenidos',
        icon: <Computer />,
      }
  }
}

export default function EquiposCharts() {
  const [activeSecondaryTab, setActiveSecondaryTab] = useState(secondaryTabs[0].value)

  const renderTabContent = (tabValue: string) => {
    switch (tabValue) {
      case 'combustible':
        return (
          <div className='space-y-6'>
            <div className='rounded-lg border bg-card p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Consumo de Combustible</h3>
              <ResponsiveContainer width='100%' height={300}>
                <ComposedChart data={combustibleData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis yAxisId='left' />
                  <YAxis yAxisId='right' orientation='right' />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId='left' dataKey='consumo' fill='#8884d8' />
                  <Line yAxisId='right' type='monotone' dataKey='costo' stroke='#82ca9d' />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      case 'equipos':
        return (
          <div className='space-y-6'>
            <div className='rounded-lg border bg-card p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Inventario de Equipos</h3>
              <ResponsiveContainer width='100%' height={300}>
                <ComposedChart data={equiposData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis yAxisId='left' />
                  <YAxis yAxisId='right' orientation='right' />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId='left' dataKey='cantidad' fill='#8884d8' />
                  <Line yAxisId='right' type='monotone' dataKey='mantenimiento' stroke='#82ca9d' />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className='grid gap-6 md:grid-cols-2'>
              <div className='rounded-lg border bg-card p-6'>
                <h3 className='mb-4 text-lg font-semibold'>Estado de Equipos</h3>
                <ResponsiveContainer width='100%' height={250}>
                  <PieChart>
                    <Pie
                      data={estadoEquiposData}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={100}
                      dataKey='value'
                    >
                      {estadoEquiposData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className='rounded-lg border bg-card p-6'>
                <h3 className='mb-4 text-lg font-semibold'>Rendimiento Mensual</h3>
                <ResponsiveContainer width='100%' height={250}>
                  <ComposedChart data={rendimientoData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis yAxisId='left' />
                    <YAxis yAxisId='right' orientation='right' />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId='left' dataKey='uptime' fill='#8884d8' />
                    <Line yAxisId='right' type='monotone' dataKey='rendimiento' stroke='#82ca9d' />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )
      
      case 'valorizaciones':
        return (
          <div className='space-y-6'>
            <div className='rounded-lg border bg-card p-6'>
              <h3 className='mb-4 text-lg font-semibold'>Valorizaciones de Equipos</h3>
              <ResponsiveContainer width='100%' height={300}>
                <ComposedChart data={valorizacionesData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis yAxisId='left' />
                  <YAxis yAxisId='right' orientation='right' />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId='left' dataKey='valor' fill='#8884d8' />
                  <Line yAxisId='right' type='monotone' dataKey='depreciacion' stroke='#82ca9d' />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      
      default:
        return <CustomEmpty {...getEmptyContent(tabValue)} />
    }
  }

  return (
    <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab}>
      <TabsList className='text-foreground h-auto w-full rounded-none border-b bg-transparent px-0 md:w-fit'>
        {secondaryTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='group hover:bg-accent text-muted-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:shadow-none'
          >
            {tab.icon}
            <span className='hidden group-data-[state=active]:inline md:inline'>
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
      {secondaryTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='mt-4'>
          {renderTabContent(tab.value)}
        </TabsContent>
      ))}
    </Tabs>
  )
}
