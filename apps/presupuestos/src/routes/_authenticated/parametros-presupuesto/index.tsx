import { ParametrosPresupuesto } from '@/features/parametros-presupuesto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/parametros-presupuesto/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ParametrosPresupuesto />
}
