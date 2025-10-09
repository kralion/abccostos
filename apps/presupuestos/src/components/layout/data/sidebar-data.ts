import {
  AudioWaveform,
  Command,
  FileX,
  GalleryVerticalEnd,
  Monitor,
  Package,
  Settings,
  Users
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'alejandro',
    email: 'alejandro@gmail.com',
    avatar: 'https://untitledui.com/images/avatars/olly-schroeder',
  },
  teams: [
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
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: Monitor,
        },
        {
          title: 'Datos Principales',
          url: '/tasks',
          icon: FileX,
        },
        {
          title: 'Presupuesto',
          url: '/apps',
          icon: Package,
        },
        {
          title: 'Parámetros del Presupuesto',
          url: '/chats',
          badge: '3',
          icon: Settings,
        },
        {
          title: 'Catálogos',
          url: '/users',
          icon: Users,
        },
        
      ],
    },
    
  ],
}
