'use client'

import { useFavorites } from '@/components/FavoritesProvider'
import { properties } from '@/lib/properties'
import { PropertyCard } from '@/components/PropertyCard'
import type { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function FavoritesList({ lang, dict }: { lang: Locale; dict: any }) {
  const { favorites } = useFavorites()
  
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id))

  const emptyText = {
    en: "You haven't saved any properties yet.",
    ru: "Вы еще не сохранили ни одного объекта.",
    it: "Non hai ancora salvato nessuna proprietà."
  }[lang] || "No favorites yet."

  const browseText = {
    en: "Browse Properties",
    ru: "Смотреть объекты",
    it: "Sfoglia le proprietà"
  }[lang] || "Browse Properties"

  if (favoriteProperties.length === 0) {
    return (
      <div className="text-center py-20 bg-secondary/50 border border-border">
        <p className="text-muted-foreground mb-6">{emptyText}</p>
        <Link href={`/${lang}#properties`}>
          <Button variant="outline" className="uppercase tracking-widest text-sm h-12 px-8">
            {browseText}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {favoriteProperties.map((property) => (
        <PropertyCard key={property.id} property={property} lang={lang} dict={dict} />
      ))}
    </div>
  )
}
