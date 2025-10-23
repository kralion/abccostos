import { useState } from 'react'
import { Search, FileDown, Download, Upload, Plus } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { RecursoCard } from './recurso-card'

interface Recurso {
  codigo: string
  nombre: string
}

const mockData: Recurso[] = [
  { codigo: '00001', nombre: 'OBRAS PROVISONALES' },
  { codigo: '00002', nombre: 'OBRAS PRELIMINARES' },
  { codigo: '00003', nombre: 'COLUMNAS' },
  { codigo: '00004', nombre: 'CONCRETO SIMPLES' },
  { codigo: '00005', nombre: 'CONCRETO ARMADO' },
]

export default function RecursosCards() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = mockData.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.codigo.includes(searchTerm)
  )

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar recursos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          <Button variant="outline" size="sm">
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Recurso
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
          {filteredData.map((recurso) => (
            <RecursoCard key={recurso.codigo} recurso={recurso} />
          ))}
        </div>
      )}
    </div>
  )
}
