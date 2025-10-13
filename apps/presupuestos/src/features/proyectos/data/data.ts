export const estados = [
  {
    value: 'activo',
    label: 'Activo',
  },
  {
    value: 'terminado',
    label: 'Terminado',
  },
  {
    value: 'en ejecucion',
    label: 'En Ejecución',
  },
]

export const estadoTypes = new Map([
  ['activo', 'bg-blue-100/50 text-blue-800 dark:text-blue-200 border-blue-200'],
  ['terminado', 'bg-red-100/50 text-red-800 dark:text-red-200 border-red-200'],
  [
    'en ejecucion',
    'bg-green-100/50 text-green-800 dark:text-green-200 border-green-200',
  ],
])

export const tipos = [
  {
    value: 'venta',
    label: 'Venta',
  },
  {
    value: 'meta',
    label: 'Meta',
  },
]

export const tipoTypes = new Map([
  [
    'venta',
    'bg-orange-100/50 text-orange-800 dark:text-orange-200 border-orange-200',
  ],
  [
    'meta',
    'bg-green-100/50 text-green-800 dark:text-green-200 border-green-200',
  ],
])
