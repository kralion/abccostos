import { type Table } from '@tanstack/react-table'
import { Button } from "@workspace/ui/components/button"
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { getPageNumbers } from "@workspace/ui/lib/utils"


type DataTablePaginationControlsProps<TData> = {
    table: Table<TData>
  } 

  export function DataTablePaginationControls<TData>({
    table,
  }: DataTablePaginationControlsProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()
    const pageNumbers = getPageNumbers(currentPage, totalPages)
  return (
    <div className='flex items-center sm:space-x-6 lg:space-x-8'>
    <div className='flex w-[100px] items-center justify-center text-sm font-medium @max-3xl/content:hidden'>
      Página {currentPage} de {totalPages}
    </div>
    <div className='flex items-center space-x-2'>
      <Button
        variant='outline'
        className='size-8 p-0 @max-md/content:hidden'
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <span className='sr-only'>Ir a la primera página</span>
        <DoubleArrowLeftIcon className='h-4 w-4' />
      </Button>
      <Button
        variant='outline'
        className='size-8 p-0'
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <span className='sr-only'>Ir a la página anterior</span>
        <ChevronLeftIcon className='h-4 w-4' />
      </Button>

      {/* Page number buttons */}
      {pageNumbers.map((pageNumber, index) => (
        <div key={`${pageNumber}-${index}`} className='flex items-center'>
          {pageNumber === '...' ? (
            <span className='text-muted-foreground px-1 text-sm'>...</span>
          ) : (
            <Button
              variant={currentPage === pageNumber ? 'default' : 'outline'}
              className='h-8 min-w-8 px-2'
              onClick={() => table.setPageIndex((pageNumber as number) - 1)}
            >
              <span className='sr-only'>Ir a la página {pageNumber}</span>
              {pageNumber}
            </Button>
          )}
        </div>
      ))}

      <Button
        variant='outline'
        className='size-8 p-0'
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <span className='sr-only'>Ir a la página siguiente</span>
        <ChevronRightIcon className='h-4 w-4' />
      </Button>
      <Button
        variant='outline'
        className='size-8 p-0 @max-md/content:hidden'
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <span className='sr-only'>Ir a la última página</span>
        <DoubleArrowRightIcon className='h-4 w-4' />
      </Button>
    </div>
  </div>
  )
}