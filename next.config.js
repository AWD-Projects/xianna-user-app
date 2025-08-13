/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'xianna.com.mx'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rskbayibhrapatiysrzm.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Remove standalone output for Netlify deployment
  // output: 'standalone',
  typescript: {
    // Allow build to succeed even with type errors (optional)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Allow build to succeed even with ESLint errors (optional)
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
