import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { FavoritesList } from './FavoritesList'

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  return (
    <div className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center">
      <div className="text-center mb-16 w-full max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
          {dict.nav.favorites}
        </h1>
        <div className="w-16 h-[2px] bg-primary mx-auto mt-6 mb-8" />
      </div>

      <div className="w-full">
        <FavoritesList lang={lang as Locale} dict={dict} />
      </div>
    </div>
  )
}
