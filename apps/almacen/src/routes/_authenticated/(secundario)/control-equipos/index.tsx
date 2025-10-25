import { ControlEquipos } from '@/features/control-equipos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/control-equipos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ControlEquipos />
}
