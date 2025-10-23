import { Card, CardContent } from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { Tabs, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { Button } from '@workspace/ui/components/button'
import { ExternalLink } from 'lucide-react'

export function PartidasFooter() {
  return (
    <div className='mt-6'>
      <Tabs defaultValue='presupuesto' className='w-full'>
        <div className='flex items-center justify-between border-t pt-4'>
          <TabsList className='bg-transparent'>
            <TabsTrigger value='repositorio' className='data-[state=active]:bg-accent'>
              Repositorio
            </TabsTrigger>
            <TabsTrigger value='notas' className='data-[state=active]:bg-accent'>
              Notas del presupuesto
            </TabsTrigger>
            <TabsTrigger value='estructura' className='data-[state=active]:bg-accent'>
              Estructura de costos
            </TabsTrigger>
            <TabsTrigger value='presupuesto' className='data-[state=active]:bg-accent'>
              Presupuesto
            </TabsTrigger>
            <Button variant='ghost' size='icon' className='size-8 ml-2'>
              <ExternalLink className='size-4' />
            </Button>
          </TabsList>
        </div>
      </Tabs>

      <Card className='mt-4'>
        <CardContent className='p-4'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Materiales</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-pink-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>59.0%</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Herramientas</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-green-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>2.12</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Costo directo</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>100.0</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Ign %</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>100.0</div>
            </div>
          </div>

          <Separator className='my-4' />

          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Mano de obra</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>2,150,138.88</span>
                  <div className='h-6 w-12 rounded bg-orange-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>20.32</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Varios/Subcontrata</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-purple-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>0.17</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Gastos Generales %</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>7,487,138.88</span>
                  <div className='h-6 w-12 rounded bg-red-500' />
                </div>
              </div>
              <div className='text-xs text-muted-foreground flex justify-end'>10.00</div>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>Presupuesto Total</span>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-semibold'>7,487,138.88</span>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-3'>
            <div className='flex items-center justify-between rounded-md bg-purple-100 px-3 py-2'>
              <span className='text-sm font-medium'>Utilidad</span>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>%</span>
                <div className='h-6 w-16 rounded bg-purple-500' />
                <span className='text-sm font-medium'>1,186,997.24</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

