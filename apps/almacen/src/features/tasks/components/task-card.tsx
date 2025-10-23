import { format } from 'date-fns'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { cn } from '@workspace/ui/lib/utils'
import { es } from 'date-fns/locale'
import { Pencil, Trash2 } from 'lucide-react'
import { labels, priorities, statuses } from '../data/data'
import { type Task } from '../data/schema'

type TaskCardProps = {
  task: Task & {
    createdAt: Date
    updatedAt: Date
    assignee: string
    description: string
    dueDate: Date
  }
}

const statusColors = {
  backlog: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200',
  todo: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
  'in progress': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
  done: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
  canceled: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
}

const labelColors = {
  bug: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200',
  feature: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200',
  documentation: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200',
}

export function TaskCard({ task }: TaskCardProps) {
  const status = statuses.find((s) => s.value === task.status)
  const priority = priorities.find((p) => p.value === task.priority)
  const label = labels.find((l) => l.value === task.label)

  return (
    <div className='bg-background flex flex-col gap-3 rounded-md border p-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0'>
          <div className='text-muted-foreground text-xs'>Task ID</div>
          <div className='font-medium'>{task.id}</div>
        </div>
        <div className='flex items-center gap-2'>
          <Badge
            variant='outline'
            className={cn('capitalize', statusColors[task.status as keyof typeof statusColors])}
          >
            {status?.label || task.status}
          </Badge>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <DotsHorizontalIcon className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[180px]'>
              <DropdownMenuItem>
                <Pencil size={16} className='opacity-60' aria-hidden='true' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className='text-red-500!'>
                <Trash2 size={16} className='opacity-60' aria-hidden='true' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Title</div>
        <div className='font-semibold break-words'>
          {task.title}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Description</div>
        <div className='break-words text-sm'>{task.description}</div>
      </div>

      <div className='space-y-1'>
        <div className='text-muted-foreground text-xs'>Assignee</div>
        <div className='break-words'>{task.assignee}</div>
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        <Badge
          variant='outline'
          className={cn('capitalize', priorityColors[task.priority as keyof typeof priorityColors])}
        >
          {priority?.label || task.priority}
        </Badge>
        <Badge
          variant='outline'
          className={cn('capitalize', labelColors[task.label as keyof typeof labelColors])}
        >
          {label?.label || task.label}
        </Badge>
      </div>

      <div className='text-muted-foreground flex items-center justify-between text-sm'>
        <div>
          <span className='me-1'>Due:</span>
          <span className='text-foreground'>
            {format(task.dueDate, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
        <div>
          <span className='me-1'>Updated:</span>
          <span className='text-foreground'>
            {format(task.updatedAt, 'dd/MM/yyyy', { locale: es })}
          </span>
        </div>
      </div>
    </div>
  )
}
