'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
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
      await new Promise(resolve => setTimeout(resolve, 250))

      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Instagram Story 9:16
      canvas.width = 1080
      canvas.height = 1920

      const W = canvas.width
      const H = canvas.height

      // --- Helpers ---
      const roundRectPath = (x: number, y: number, w: number, h: number, r: number) => {
        const rr = Math.min(r, w / 2, h / 2)
        ctx.beginPath()
        ctx.moveTo(x + rr, y)
        ctx.lineTo(x + w - rr, y)
        ctx.quadraticCurveTo(x + w, y, x + w, y + rr)
        ctx.lineTo(x + w, y + h - rr)
        ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h)
        ctx.lineTo(x + rr, y + h)
        ctx.quadraticCurveTo(x, y + h, x, y + h - rr)
        ctx.lineTo(x, y + rr)
        ctx.quadraticCurveTo(x, y, x + rr, y)
        ctx.closePath()
      }

      const fillRoundedRect = (x: number, y: number, w: number, h: number, r: number, fill: string) => {
        roundRectPath(x, y, w, h, r)
        ctx.fillStyle = fill
        ctx.fill()
      }

      const strokeRoundedRect = (x: number, y: number, w: number, h: number, r: number, stroke: string, lw = 1) => {
        roundRectPath(x, y, w, h, r)
        ctx.strokeStyle = stroke
        ctx.lineWidth = lw
        ctx.stroke()
      }
      
      const measureTrackingWidth = (text: string, tracking: number) => {
        if (!text) return 0
        let w = 0
        for (const ch of text) w += ctx.measureText(ch).width + tracking
        return w - tracking
      }
      
      const truncateWithEllipsis = (text: string, maxWidth: number, tracking = 0) => {
        const ell = '…'
        const fullW = tracking ? measureTrackingWidth(text, tracking) : ctx.measureText(text).width
        if (fullW <= maxWidth) return text
      
        let out = text
        while (out.length > 1) {
          out = out.slice(0, -1)
          const test = out + ell
          const w = tracking ? measureTrackingWidth(test, tracking) : ctx.measureText(test).width
          if (w <= maxWidth) return test
        }
        return ell
      }

      // Canvas no soporta letterSpacing: hacemos tracking manual
      const drawTextTracking = (text: string, x: number, y: number, tracking = 0) => {
        let cursor = x
        for (const ch of text) {
          ctx.fillText(ch, cursor, y)
          cursor += ctx.measureText(ch).width + tracking
        }
      }

      const fitFontSize = (text: string, maxWidth: number, startPx: number, minPx: number) => {
        let size = startPx
        while (size > minPx) {
          ctx.font = `800 ${size}px Inter, Arial, sans-serif`
          if (ctx.measureText(text).width <= maxWidth) break
          size -= 4
        }
        return size
      }

      const wrapText = (text: string, maxWidth: number) => {
        const words = (text || '').trim().split(/\s+/)
        const lines: string[] = []
        let line = ''
        for (const w of words) {
          const test = line ? `${line} ${w}` : w
          if (ctx.measureText(test).width > maxWidth && line) {
            lines.push(line)
            line = w
          } else {
            line = test
          }
        }
        if (line) lines.push(line)
        return lines
      }

      const drawSoftShadowText = (text: string, x: number, y: number) => {
        ctx.save()
        ctx.shadowColor = 'rgba(0,0,0,0.35)'
        ctx.shadowBlur = 18
        ctx.shadowOffsetY = 10
        ctx.fillText(text, x, y)
        ctx.restore()
      }

      // "Glass panel" (sin blur real, pero look glass)
      const glassPanel = (x: number, y: number, w: number, h: number, r: number, alpha = 0.18) => {
        // fill
        const g = ctx.createLinearGradient(x, y, x, y + h)
        g.addColorStop(0, `rgba(255,255,255,${alpha + 0.10})`)
        g.addColorStop(1, `rgba(255,255,255,${alpha})`)
        fillRoundedRect(x, y, w, h, r, g as any)

        // subtle border
        strokeRoundedRect(x, y, w, h, r, 'rgba(255,255,255,0.28)', 1)
      }

      // --- Background image ---
      const supabase = createClient()
      const backgroundImg = new Image()
      backgroundImg.crossOrigin = 'anonymous'

      await new Promise<void>((resolve) => {
        backgroundImg.onload = () => {
          // cover
          const iw = backgroundImg.width
          const ih = backgroundImg.height
          const scale = Math.max(W / iw, H / ih)
          const dw = iw * scale
          const dh = ih * scale
          const dx = (W - dw) / 2
          const dy = (H - dh) / 2
          ctx.drawImage(backgroundImg, dx, dy, dw, dh)

          // overlay for contrast (top a little darker)
          const ov = ctx.createLinearGradient(0, 0, 0, H)
          ov.addColorStop(0, 'rgba(0,0,0,0.35)')
          ov.addColorStop(0.55, 'rgba(0,0,0,0.20)')
          ov.addColorStop(1, 'rgba(0,0,0,0.35)')
          ctx.fillStyle = ov
          ctx.fillRect(0, 0, W, H)
          resolve()
        }

        backgroundImg.onerror = () => {
          // gradient fallback
          const bg = ctx.createLinearGradient(0, 0, 0, H)
          bg.addColorStop(0, '#0B1220')
          bg.addColorStop(0.5, '#111827')
          bg.addColorStop(1, '#0B1220')
          ctx.fillStyle = bg
          ctx.fillRect(0, 0, W, H)
          resolve()
        }

        const styleName = `Estilo ${style.tipo}.jpg`
        const { data } = supabase.storage.from('Estilos').getPublicUrl(styleName)
        backgroundImg.src = data.publicUrl
      })

      // --- Layout constants ---
      const safeX = 70
      const safeTop = 80
      const safeBottom = 90

      // Accent gradient (brand)
      const brand = ctx.createLinearGradient(0, 0, W, 0)
      brand.addColorStop(0, '#E61F93')
      brand.addColorStop(0.6, '#FF1493')
      brand.addColorStop(1, '#00D1ED')

      // --- Header glass bar ---
      const headerH = 140
      glassPanel(safeX, safeTop, W - safeX * 2, headerH, 34, 0.16)

      // Accent strip inside header
      fillRoundedRect(safeX + 18, safeTop + 18, 10, headerH - 36, 8, '#E61F93')

      // Logo
      const logoImg = new Image()
      logoImg.crossOrigin = 'anonymous'
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve()
        logoImg.onerror = () => resolve()
        logoImg.src =
          'https://rskbayibhrapatiysrzm.supabase.co/storage/v1/object/public/xianna/xianna.png'
      })

      // Draw logo (if loaded)
      const logoMaxW = 200
      const logoMaxH = 128
      if (logoImg.width && logoImg.height) {
        const ar = logoImg.width / logoImg.height
        let lw = logoMaxW
        let lh = lw / ar
        if (lh > logoMaxH) {
          lh = logoMaxH
          lw = lh * ar
        }
        ctx.drawImage(logoImg, safeX + 40, safeTop + (headerH - lh) / 2, lw, lh)
      } else {
        // fallback text
        ctx.fillStyle = '#FFFFFF'
        ctx.font = '800 34px Inter, Arial, sans-serif'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText('XIANNA', safeX + 40, safeTop + headerH / 2)
      }

      // User name (right)
      // User name (right) — FIT + ELLIPSIS (sin que se corte)
      const name = (profile.nombre || 'TU ESTILO').toUpperCase()

      const nameRightX = W - safeX - 40
      const nameY = safeTop + 62

      // ancho disponible (desde donde termina el logo hasta el borde derecho)
      const leftBound = safeX + 260 // ajusta si tu logo crece
      const maxNameWidth = nameRightX - leftBound

      let nameFont = 28
      const tracking = 1.5

      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = 'rgba(255,255,255,0.92)'

      // baja font hasta que quepa
      while (nameFont > 18) {
        ctx.font = `600 ${nameFont}px Inter, Arial, sans-serif`
        if (measureTrackingWidth(name, tracking) <= maxNameWidth) break
        nameFont -= 2
      }

      ctx.font = `600 ${nameFont}px Inter, Arial, sans-serif`
      const safeName = truncateWithEllipsis(name, maxNameWidth, tracking)

      // dibuja alineado al borde derecho (pero usando tracking)
      const startX = nameRightX - measureTrackingWidth(safeName, tracking)
      drawTextTracking(safeName, startX, nameY, tracking)


      ctx.fillStyle = 'rgba(255,255,255,0.70)'
      ctx.font = '500 18px Inter, Arial, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText('RESUMEN DE ESTILO', nameRightX, safeTop + 100)
      // --- Main title area ---
      const titleText = (style.tipo || '').toUpperCase()
      const titleMaxW = W - safeX * 2 - 40

      const titleY = 840
      const titleSize = fitFontSize(titleText, titleMaxW, 148, 96)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      ctx.font = `800 ${titleSize}px Inter, Arial, sans-serif`

      // Title gradient - using Xianna brand colors
      const tg = ctx.createLinearGradient(W / 2 - titleMaxW / 2, titleY, W / 2 + titleMaxW / 2, titleY)
      tg.addColorStop(0, '#E61F93')     // Xianna pink
      tg.addColorStop(0.5, '#FF1493')   // Hot pink
      tg.addColorStop(1, '#00D1ED')     // Xianna cyan

      ctx.fillStyle = tg as any
      drawSoftShadowText(titleText, W / 2, titleY)

      // Subtitle chip under title
      const chipW = 340
      const chipH = 56
      const chipX = (W - chipW) / 2
      const chipY = titleY + 50
      glassPanel(chipX, chipY, chipW, chipH, 999, 0.14)

      ctx.save()

