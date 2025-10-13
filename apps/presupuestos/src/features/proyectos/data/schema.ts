import { z } from 'zod'

const proyectoEstadoSchema = z.union([
  z.literal('activo'),
  z.literal('terminado'),
  z.literal('en ejecucion'),
])
export type ProyectoEstado = z.infer<typeof proyectoEstadoSchema>

const proyectoTipoSchema = z.union([z.literal('venta'), z.literal('meta')])
export type ProyectoTipo = z.infer<typeof proyectoTipoSchema>

const proyectoSchema = z.object({
  codigo: z.string(),
  nombreDeProyecto: z.string(),
  nombreCorto: z.string(),
  estado: proyectoEstadoSchema,
  fechaBase: z.coerce.date(),
  plazo: z.string(),
  tipo: proyectoTipoSchema,
})
export type Proyecto = z.infer<typeof proyectoSchema>

export const proyectoListSchema = z.array(proyectoSchema)
