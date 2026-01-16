'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ClipboardList, 
  Brain, 
  Sparkles, 
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { trackStartFreeTestClick } from '@/lib/gtm'

const steps = [
  {
    step: 1,
    icon: ClipboardList,
    title: "Descubre tu estilo",
    description: "Responde nuestro cuestionario sobre tus gustos, estilo de vida y características físicas.",
    details: [
      "Solo toma 3 minutos",
      "Preguntas sobre tu personalidad",
      "Información sobre tu cuerpo",
      "Preferencias de color y texturas"
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    step: 2,
    icon: Brain,
    title: "Análisis profesional",
    description: "Nuestro equipo de estilistas expertos procesa tus respuestas para identificar tu estilo único y personal.",
    details: [
      "Estilistas especializados",
      "Análisis de compatibilidad",
      "Consideración de tu lifestyle",
      "Matching con base de datos"
    ],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    step: 3,
    icon: Sparkles,
    title: "Tu estilo ideal",
    description: "Recibe tu perfil de estilo personalizado con outfits curados especialmente para ti.",
    details: [
      "Perfil de estilo detallado",
      "Outfits personalizados",
      "Tips de combinación",
      "Acceso a contenido exclusivo"
    ],
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50"
  }
]

export function HowItWorksSection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
              Cómo funciona
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tu estilo personal en
            <span className="text-pink-600"> 3 simples pasos</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nuestro proceso científico y personalizado, guiado por estilistas expertos, te ayuda a descubrir el estilo
            que mejor se adapta a tu personalidad y estilo de vida. <span className="font-semibold text-pink-600">Solo toma de 3 a 5 minutos.</span>
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line - only on desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-200 border-y-2 border-y-transparent" />
                  </div>
                )}
                
                <Card className="relative z-10 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white">
                  <CardContent className="p-8">
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center`}>
                        <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center`}>
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-300">0{step.step}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Paso</div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details list */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Lista para descubrir tu estilo?
              </h3>
              <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
                Únete a miles de mujeres que ya encontraron su estilo único con Xianna. 
                ¡Es gratis y solo toma unos minutos!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    trackStartFreeTestClick('homepage')
                    router.push('/formulario')
                  }}
                  className="bg-white text-pink-600 hover:bg-gray-50 border-0 rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Comenzar test gratuito
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
