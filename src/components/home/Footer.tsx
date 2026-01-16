'use client'

import { useRouter } from 'next/navigation'
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  platform: [
    { label: "Test de Estilo", path: "/formulario" },
    { label: "Catálogo", path: "/catalogo" },
    { label: "Blog", path: "/blog" },
    { label: "Mi Perfil", path: "/perfil" }
  ],
  company: [
    { label: "Contacto", path: "/contacto" },
    { label: "Mis Favoritos", path: "/mis-outfits" }
  ],
  support: [
    { label: "Test de Estilo", path: "/formulario" },
    { label: "Catálogo", path: "/catalogo" }
  ]
}

const socialLinks = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com/xianna.mx" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com/xianna.mx" },
  { icon: Mail, label: "Email", url: "mailto:xianna.mx1@gmail.com" }
]

export function Footer() {
  const router = useRouter()

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <button
                onClick={() => router.push('/')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/xianna.png"
                  alt="Xianna"
                  width={140}
                  height={42}
                  className="object-contain"
                />
              </button>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Tu plataforma de moda y estilo personal. Descubre tu estilo único, 
              aprende sobre moda y expresa tu singularidad con confianza.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#E61F93]" />
                <span>Ciudad de México, México</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E61F93]" />
                <span>xianna.mx1@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Plataforma</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-600 hover:text-[#E61F93] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Enlaces</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-600 hover:text-[#E61F93] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Descubre</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => router.push(link.path)}
                    className="text-gray-600 hover:text-[#E61F93] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-[#E61F93]/10 to-[#FDE12D]/10 rounded-2xl p-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-3 text-xl">
                  Newsletter Semanal y Mensual
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Al crear tu cuenta en Xianna, automáticamente te suscribes a nuestros newsletters semanales y mensuales.
                  Recibirás las últimas tendencias, tips de moda, nuevos artículos y ofertas exclusivas por:
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E61F93]" />
                  <span>Email</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E61F93]" />
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>
                © 2024 Xianna. Todos los derechos reservados. 
                {' • '}
                Desarrollado por{' '}
                <a 
                  href="https://www.amoxtli.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E61F93] hover:text-[#E61F93]/80 font-medium transition-colors"
                >
                  Amoxtli Web Developers
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-[#E61F93] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
