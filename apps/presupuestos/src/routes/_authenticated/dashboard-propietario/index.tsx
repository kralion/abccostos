import { createFileRoute } from '@tanstack/react-router'
import { DashboardPropietario } from '@/features/dashboard-propietario'

export const Route = createFileRoute('/_authenticated/dashboard-propietario/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardPropietario />
}
