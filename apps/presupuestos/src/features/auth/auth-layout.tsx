
type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='flex'>
        <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Login" className='w-1/2 h-screen object-cover' />
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex-col text-center items-center justify-center'>
          <h1 className='text-4xl font-bold'>CP360°</h1>
          <p className='uppercase text-muted-foreground'>Presupuestos</p>
        </div>
        {children}
      </div>
      </div>
    </div>
  )
}
