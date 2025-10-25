import { Catalogos } from '@/features/catalogos/index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/catalogos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Catalogos />
}
