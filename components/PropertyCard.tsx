'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Maximize, BedDouble, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from './FavoritesProvider'
import type { Property } from '@/lib/properties'
import { formatPrice } from '@/lib/properties'
import type { Locale } from '@/lib/i18n'

interface PropertyCardProps {
  property: Property
  lang: Locale
  dict: any
  priority?: boolean
}

export function PropertyCard({ property, lang, dict, priority = false }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(property.id)

  const slides = [...new Set([property.image, ...property.images].filter(Boolean))].slice(0, 5)
  const n = slides.length
  const [current, setCurrent] = useState(0)

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    setCurrent(i => (i - 1 + n) % n)
  }
  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    setCurrent(i => (i + 1) % n)
  }
  const goTo = (e: React.MouseEvent, i: number) => {
    e.preventDefault(); e.stopPropagation()
    setCurrent(i)
  }

  return (
    <article className="group bg-card border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">

        {/* Filmstrip */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${current * (100 / n)}%)`,
          }}
        >
          {slides.map((src, i) => (
            <Link
              key={src}
              href={`/${lang}/property/${property.id}`}
              className="relative h-full flex-shrink-0 block overflow-hidden"
              style={{ width: `${100 / n}%` }}
              tabIndex={i === current ? 0 : -1}
            >
              <Image
                src={src}
                alt={property.title[lang]}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i === 0 && priority}
                loading={i === 0 && priority ? 'eager' : 'lazy'}
              />
            </Link>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]" />

        {/* Arrows */}
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-black/40 hover:bg-black/65 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center bg-black/40 hover:bg-black/65 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => goTo(e, i)}
                  aria-label={`Photo ${i + 1}`}
                  className={[
                    'w-1.5 h-1.5 rounded-full transition-all',
                    i === current ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80',
                  ].join(' ')}
                />
              ))}
            </div>
          </>
        )}

        {/* Heart */}
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white h-9 w-9"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(property.id) }}
            aria-label={fav ? dict.properties.removeFavorite : dict.properties.addFavorite}
          >
            <Heart className={`h-4 w-4 transition-colors ${fav ? 'fill-primary text-primary' : 'text-foreground/70'}`} />
          </Button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {property.location[lang] && (
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-3">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {property.location[lang]}
          </div>
        )}

        <Link href={`/${lang}/property/${property.id}`}>
          <h3 className="text-lg font-medium leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {property.title[lang]}
          </h3>
        </Link>

        {(property.area || property.rooms) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {property.area && (
              <span className="flex items-center gap-1.5">
                <Maximize className="h-3.5 w-3.5" />
                {property.area} {dict.properties.sqm}
              </span>
            )}
            {property.rooms && (
              <span className="flex items-center gap-1.5">
                <BedDouble className="h-3.5 w-3.5" />
                {property.rooms} {dict.properties.rooms}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <p className="text-xl font-semibold text-primary">
            {property.price ? formatPrice(property.price, property.currency) : '—'}
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
