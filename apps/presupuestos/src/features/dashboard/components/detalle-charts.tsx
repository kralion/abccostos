import { useState } from 'react'
import { formatNumber } from '@/lib/pareto-utils'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

// Mock data for resources table
const resourcesData = [
  { codigo: '0399410', recurso: 'Zapatos De Seguridad Personal', uni: 'PAR', precio: 49.90, parcial: 8982.00, cantidad: 180.00, categoria: 'Equipos' },
  { codigo: '0210311', recurso: 'Yeso 10 Kg', uni: 'BLS', precio: 17.90, parcial: 15.22, cantidad: 0.85, categoria: 'Material' },
  { codigo: '0727519', recurso: 'Yee Pvc Sal De 4" x 4"', uni: 'UND', precio: 15.68, parcial: 141.12, cantidad: 9.00, categoria: 'Material' },
  { codigo: '0304150', recurso: 'Vidrio Sistema Moduglass, Cristal Laminado 6mm', uni: 'M2', precio: 652.00, parcial: 112417.84, cantidad: 172.42, categoria: 'Material' },
  { codigo: '0490702', recurso: 'Vibrador De Concreto 4 HP 2.40"', uni: 'HM', precio: 8.75, parcial: 4009.43, cantidad: 458.22, categoria: 'Equipos' },
  { codigo: '0390081', recurso: 'Viaticos - Almuerzo - Pasajes Internos', uni: 'MES', precio: 12500.00, parcial: 87500.00, cantidad: 7.00, categoria: 'Subcontratas-Varios' },
  { codigo: '0123456', recurso: 'Arena Gruesa', uni: 'M3', precio: 45.00, parcial: 13500.00, cantidad: 300.00, categoria: 'Material' },
  { codigo: '0123457', recurso: 'Cemento', uni: 'BLS', precio: 8.50, parcial: 8500.00, cantidad: 1000.00, categoria: 'Material' },
  { codigo: '0123458', recurso: 'Piedra', uni: 'M3', precio: 35.00, parcial: 7000.00, cantidad: 200.00, categoria: 'Material' },
  { codigo: '0123459', recurso: 'Chapa', uni: 'M2', precio: 25.00, parcial: 5000.00, cantidad: 200.00, categoria: 'Material' },
  { codigo: '0123460', recurso: 'Madera', uni: 'M3', precio: 120.00, parcial: 3600.00, cantidad: 30.00, categoria: 'Material' },
  { codigo: '0123461', recurso: 'Papel', uni: 'UND', precio: 2.50, parcial: 250.00, cantidad: 100.00, categoria: 'Material' },
  { codigo: '0123462', recurso: 'Ceramica', uni: 'M2', precio: 15.00, parcial: 1500.00, cantidad: 100.00, categoria: 'Material' },
  { codigo: '0123463', recurso: 'Ladrillo', uni: 'UND', precio: 0.50, parcial: 500.00, cantidad: 1000.00, categoria: 'Material' },
  { codigo: '0123464', recurso: 'Obrero General', uni: 'HM', precio: 12.00, parcial: 24000.00, cantidad: 2000.00, categoria: 'Mano De Ora' },
  { codigo: '0123465', recurso: 'Albañil', uni: 'HM', precio: 15.00, parcial: 15000.00, cantidad: 1000.00, categoria: 'Mano De Ora' },
  { codigo: '0123466', recurso: 'Carpintero', uni: 'HM', precio: 18.00, parcial: 9000.00, cantidad: 500.00, categoria: 'Mano De Ora' },
  { codigo: '0123467', recurso: 'Electricista', uni: 'HM', precio: 20.00, parcial: 4000.00, cantidad: 200.00, categoria: 'Mano De Ora' },
  { codigo: '0123468', recurso: 'Subcontrata Instalaciones', uni: 'UND', precio: 5000.00, parcial: 10000.00, cantidad: 2.00, categoria: 'Subcontratas-Varios' },
]

// Calculate category totals
const calculateCategoryTotals = () => {
  const categories = ['Mano De Ora', 'Material', 'Equipos', 'Subcontratas-Varios']
  return categories.map(categoria => {
    const items = resourcesData.filter(item => item.categoria === categoria)
    const total = items.reduce((sum, item) => sum + item.parcial, 0)
    return { categoria, total }
  })
}

