import {
  AudioWaveform,
  Boxes,
  Command,
  Crown,
  FileSearch,
  FileX,
  GalleryVerticalEnd,
  Monitor,
  Settings,
  Users,
} from 'lucide-react'
import { type Profile } from '@/stores/auth-store'
import { type SidebarData } from '../types'

export const getSidebarData = (
  profile: Profile | null,
  userEmail?: string
): SidebarData => ({
  user: {
    name: profile ? `${profile.name} ${profile.last_name}` : 'Usuario',
    email: userEmail || 'usuario@ejemplo.com',
    avatar:
      profile?.image_url ||
      'https://img.icons8.com/?size=100&id=p8UFrp2VUgHR&format=png&color=000000',
  },
  projects: [
    {
      name: 'Colegio ULP',
      logo: Command,
      plan: 'Consorcio ABC',
    },
    {
      name: 'Condominio Los Rosales',
      logo: GalleryVerticalEnd,
      plan: 'Consorcio ABC',
    },
    {
      name: 'Residencial El Sol',
      logo: AudioWaveform,
      plan: 'Consorcio ABC',
    },
  ],
  navGroups: [
    {
      title: 'Propietario',
      items: [
        {
          title: 'Clientes',
          url: '/clientes',
          icon: Crown,
        },
      ],
    },
    {
      title: 'Administrador',
      items: [
        {
          title: 'Usuarios',
          url: '/usuarios',
          icon: Users,
        },
        {
          title: 'Proyectos',
          url: '/proyectos',
          icon: Boxes,
        },
      ],
    },
    {
      title: 'Proyecto',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: Monitor,
        },
        {
          title: 'Datos Principales',
          url: '/datos-principales',
          icon: FileX,
        },
        {
          title: 'Presupuesto',
          url: '/presupuesto',
          icon: FileSearch,
        },
        {
          title: 'Parámetros',
          url: '/parametros-presupuesto',
          icon: Settings,
        },
        {
          title: 'Catálogos',
          url: '/catalogos',
          icon: Users,
        },
      ],
    },
  ],
})
