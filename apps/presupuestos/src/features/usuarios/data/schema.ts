import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('habilitado'),
  z.literal('deshabilitado'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('supervisor_general'),
  z.literal('produccion'),
  z.literal('gerente_general'),
  z.literal('gerente_proyecto'),
  z.literal('control_costos'),
  z.literal('secundario'),
])

const userSchema = z.object({
  id: z.string(),
  nombres: z.string(),
  apellidos: z.string(),
  email: z.string(),
  telefono: z.string(),
  estado: userStatusSchema,
  rol: userRoleSchema,
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
