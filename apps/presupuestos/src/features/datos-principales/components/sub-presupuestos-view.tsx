import { SubPresupuestosTable } from './sub-presupuestos-table'
import { SubPresupuestoCard } from './sub-presupuesto-card'
import { SubPresupuesto } from '../types'

interface SubPresupuestosViewProps {
  data: SubPresupuesto[]
  selectedRows: Set<string>
  onSelectAll: (checked: boolean) => void
  onSelectRow: (id: string, checked: boolean) => void
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function SubPresupuestosView({
  data,
  selectedRows,
  onSelectAll,
  onSelectRow,
  globalFilter,
  onGlobalFilterChange,
}: SubPresupuestosViewProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className='hidden md:block'>
        <SubPresupuestosTable
          data={data}
          selectedRows={selectedRows}
          onSelectAll={onSelectAll}
          onSelectRow={onSelectRow}
          globalFilter={globalFilter}
          onGlobalFilterChange={onGlobalFilterChange}
        />
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {data.map((item) => (
          <SubPresupuestoCard
            key={item.id}
            item={item}
            isSelected={selectedRows.has(item.id)}
            onSelect={onSelectRow}
          />
        ))}
      </div>
    </>
  )
}
