'use client'

import { Card, CardContent } from '@/components/ui/card'
import { 
  User, 
  Palette, 
  Brain, 
  BookOpen, 
  Bookmark, 
  Sparkles,
  Target,
  Zap
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "Análisis Experto",
    description: "Nuestro equipo de estilistas analiza tus respuestas y características físicas para encontrar tu estilo ideal.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: Palette,
    title: "Estilos Personalizados",
    description: "Desde bohemio hasta minimalista, descubre el estilo que mejor refleje tu personalidad única.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Target,
    title: "Outfits Curados",
    description: "Cada outfit está cuidadosamente seleccionado por expertos en moda mexicana para diferentes ocasiones.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: BookOpen,
    title: "Aprende y Crece",
    description: "Accede a artículos, tips y consejos de moda para desarrollar tu conocimiento y confianza.",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: User,
    title: "Para Tu Cuerpo",
    description: "Recomendaciones específicas basadas en tu tipo de cuerpo, talla y preferencias personales.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Bookmark,
    title: "Hecho en México",
    description: "Celebramos la diversidad y el talento mexicano con marcas locales y diseñadores nacionales.",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
              Por qué elegir Xianna
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tu plataforma completa de 
            <span className="text-pink-600"> moda y estilo</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Combinamos la experiencia de nuestros estilistas con el talento mexicano para ofrecerte 
            una experiencia única en el descubrimiento de tu estilo personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                La confianza de miles de mexicanas
              </h3>
              <p className="text-pink-100 text-lg">
                Únete a nuestra comunidad y descubre por qué somos la plataforma #1 de estilo personal en México
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "98%", label: "Satisfacción" },
                { number: "5 mins", label: "Promedio test" },
                { number: "24/7", label: "Disponible" },
                { number: "100%", label: "Mexicano" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-pink-200 text-sm uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
