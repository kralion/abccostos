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
import { Textarea } from '@workspace/ui/components/textarea'
import { cn } from '@workspace/ui/lib/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z
  .object({
    razonSocial: z
      .string()
      .min(1, 'Por favor ingrese la razón social')
      .min(3, 'Razón social debe tener al menos 3 caracteres'),
    nombreCorto: z
      .string()
      .min(1, 'Por favor ingrese el nombre corto')
      .min(2, 'Nombre corto debe tener al menos 2 caracteres'),
    correo: z.email({
      error: (iss) =>
        iss.input === '' ? 'Por favor ingrese el correo' : 'Correo inválido',
    }),
    direccionFiscal: z
      .string()
      .min(1, 'Por favor ingrese la dirección fiscal')
      .min(10, 'Dirección fiscal debe tener al menos 10 caracteres'),
    direccionOficina: z
      .string()
      .min(1, 'Por favor ingrese la dirección de oficina')
      .min(10, 'Dirección de oficina debe tener al menos 10 caracteres'),
    ruc: z
      .string()
      .min(1, 'Por favor ingrese el RUC')
      .regex(/^\d{11}$/, 'RUC debe tener 11 dígitos'),
    telefono: z
      .string()
      .min(1, 'Por favor ingrese el teléfono')
      .regex(/^\d{9}$/, 'Teléfono debe tener 9 dígitos'),
    descripcionEmpresa: z
      .string()
      .min(1, 'Por favor ingrese la descripción de la empresa')
      .min(20, 'Descripción debe tener al menos 20 caracteres'),
    responsable: z
      .string()
      .min(1, 'Por favor ingrese el nombre del responsable')
      .min(3, 'Nombre del responsable debe tener al menos 3 caracteres'),
    logoEmpresa: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        'El archivo debe ser menor a 5MB'
      )
      .refine(
        (file) =>
          !file ||
          ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
            file.type
          ),
        'Solo se permiten archivos de imagen (JPEG, PNG, WebP)'
      ),
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

export function CompanyForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razonSocial: '',
      nombreCorto: '',
      correo: '',
      direccionFiscal: '',
      direccionOficina: '',
      ruc: '',
      telefono: '',
      descripcionEmpresa: '',
      responsable: '',
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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      form.setValue('logoEmpresa', file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid grid-cols-2 gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='razonSocial'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón Social</FormLabel>
              <FormControl>
                <Input placeholder='Empresa S.A.C.' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nombreCorto'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Corto</FormLabel>
              <FormControl>
                <Input placeholder='Empresa' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='correo'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder='contacto@empresa.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='direccionFiscal'
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Dirección Fiscal</FormLabel>
              <FormControl>
                <Input placeholder='Av. Principal 123, Lima' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='direccionOficina'
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Dirección Oficina</FormLabel>
              <FormControl>
                <Input placeholder='Jr. Secundario 456, Lima' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='ruc'
          render={({ field }) => (
            <FormItem>
              <FormLabel>RUC</FormLabel>
              <FormControl>
                <Input placeholder='12345678901' {...field} />
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
          name='descripcionEmpresa'
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Descripción de la Empresa</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe tu empresa...'
                  className='min-h-[80px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='responsable'
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Responsable</FormLabel>
              <FormControl>
                <Input placeholder='Juan Pérez García' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='logoEmpresa'
          render={() => (
            <FormItem className="col-span-2">
              <FormLabel>Logo de la Empresa</FormLabel>
              <FormControl>
                <div className='space-y-2'>
                  {logoPreview && (
                    <div className='flex justify-center'>
                      <img
                        src={logoPreview}
                        alt='Logo preview'
                        className='h-20 w-20 object-contain border rounded'
                      />
                    </div>
                  )}
                  <div className='flex items-center justify-center gap-2'>
                    <Input
                      type='file'
                      accept='image/*'
                      onChange={handleLogoChange}
                      className='hidden'
                      id='logo-upload'
                    />
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() =>
                        document.getElementById('logo-upload')?.click()
                      }
                      className='w-full max-w-xs'
                    >
                      {logoPreview ? 'Cambiar Logo' : 'Subir Logo'}
                    </Button>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contraseña'
          render={({ field }) => (
            <FormItem className="col-span-2">
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
            <FormItem className="col-span-2">
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2 col-span-2' disabled={isLoading}>
          Crear Cuenta Empresarial
        </Button>
      </form>
    </Form>
  )
}
