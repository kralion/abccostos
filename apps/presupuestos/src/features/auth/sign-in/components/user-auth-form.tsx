import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
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
import { cn } from '@workspace/ui/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@workspace/supabase/client'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === '' ? 'Por favor ingresa tu correo electrónico' : undefined,
  }),
  password: z
    .string()
    .min(1, 'Por favor ingresa tu contraseña')
    .min(7, 'La contraseña debe tener al menos 7 caracteres'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error(error.message || 'Error al iniciar sesión')
        setIsLoading(false)
        return
      }

      if (authData.user && authData.session) {
        await setAuth(authData.user, authData.session)

        const { usuario } = useAuthStore.getState()
        const welcomeMessage = usuario?.nombres
          ? `¡Bienvenid@ de nuevo, ${usuario.nombres}!`
          : '¡Bienvenid@ de nuevo!'

        toast.success(welcomeMessage)

        const getDefaultRoute = (rol?: 'propietario' | 'principal' | 'secundario') => {
          switch (rol) {
            case 'propietario':
              return '/dashboard-propietario'
            case 'principal':
              return '/dashboard-principal'
            case 'secundario':
              return '/'
            default:
              return '/'
          }
        }
        const targetPath = redirectTo || getDefaultRoute(usuario?.rol as 'propietario' | 'principal' | 'secundario')
        navigate({ to: targetPath, replace: true })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Error inesperado al iniciar sesión')
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-6', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder='presupuestos@mail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <FormItem className='flex items-center gap-2'>
            <Checkbox />
            <FormLabel>Recordarme</FormLabel>
          </FormItem>
          <Link
            to='/forgot-password'
            className='text-muted-foreground text-sm font-medium hover:opacity-75'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : null}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  )
}
