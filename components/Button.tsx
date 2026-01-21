import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonProps = {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  className?: string
}

export function Button({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-plum-500 text-white hover:bg-plum-600 active:bg-plum-700 focus:ring-plum-100',
    secondary: 'bg-white text-neutral-800 hover:bg-neutral-50 focus:ring-plum-100',
  }

  const sizes = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const isExternal = href.startsWith('http')

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  return <Link href={href} className={classes}>{children}</Link>
}
