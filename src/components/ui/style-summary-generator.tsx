'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import type { UserProfile, Style } from '@/types'

interface StyleSummaryGeneratorProps {
  profile: UserProfile
  style: Style
  className?: string
}

export function StyleSummaryGenerator({ profile, style, className }: StyleSummaryGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummaryImage = async () => {
    setIsGenerating(true)
    
    try {
      // Wait a moment to show loading state
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Set canvas size optimized for Instagram Stories (9:16 ratio)
      canvas.width = 1080
      canvas.height = 1920

      // Create elegant minimalist background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, '#FAFAFA')
      bgGradient.addColorStop(0.3, '#FFFFFF')
      bgGradient.addColorStop(0.7, '#F8FAFC')
      bgGradient.addColorStop(1, '#F1F5F9')
      
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle texture with very light dots
      ctx.globalAlpha = 0.03
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = '#E61F93'
        ctx.beginPath()
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          1 + Math.random() * 2,
          0, 2 * Math.PI
        )
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Top decorative element - thin colored line
      ctx.fillStyle = '#E61F93'
      ctx.fillRect(0, 0, canvas.width, 8)

      // Load and draw the actual Xianna logo
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      
      await new Promise<void>((resolve, reject) => {
        logoImg.onload = () => {
          // Calculate logo dimensions (maintain aspect ratio)
          const maxLogoWidth = 200
          const maxLogoHeight = 120
          const logoAspectRatio = logoImg.width / logoImg.height
          
          let logoWidth = maxLogoWidth
          let logoHeight = maxLogoWidth / logoAspectRatio
          
          if (logoHeight > maxLogoHeight) {
            logoHeight = maxLogoHeight
            logoWidth = maxLogoHeight * logoAspectRatio
          }
          
          // Center the logo
          const logoX = (canvas.width - logoWidth) / 2
          const logoY = 60
          
          // Draw the logo
          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight)
          resolve()
        }
        logoImg.onerror = () => {
          console.error('Failed to load logo, using fallback')
          // Fallback to text-based branding
          ctx.textAlign = 'center'
          ctx.fillStyle = '#1F2937'
          ctx.font = '32px Inter, Arial, sans-serif'
          ctx.letterSpacing = '4px'
          ctx.fillText('X I A N N A', canvas.width / 2, 120)
          ctx.letterSpacing = '0px'
          resolve()
        }
        logoImg.src = 'https://rskbayibhrapatiysrzm.supabase.co/storage/v1/object/public/xianna/xianna.png'
      })

      // User name with elegant style
      ctx.textAlign = 'center'
      ctx.fillStyle = '#374151'
      ctx.font = '38px Inter, Arial, sans-serif'
      ctx.fillText(profile.nombre || 'Tu Estilo Personal', canvas.width / 2, 230)

      // Main style section
      const centerY = canvas.height / 2 - 50

      // Large style name with sophisticated typography
      ctx.fillStyle = '#E61F93'
      ctx.font = 'bold 96px Inter, Arial, sans-serif'
      
      // Add text shadow effect
      ctx.shadowColor = 'rgba(230, 31, 147, 0.2)'
      ctx.shadowBlur = 20
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 10
      
      ctx.fillText(style.tipo, canvas.width / 2, centerY)
      
      // Reset shadow
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      // Elegant underline
      const textWidth = ctx.measureText(style.tipo).width
      const lineY = centerY + 20
      const lineGradient = ctx.createLinearGradient(
        canvas.width / 2 - textWidth / 2, lineY,
        canvas.width / 2 + textWidth / 2, lineY
      )
      lineGradient.addColorStop(0, 'rgba(230, 31, 147, 0)')
      lineGradient.addColorStop(0.5, '#E61F93')
      lineGradient.addColorStop(1, 'rgba(230, 31, 147, 0)')
      
      ctx.strokeStyle = lineGradient
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2 - textWidth / 2, lineY)
      ctx.lineTo(canvas.width / 2 + textWidth / 2, lineY)
      ctx.stroke()

      // Calculate text dimensions first to determine box height
      ctx.fillStyle = '#4B5563'
      ctx.font = '28px Inter, Arial, sans-serif'
      ctx.textAlign = 'center'
      
      const maxWidth = canvas.width - 160
      const lineHeight = 42
      const words = style.descripcion.split(' ')
      let line = ''
      const lines: string[] = []

      // Calculate how many lines we need
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width
        
        if (testWidth > maxWidth && n > 0) {
          lines.push(line.trim())
          line = words[n] + ' '
        } else {
          line = testLine
        }
      }
      if (line.trim()) {
        lines.push(line.trim())
      }

      // Calculate dynamic box height based on content
      const textPadding = 80 // Top and bottom padding inside the box
      const boxHeight = (lines.length * lineHeight) + textPadding
      const descY = centerY + 120
      const boxPadding = 80
      
      // Subtle background box with dynamic height
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.roundRect(boxPadding, descY, canvas.width - (boxPadding * 2), boxHeight, 20)
      ctx.fill()
      
      // Box border
      ctx.strokeStyle = 'rgba(230, 31, 147, 0.1)'
      ctx.lineWidth = 1
      ctx.roundRect(boxPadding, descY, canvas.width - (boxPadding * 2), boxHeight, 20)
      ctx.stroke()

      // Draw the text lines
      ctx.fillStyle = '#4B5563'
      ctx.font = '28px Inter, Arial, sans-serif'
      ctx.textAlign = 'center'
      
      let y = descY + (textPadding / 2) + lineHeight - 10 // Start position with proper padding
      lines.forEach(textLine => {
        ctx.fillText(textLine, canvas.width / 2, y)
        y += lineHeight
      })

      // Elegant decorative elements
      // Side decorations
      ctx.fillStyle = '#00D1ED'
      ctx.globalAlpha = 0.6
      ctx.beginPath()
      ctx.arc(100, centerY - 200, 8, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.fillStyle = '#FDE12D'
      ctx.beginPath()
      ctx.arc(canvas.width - 100, centerY - 150, 6, 0, 2 * Math.PI)
      ctx.fill()

      ctx.fillStyle = '#E61F93'
      ctx.beginPath()
      ctx.arc(80, centerY + 100, 5, 0, 2 * Math.PI)
      ctx.fill()

      ctx.globalAlpha = 1

      // Bottom section with call to action
      const bottomY = canvas.height - 180
      
      // Elegant call to action
      ctx.fillStyle = '#6B7280'
      ctx.font = '24px Inter, Arial, sans-serif'
      ctx.fillText('Descubre tu estilo en', canvas.width / 2, bottomY)
      
      ctx.fillStyle = '#E61F93'
      ctx.font = 'bold 28px Inter, Arial, sans-serif'
      ctx.fillText('xianna.com.mx', canvas.width / 2, bottomY + 40)

      // Bottom decorative line
      ctx.fillStyle = '#E61F93'
      ctx.fillRect(0, canvas.height - 8, canvas.width, 8)

      // Generate image data URL and download immediately
      const imageDataUrl = canvas.toDataURL('image/png', 1.0)
      
      // Create download link and trigger download
      const link = document.createElement('a')
      link.download = `mi-estilo-${style.tipo.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = imageDataUrl
      link.click()
      
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setIsGenerating(false)
    }
  }


  return (
    <div className={className}>
      {/* Hidden canvas for generation */}
      <canvas 
        ref={canvasRef} 
        className="hidden" 
        width={1080} 
        height={1920}
      />

      {/* Single action button */}
      <Button
        onClick={generateSummaryImage}
        disabled={isGenerating}
        className="bg-gradient-to-r from-[#E61F93] to-[#00D1ED] hover:opacity-90 text-white font-semibold rounded-xl px-8 py-3 min-w-[200px]"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Generar resumen visual
          </>
        )}
      </Button>
    </div>
  )
}

// Helper function for rounded rectangles (if not available)
declare global {
  interface CanvasRenderingContext2D {
    roundRect(x: number, y: number, width: number, height: number, radius: number): void
  }
}

if (typeof CanvasRenderingContext2D !== 'undefined') {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.beginPath()
    this.moveTo(x + radius, y)
    this.lineTo(x + width - radius, y)
    this.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.lineTo(x + width, y + height - radius)
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.lineTo(x + radius, y + height)
    this.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.lineTo(x, y + radius)
    this.quadraticCurveTo(x, y, x + radius, y)
    this.closePath()
  }
}