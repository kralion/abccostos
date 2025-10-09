import { PasswordInput } from '@/components/password-input'
import { useAuthStore } from '@/stores/auth-store'
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
import { cn, sleep } from '@workspace/ui/lib/utils'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Por favor ingresa tu correo electrónico' : undefined),
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
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Mock successful authentication
    const mockUser = {
      accountNo: 'ACC001',
      email: data.email,
      role: ['user'],
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    }

    toast.promise(sleep(2000), {
      loading: 'Iniciando sesión...',
      success: () => {
        setIsLoading(false)

        // Set user and access token
        auth.setUser(mockUser)
        auth.setAccessToken('mock-access-token')

        // Redirect to the stored location or default to dashboard
        const targetPath = redirectTo || '/'
        navigate({ to: targetPath, replace: true })

        return `¡Bienvenido de nuevo, ${data.email}!`
      },
      error: 'Error',
    })
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
                <Input placeholder='nombre@ejemplo.com' {...field} />
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

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2 uppercase'>
              O inicia sesión con
            </span>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-2'>
          <Button variant='outline' type='button' disabled={isLoading}>
            <img src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000' alt='Google' className='h-4 w-4' /> 
            Google
          </Button>
          <Button variant='outline' type='button' disabled={isLoading}>
            <img src='https://img.icons8.com/?size=100&id=22989&format=png&color=000000' alt='Microsoft' className='h-4 w-4' />
            Microsoft
          </Button>
          <Button variant='outline' type='button' disabled={isLoading}>
            <img src='https://img.icons8.com/?size=100&id=118497&format=png&color=000000' alt='Facebook' className='h-4 w-4' />
            Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
