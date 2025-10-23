export interface GastoGeneral {
  id: string
  item: string
  titulo: string
  parcial: number
  estado: 'en-proceso' | 'iniciado' | 'terminado'
}

