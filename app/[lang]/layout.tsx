import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'
import { FavoritesProvider } from '@/components/FavoritesProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HtmlLang } from '@/components/HtmlLang'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'

const META: Record<string, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: 'URSU Real Estate',
    description: 'Luxury real estate in Italy — villas, apartments and unique properties on the Italian coast.',
    ogLocale: 'en_US',
  },
  ru: {
    title: 'URSU Real Estate — Недвижимость в Италии',
    description: 'Элитная недвижимость в Италии. Виллы, апартаменты и уникальные объекты на итальянском побережье.',
    ogLocale: 'ru_RU',
  },
  it: {
    title: 'URSU Real Estate — Immobili di Lusso in Italia',
    description: 'Proprietà di lusso in Italia. Ville, appartamenti e immobili unici sulla costa italiana.',
    ogLocale: 'it_IT',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const meta = META[lang] ?? META.en
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: meta.ogLocale,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  }
}

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
  const dict = await import(`@/app/[lang]/dictionaries/${lang}.json`).then(m => m.default)

  return (
    <>
      <HtmlLang lang={lang} />
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Header lang={lang as Locale} />
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>
          <Footer lang={lang as Locale} />
        </div>
      </FavoritesProvider>
      <CookieConsentBanner lang={lang} dict={dict} />
    </>
  )
}
