import { type GastoGeneral } from './schema'

export const mockGastosGenerales: GastoGeneral[] = [
  {
    id: '1',
    item: '001.01',
    titulo: 'Gastos Elaboración de la propuesta y Notariales',
    parcial: 60.00,
    estado: 'en-proceso',
  },
  {
    id: '2',
    item: '001.02',
    titulo: 'Equipamiento y Mobiliario',
    parcial: 100.00,
    estado: 'iniciado',
  },
  {
    id: '3',
    item: '001.02',
    titulo: 'Ensayos y Pruebas De Calidad',
    parcial: 200.00,
    estado: 'terminado',
  },
  {
    id: '4',
    item: '001.04',
    titulo: 'Personal de Obra',
    parcial: 60.00,
    estado: 'en-proceso',
  },
  {
    id: '5',
    item: 'J01.05',
    titulo: 'Pólizas y Seguros',
    parcial: 100.00,
    estado: 'terminado',
  },
]

