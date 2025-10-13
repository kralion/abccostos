import { z } from 'zod'

const clienteEstadoSchema = z.union([
  z.literal('habilitado'),
  z.literal('deshabilitado'),
])
export type ClienteEstado = z.infer<typeof clienteEstadoSchema>

const clienteSchema = z.object({
  id: z.string(),
  nombreEmpresa: z.string(),
  usuarioPrincipal: z.string(),
  estado: clienteEstadoSchema,
  email: z.string(),
  proyectos: z.number(),
  usuarios: z.number(),
  modulosActivos: z.number(),
  fechaInicioFacturacion: z.coerce.date(),
  fechaFinFacturacion: z.coerce.date(),
})
export type Cliente = z.infer<typeof clienteSchema>

export const clienteListSchema = z.array(clienteSchema)
