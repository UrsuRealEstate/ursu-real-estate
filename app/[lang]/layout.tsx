import { Inter, Playfair_Display } from 'next/font/google'
import { locales, type Locale } from '@/lib/i18n'
import { FavoritesProvider } from '@/components/FavoritesProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-foreground bg-background selection:bg-primary/20">
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen">
            <Header lang={lang as Locale} />
            <main className="flex-1 overflow-x-hidden pt-20">
              {children}
            </main>
            <Footer lang={lang as Locale} />
          </div>
        </FavoritesProvider>
      </body>
    </html>
  )
}
