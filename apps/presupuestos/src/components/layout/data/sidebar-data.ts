import {
  AudioWaveform,
  Command,
  FileSearch,
  FileX,
  GalleryVerticalEnd,
  Monitor,
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
      title: '',
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
          url: '/chats',
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
