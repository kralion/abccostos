import { Reportes } from '@/features/reportes'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/reportes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Reportes />
}
