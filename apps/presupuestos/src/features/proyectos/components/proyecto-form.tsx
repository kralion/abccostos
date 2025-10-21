import { useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import { Calendar } from '@workspace/ui/components/calendar'
import { Checkbox } from '@workspace/ui/components/checkbox'
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
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useCreateProyecto, useUpdateProyecto } from '@workspace/api-presupuestos/queries'
import type { Proyecto } from '@workspace/api-presupuestos/services'

// Removed tipos import - now using meta and venta boolean fields

const fileSchema = z.custom<File>((value) => value instanceof File, {
  message: 'Seleccione una imagen válida',
})

const formSchema = z.object({
  nombreDeProyecto: z
    .string()
    .min(1, 'Por favor ingrese el nombre del proyecto')
    .min(3, 'Nombre debe tener al menos 3 caracteres'),
  nombreCorto: z
    .string()
    .min(1, 'Por favor ingrese el nombre corto')
    .min(3, 'Nombre corto debe tener al menos 3 caracteres'),
  ubicacion: z.string().min(1, 'Por favor ingrese la ubicación'),
  fechaBase: z.date({
    error: (iss) =>
      iss.input === undefined
        ? 'Por favor seleccione una fecha base'
        : undefined,
  }),
  plazo: z.string().min(1, 'Por favor ingrese el plazo'),
  logoProyecto: fileSchema,
  meta: z.boolean(),
  venta: z.boolean(),
})

interface ProyectoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Proyecto | null
}

export default function ProyectoForm({
  open,
  onOpenChange,
  currentRow,
}: ProyectoFormProps) {
  const isEditMode = !!currentRow
  const createProyecto = useCreateProyecto()
  const updateProyecto = useUpdateProyecto()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          nombreDeProyecto: currentRow.nombreDeProyecto,
          nombreCorto: currentRow.nombreCorto,
          ubicacion: currentRow.ubicacion,
          fechaBase: new Date(currentRow.fechaBase),
          plazo: currentRow.plazo,
          logoProyecto: undefined,
          meta: currentRow.meta,
          venta: currentRow.venta,
        }
      : {
          nombreDeProyecto: '',
          nombreCorto: '',
          ubicacion: '',
          fechaBase: undefined,
          plazo: '',
          logoProyecto: undefined,
          meta: false,
          venta: false,
        },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const proyectoData = {
        codigo: currentRow?.codigo || `${Date.now()}`, // Generate unique code for new projects
        nombreDeProyecto: data.nombreDeProyecto,
        nombreCorto: data.nombreCorto,
        ubicacion: data.ubicacion,
        fechaBase: data.fechaBase.toISOString(),
        plazo: data.plazo,
        meta: data.meta,
        venta: data.venta,
        desviacion: currentRow?.desviacion || 0,
        estado: currentRow?.estado || 'activo',
      }

      if (isEditMode && currentRow?.id) {
        await updateProyecto.mutateAsync({
          id: currentRow.id,
          updates: proyectoData,
        })
      } else {
        await createProyecto.mutateAsync(proyectoData)
      }

      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving proyecto:', error)
    }
  }

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[500px]'>
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
              name='meta'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-y-0 space-x-3 md:col-span-1'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Meta</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='venta'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-y-0 space-x-3 md:col-span-1'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Venta</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='nombreDeProyecto'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Nombre completo</FormLabel>
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
                  <FormLabel>Nombre corto</FormLabel>
                  <FormControl>
                    <Input placeholder='Penal - Puno' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='ubicacion'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input placeholder='Ciudad, Dirección...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fechaBase'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Fecha Base</FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
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
                        onSelect={(date) => {
                          field.onChange(date)
                          setIsCalendarOpen(false)
                        }}
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
                  <FormLabel>Plazo del proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder='25 meses' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='logoProyecto'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Logo del proyecto</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? undefined)
                      }
                    />
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
                disabled={createProyecto.isPending || updateProyecto.isPending}
              >
                Cancelar
              </Button>
              <Button className='flex-1' disabled={createProyecto.isPending || updateProyecto.isPending}>
                {(createProyecto.isPending || updateProyecto.isPending) ? (
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
