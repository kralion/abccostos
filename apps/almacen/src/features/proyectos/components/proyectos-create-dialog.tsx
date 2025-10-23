import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@workspace/ui/components/dialog'
import { Button } from '@workspace/ui/components/button'
import { Plus, Lock } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { ProyectosCreatePresupuestoVenta } from './proyectos-create-presupuesto-venta'
import { ProyectosCreatePresupuestoMeta } from './proyectos-create-presupuesto-meta'

interface ProyectosCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: {
    codigo: string
    nombreDeProyecto: string
  } | null
}

export function ProyectosCreateDialog({
  open,
  onOpenChange,
}: ProyectosCreateDialogProps) {
  const [hasVenta, setHasVenta] = useState(false)
  const [hasMeta, setHasMeta] = useState(false)
  const [openVentaDialog, setOpenVentaDialog] = useState(false)
  const [openMetaDialog, setOpenMetaDialog] = useState(false)

  const handleCreateVenta = () => {
    setOpenVentaDialog(true)
  }

  const handleCreateMeta = () => {
    setOpenMetaDialog(true)
  }

  const handleCreateAnalisis = () => {
    // TODO: Implement create Análisis presupuesto
    console.log('Creating Análisis presupuesto')
  }

  return (
    <>
      <ProyectosCreatePresupuestoVenta
        open={openVentaDialog}
        onOpenChange={setOpenVentaDialog}
        onSuccess={() => setHasVenta(true)}
      />

      <ProyectosCreatePresupuestoMeta
        open={openMetaDialog}
        onOpenChange={setOpenMetaDialog}
        onSuccess={() => setHasMeta(true)}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Modal Crear Presupuesto</DialogTitle>
          <DialogDescription>Presupuestos del Proyecto</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Venta Section */}
          <div className='rounded-lg border p-4'>
            <div className='mb-3 flex items-center gap-2'>
              <div className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
                📊
              </div>
              <h3 className='font-medium'>Venta</h3>
            </div>
            <Button
              onClick={handleCreateVenta}
              disabled={hasVenta}
              className='w-full'
              variant='outline'
            >
              <Plus className='mr-2 h-4 w-4' />
              Crear Presupuesto
            </Button>
          </div>

          {/* Meta Section */}
          <div
            className={cn(
              'rounded-lg border p-4',
              !hasVenta && 'opacity-50'
            )}
          >
            <div className='mb-3 flex items-center gap-2'>
              <div className='flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs'>
                🎯
              </div>
              <h3 className='font-medium text-muted-foreground'>Meta</h3>
              {!hasVenta && <Lock className='ml-auto h-4 w-4 text-muted-foreground' />}
            </div>
            <Button
              onClick={handleCreateMeta}
              disabled={!hasVenta || hasMeta}
              className='w-full'
              variant='outline'
            >
              {!hasVenta ? (
                <>
                  <Lock className='mr-2 h-4 w-4' />
                  Requiere Crear Presupuesto Venta
                </>
              ) : (
                <>
                  <Plus className='mr-2 h-4 w-4' />
                  Crear Presupuesto
                </>
              )}
            </Button>
          </div>

          {/* Análisis de Desviación Section */}
          <div
            className={cn(
              'rounded-lg border p-4',
              !hasMeta && 'opacity-50'
            )}
          >
            <div className='mb-3 flex items-start gap-2'>
              <div className='flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs'>
                📈
              </div>
              <div className='flex-1'>
                <h3 className='font-medium text-muted-foreground'>
                  Análisis de Desviación
                </h3>
                <p className='text-xs text-muted-foreground'>Venta vs Meta</p>
              </div>
              {!hasMeta && <Lock className='h-4 w-4 text-muted-foreground' />}
            </div>
            <Button
              onClick={handleCreateAnalisis}
              disabled={!hasMeta}
              className='w-full'
              variant='outline'
            >
              {!hasMeta ? (
                <>
                  <Lock className='mr-2 h-4 w-4' />
                  Requiere Crear Presupuesto Meta
                </>
              ) : (
                <>
                  <Plus className='mr-2 h-4 w-4' />
                  Crear Análisis
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            <span className='mr-1'>✕</span>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}

