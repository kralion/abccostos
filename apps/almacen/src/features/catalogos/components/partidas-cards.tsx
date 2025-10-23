import { useState } from 'react'
import { Search, Save, FileDown, Download, Upload, Plus } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { PartidaCard } from './partida-card'

interface Partida {
  codigo: string
  descripcion: string
  unidad: string
  ultimaModificacion: string
  fechaModificacion: string
}

const mockData: Partida[] = [
  { 
    codigo: '000001', 
    descripcion: 'Cartel De Identificación De La Obra 3.60x2.40m', 
    unidad: 'und', 
    ultimaModificacion: 'Alejandro Bravo', 
    fechaModificacion: '25/06/2025' 
  },
  { 
    codigo: '000002', 
    descripcion: 'Sobrecimientos Reforzados - Concreto F\'c=210 Kg/cm2', 
    unidad: 'm3', 
    ultimaModificacion: 'Victor Ramirez', 
    fechaModificacion: '25/06/2025' 
  },
  { 
    codigo: '000003', 
    descripcion: 'Limpieza De Terreno Manual', 
    unidad: 'm2', 
    ultimaModificacion: 'Carlos Mendoza', 
    fechaModificacion: '24/06/2025' 
  },
  { 
    codigo: '000004', 
    descripcion: 'Excavación Manual En Tierra', 
    unidad: 'm3', 
    ultimaModificacion: 'Maria Lopez', 
    fechaModificacion: '23/06/2025' 
  },
  { 
    codigo: '000005', 
    descripcion: 'Relleno Compactado Con Agua', 
    unidad: 'm3', 
    ultimaModificacion: 'Jose Garcia', 
    fechaModificacion: '22/06/2025' 
  },
]

export default function PartidasCards() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = mockData.filter(item =>
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            Nuevo Partida
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
            <PartidaCard key={partida.codigo} partida={partida} />
          ))}
        </div>
      )}
    </div>
  )
}
