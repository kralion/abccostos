import { useState } from 'react'
import { Search, Save, FileDown, Download, Upload, Plus } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { PartidaCard } from './partida-card'
import { type Partida } from '../data/schema'

type PartidasCardsProps = {
  data: Partida[]
}

export function PartidasCards({ data }: PartidasCardsProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.codigo.includes(searchTerm) ||
    (item.especialidad && item.especialidad.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar partida"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Partida
          </Button>
        </div>
      </div>

      {/* Cards */}
      {filteredData.length === 0 ? (
        <div className='text-muted-foreground py-10 text-center text-sm'>
          No hay resultados.
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3'>
          {filteredData.map((partida) => (
            <PartidaCard key={partida.id} partida={partida} />
          ))}
        </div>
      )}
    </div>
  )
}
