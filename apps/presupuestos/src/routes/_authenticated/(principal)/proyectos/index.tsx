import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/lib/route-guards'
import { Proyectos } from '@/features/proyectos'

export const Route = createFileRoute('/_authenticated/(principal)/proyectos/')({
  component: RouteComponent,
  beforeLoad: () => {
    requireRole(['admin'])
  },
})

function RouteComponent() {
  return <Proyectos />
}
