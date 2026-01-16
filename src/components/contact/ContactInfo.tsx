import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Instagram, Clock } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Información de contacto</CardTitle>
          <p className="text-gray-600">
            Otras formas de ponerte en contacto con nosotros
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Email</h4>
              <p className="text-gray-600">xianna.mx1@gmail.com</p>
            </div>
          </div>

          {/* <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Teléfono</h4>
              <p className="text-gray-600">+52 55 1234 5678</p>
            </div>
          </div> */}

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Instagram className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Instagram</h4>
              <p className="text-gray-600">@xianna.mx</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Ubicación</h4>
              <p className="text-gray-600">Ciudad de México, México</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-pink-600" />
            Horarios de atención
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Lunes - Viernes</span>
            <span className="font-medium">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sábado</span>
            <span className="font-medium">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Domingo</span>
            <span className="font-medium">Cerrado</span>
          </div>
          <div className="mt-4 p-4 bg-pink-50 rounded-xl">
            <p className="text-sm text-pink-800">
              <strong>Tip:</strong> Te responderemos en un máximo de 24 horas en días hábiles.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Preguntas frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              ¿Cómo funciona el cuestionario de estilo?
            </h4>
            <p className="text-sm text-gray-600">
              Nuestro cuestionario analiza tus preferencias y te asigna un estilo personalizado con recomendaciones.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              ¿Puedo cambiar mi estilo después?
            </h4>
            <p className="text-sm text-gray-600">
              ¡Claro! Puedes actualizar tu perfil y volver a hacer el cuestionario cuando quieras.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              ¿Los outfits están disponibles para venta?
            </h4>
            <p className="text-sm text-gray-600">
              Actualmente mostramos inspiración de estilo. Próximamente tendremos enlaces de compra.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
