import { cn } from "@workspace/ui/lib/utils"

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

function Skeleton({ className, children, ...props }: SkeletonProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children' | 'popover'>) {
  // Filter out potentially problematic props for React 19 compatibility
  const { popover, ...safeProps } = props as any;
  
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...safeProps}
    >
      {children}
    </div>
  )
}

export { Skeleton }
