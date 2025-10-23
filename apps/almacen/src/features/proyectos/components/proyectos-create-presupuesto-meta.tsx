import { useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import { Calendar } from '@workspace/ui/components/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { CalendarIcon, Loader2, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, 'Por favor ingrese el código'),
  fechaBaseDePrecios: z.date({
    error: (iss) =>
      iss.input === undefined
        ? 'Por favor seleccione una fecha base'
        : undefined,
  }),
})

interface ProyectosCreatePresupuestoMetaProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ProyectosCreatePresupuestoMeta({
  open,
  onOpenChange,
  onSuccess,
}: ProyectosCreatePresupuestoMetaProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [creationMode, setCreationMode] = useState<'copy' | 'scratch' | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: '',
      fechaBaseDePrecios: undefined,
    },
  })

  async function handleCopyFromVenta() {
    setIsLoading(true)
    setCreationMode('copy')

    try {
      // TODO: Implement API call to copy presupuesto from Venta
      console.log('Copying presupuesto from Venta')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Presupuesto Meta copiado exitosamente')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error copying presupuesto:', error)
      toast.error('Error al copiar el presupuesto')
    } finally {
      setIsLoading(false)
      setCreationMode(null)
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setCreationMode('scratch')

    try {
      // TODO: Implement API call to create presupuesto meta from scratch
      console.log('Presupuesto Meta data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Presupuesto Meta creado exitosamente')
      form.reset()
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error saving presupuesto meta:', error)
      toast.error('Error al crear el presupuesto')
    } finally {
      setIsLoading(false)
      setCreationMode(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Modal Crear Presupuesto</DialogTitle>
          <DialogDescription>Presupuesto Meta</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='codigo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder='001.02' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='fechaBaseDePrecios'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Base De Precios</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: es })
                          ) : (
                            <span>Elegir Fecha Base</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Copy from Venta option */}
            <div className='space-y-2 pt-2'>
              <Button
                type='button'
                onClick={handleCopyFromVenta}
                disabled={isLoading}
                className='w-full bg-purple-600 hover:bg-purple-700'
              >
                {isLoading && creationMode === 'copy' ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Copiando...
                  </>
                ) : (
                  <>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Copiar del Presupuesto Venta
                  </>
                )}
              </Button>

              {/* Divider with text */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-background px-2 text-muted-foreground'>
                    o
                  </span>
                </div>
              </div>

              {/* Crear desde cero label */}
              <div className='text-center text-sm text-muted-foreground'>
                Crear desde cero
              </div>
            </div>

            <div className='flex gap-2 pt-2'>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                <span className='mr-1'>✕</span>
                Cancelar
              </Button>
              <Button 
                type='submit' 
                className='flex-1' 
                disabled={isLoading}
              >
                {isLoading && creationMode === 'scratch' ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Creando...
                  </>
                ) : (
                  <>
                    <span className='mr-1'>✓</span>
                    Crear
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

