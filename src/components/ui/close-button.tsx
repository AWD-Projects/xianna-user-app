import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CloseButtonProps {
  onClick?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'outline'
  disabled?: boolean
}

export function CloseButton({ 
  onClick, 
  className,
  size = 'md',
  variant = 'default',
  disabled = false,
  ...props 
}: CloseButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const variantClasses = {
    default: 'bg-white text-pink-600 hover:bg-gray-50 shadow-sm',
    ghost: 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-pink-600',
    outline: 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-pink-600'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl',
        'transition-all duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:scale-105 active:scale-95',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <X className={cn(iconSizes[size], 'transition-transform duration-200')} />
    </button>
  )
}
