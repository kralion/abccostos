import { SearchIcon } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from '@workspace/ui/components/button'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({
  className = '',
  placeholder = 'Buscar Sección',
}: SearchProps) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant='outline'
      className={cn(
        'bg-muted/25 group text-muted-foreground hover:bg-accent relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:w-40 sm:pe-12 md:flex-none lg:w-40 xl:w-54',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon
        aria-hidden='true'
        className='absolute start-1.5 top-1/2 -translate-y-1/2'
        size={16}
      />
      <span className='ms-4'>{placeholder}</span>
    </Button>
  )
}
