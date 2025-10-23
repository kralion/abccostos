export interface DetalleItem {
  id: string
  descripcion: string
  und: string
  cantidad: number
  precio: number
  parcial: number
}

export interface DetalleData {
  gastoId: string
  formato: string
  items: DetalleItem[]
}

