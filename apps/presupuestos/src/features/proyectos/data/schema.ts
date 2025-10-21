import { z } from 'zod'

const proyectoEstadoSchema = z.union([
  z.literal('activo'),
  z.literal('terminado'),
  z.literal('en ejecucion'),
  z.literal('archivado'),
])
export type ProyectoEstado = z.infer<typeof proyectoEstadoSchema>

const proyectoSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  nombreDeProyecto: z.string(),
  nombreCorto: z.string(),
  ubicacion: z.string(),
  estado: proyectoEstadoSchema,
  fechaBase: z.coerce.date(),
  meta: z.boolean(),
  venta: z.boolean(),
  plazo: z.string(),
  desviacion: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})
export type Proyecto = z.infer<typeof proyectoSchema>

export const proyectoListSchema = z.array(proyectoSchema)
