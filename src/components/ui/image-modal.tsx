'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
          aria-label="Cerrar imagen"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div 
          className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={0}
            className="w-full h-auto object-contain max-h-[80vh]"
            style={{ height: 'auto' }}
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}