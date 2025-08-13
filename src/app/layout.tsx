import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Xianna - Descubre tu estilo único',
    template: '%s | Xianna'
  },
  description: 'Xianna es tu guía en moda y estilo personal, celebrando la singularidad y el talento mexicano.',
  icons: {
    icon: '/images/x.png',
    shortcut: '/images/x.png',
    apple: '/images/x.png',
  },
  keywords: ['moda', 'estilo', 'tendencias', 'looks', 'guardarropa', 'moda personalizada'],
  authors: [{ name: 'Xianna Team' }],
  creator: 'Xianna',
  publisher: 'Xianna',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Xianna',
    title: 'Xianna - Descubre tu estilo único',
    description: 'Xianna es tu guía en moda y estilo personal, celebrando la singularidad y el talento mexicano.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Xianna - Descubre tu estilo único'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@xianna_mx',
    creator: '@xianna_mx'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/x.png" />
        <link rel="apple-touch-icon" href="/images/x.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
