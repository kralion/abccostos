import { Mantenimiento } from '@/features/mantenimiento'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/mantenimiento/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Mantenimiento />
}
