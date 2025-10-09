import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils"

interface EmptyProps extends Omit<React.ComponentProps<"div">, "ref" | "popover"> {
  className?: string
  children?: React.ReactNode
}

function Empty({ className, ...props }: EmptyProps) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...safeProps}
    />
  )
}

function EmptyHeader({ className, ...props }: Omit<React.ComponentProps<"div">, "ref" | "popover">) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      )}
      {...safeProps}
    />
  )
}

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: Omit<React.ComponentProps<"div">, "ref" | "popover"> & VariantProps<typeof emptyMediaVariants>) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...safeProps}
    />
  )
}

function EmptyTitle({ className, ...props }: Omit<React.ComponentProps<"div">, "ref" | "popover">) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...safeProps}
    />
  )
}

function EmptyDescription({ className, ...props }: Omit<React.ComponentProps<"p">, "ref" | "popover">) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...safeProps}
    />
  )
}

function EmptyContent({ className, ...props }: Omit<React.ComponentProps<"div">, "ref" | "popover">) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...safeProps}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}