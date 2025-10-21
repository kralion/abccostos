import { z } from 'zod'

export const partidaSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  item: z.string(),
  especialidad: z.string().optional(),
  unidad: z.string().optional(),
  precioUnitario: z.number().optional(),
  metrado: z.number().optional(),
  parcial: z.number().optional(),
  total: z.number().optional(),
  estado: z.enum(['pending', 'in-progress', 'completed']).optional(),
  level: z.number(),
  hasChildren: z.boolean().default(false),
})

export type Partida = z.infer<typeof partidaSchema>

