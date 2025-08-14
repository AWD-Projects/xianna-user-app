import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { LoginPageContent } from '@/components/auth/LoginPageContent'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión en tu cuenta de Xianna'
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}
