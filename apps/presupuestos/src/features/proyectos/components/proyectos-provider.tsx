import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Proyecto } from '../data/schema'

type ProyectosDialogType = 'add' | 'edit' | 'delete' | 'create' | 'comparativa'

type ProyectosContextType = {
  open: ProyectosDialogType | null
  setOpen: (str: ProyectosDialogType | null) => void
  currentRow: Proyecto | null | undefined
  setCurrentRow: React.Dispatch<React.SetStateAction<Proyecto | null>>
}

const ProyectosContext = React.createContext<ProyectosContextType | null>(null)

export function ProyectosProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ProyectosDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Proyecto | null>(null)

  return (
    <ProyectosContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProyectosContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProyectos = () => {
  const proyectosContext = React.useContext(ProyectosContext)

  if (!proyectosContext) {
    throw new Error('useProyectos has to be used within <ProyectosContext>')
  }

  return proyectosContext
}
