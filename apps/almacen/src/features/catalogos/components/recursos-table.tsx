import { useState } from 'react'
import { Search, FileDown, Download, Upload, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'
import { Badge } from '@workspace/ui/components/badge'

interface Recurso {
  codigo: string
  nombre: string
  unidad: string
  categoria: 'Material' | 'Equipo' | 'Mano de Obra' | 'Subcontrata'
  precio: number | null
}

const mockData: Recurso[] = [
  { 
    codigo: '001-00001', 
    nombre: 'Arena Gruesa', 
    unidad: 'm2', 
    categoria: 'Material', 
    precio: 25.00 
  },
  { 
    codigo: '002-00002', 
    nombre: 'Trompo', 
    unidad: 'h-m', 
    categoria: 'Equipo', 
    precio: 15.00 
  },
  { 
    codigo: '001-00003', 
    nombre: 'Operario', 
    unidad: 'h-h', 
    categoria: 'Mano de Obra', 
    precio: 22.00 
  },
  { 
    codigo: '001-00004', 
    nombre: 'Herramientas Manuales', 
    unidad: '%mo', 
    categoria: 'Equipo', 
    precio: null 
  },
  { 
    codigo: '003-00005', 
    nombre: 'Suministro de Postes', 
    unidad: 'und', 
    categoria: 'Subcontrata', 
    precio: 50.00 
  },
]

const getCategoriaColor = (categoria: string) => {
  switch (categoria) {
    case 'Material':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'Equipo':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'Mano de Obra':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'Subcontrata':
      return 'bg-green-100 text-green-700 border-green-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export default function RecursosTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)

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
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Recurso
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

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-32">Código</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-20">Und</TableHead>
              <TableHead className="w-32">Categoría</TableHead>
              <TableHead className="w-24">Precio</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.codigo}>
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell className="text-center">{item.unidad}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`${getCategoriaColor(item.categoria)} border`}
                  >
                    {item.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  {item.precio ? item.precio.toFixed(2) : '-'}
                </TableCell>
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
    </div>
  )
}
