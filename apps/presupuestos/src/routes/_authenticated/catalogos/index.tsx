import { Catalogos } from '@/features/catalogos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/catalogos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Catalogos />
}
