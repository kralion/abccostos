export const estados = [
  {
    value: 'habilitado',
    label: 'Habilitado',
  },
  {
    value: 'deshabilitado',
    label: 'Deshabilitado',
  },
]

export const estadoTypes = new Map([
  [
    'habilitado',
    'bg-green-100/50 text-green-800 dark:text-green-200 border-green-200',
  ],
  [
    'deshabilitado',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const modulos = [
  {
    value: 'presupuestos',
    label: 'Presupuestos',
  },
  {
    value: 'almacen',
    label: 'Almacén',
  },
]
