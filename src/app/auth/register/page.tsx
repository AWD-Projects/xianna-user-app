import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Crear Cuenta',
  description: 'Crea tu cuenta de Xianna y descubre tu estilo único'
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <Link href="/" className="inline-block cursor-pointer">
              <Image
                src="/images/xianna.png"
                alt="Xianna"
                width={160}
                height={48}
                className="object-contain mx-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Únete a Xianna</h1>
          <p className="text-gray-600 mt-2">Crea tu cuenta y descubre tu estilo único</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
            <CardDescription>
              Completa el formulario para crear tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link href="/auth/login" className="text-pink-500 hover:text-pink-600 font-medium">
                  Inicia sesión aquí
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
