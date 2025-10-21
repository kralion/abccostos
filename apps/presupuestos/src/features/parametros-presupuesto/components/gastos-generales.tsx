import { useIsMobile } from '@/hooks/use-mobile'
import { GastosGeneralesTable } from './gastos-generales-table'
import { GastosGeneralesCards } from './gastos-generales-cards'
import { gastosGeneralesColumns } from './gastos-generales-columns'
import { mockGastosGenerales } from '../data/mock-data'

export function GastosGenerales() {
  const isMobile = useIsMobile()

  return (
    <div className='space-y-4'>
      {isMobile ? (
        <GastosGeneralesCards data={mockGastosGenerales} />
      ) : (
        <GastosGeneralesTable 
          data={mockGastosGenerales} 
          columns={gastosGeneralesColumns} 
        />
      )}
    </div>
  )
}

