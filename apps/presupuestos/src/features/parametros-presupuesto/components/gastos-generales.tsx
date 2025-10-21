import { GastosGeneralesTable } from './gastos-generales-table'
import { gastosGeneralesColumns } from './gastos-generales-columns'
import { mockGastosGenerales } from '../data/mock-data'

export function GastosGenerales() {
  return (
    <div className='space-y-4'>
      <GastosGeneralesTable 
        data={mockGastosGenerales} 
        columns={gastosGeneralesColumns} 
      />
    </div>
  )
}

