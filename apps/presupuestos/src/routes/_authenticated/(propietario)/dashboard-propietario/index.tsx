import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/lib/route-guards'
import { DashboardPropietario } from '@/features/dashboard-propietario'

export const Route = createFileRoute('/_authenticated/(propietario)/dashboard-propietario/')({
  component: RouteComponent,
  beforeLoad: () => {
    requireRole(['propietario'])
  },
})

function RouteComponent() {
  return <DashboardPropietario />
}
