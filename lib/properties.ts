// Client-safe: types, pure helpers only — no server imports

export interface Property {
  id: string
  title: { en: string; ru: string; it: string }
  description: { en: string; ru: string; it: string }
  price: number | null
  currency: string
  area: number | null
  rooms: number | null
  bathrooms: number | null
  floors: number | null
  lot_size: number | null
  location: { en: string; ru: string; it: string }
  city: { en: string; ru: string; it: string }
  image: string
  images: string[]
  features: { en: string[]; ru: string[]; it: string[] }
  is_sold: boolean
}

export interface PropertyRow {
  id: string
  title_en: string; title_ru: string; title_it: string
  description_en: string; description_ru: string; description_it: string
  location_en: string; location_ru: string; location_it: string
  city_en: string; city_ru: string; city_it: string
  features_en: string; features_ru: string; features_it: string
  price: number | null
  currency: string
  area: number | null
  rooms: number | null
  bathrooms: number | null
  floors: number | null
  lot_size: number | null
  image: string
  images: string[]
  is_active: boolean
  is_sold: boolean
  position: number
}

export function splitFeatures(s: string): string[] {
  if (!s) return []
  return s.split(/[\n,]/).map(f => f.trim()).filter(Boolean)
}

export function rowToProperty(row: PropertyRow): Property {
  const feat_en = splitFeatures(row.features_en)
  const feat_ru = splitFeatures(row.features_ru)
  const feat_it = splitFeatures(row.features_it)

  return {
    id: row.id,
    title: {
      en: row.title_en,
      ru: row.title_ru || row.title_en,
      it: row.title_it || row.title_en,
    },
    description: {
      en: row.description_en,
      ru: row.description_ru || row.description_en,
      it: row.description_it || row.description_en,
    },
    location: {
      en: row.location_en,
      ru: row.location_ru || row.location_en,
      it: row.location_it || row.location_en,
    },
    city: {
      en: row.city_en,
      ru: row.city_ru || row.city_en,
      it: row.city_it || row.city_en,
    },
    features: {
      en: feat_en,
      ru: feat_ru.length ? feat_ru : feat_en,
      it: feat_it.length ? feat_it : feat_en,
    },
    price: row.price ?? null,
    currency: row.currency,
    area: row.area ?? null,
    rooms: row.rooms ?? null,
    bathrooms: row.bathrooms ?? null,
    floors: row.floors ?? null,
    lot_size: row.lot_size ?? null,
    image: row.image,
    images: row.images ?? [],
    is_sold: row.is_sold ?? false,
  }
}

export function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString('en-US')}`
}
