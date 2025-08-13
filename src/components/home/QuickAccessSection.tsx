'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shirt, 
  BookOpen, 
  MessageCircle, 
  ClipboardList,
  ArrowRight,
  Star,
  Users,
  Lightbulb
} from 'lucide-react'

const quickAccess = [
  {
    icon: Shirt,
    title: "Catálogo de Outfits",
    description: "Explora nuestra colección curada de outfits para cada ocasión y estilo.",
    stats: "500+ outfits disponibles",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    path: "/catalogo",
    badge: "Popular"
  },
  {
    icon: BookOpen,
    title: "Blog de Moda",
    description: "Aprende sobre tendencias, tips de estilo y consejos de los expertos.",
    stats: "Nuevos artículos semanales",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    path: "/blog",
    badge: "Trending"
  },
  {
    icon: ClipboardList,
    title: "Test de Estilo",
    description: "Descubre tu estilo personal con nuestro cuestionario inteligente.",
    stats: "Solo 5-10 minutos",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    path: "/formulario",
    badge: "Gratis"
  },
  {
    icon: MessageCircle,
    title: "Contacto",
    description: "¿Tienes dudas? Nuestro equipo está aquí para ayudarte.",
    stats: "Respuesta en 24h",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    path: "/contacto",
    badge: "Soporte"
  }
]

const benefits = [
  {
    icon: Star,
    title: "Calidad Garantizada",
    description: "Todos nuestros outfits son seleccionados por expertos en moda mexicana."
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a miles de mujeres que comparten tips y experiencias de moda."
  },
  {
    icon: Lightbulb,
    title: "Contenido Exclusivo",
    description: "Accede a artículos, guías y consejos que no encontrarás en ningún otro lugar."
  }
]

export function QuickAccessSection() {
  const router = useRouter()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shirt className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
              Explora Xianna
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Todo lo que necesitas para 
            <span className="text-pink-600"> tu estilo</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Desde outfits curados hasta consejos de expertos, encuentra todo lo que necesitas 
            para desarrollar y expresar tu estilo personal único.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {quickAccess.map((item, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 cursor-pointer"
              onClick={() => router.push(item.path)}
            >
              <CardContent className="p-6 relative">
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${item.color} text-white font-semibold`}>
                    {item.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="text-xs text-gray-500 mb-4">
                  {item.stats}
                </div>

                {/* Arrow */}
                <div className="flex items-center text-pink-500 text-sm font-semibold group-hover:text-pink-600">
                  <span>Explorar</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir Xianna?
              </h3>
              <p className="text-gray-600 text-lg">
                Más que una plataforma de moda, somos tu compañera en el viaje hacia el autoconocimiento y la expresión personal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-pink-500" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
