import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/kabalah-luriana', destination: '/ensinos/kabalah-luriana', permanent: true },
      {
        source: '/yeshua-no-judaismo-messianico',
        destination: '/ensinos/yeshua-judaismo-messianico',
        permanent: true,
      },
      { source: '/sefirot', destination: '/ensinos/sefirot', permanent: true },
      { source: '/omer', destination: '/ensinos/sefirat-haomer', permanent: true },
      { source: '/parasha', destination: '/ensinos/parasha-da-semana', permanent: true },
      { source: '/netivot', destination: '/ensinos/netivot', permanent: true },
    ]
  },
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
    // Upload de imagens de produtos da loja via Server Action (FormData).
    serverActions: { bodySizeLimit: '5mb' },
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
              "media-src 'self' https://raw.githubusercontent.com",
              // unsafe-eval necessário para o worker do pdf.js
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://js.stripe.com",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com https://www.sefaria.org",
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
