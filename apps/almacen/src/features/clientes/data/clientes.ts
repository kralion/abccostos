import { fakerES as faker } from '@faker-js/faker'

// Set fixed seed for consistent data generation
faker.seed(12345)

export const clientes = Array.from({ length: 20 }, (_, index) => {
  const companyName = faker.company.name()
  const usuarioPrincipal = faker.person.firstName()
  const fechaInicio = faker.date.recent({ days: 60 })
  const fechaFin = new Date(fechaInicio)
  fechaFin.setDate(fechaFin.getDate() + 30)

  return {
    id: String(index + 1).padStart(3, '0'),
    nombreEmpresa: companyName,
    usuarioPrincipal: usuarioPrincipal,
    estado: faker.helpers.arrayElement([
      'habilitado',
      'deshabilitado',
    ] as const),
    email: faker.internet.email().toLowerCase(),
    proyectos: faker.number.int({ min: 1, max: 10 }),
    usuarios: faker.number.int({ min: 5, max: 30 }),
    modulosActivos: faker.number.int({ min: 1, max: 5 }),
    fechaInicioFacturacion: fechaInicio,
    fechaFinFacturacion: fechaFin,
  }
})
