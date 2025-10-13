import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/lib/route-guards'
import { Usuarios } from '@/features/usuarios'

export const Route = createFileRoute('/_authenticated/(principal)/usuarios/')({
  component: RouteComponent,
  beforeLoad: () => {
    requireRole(['admin'])
  },
})

function RouteComponent() {
  return <Usuarios />
}
