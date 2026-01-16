import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactHeader } from '@/components/contact/ContactHeader'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con el equipo de Xianna. Estamos aquí para ayudarte.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ContactHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
