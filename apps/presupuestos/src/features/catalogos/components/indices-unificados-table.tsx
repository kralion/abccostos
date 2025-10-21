import { useState } from 'react'
import { Search, FileDown, Download, Upload, Plus, MoreVertical } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@workspace/ui/components/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@workspace/ui/components/dropdown-menu'

interface IndiceUnificado {
  codigo: string
  nombre: string
  simbolo: string
  notas: string
}

const mockData: IndiceUnificado[] = [
  { 
    codigo: '001', 
    nombre: 'Aceite A1 - C', 
    simbolo: 'LU', 
    notas: 'Notas sobre este índice' 
  },
  { 
    codigo: '002', 
    nombre: 'Acero De Construcción Liso', 
    simbolo: 'AC', 
    notas: 'Notas sobre este índice' 
  },
  { 
    codigo: '003', 
    nombre: 'Acero De Construcción Corrugado', 
    simbolo: 'ACC', 
    notas: 'Notas sobre este índice' 
  },
  { 
    codigo: '004', 
    nombre: 'Agregado Fino', 
    simbolo: 'AF', 
    notas: 'Notas sobre este índice' 
  },
  { 
    codigo: '005', 
    nombre: 'Agregado Grueso', 
    simbolo: 'AG', 
    notas: 'Notas sobre este índice' 
  },
]

export default function IndicesUnificadosTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredData = mockData.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.codigo.includes(searchTerm) ||
    item.simbolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notas.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header with search and actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar índice unificado"
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
            Nuevo Índice Unificado
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
              <TableHead className="w-32">Símbolo</TableHead>
              <TableHead>Símbolo</TableHead>
              <TableHead className="w-20">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.codigo}>
                <TableCell className="font-medium">{item.codigo}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell className="text-center font-mono">{item.simbolo}</TableCell>
                <TableCell className="text-muted-foreground">{item.notas}</TableCell>
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
