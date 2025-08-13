'use client'

import { useRouter } from 'next/navigation'
import { Heart, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  platform: [
    { label: "Test de Estilo", path: "/formulario" },
    { label: "Catálogo", path: "/catalogo" },
    { label: "Blog", path: "/blog" },
    { label: "Mi Perfil", path: "/perfil" }
  ],
  company: [
    { label: "Sobre Nosotros", path: "/about" },
    { label: "Contacto", path: "/contacto" },
    { label: "Términos de Uso", path: "/terms" },
    { label: "Privacidad", path: "/privacy" }
  ],
  support: [
    { label: "Centro de Ayuda", path: "/help" },
    { label: "Preguntas Frecuentes", path: "/faq" },
    { label: "Soporte Técnico", path: "/support" },
    { label: "Feedback", path: "/feedback" }
  ]
}

const socialLinks = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com/xianna.mx" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com/xianna.mx" },
  { icon: Twitter, label: "Twitter", url: "https://twitter.com/xianna_mx" },
  { icon: Mail, label: "Email", url: "mailto:hola@xianna.com.mx" }
]

export function Footer() {
  const router = useRouter()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                XIANNA
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Tu plataforma de moda y estilo personal. Descubre tu estilo único, 
              aprende sobre moda y expresa tu singularidad con confianza.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>Ciudad de México, México</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>hola@xianna.com.mx</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-400" />
                <span>+52 55 1234 5678</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Plataforma</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Soporte</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-400 hover:text-pink-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="font-bold text-white mb-2">
                Mantente al día con las últimas tendencias
              </h3>
              <p className="text-gray-400 text-sm">
                Recibe tips de moda, nuevos artículos y ofertas exclusivas directamente en tu email.
              </p>
            </div>
            
            <div className="flex gap-3 max-w-sm lg:max-w-xs">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300 whitespace-nowrap">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © 2024 Xianna. Todos los derechos reservados. 
                <span className="text-pink-400">Hecho con ❤️ en México</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
