import { type DetalleData } from './detail-schema'

export const mockDetalleData: Record<string, DetalleData> = {
  '1': {
    gastoId: '1',
    formato: 'Ensayos',
    items: [
      {
        id: '001.01.01',
        descripcion: 'Operario',
        und: 'h.h',
        cantidad: 2.50,
        precio: 3.50,
        parcial: 8.75,
      },
      {
        id: '001.01.02',
        descripcion: 'Oficial',
        und: 'h.h',
        cantidad: 5.00,
        precio: 30.00,
        parcial: 150.00,
      },
      {
        id: '001.01.03',
        descripcion: 'Arena Gruesa',
        und: 'm3',
        cantidad: 2.50,
        precio: 3.50,
        parcial: 8.75,
      },
    ],
  },
  '2': {
    gastoId: '2',
    formato: 'Equipos',
    items: [
      {
        id: '001.02.01',
        descripcion: 'Mezcladora de concreto',
        und: 'h.m',
        cantidad: 4.00,
        precio: 25.00,
        parcial: 100.00,
      },
    ],
  },
  '3': {
    gastoId: '3',
    formato: 'Ensayos',
    items: [
      {
        id: '001.02.01',
        descripcion: 'Ensayo de resistencia',
        und: 'und',
        cantidad: 10.00,
        precio: 20.00,
        parcial: 200.00,
      },
    ],
  },
  '4': {
    gastoId: '4',
    formato: 'Personal',
    items: [
      {
        id: '001.04.01',
        descripcion: 'Ingeniero residente',
        und: 'mes',
        cantidad: 1.00,
        precio: 60.00,
        parcial: 60.00,
      },
    ],
  },
  '5': {
    gastoId: '5',
    formato: 'Seguros',
    items: [
      {
        id: 'J01.05.01',
        descripcion: 'Póliza todo riesgo',
        und: 'glb',
        cantidad: 1.00,
        precio: 100.00,
        parcial: 100.00,
      },
    ],
  },
}

