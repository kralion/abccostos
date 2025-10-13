import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/lib/route-guards'
import { Clientes } from '@/features/clientes'

const clientesSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  // Facet filters
  estado: z
    .array(z.union([z.literal('habilitado'), z.literal('deshabilitado')]))
    .optional()
    .catch([]),
  // Per-column text filter
  nombreEmpresa: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/(propietario)/clientes/')(
  {
    validateSearch: clientesSearchSchema,
    component: Clientes,
    beforeLoad: () => {
      requireRole(['owner'])
    },
  }
)
