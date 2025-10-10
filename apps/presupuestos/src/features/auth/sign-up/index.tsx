import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import { SignUpForm } from './components/sign-up-form'

export function SignUp() {
  return (
    <div className='mx-auto flex flex-col items-center justify-center gap-4 py-8 md:h-screen'>
      <Card className='w-full max-w-2xl gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Crear una cuenta
          </CardTitle>
          <CardDescription>
            En el periodo de prueba tendrás acceso a 2 proyectos y 6 usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <div className='mt-4 text-center text-sm'>
            ¿Ya tienes cuenta?{' '}
            <Link to='/sign-in' className='text-primary hover:underline'>
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
