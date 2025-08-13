import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión en tu cuenta de Xianna'
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src="/images/xianna.png"
              alt="Xianna"
              width={160}
              height={48}
              className="object-contain mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenida de vuelta</h1>
          <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta de Xianna</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link href="/auth/register" className="text-pink-500 hover:text-pink-600 font-medium">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Volver al home
          </Link>
        </div>
      </div>
    </div>
  )
}
