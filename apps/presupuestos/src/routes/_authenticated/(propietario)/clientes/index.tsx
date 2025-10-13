import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/lib/route-guards'
import { Clientes } from '@/features/clientes'

export const Route = createFileRoute('/_authenticated/(propietario)/clientes/')({
  component: RouteComponent,
  beforeLoad: () => {
    requireRole(['owner'])
  },
})

function RouteComponent() {
  return <Clientes />
}