ctx.textAlign = 'center'
ctx.textBaseline = 'middle'

// sombra sutil para legibilidad
ctx.shadowColor = 'rgba(0,0,0,0.35)'
ctx.shadowBlur = 10
ctx.shadowOffsetY = 4

ctx.fillStyle = '#FFFFFF'
ctx.font = '800 26px Inter, Arial, sans-serif' // más bold + más grande

ctx.fillText('TU ESTILO', W / 2, chipY + chipH / 2)

ctx.restore()


      // --- Description “glass card” ---
      const cardW = W - safeX * 2
      const cardMaxH = 560
      const cardX = safeX
      const cardY = H - safeBottom - cardMaxH

      glassPanel(cardX, cardY, cardW, cardMaxH, 46, 0.14)

      // Card top gradient accent
      const topAccent = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY)
      topAccent.addColorStop(0, '#FF1493')
      topAccent.addColorStop(1, '#00D1ED')
      fillRoundedRect(cardX + 28, cardY + 22, cardW - 56, 8, 999, topAccent as any)

      // Description text
      const padding = 64
      const textX = cardX + padding
      const textY = cardY + 110
      const maxTextW = cardW - padding * 2

      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.font = '500 30px Inter, Arial, sans-serif'

      const lines = wrapText(style.descripcion || '', maxTextW)
      const lineH = 44
      const maxLines = 7
      const finalLines = lines.slice(0, maxLines)

      // Add shadow for better readability
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.6)'
      ctx.shadowBlur = 12
      ctx.shadowOffsetY = 3
      ctx.fillStyle = '#FFFFFF' // Pure white for better contrast

      let yy = textY
      for (const ln of finalLines) {
        ctx.fillText(ln, textX, yy)
        yy += lineH
      }
      ctx.restore()

      if (lines.length > maxLines) {
        ctx.fillStyle = 'rgba(255,255,255,0.70)'
        ctx.font = '500 26px Inter, Arial, sans-serif'
        ctx.fillText('…', textX, yy - 6)
      }

      // CTA footer inside card
      const ctaBaseY = cardY + cardMaxH - 90
      ctx.textAlign = 'left'
      ctx.fillStyle = 'rgba(255,255,255,0.70)'
      ctx.font = '600 18px Inter, Arial, sans-serif'
      ctx.fillText('DESCUBRE MÁS EN', textX, ctaBaseY)

      // Website URL with Xianna brand gradient
      ctx.font = '800 34px Inter, Arial, sans-serif'
      const urlText = 'xianna.com.mx'
      const urlWidth = ctx.measureText(urlText).width
      const urlGradient = ctx.createLinearGradient(textX, ctaBaseY + 44, textX + urlWidth, ctaBaseY + 44)
      urlGradient.addColorStop(0, '#E61F93')    // Xianna pink
      urlGradient.addColorStop(0.5, '#FF1493')  // Hot pink
      urlGradient.addColorStop(1, '#00D1ED')    // Xianna cyan

      ctx.fillStyle = urlGradient as any
      ctx.fillText(urlText, textX, ctaBaseY + 44)

      // Small brand dot cluster (detalle)
      ctx.fillStyle = '#FF1493'
      ctx.beginPath()
      ctx.arc(cardX + cardW - 72, cardY + 62, 7, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#00D1ED'
      ctx.beginPath()
      ctx.arc(cardX + cardW - 52, cardY + 62, 7, 0, Math.PI * 2)
      ctx.fill()

      // --- Export ---
      const imageDataUrl = canvas.toDataURL('image/png', 1.0)
      const link = document.createElement('a')
      link.download = `mi-estilo-${(style.tipo || 'estilo').toLowerCase().replace(/\s+/g, '-')}.png`
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
      <canvas ref={canvasRef} className="hidden" width={1080} height={1920} />

      <Button
        onClick={generateSummaryImage}
        disabled={isGenerating}
        className="
          relative overflow-hidden rounded-2xl px-8 py-3 min-w-[220px]
          text-white font-semibold
          bg-gradient-to-r from-[#E61F93] via-[#FF1493] to-[#00D1ED]
          hover:opacity-95 active:scale-[0.99]
          shadow-lg shadow-black/20
        "
      >
        <span className="absolute inset-0 opacity-20 bg-white/20 [mask-image:radial-gradient(60%_60%_at_30%_20%,black,transparent)]" />
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generando…
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
