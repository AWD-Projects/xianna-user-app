'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react'

// Mocked blog data for teaser
const mockBlogs = [
  {
    id: 1,
    titulo: "Tendencias de Moda Primavera 2024",
    descripcion: "Descubre los colores, texturas y estilos que marcarán la temporada primaveral",
    categoria: "Tendencias",
    rating: 4.8,
    persons: 127,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    color: "#E61F93"
  },
  {
    id: 2,
    titulo: "Cómo Crear un Guardarropa Minimalista",
    descripcion: "Guía completa para construir un armario funcional con piezas esenciales",
    categoria: "Estilo",
    rating: 4.9,
    persons: 89,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
    color: "#00D1ED"
  },
  {
    id: 3,
    titulo: "Secretos de Styling para Tu Tipo de Cuerpo",
    descripcion: "Aprende a resaltar tu figura con las técnicas que usan los estilistas profesionales",
    categoria: "Tips",
    rating: 4.7,
    persons: 156,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
    color: "#FDE12D"
  }
]

export function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header - Matching other sections */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold uppercase tracking-wide text-sm">
              Blog de Moda
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Consejos y secretos de 
            <span className="text-pink-600"> estilo exclusivos</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Descubre tendencias, técnicas de styling y consejos profesionales de nuestros expertos 
            para transformar tu guardarropa y potenciar tu estilo personal.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mockBlogs.map((blog, index) => (
            <Link 
              key={blog.id} 
              href={`/blog/${blog.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: blog.color }}
                    >
                      {blog.categoria}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight group-hover:text-pink-600 transition-colors">
                    {blog.titulo}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.descripcion}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-sm">{blog.rating}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{blog.persons}</span>
                      </div>
                    </div>
                    
                    <span 
                      className="inline-flex items-center font-semibold text-sm group-hover:translate-x-1 transition-transform"
                      style={{ color: blog.color }}
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Simple Call to Action */}
        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-[#E61F93] hover:bg-[#E61F93]/90 text-white rounded-xl px-8 py-3 text-base font-semibold inline-flex items-center">
              Explorar Blog
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}