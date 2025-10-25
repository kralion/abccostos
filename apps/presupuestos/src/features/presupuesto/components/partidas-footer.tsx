import { Badge } from '@workspace/ui/components/badge'
import { Card, CardContent } from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@workspace/ui/components/tabs'

export function PartidasFooter() {
  return (
    <div className='mt-6'>
      <Tabs defaultValue='presupuesto' className='w-full'>
        <div className='flex items-center justify-between border-t pt-4'>
          <div className='overflow-x-auto w-full'>
            <TabsList className='bg-transparent min-w-max'>
              <TabsTrigger value='repositorio' className='data-[state=active]:bg-accent text-xs sm:text-sm'>
                Repositorio
              </TabsTrigger>
              <TabsTrigger value='notas' className='data-[state=active]:bg-accent text-xs sm:text-sm'>
                <span className='hidden sm:inline'>Notas del presupuesto</span>
                <span className='sm:hidden'>Notas</span>
              </TabsTrigger>
              <TabsTrigger value='estructura' className='data-[state=active]:bg-accent text-xs sm:text-sm'>
                <span className='hidden sm:inline'>Estructura de costos</span>
                <span className='sm:hidden'>Costos</span>
              </TabsTrigger>
              <TabsTrigger value='presupuesto' className='data-[state=active]:bg-accent text-xs sm:text-sm'>
                Presupuesto
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value='repositorio' className='mt-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Repositorio de Partidas</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Partidas Guardadas</h4>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between rounded-md border p-3'>
                        <span className='text-sm'>Partida 001 - Excavación</span>
                        <span className='text-xs text-muted-foreground'>$45,000</span>
                      </div>
                      <div className='flex items-center justify-between rounded-md border p-3'>
                        <span className='text-sm'>Partida 002 - Cimentación</span>
                        <span className='text-xs text-muted-foreground'>$120,000</span>
                      </div>
                      <div className='flex items-center justify-between rounded-md border p-3'>
                        <span className='text-sm'>Partida 003 - Estructura</span>
                        <span className='text-xs text-muted-foreground'>$350,000</span>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h4 className='font-medium'>Plantillas</h4>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between rounded-md border p-3'>
                        <span className='text-sm'>Plantilla Residencial</span>
                        <span className='text-xs text-muted-foreground'>15 partidas</span>
                      </div>
                      <div className='flex items-center justify-between rounded-md border p-3'>
                        <span className='text-sm'>Plantilla Comercial</span>
                        <span className='text-xs text-muted-foreground'>23 partidas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='notas' className='mt-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Notas del Presupuesto</h3>
                <div className='space-y-4'>
                  <div className='rounded-md border p-4'>
                    <h4 className='font-medium mb-2'>Notas Generales</h4>
                    <p className='text-sm text-muted-foreground'>
                      Este presupuesto incluye todos los materiales, mano de obra y gastos generales necesarios para la ejecución del proyecto.
                    </p>
                  </div>
                  <div className='rounded-md border p-4'>
                    <h4 className='font-medium mb-2'>Condiciones Especiales</h4>
                    <ul className='text-sm text-muted-foreground space-y-1'>
                      <li>• Los precios incluyen IVA</li>
                      <li>• Válido por 30 días</li>
                      <li>• No incluye permisos municipales</li>
                      <li>• Los materiales están sujetos a disponibilidad</li>
                    </ul>
                  </div>
                  <div className='rounded-md border p-4'>
                    <h4 className='font-medium mb-2'>Observaciones</h4>
                    <p className='text-sm text-muted-foreground'>
                      Se recomienda revisar las condiciones del terreno antes del inicio de obra. 
                      Cualquier variación en las condiciones iniciales podrá afectar el costo final.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='estructura' className='mt-4'>
          <Card>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>Estructura de Costos</h3>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-medium mb-3'>Desglose por Categorías</h4>
                      <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Materiales</span>
                          <div className='flex items-center gap-2'>
                            <div className='h-4 w-20 rounded bg-pink-500'></div>
                            <span className='text-sm font-medium'>59.0%</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Mano de Obra</span>
                          <div className='flex items-center gap-2'>
                            <div className='h-4 w-16 rounded bg-orange-500'></div>
                            <span className='text-sm font-medium'>20.3%</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Herramientas</span>
                          <div className='flex items-center gap-2'>
                            <div className='h-4 w-8 rounded bg-green-500'></div>
                            <span className='text-sm font-medium'>2.1%</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Gastos Generales</span>
                          <div className='flex items-center gap-2'>
                            <div className='h-4 w-12 rounded bg-red-500'></div>
                            <span className='text-sm font-medium'>10.0%</span>
                          </div>
                        </div>
                        <div className='flex items-center justify-between'>
                          <span className='text-sm'>Utilidad</span>
                          <div className='flex items-center gap-2'>
                            <div className='h-4 w-14 rounded bg-purple-500'></div>
                            <span className='text-sm font-medium'>8.6%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-medium mb-3'>Resumen Financiero</h4>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-sm'>Costo Directo:</span>
                          <span className='text-sm font-medium'>$6,300,141.64</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm'>Gastos Generales:</span>
                          <span className='text-sm font-medium'>$630,014.16</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm'>Utilidad:</span>
                          <span className='text-sm font-medium'>$556,983.08</span>
                        </div>
                        <Separator />
                        <div className='flex justify-between font-semibold'>
                          <span>Total:</span>
                          <span>$7,487,138.88</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='presupuesto' className='mt-4'>
          <Card>
            <CardContent className='p-4'>
              {/* First row - responsive grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Materiales</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                      <Badge variant='outline' className='bg-pink-500 text-white text-xs w-fit'>59.0%</Badge>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Herramientas</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                      <Badge variant='outline' className='bg-green-500 text-white text-xs w-fit'>2.12</Badge>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Costo directo</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                    </div>
                  </div>  
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Ign %</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                      <Badge variant='outline' className='bg-pink-500 text-white text-xs w-fit'>59.0%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className='my-4' />

              {/* Second row - responsive grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Mano de obra</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 2,150,138.88</span>
                      <Badge variant='outline' className='bg-orange-500 text-white text-xs w-fit'>20.32</Badge>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Varios/Subcontrata</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                      <Badge variant='outline' className='bg-purple-500 text-white text-xs w-fit'>0.17</Badge>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Gastos Generales %</span>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                      <span className='text-xs sm:text-sm font-medium'>S/. 7,487,138.88</span>
                      <Badge variant='outline' className='bg-red-500 text-white text-xs w-fit'>10.00%</Badge>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1'>
                    <span className='text-xs sm:text-sm text-muted-foreground'>Presupuesto Total</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs sm:text-sm font-semibold'>S/. 7,487,138.88</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utility row */}
              <div className='mt-4'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md px-3 py-2'>
                  <span className='text-sm font-medium'>Utilidad</span>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                    <span className='text-sm'>%</span>
                    <Badge variant='outline' className='bg-purple-500 text-white text-xs w-fit'>8.6%</Badge>
                    <span className='text-sm font-medium'>S/. 1,186,997.24</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

