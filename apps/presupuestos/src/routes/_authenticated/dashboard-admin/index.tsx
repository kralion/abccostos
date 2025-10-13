import { createFileRoute } from '@tanstack/react-router'
import { DashboardAdmin } from '@/features/dashboard-admin'

export const Route = createFileRoute('/_authenticated/dashboard-admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DashboardAdmin />
}
