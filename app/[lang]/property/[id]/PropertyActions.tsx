'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/components/FavoritesProvider'

export function PropertyActions({ propertyId, dict }: { propertyId: string; dict: any }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(propertyId)

  return (
    <Button
      variant={fav ? 'default' : 'outline'}
      size="lg"
      className="h-12 uppercase tracking-widest text-sm gap-2"
      onClick={() => toggleFavorite(propertyId)}
    >
      <Heart className={`h-4 w-4 ${fav ? 'fill-current' : ''}`} />
      {fav ? dict.properties.removeFavorite : dict.properties.addFavorite}
    </Button>
  )
}