// Pareto data for horizontal chart - scaled values for visibility
const paretoData = [
  { recurso: 'Arena Gruesa', valor: 135 },
  { recurso: 'Cemento', valor: 85 },
  { recurso: 'Piedra', valor: 70 },
  { recurso: 'Chapa', valor: 50 },
  { recurso: 'Madera', valor: 36 },
  { recurso: 'Ceramica', valor: 15 },
  { recurso: 'Ladrillo', valor: 5 },
  { recurso: 'Papel', valor: 2.5 },
]

const tabs = [
  { id: 'sub-presupuestos', label: 'Sub-presupuestos' },
  { id: 'especialidad', label: 'Especialidad' },
  { id: 'fases', label: 'Fases' },
  { id: 'trenes', label: 'Trenes' },
  { id: 'unidades-produccion', label: 'Unidades de Producción' },
]

export default function DetalleCharts() {
  const [activeTab, setActiveTab] = useState('sub-presupuestos')
  const categoryTotals = calculateCategoryTotals()
  const grandTotal = categoryTotals.reduce((sum, cat) => sum + cat.total, 0)
  
  // Sort resources data by parcial descending for proper Pareto analysis
  const sortedResourcesData = [...resourcesData].sort((a, b) => b.parcial - a.parcial)
  
  // Calculate percentages for each category
  const categoryData = categoryTotals.map(cat => ({
    ...cat,
    percentage: ((cat.total / grandTotal) * 100).toFixed(1)
  }))

  // Calculate table totals
  const tableTotals = {
    precio: sortedResourcesData.reduce((sum, item) => sum + item.precio, 0),
    parcial: sortedResourcesData.reduce((sum, item) => sum + item.parcial, 0),
    cantidad: sortedResourcesData.reduce((sum, item) => sum + item.cantidad, 0)
  }

  const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#EF4444']

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-base-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${
              activeTab === tab.id 
                ? 'btn-primary' 
                : 'btn-ghost'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Summary Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {categoryData.map((category, index) => (
              <div key={category.categoria} className="card bg-base-100 shadow-sm border-l-4" 
                   style={{ borderLeftColor: COLORS[index] }}>
                <div className="card-body p-4">
                  <h3 className="font-semibold text-sm">{category.categoria}</h3>
                  <div className="text-2xl font-bold text-primary">{category.percentage}%</div>
                  <div className="text-lg font-medium">{formatNumber(category.total)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base">Distribución por Categoría</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="total"
                  nameKey="categoria"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
              <Legend />
              </PieChart>
          </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pareto Bar Chart */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-base">Análisis Pareto - Recursos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={paretoData} 
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="recurso" 
                  tick={{ fontSize: 10 }}
                  width={100}
                />
                <Tooltip 
                  formatter={(value: any) => [formatNumber(Number(value)), 'Valor']}
                />
                <Bar 
                  dataKey="valor" 
                  fill="#8B5CF6" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Amount Card */}
        <div className="card bg-primary text-primary-content shadow-sm">
          <div className="card-body text-center">
            <h3 className="card-title justify-center">Monto Total</h3>
            <div className="text-3xl font-bold">{formatNumber(grandTotal)}</div>
          </div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-0">
          <div className="overflow-x-auto max-h-96">
            <table className="table table-sm table-zebra">
              <thead className="sticky top-0 bg-base-200 z-10">
                <tr>
                  <th className="font-bold">CÓDIGO</th>
                  <th className="font-bold">RECURSO</th>
                  <th className="font-bold text-center">UNI</th>
                  <th className="font-bold text-right">PRECIO</th>
                  <th className="font-bold text-right">PARCIAL</th>
                  <th className="font-bold text-right">CANTIDAD</th>
                </tr>
              </thead>
              <tbody>
                {sortedResourcesData.map((item, index) => (
                  <tr key={index} className="hover">
                    <td className="font-mono text-xs">{item.codigo}</td>
                    <td>{item.recurso}</td>
                    <td className="text-center text-xs">{item.uni}</td>
                    <td className="text-right tabular-nums">{item.precio.toFixed(2)}</td>
                    <td className="text-right tabular-nums">{item.parcial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="text-right tabular-nums">{item.cantidad.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 bg-base-300">
                <tr className="font-bold">
                  <td colSpan={3} className="text-right">Total</td>
                  <td className="text-right tabular-nums">{tableTotals.precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="text-right tabular-nums">{tableTotals.parcial.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="text-right tabular-nums">{tableTotals.cantidad.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

