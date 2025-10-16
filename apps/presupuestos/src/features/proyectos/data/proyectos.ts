import { fakerES as faker } from '@faker-js/faker'

// Set fixed seed for consistent data generation
faker.seed(54321)

export const proyectos = Array.from({ length: 20 }, (_, index) => {
  const fechaBase = faker.date.between({
    from: '2029-01-01',
    to: '2029-12-31',
  })
  const plazoMeses = faker.number.int({ min: 2, max: 25 })

  return {
    codigo: String(index + 1).padStart(3, '0'),
    nombreDeProyecto: `Mejoramiento de de los servicio del penal de ${faker.location.city()}`,
    nombreCorto: `Penal - ${faker.location.city()}`,
    ubicacion: faker.location.city(),
    estado: faker.helpers.arrayElement([
      'activo',
      'terminado',
      'en ejecucion',
      'archivado',
    ] as const),
    fechaBase: fechaBase,
    plazo: `${plazoMeses} meses`,
    meta: faker.helpers.arrayElement([true, false]),
    venta: faker.helpers.arrayElement([true, false]),
    desviacion: faker.number.float({ min: 0, max: 10000 }),
  }
})
