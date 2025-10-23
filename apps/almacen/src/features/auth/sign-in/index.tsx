import { useSearch } from '@tanstack/react-router'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>

     <div className='flex flex-col gap-6 mt-4 text-center'>
          <h2 className='text-xl font-semibold tracking-tight'>Iniciar sesión</h2>
        
          <UserAuthForm redirectTo={redirect} />
        
          <div className='flex flex-col gap-2 mt-4 text-sm justify-center items-center'>
          <p className='text-muted-foreground text-center '>
            Quieres crear una cuenta y empezar con CP60°?
            </p>
            <a
              href='/sign-up'
              className='hover:text-primary underline underline-offset-4'
            >
              Crear periodo de prueba gratuito
            </a>
           
            <a
              href='https://wa.me/51971419928?text=Hola%2C%20quisiera%20una%20demo%20de%20CP360%20Presupuestos'
              className='hover:text-primary underline underline-offset-4'
            >
              Agenda una demostración aqui
            </a>
            </div>
        </div>
    </AuthLayout>
  )
}
