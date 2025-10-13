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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { estados, tipos } from '../data/data'

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, 'Por favor ingrese el código')
    .min(3, 'Código debe tener al menos 3 caracteres'),
  nombreDeProyecto: z
    .string()
    .min(1, 'Por favor ingrese el nombre del proyecto')
    .min(3, 'Nombre debe tener al menos 3 caracteres'),
  nombreCorto: z
    .string()
    .min(1, 'Por favor ingrese el nombre corto')
    .min(3, 'Nombre corto debe tener al menos 3 caracteres'),
  estado: z.enum(['activo', 'terminado', 'en ejecucion'], {
    error: (iss) =>
      iss.input === undefined ? 'Por favor seleccione un estado' : undefined,
  }),
  fechaBase: z.date({
    error: (iss) =>
      iss.input === undefined
        ? 'Por favor seleccione una fecha base'
        : undefined,
  }),
  plazo: z.string().min(1, 'Por favor ingrese el plazo'),
  tipo: z.enum(['venta', 'meta'], {
    error: (iss) =>
      iss.input === undefined ? 'Por favor seleccione un tipo' : undefined,
  }),
})

interface ProyectoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: {
    codigo: string
    nombreDeProyecto: string
    nombreCorto: string
    estado: 'activo' | 'terminado' | 'en ejecucion'
    fechaBase: Date
    plazo: string
    tipo: 'venta' | 'meta'
  } | null
}

export default function ProyectoForm({
  open,
  onOpenChange,
  currentRow,
}: ProyectoFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!currentRow

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          codigo: currentRow.codigo,
          nombreDeProyecto: currentRow.nombreDeProyecto,
          nombreCorto: currentRow.nombreCorto,
          estado: currentRow.estado,
          fechaBase: currentRow.fechaBase,
          plazo: currentRow.plazo,
          tipo: currentRow.tipo,
        }
      : {
          codigo: '',
          nombreDeProyecto: '',
          nombreCorto: '',
          estado: undefined,
          fechaBase: undefined,
          plazo: '',
          tipo: undefined,
        },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // TODO: Implement API call to create/update proyecto
      console.log('Proyecto data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success(
        isEditMode
          ? 'Proyecto actualizado exitosamente'
          : 'Proyecto creado exitosamente'
      )
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving proyecto:', error)
      toast.error(
        isEditMode
          ? 'Error al actualizar el proyecto'
          : 'Error al crear el proyecto'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edita la información del proyecto'
              : 'Crea un nuevo proyecto'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('grid grid-cols-1 gap-4 md:grid-cols-2')}
          >
            <FormField
              control={form.control}
              name='codigo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código</FormLabel>
                  <FormControl>
                    <Input placeholder='001' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='tipo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecciona un tipo' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tipos.map((tipo) => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nombreDeProyecto'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Nombre De Proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder='Mejoramiento de...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nombreCorto'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Nombre Corto</FormLabel>
                  <FormControl>
                    <Input placeholder='Penal - Puno' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='estado'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecciona un estado' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {estados.map((estado) => (
                        <SelectItem key={estado.value} value={estado.value}>
                          {estado.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fechaBase'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Base</FormLabel>
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
                            <span>Selecciona una fecha</span>
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
            <FormField
              control={form.control}
              name='plazo'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Plazo</FormLabel>
                  <FormControl>
                    <Input placeholder='25 meses' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='mt-8 flex gap-2 md:col-span-2'>
              <Button
                type='button'
                variant='outline'
                className='flex-1'
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button className='flex-1' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {isEditMode ? 'Guardando...' : 'Creando...'}
                  </>
                ) : isEditMode ? (
                  'Guardar Cambios'
                ) : (
                  'Crear Proyecto'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
