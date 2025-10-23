import { z } from 'zod'

export const recursoSchema = z.object({
  id: z.string(),
  tipo: z.enum(['mano-obra', 'material', 'equipo', 'subcontrato']),
  descripcion: z.string(),
  unidad: z.string(),
  cuadrilla: z.number().optional(),
  cantidad: z.number(),
  precio: z.number(),
  parcial: z.number(),
})

export type Recurso = z.infer<typeof recursoSchema>

