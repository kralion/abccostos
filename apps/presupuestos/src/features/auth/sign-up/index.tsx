import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@workspace/ui/components/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs'
import { CompanyForm } from './components/company-form'
import { SingleUserForm } from './components/single-user-form'

export function SignUp() {
  return (
    <div className='flex flex-col gap-4  mx-auto items-center justify-center h-screen'>

    
      <Card className='gap-4 w-xl sm:w-[480px]'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Crear una cuenta
          </CardTitle>
          <CardDescription>
            Elige tu tipo de cuenta y completa tus datos para crear una cuenta. <br />
            Ya tienes una cuenta?{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4'
            >
              Iniciar sesión
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single-user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single-user">Usuario Individual</TabsTrigger>
              <TabsTrigger value="company">Empresa</TabsTrigger>
            </TabsList>
            <TabsContent value="single-user" className="mt-4">
              <SingleUserForm />
            </TabsContent>
            <TabsContent value="company" className="mt-4">
              <CompanyForm />
            </TabsContent>
          </Tabs>
        </CardContent>
        
      </Card>
      </div>
  )
}
