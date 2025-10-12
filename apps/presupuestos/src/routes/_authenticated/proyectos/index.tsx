import { createFileRoute } from '@tanstack/react-router'
import { Proyectos } from '@/features/proyectos'

export const Route = createFileRoute('/_authenticated/proyectos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Proyectos />
}
