import { ControlVarios } from '@/features/control-varios'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/control-varios/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ControlVarios />
}
