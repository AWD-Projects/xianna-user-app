'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "María González",
    location: "Ciudad de México",
    style: "Bohemio",
    rating: 5,
    text: "Xianna me ayudó a descubrir que mi estilo bohemio encajaba perfectamente con mi personalidad. Ahora me siento mucho más segura con mis outfits.",
    image: "👩🏻‍🦱"
  },
  {
    name: "Ana Rodríguez",
    location: "Guadalajara",
    style: "Minimalista",
    rating: 5,
    text: "El test fue súper acertado. Descubrí que soy minimalista y ahora mi guardarropa es más funcional y elegante. ¡Me encanta!",
    image: "👩🏻"
  },
  {
    name: "Carmen Jiménez",
    location: "Monterrey",
    style: "Romántico",
    rating: 5,
    text: "Nunca pensé que encontraría mi estilo tan fácilmente. Los outfits que me recomienda Xianna son perfectos para mi trabajo y vida social.",
    image: "👩🏽"
  },
  {
    name: "Sofia Torres",
    location: "Puebla",
    style: "Urbano",
    rating: 5,
    text: "Como mamá ocupada, necesitaba outfits prácticos pero stylish. Xianna me dio exactamente lo que buscaba. ¡Súper recomendado!",
    image: "👩🏻‍🦰"
  },
  {
    name: "Isabella Morales",
    location: "Mérida",
    style: "Bohemio",
    rating: 5,
    text: "El blog de Xianna me ha enseñado tanto sobre moda. Ahora entiendo qué colores me favorecen y cómo combinar piezas.",
    image: "👩🏽‍🦱"
  },
  {
    name: "Valeria Santos",
    location: "Tijuana",
    style: "Casual",
    rating: 5,
    text: "Xianna no solo me ayudó con mi estilo, sino que me dio confianza. Ahora me visto para mí y me siento increíble.",
    image: "👩🏻‍🦳"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
              Testimonios
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Lo que dicen nuestras 
            <span className="text-pink-600"> usuarias</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Miles de mujeres mexicanas ya han descubierto su estilo único con Xianna. 
            Conoce sus experiencias y transformaciones.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white"
            >
              <CardContent className="p-6 relative">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-8 h-8 text-pink-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* User info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                        Estilo {testimonial.style}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              Números que hablan por sí solos
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Usuarias registradas", desc: "Y creciendo cada día" },
                { number: "4.9/5", label: "Calificación promedio", desc: "En satisfacción general" },
                { number: "95%", label: "Encuentra su estilo", desc: "En el primer intento" },
                { number: "50+", label: "Ciudades mexicanas", desc: "Donde estamos presentes" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-pink-100 font-medium text-sm mb-1">{stat.label}</div>
                  <div className="text-pink-200 text-xs">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}
