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
import { type SidebarData } from '../types'
import { type Database } from '@workspace/supabase/types'

type Usuario = Database['public']['Tables']['usuarios']['Row']

export const getSidebarData = (
  usuario: Usuario | null,
  userEmail?: string
): SidebarData => ({
  user: {
    name: usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'Usuario',
    email: userEmail || 'usuario@ejemplo.com',
    avatar:
      usuario?.avatar ||
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
        { title: 'Dashboard', url: '/dashboard-propietario', icon: Monitor },
        {
          title: 'Clientes',
          url: '/clientes',
          icon: Crown,
        },
      ],
    },
    {
      title: 'Principal',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard-principal',
          icon: Monitor,
        },
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
