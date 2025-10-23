import { DatosPrincipales } from '@/features/datos-principales'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/datos-principales/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DatosPrincipales />
}
