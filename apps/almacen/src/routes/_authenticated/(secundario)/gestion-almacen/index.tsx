import { GestionAlmacen } from '@/features/gestion-almacen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/gestion-almacen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <GestionAlmacen />
}
