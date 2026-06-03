import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30',
        outline:
          'border border-slate-300 bg-white text-slate-800 backdrop-blur hover:border-cyan-400/70 hover:bg-cyan-50 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-300/60 dark:hover:bg-white/10',
        ghost:
          'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
      },
      size: {
        default: 'h-11 min-h-11 px-5 text-sm sm:px-6 sm:text-base',
        sm: 'h-9 min-h-9 px-3 text-sm sm:px-4',
        lg: 'h-12 min-h-12 px-6 text-base sm:px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
