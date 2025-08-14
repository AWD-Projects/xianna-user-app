'use client'

import { StyleSummaryGenerator } from '@/components/ui/style-summary-generator'
import type { UserProfile, Style } from '@/types'

// Demo data for testing
const demoProfile: UserProfile = {
  id: 'demo',
  correo: 'demo@xianna.com',
  nombre: 'María García',
  sexo: 'F',
  edad: 28,
  profesion: 'Diseñadora',
  ciudad: 'Madrid',
  tipo_estilo: 1,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const demoStyle: Style = {
  id: 1,
  tipo: 'Bohemio',
  descripcion: 'Tu estilo es libre, creativo y lleno de personalidad. Te encantan los estampados únicos, los accesorios llamativos y las texturas naturales que reflejan tu espíritu aventurero.'
}

export function VisualSummaryDemo() {
  return (
    <div className="p-8 bg-gray-50 rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        🎯 Con Logo Oficial de Xianna
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Ahora incluye el logo oficial de Xianna cargado desde Supabase Storage
      </p>
      
      <StyleSummaryGenerator 
        profile={demoProfile} 
        style={demoStyle} 
        className="text-center"
      />
      
      <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">🎨 Con Logo Oficial de Xianna:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>🏷️ <strong>Logo oficial</strong> - Cargado desde Supabase Storage</li>
          <li>📐 <strong>Responsive</strong> - Se adapta automáticamente al tamaño</li>
          <li>🎯 <strong>Fallback inteligente</strong> - Texto si falla la carga</li>
          <li>🤍 <strong>Fondo limpio</strong> - Gradiente sutil blanco/gris</li>
          <li>✨ <strong>Tipografía sofisticada</strong> - Letra espaciada y sombras sutiles</li>
          <li>🎪 <strong>Enfoque central</strong> - El estilo como protagonista</li>
          <li>📲 <strong>Instagram-ready</strong> - Perfecto para Stories y feed</li>
        </ul>
      </div>
    </div>
  )
}