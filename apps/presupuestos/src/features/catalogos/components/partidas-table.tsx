import { useState } from 'react'
import { Search, Save, FileDown, Download, Upload, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import PartidasDetails from './partidas-details'

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

export default function PartidasTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedPartida, setSelectedPartida] = useState<Partida | null>(null)

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {itemsPerPage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setItemsPerPage(10)}>10</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setItemsPerPage(25)}>25</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setItemsPerPage(50)}>50</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-32">Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-20">Und</TableHead>
              <TableHead className="w-40">Ultima Modificación</TableHead>
              <TableHead className="w-32">Fecha Modificación</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow 
                key={item.codigo}
                onClick={() => setSelectedPartida(item)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell>{item.descripcion}</TableCell>
                <TableCell className="text-center">{item.unidad}</TableCell>
                <TableCell>{item.ultimaModificacion}</TableCell>
                <TableCell>{item.fechaModificacion}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Eliminar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Details Table */}
      {selectedPartida && (
        <PartidasDetails partida={selectedPartida} />
      )}
    </div>
  )
}
