import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: {
    default: 'URSU Real Estate',
    template: '%s | URSU Real Estate',
  },
  description: 'Luxury real estate in Italy — villas, apartments and unique properties.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'URSU Real Estate',
    title: 'URSU Real Estate',
    description: 'Luxury real estate in Italy — villas, apartments and unique properties.',
    images: [{ url: '/hero-bg.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URSU Real Estate',
    description: 'Luxury real estate in Italy — villas, apartments and unique properties.',
    images: ['/hero-bg.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans antialiased text-foreground bg-background selection:bg-primary/20">
        {children}
      </body>
    </html>
  )
}
