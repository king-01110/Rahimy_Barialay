import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-xl shadow-slate-300/30 backdrop-blur-md sm:p-5 md:p-6 dark:border-white/10 dark:bg-slate-950/40 dark:shadow-slate-950/20',
        className,
      )}
      {...props}
    />
  )
}
