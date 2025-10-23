import { type Root, type Content, type Trigger } from '@radix-ui/react-popover'
import { HelpCircle } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover'

type LearnMoreProps = React.ComponentProps<typeof Root> & {
  contentProps?: React.ComponentProps<typeof Content>
  triggerProps?: React.ComponentProps<typeof Trigger>
}

export function LearnMore({
  children,
  contentProps,
  triggerProps,
  ...props
}: LearnMoreProps) {
  return (

    //TODO: Chekear este componente porque al pasarle props al popover, se genera un error, los docs de shadcn lo muestran mas simple de manejar.
    <Popover {...props}>
      <PopoverTrigger
        asChild
        // Remove any invalid popover prop from triggerProps before spreading
        {...(triggerProps
          ? Object.fromEntries(
              Object.entries(triggerProps).filter(([key]) => key !== 'popover')
            )
          : {})}
        className={cn('size-5 rounded-full', triggerProps?.className)}
      >
        <Button variant='outline' size='icon'>
          <span className='sr-only'>Learn more</span>
          <HelpCircle className='size-4 [&>circle]:hidden' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='top'
        align='start'
        // Remove any invalid popover prop from contentProps before spreading
        {...(contentProps
          ? Object.fromEntries(
              Object.entries(contentProps).filter(([key]) => key !== 'popover')
            )
          : {})}
        className={cn('text-muted-foreground text-sm', contentProps?.className)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
