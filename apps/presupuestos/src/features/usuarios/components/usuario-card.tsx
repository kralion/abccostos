import { getRouteApi } from '@tanstack/react-router'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { MoreHorizontal, User } from 'lucide-react'

import type { Usuario } from '@workspace/api-presupuestos/services'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader } from '@workspace/ui/components/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'

const route = getRouteApi('/_authenticated/(principal)/usuarios/')

type UsuarioCardProps = {
  usuario: Usuario
}

const roles = [
  { value: 'propietario', label: 'Propietario' },
  { value: 'principal', label: 'Principal' },
  { value: 'secundario', label: 'Secundario' },
]

export function UsuarioCard({ usuario }: UsuarioCardProps) {
  const navigate = route.useNavigate()
  const roleConfig = roles.find(r => r.value === usuario.rol)

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <User className='h-4 w-4 text-muted-foreground' />
              <h3 className='font-semibold text-lg'>
                {usuario.nombres} {usuario.apellidos}
              </h3>
            </div>            
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir menú</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(usuario.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate({ to: '/usuarios', search: { edit: usuario.id } })}
              >
                Editar usuario
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate({ to: '/usuarios', search: { delete: usuario.id } })}
                className='text-destructive'
              >
                Eliminar usuario
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium'>Usuario:</span>
            <span className='text-xs text-muted-foreground'>{usuario.nombres} {usuario.apellidos}</span>
          </div>
          
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium'>Rol:</span>
            <Badge variant={(usuario.rol as 'propietario' | 'principal' | 'secundario') === 'principal' ? 'default' : 'secondary'}>
              {roleConfig?.label || usuario.rol}
            </Badge>
          </div>
          
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium'>Estado:</span>
            <Badge variant={usuario.estado === 'habilitado' ? 'default' : 'destructive'}>
              {usuario.estado === 'habilitado' ? 'Habilitado' : 'Deshabilitado'}
            </Badge>
          </div>
          
          <div className='flex items-center justify-between'>
            <span className='text-xs font-medium'>Creado:</span>
            <span className='text-xs text-muted-foreground'>
              {format(usuario.created_at, 'PPP', { locale: es })}
            </span>
          </div>
          
          {usuario.telefono && (
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium'>Teléfono:</span>
              <span className='text-xs text-muted-foreground'>{usuario.telefono}</span>
            </div>
          )}
          

        </div>
      </CardContent>
    </Card>
  )
}
