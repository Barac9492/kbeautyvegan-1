import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'VeganKHub | AI-Powered Korean Vegan Beauty Intelligence',
  description: 'Predict tomorrow\'s K-beauty trends today. Join 50,000+ beauty enthusiasts using AI to discover the next big Korean vegan beauty breakthrough.',
  keywords: [
    'vegan k-beauty',
    'korean beauty trends',
    'AI beauty predictions',
    'cruelty-free skincare',
    'k-beauty intelligence',
    'vegan cosmetics',
    'beauty trend forecasting',
    'korean skincare',
    'ethical beauty',
    'sustainable cosmetics'
  ].join(', '),
  authors: [{ name: 'VeganKHub Team' }],
  creator: 'VeganKHub',
  publisher: 'VeganKHub',
  category: 'Beauty & Wellness',
  classification: 'Beauty Intelligence Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vegankbeautyhub.com',
    siteName: 'VeganKHub',
    title: 'VeganKHub | AI-Powered Korean Vegan Beauty Intelligence',
    description: 'Predict tomorrow\'s K-beauty trends today with AI-powered insights and join a community of 50,000+ beauty enthusiasts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VeganKHub - AI-Powered Korean Vegan Beauty Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeganKHub | AI-Powered Korean Vegan Beauty Intelligence',
    description: 'Predict tomorrow\'s K-beauty trends today with AI-powered insights.',
    images: ['/twitter-image.png'],
    creator: '@vegankbeautyhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://vegankbeautyhub.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#FF6B9D" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body 
        className="min-h-screen antialiased custom-scrollbar"
        suppressHydrationWarning
      >
        <div className="relative min-h-screen">
          {/* Background pattern */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-kbeauty-cream via-white to-kbeauty-pink" />
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255, 229, 236, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(240, 229, 255, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 50% 100%, rgba(229, 245, 240, 0.3) 0%, transparent 50%)
                `,
              }}
            />
          </div>
          
          {/* Main content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Accessibility skip link */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
        </div>
        
        {/* Performance and analytics scripts would go here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC (Flash of Unstyled Content)
              document.documentElement.classList.add('js-enabled');
              
              // Performance monitoring
              if ('performance' in window && 'navigation' in performance) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perf = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perf.loadEventEnd - perf.loadEventStart);
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}