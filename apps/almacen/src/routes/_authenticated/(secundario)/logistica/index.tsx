import { Logistica } from '@/features/logistica'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(secundario)/logistica/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Logistica />
}
