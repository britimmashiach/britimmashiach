import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Cabeçalhos de segurança adicionais (complementa vercel.json)
  async headers() {
    return [
      {
        // Permite que o iframe do PdfViewer carregue /api/pdf/... no mesmo origin.
        source: '/api/pdf/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Disposition', value: 'inline' },
        ],
      },
      {
        source: '/((?!api/stripe/webhook).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "media-src 'self'",
              // unsafe-eval necessário para o worker do pdf.js
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://js.stripe.com",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com",
              "frame-src 'self' blob: https://js.stripe.com https://hooks.stripe.com https://*.supabase.co",
              "object-src 'self' blob:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
