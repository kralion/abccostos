import { Presupuesto } from '@/features/presupuesto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/presupuesto/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Presupuesto />
}
