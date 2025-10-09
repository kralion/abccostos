import { PasswordInput } from '@/components/password-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { cn } from '@workspace/ui/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    correo: z.email({
      error: (iss) =>
        iss.input === '' ? 'Por favor ingrese su correo' : 'Correo inválido',
    }),
    dni: z
      .string()
      .min(1, 'Por favor ingrese su DNI')
      .regex(/^\d{8}$/, 'DNI debe tener 8 dígitos'),
    nombreCompleto: z
      .string()
      .min(1, 'Por favor ingrese su nombre completo')
      .min(3, 'Nombre debe tener al menos 3 caracteres'),
    telefono: z
      .string()
      .min(1, 'Por favor ingrese su teléfono')
      .regex(/^\d{9}$/, 'Teléfono debe tener 9 dígitos'),
    limiteProyectos: z
      .number()
      .min(1, 'Límite de proyectos debe ser al menos 1')
      .max(100, 'Límite de proyectos máximo es 100'),
    limiteUsuarios: z
      .number()
      .min(1, 'Límite de usuarios debe ser al menos 1')
      .max(50, 'Límite de usuarios máximo es 50'),
    contraseña: z
      .string()
      .min(1, 'Por favor ingrese su contraseña')
      .min(8, 'Contraseña debe tener al menos 8 caracteres'),
    confirmarContraseña: z.string().min(1, 'Por favor confirme su contraseña'),
  })
  .refine((data) => data.contraseña === data.confirmarContraseña, {
    message: "Las contraseñas no coinciden",
    path: ['confirmarContraseña'],
  })

export function SingleUserForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: '',
      dni: '',
      nombreCompleto: '',
      telefono: '',
      limiteProyectos: 5,
      limiteUsuarios: 1,
      contraseña: '',
      confirmarContraseña: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // eslint-disable-next-line no-console
    console.log(data)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='correo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder='correo@ejemplo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dni'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder='12345678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nombreCompleto'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder='Juan Pérez García' {...field} />
              </FormControl>
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
                <Input placeholder='987654321' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='limiteProyectos'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Límite de Proyectos</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='5'
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='limiteUsuarios'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Límite de Usuarios</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='1'
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
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
                <PasswordInput placeholder='********' {...field} />
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
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          Crear Cuenta de Usuario
        </Button>
      </form>
    </Form>
  )
}
