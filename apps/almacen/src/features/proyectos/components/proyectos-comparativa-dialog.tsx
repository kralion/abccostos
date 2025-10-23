import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog'
import { cn } from '@workspace/ui/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ProyectosComparativaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProyectosComparativaDialog({
  open,
  onOpenChange,
}: ProyectosComparativaDialogProps) {
  // TODO: Fetch real data from API
  const presupuestoVenta = {
    estado: 'Finalizado',
    total: 2,
    monto: 25000.0,
  }

  const presupuestoMeta = {
    estado: 'Finalizado',
    total: 2,
    monto: 23500.0,
  }

  const analisisDesviacion = {
    desviacionTotal: -6.67,
    diferencia: 1500.0,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle>Presupuestos del Proyecto</DialogTitle>
        </DialogHeader>

        <div className='space-y-3 py-4'>
          {/* Presupuesto Venta */}
          <div className='rounded-lg border border-blue-200 bg-blue-50/50 p-4'>
            <div className='mb-3 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm'>
                  📊
                </div>
                <div>
                  <h3 className='font-semibold text-blue-900'>
                    Presupuesto Venta
                  </h3>
                  <p className='text-xs text-blue-700'>
                    Estado: {presupuestoVenta.estado}
                  </p>
                </div>
              </div>
              <CheckCircle2 className='h-5 w-5 text-green-600' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-blue-700'>Total</span>
                <span className='text-sm font-medium text-blue-900'>
                  {presupuestoVenta.total} items
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold text-blue-900'>
                  ${presupuestoVenta.monto.toFixed(2)}
                </span>
                <Button
                  variant='link'
                  className='h-auto p-0 text-blue-600 hover:text-blue-700'
                >
                  Ver detalle →
                </Button>
              </div>
            </div>
          </div>

          {/* Presupuesto Meta */}
          <div className='rounded-lg border border-purple-200 bg-purple-50/50 p-4'>
            <div className='mb-3 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-sm'>
                  🎯
                </div>
                <div>
                  <h3 className='font-semibold text-purple-900'>
                    Presupuesto Meta
                  </h3>
                  <p className='text-xs text-purple-700'>
                    Estado: {presupuestoMeta.estado}
                  </p>
                </div>
              </div>
              <CheckCircle2 className='h-5 w-5 text-green-600' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-purple-700'>Total</span>
                <span className='text-sm font-medium text-purple-900'>
                  {presupuestoMeta.total} items
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold text-purple-900'>
                  ${presupuestoMeta.monto.toFixed(2)}
                </span>
                <Button
                  variant='link'
                  className='h-auto p-0 text-purple-600 hover:text-purple-700'
                >
                  Ver detalle →
                </Button>
              </div>
            </div>
          </div>

          {/* Análisis de Desviaciones */}
          <div className='rounded-lg border border-orange-200 bg-orange-50/50 p-4'>
            <div className='mb-3 flex items-start justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-sm'>
                  📈
                </div>
                <div>
                  <h3 className='font-semibold text-orange-900'>
                    Análisis de Desviaciones
                  </h3>
                  <p className='text-xs text-orange-700'>
                    Comparativa Venta vs Meta
                  </p>
                </div>
              </div>
              <AlertCircle className='h-5 w-5 text-orange-600' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-orange-700'>
                  Desviación Total
                </span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    analisisDesviacion.desviacionTotal < 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  )}
                >
                  {analisisDesviacion.desviacionTotal}% abajo
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold text-orange-900'>
                  ${Math.abs(analisisDesviacion.diferencia).toFixed(2)}
                </span>
                <Button
                  variant='link'
                  className='h-auto p-0 text-orange-600 hover:text-orange-700'
                >
                  Ver análisis comparativo →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end pt-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
