'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Maximize, BedDouble } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from './FavoritesProvider'
import type { Property } from '@/lib/properties'
import { formatPrice } from '@/lib/properties'
import type { Locale } from '@/lib/i18n'

interface PropertyCardProps {
  property: Property
  lang: Locale
  dict: any
}

export function PropertyCard({ property, lang, dict }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(property.id)

  return (
    <article className="group bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/${lang}/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image}
            alt={property.title[lang]}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 backdrop-blur-sm hover:bg-white h-9 w-9"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(property.id)
              }}
              aria-label={fav ? dict.properties.removeFavorite : dict.properties.addFavorite}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  fav ? 'fill-primary text-primary' : 'text-foreground/70'
                }`}
              />
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-3">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {property.location[lang]}
        </div>

        <Link href={`/${lang}/property/${property.id}`}>
          <h3 className="text-lg font-medium leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {property.title[lang]}
          </h3>
        </Link>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Maximize className="h-3.5 w-3.5" />
            {property.area} {dict.properties.sqm}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" />
            {property.rooms} {dict.properties.rooms}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-xl font-semibold text-primary">
            {formatPrice(property.price, property.currency)}
          </p>
          <Link
            href={`/${lang}/property/${property.id}`}
            className="text-sm uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors"
          >
            {dict.properties.details} →
          </Link>
        </div>
      </div>
    </article>
  )
}
