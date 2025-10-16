import {
  Shield,
  Wrench,
  UserCheck,
  Briefcase,
  Calculator,
  User,
} from 'lucide-react'
import { type UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  [
    'habilitado',
    'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  ],
  [
    'deshabilitado',
    'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200',
  ],
])

export const roles = [
  {
    label: 'Supervisor General',
    value: 'supervisor_general',
    icon: Shield,
  },
  {
    label: 'Produccion',
    value: 'produccion',
    icon: Wrench,
  },
  {
    label: 'Gerente General',
    value: 'gerente_general',
    icon: UserCheck,
  },
  {
    label: 'Gerente de Proyecto',
    value: 'gerente_proyecto',
    icon: Briefcase,
  },
  {
    label: 'Control De Costos',
    value: 'control_costos',
    icon: Calculator,
  },
] as const
