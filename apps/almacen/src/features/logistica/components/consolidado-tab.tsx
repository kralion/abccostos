import { useState } from 'react'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import {
  SearchIcon,
  MoreVerticalIcon,
  BarChart3Icon,
  Download,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

interface ConsolidatedData {
  area: string
  totalRqs: number
  atendidos: number
  parcialmente: number
  sinAtender: number
  montoTotal: number
  cumplimiento: number
}

export default function ConsolidadoTab() {
  const [searchQuery, setSearchQuery] = useState('')

  // Datos consolidados
  const consolidatedData: ConsolidatedData[] = [
    {
      area: 'Area 1',
      totalRqs: 15,
      atendidos: 12,
      parcialmente: 2,
      sinAtender: 1,
      montoTotal: 15000,
      cumplimiento: 85
    },
    {
      area: 'Area 2',
      totalRqs: 23,
      atendidos: 18,
      parcialmente: 3,
      sinAtender: 2,
      montoTotal: 23000,
      cumplimiento: 78
    },
    {
      area: 'Area 3',
      totalRqs: 8,
      atendidos: 5,
      parcialmente: 1,
      sinAtender: 2,
      montoTotal: 8000,
      cumplimiento: 63
    }
  ]

  return (
    <div className='space-y-4'>
      {/* Search and Actions */}
      <div className="flex items-end justify-end gap-4">
        <div className="relative flex-1 max-w-sm hidden sm:block">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por área..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="sm:hidden border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const input = prompt('Buscar por área', searchQuery)
              if (input !== null) setSearchQuery(input)
            }}
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant='ghost'>
            <BarChart3Icon className='h-5 w-5' />
            <span className="hidden sm:inline">Generar Reporte</span>
          </Button>
          <Button variant='ghost' className='gap-2'>
            <Download className='h-5 w-5' />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Tabla consolidada */}
      <div className='rounded-lg border bg-white'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b bg-gray-100'>
              <tr>
                <th className='p-3 text-left text-sm font-semibold'>Área</th>
                <th className='p-3 text-left text-sm font-semibold'>Total Rq'S</th>
                <th className='p-3 text-left text-sm font-semibold'>Atendidos</th>
                <th className='p-3 text-left text-sm font-semibold'>Parcialmente</th>
                <th className='p-3 text-left text-sm font-semibold'>Sin Atender</th>
                <th className='p-3 text-left text-sm font-semibold'>% Cumplimiento</th>
                <th className='p-3 text-left text-sm font-semibold'>Monto Total</th>
                <th className='p-3 text-center text-sm font-semibold'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {consolidatedData.map((item, index) => (
                <tr
                  key={item.area}
                  className={`border-b last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='p-3 text-sm font-medium'>{item.area}</td>
                  <td className='p-3 text-sm'>{item.totalRqs}</td>
                  <td className='p-3 text-sm text-green-600 font-medium'>{item.atendidos}</td>
                  <td className='p-3 text-sm text-yellow-600 font-medium'>{item.parcialmente}</td>
                  <td className='p-3 text-sm text-red-600 font-medium'>{item.sinAtender}</td>
                  <td className='p-3 text-sm'>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.cumplimiento >= 80 ? 'bg-green-500' : item.cumplimiento >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${item.cumplimiento}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{item.cumplimiento}%</span>
                    </div>
                  </td>
                  <td className='p-3 text-sm font-medium'>${item.montoTotal.toLocaleString()}</td>
                  <td className='p-3 text-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <MoreVerticalIcon className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Exportar Área</DropdownMenuItem>
                        <DropdownMenuItem>Generar Reporte</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
