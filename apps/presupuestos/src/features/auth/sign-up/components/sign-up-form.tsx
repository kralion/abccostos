import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select'
import { cn } from '@workspace/ui/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@/lib/supabase'
import { PasswordInput } from '@/components/password-input'

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
    aceptoTerminos: z.boolean().refine((val) => val === true, {
      message: 'Debe aceptar los términos de servicio y política de privacidad',
    }),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmarContraseña'],
  })

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

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreEmpresa: '',
      pais: '',
      nombre: '',
      apellido: '',
      email: '',
      codigoPais: '',
      telefono: '',
      contraseña: '',
      confirmarContraseña: '',
      aceptoTerminos: false,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.contraseña,
        options: {
          data: {
            nombre_empresa: data.nombreEmpresa,
            pais: data.pais,
            nombre: data.nombre,
            apellido: data.apellido,
            codigo_pais: data.codigoPais,
            telefono: data.telefono,
          },
        },
      })

      if (error) {
        toast.error(error.message || 'Error al crear la cuenta')
        setIsLoading(false)
        return
      }

      if (authData.user) {
        toast.success(
          '¡Cuenta creada exitosamente! Revisa tu correo para confirmar tu cuenta.'
        )

        if (authData.session) {
          setAuth(authData.user, authData.session)
          navigate({ to: '/', replace: true })
        } else {
          navigate({ to: '/sign-in', replace: true })
        }
      }
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error('Error inesperado al crear la cuenta')
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', className)}
        {...props}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <FormItem className='md:col-span-2'>
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
            <FormItem className='md:col-span-2'>
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
          name='aceptoTerminos'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-y-0 md:col-span-2'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel className='text-primary'>
                  Acepto los Términos de Servicio y Políticas
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button className='md:col-span-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : null}
          Iniciar mi prueba gratuita
        </Button>
      </form>
    </Form>
  )
}
