import { Catalogos } from '@/features/catalogos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/control-equipos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Catalogos />
}
