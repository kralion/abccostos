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
import { Label } from '@workspace/ui/components/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'
import {
  RadioGroup,
  RadioGroupItem,
} from '@workspace/ui/components/radio-group'
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
import { PasswordInput } from '@/components/password-input'

const paises = [
  { value: 'MX', label: 'México' },
  { value: 'PE', label: 'Perú' },
  { value: 'CO', label: 'Colombia' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'ES', label: 'España' },
]

const codigosPais = [
  { value: '+52', label: 'México +52' },
  { value: '+51', label: 'Perú +51' },
  { value: '+57', label: 'Colombia +57' },
  { value: '+54', label: 'Argentina +54' },
  { value: '+56', label: 'Chile +56' },
  { value: '+34', label: 'España +34' },
]

const erp_modulos = [
  {
    value: 'presupuestos',
    label: 'Presupuestos',
    description: 'Gestión y control de presupuestos de proyectos.',
    icon: 'https://img.icons8.com/?size=200&id=DDLGU9cwERZ7&format=png&color=000000',
  },
  {
    value: 'almacen',
    label: 'Almacén',
    description: 'Control de inventario y gestión de almacén.',
    icon: 'https://img.icons8.com/?size=200&id=hKepmvfgIMyK&format=png&color=000000',
  },
] as const

const formSchema = z
  .object({
    nombreEmpresa: z
      .string()
      .min(1, 'Por favor ingrese el nombre de la empresa')
      .min(3, 'Nombre debe tener al menos 3 caracteres'),
    pais: z.string().min(1, 'Por favor seleccione un país'),
    nombre: z
      .string()
      .min(1, 'Por favor ingrese su nombre')
      .min(2, 'Nombre debe tener al menos 2 caracteres'),
    apellido: z
      .string()
      .min(1, 'Por favor ingrese su apellido')
      .min(2, 'Apellido debe tener al menos 2 caracteres'),
    email: z.email({
      error: (iss) =>
        iss.input === '' ? 'Por favor ingrese su email' : 'Email inválido',
    }),
    codigoPais: z.string().min(1, 'Por favor seleccione un código de país'),
    telefono: z
      .string()
      .min(1, 'Por favor ingrese su teléfono')
      .min(7, 'Teléfono debe tener al menos 7 dígitos'),
    contraseña: z
      .string()
      .min(1, 'Por favor ingrese su contraseña')
      .min(8, 'Contraseña debe tener al menos 8 caracteres'),
    confirmarContraseña: z.string().min(1, 'Por favor confirme su contraseña'),
    numeroUsuarios: z
      .number()
      .min(1, 'Por favor ingrese el número de usuarios'),
    numeroProyectos: z
      .number()
      .min(1, 'Por favor ingrese el número de proyectos'),
    modulo: z.enum(erp_modulos.map((m) => m.value) as [string, ...string[]], {
      error: (iss) =>
        iss.input === undefined ? 'Por favor seleccione un módulo' : undefined,
    }),
    fechaInicioFacturacion: z.date({
      error: (iss) =>
        iss.input === undefined
          ? 'Por favor seleccione una fecha de inicio'
          : undefined,
    }),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContraseña'],
  })

interface ClientFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: {
    id: string
    nombreEmpresa: string
    email: string
    fechaInicioFacturacion: Date
    fechaFinFacturacion: Date
  } | null
}

export default function ClientForm({
  open,
  onOpenChange,
  currentRow,
}: ClientFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditMode = !!currentRow

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          nombreEmpresa: currentRow.nombreEmpresa,
          pais: '',
          nombre: '',
          apellido: '',
          email: currentRow.email,
          codigoPais: '',
          telefono: '',
          contraseña: '********',
          confirmarContraseña: '********',
          modulo: undefined,
          numeroUsuarios: 0,
          numeroProyectos: 0,
          fechaInicioFacturacion: currentRow.fechaInicioFacturacion,
        }
      : {
          nombreEmpresa: '',
          pais: '',
          nombre: '',
          apellido: '',
          email: '',
          codigoPais: '',
          telefono: '',
          contraseña: '',
          confirmarContraseña: '',
          modulo: undefined,
          numeroUsuarios: 0,
          numeroProyectos: 0,
          fechaInicioFacturacion: undefined,
        },
  })

  const fechaInicioFacturacion = form.watch('fechaInicioFacturacion')
  const fechaFinFacturacion = fechaInicioFacturacion
    ? new Date(fechaInicioFacturacion.getTime() + 30 * 24 * 60 * 60 * 1000)
    : null

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Convert modulo selection to boolean fields
      const moduloFields = erp_modulos.reduce(
        (acc, modulo) => ({
          ...acc,
          [`modulo_${modulo.value}`]: data.modulo === modulo.value,
        }),
        {}
      )

      const clientData = {
        ...data,
        ...moduloFields,
      }

      // TODO: Implement API call to create client
      console.log('Client data:', clientData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success('Cliente creado exitosamente')
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error creating client:', error)
      toast.error('Error al crear el cliente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Edita la información del cliente'
              : 'Crea un nuevo cliente para el ERP'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('grid grid-cols-1 gap-4 md:grid-cols-2')}
          >
            <FormField
              control={form.control}
              name='nombreEmpresa'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la empresa</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pais'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>País</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecciona un país' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paises.map((pais) => (
                        <SelectItem key={pais.value} value={pais.value}>
                          {pais.label}
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
              name='nombre'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='apellido'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='codigoPais'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código País</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='MX México +52' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {codigosPais.map((codigo) => (
                        <SelectItem key={codigo.value} value={codigo.value}>
                          {codigo.label}
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
              name='telefono'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='contraseña'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmarContraseña'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='numeroUsuarios'
              render={({ field }) => (
                <FormItem>
                  <FormLabel># Usuarios</FormLabel>
                  <FormControl>
                    <Input placeholder='6' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='numeroProyectos'
              render={({ field }) => (
                <FormItem>
                  <FormLabel># Proyectos</FormLabel>
                  <FormControl>
                    <Input placeholder='2' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='modulo'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Módulos</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='mt-3 grid gap-3 md:grid-cols-2'
                    >
                      {erp_modulos.map((modulo) => (
                        <Label
                          key={modulo.value}
                          htmlFor={modulo.value}
                          className={cn(
                            'hover:bg-accent flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors',
                            field.value === modulo.value && 'border-primary'
                          )}
                        >
                          <div className='flex gap-2'>
                            <img
                              src={modulo.icon}
                              alt={modulo.label}
                              className='size-10'
                            />
                            <div className='space-y-1'>
                              <p className='text-sm leading-none font-medium'>
                                {modulo.label}
                              </p>
                              <p className='text-muted-foreground text-xs'>
                                {modulo.description}
                              </p>
                            </div>
                          </div>
                          <RadioGroupItem
                            value={modulo.value}
                            id={modulo.value}
                          />
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fechaInicioFacturacion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Inicio Facturación</FormLabel>
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
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Fecha Fin Facturación</FormLabel>
              <div className='border-input bg-muted mt-2 flex h-10 w-full items-center rounded-md border px-3 py-2 text-sm'>
                {fechaFinFacturacion
                  ? format(fechaFinFacturacion, 'PPP', { locale: es })
                  : 'Se calculará automáticamente'}
              </div>
            </div>
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
                  'Crear Cliente'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
