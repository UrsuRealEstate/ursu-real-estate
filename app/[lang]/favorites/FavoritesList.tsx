'use client'

import { useFavorites } from '@/components/FavoritesProvider'
import type { Property } from '@/lib/properties'
import { PropertyCard } from '@/components/PropertyCard'
import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const EMPTY_TEXT: Record<string, string> = {
  en: "You haven't saved any properties yet.",
  ru: 'Вы еще не сохранили ни одного объекта.',
  it: 'Non hai ancora salvato nessuna proprietà.',
}
const BROWSE_TEXT: Record<string, string> = {
  en: 'Browse Properties',
  ru: 'Смотреть объекты',
  it: 'Sfoglia le proprietà',
}

interface Props {
  lang: Locale
  dict: any
  properties: Property[]
}

export function FavoritesList({ lang, dict, properties }: Props) {
  const { favorites } = useFavorites()
  const favoriteProperties = properties.filter(p => favorites.includes(p.id))

  if (favoriteProperties.length === 0) {
    return (
      <div className="text-center py-20 bg-secondary/50 border border-border">
        <p className="text-muted-foreground mb-6">{EMPTY_TEXT[lang] ?? 'No favorites yet.'}</p>
        <Link href={`/${lang}#properties`}>
          <Button variant="outline" className="uppercase tracking-widest text-sm h-12 px-8">
            {BROWSE_TEXT[lang] ?? 'Browse Properties'}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {favoriteProperties.map(property => (
        <PropertyCard key={property.id} property={property} lang={lang} dict={dict} />
      ))}
    </div>
  )
}
