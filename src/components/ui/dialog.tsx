'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      <div className="relative z-[10000]">
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ className, children }: DialogContentProps) => {
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto",
      className
    )}>
      {children}
    </div>
  )
}

const DialogHeader = ({ className, children }: DialogHeaderProps) => {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left mb-4", className)}>
      {children}
    </div>
  )
}

const DialogTitle = ({ className, children }: DialogTitleProps) => {
  return (
    <h2 className={cn("text-xl font-semibold text-gray-900", className)}>
      {children}
    </h2>
  )
}

const DialogClose = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </button>
  )
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose }