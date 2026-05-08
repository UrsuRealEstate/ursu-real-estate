import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale, type Locale } from '../../dictionaries'
import { getPropertyFromDB } from '@/lib/properties.server'
import { formatPrice } from '@/lib/properties'
import { PropertyActions } from './PropertyActions'
import { ShareButton } from '@/components/ShareButton'
import { InquiryForm } from '@/components/InquiryForm'
import { ScrollReveal } from '@/components/ScrollReveal'
import ImageGallery from './ImageGallery'
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath, Layers, LayoutGrid } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id } = await params
  if (!hasLocale(lang)) return {}

  const property = await getPropertyFromDB(id)
  if (!property) return {}

  const locale = lang as Locale
  const title = property.title[locale]
  const description = property.description[locale]
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200)
  const image = property.image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  if (!hasLocale(lang)) notFound()

  const property = await getPropertyFromDB(id)
  if (!property) notFound()

  const dict = await getDictionary(lang as Locale)
  const locale = lang as Locale

  // Build stats — only show cells with a value
  const d = dict.properties as Record<string, string>
  const stats = [
    { value: property.area,      label: d.sqm,       icon: Maximize   },
    { value: property.rooms,     label: d.rooms,     icon: BedDouble  },
    { value: property.bathrooms, label: d.bathrooms, icon: Bath       },
    { value: property.floors,    label: d.floors,    icon: Layers     },
    { value: property.lot_size,  label: d.lotSize,   icon: LayoutGrid },
  ].filter(s => s.value != null && s.value !== 0)

  const colClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  }

  // Deduplicate gallery: main image + extra images
  const allImages = [...new Set([property.image, ...property.images].filter(Boolean))]

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.properties.back}
        </Link>
      </div>

      {/* Gallery: main photo + thumbnail strip */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <ImageGallery images={allImages} title={property.title[locale]} />
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              {property.location[locale] && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  {property.location[locale]}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-6">
                {property.title[locale]}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                <p className="text-3xl sm:text-4xl font-semibold text-primary">
                  {property.price ? formatPrice(property.price, property.currency) : '—'}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <PropertyActions propertyId={property.id} dict={dict} />
                  <ShareButton title={property.title[locale]} text={property.description[locale]} lang={locale} />
                </div>
              </div>

              {/* Stats — only non-empty */}
              <div className={`grid ${colClass[stats.length] ?? 'grid-cols-3'} gap-6 py-6 border-y border-border mb-8`}>
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <Icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-light mb-1">{value}</p>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-xl font-medium mb-4">{dict.properties.description}</h2>
              <div
                className="prose-content text-muted-foreground leading-relaxed mb-10"
                dangerouslySetInnerHTML={{ __html: property.description[locale] }}
              />
            </ScrollReveal>

            {property.features[locale].length > 0 && (
              <ScrollReveal delay={200}>
                <h2 className="text-xl font-medium mb-4">{dict.properties.features}</h2>
                <div className="flex flex-wrap gap-3 mb-12">
                  {property.features[locale].map((f) => (
                    <span
                      key={f}
                      className="px-4 py-2 bg-secondary text-sm uppercase tracking-wider text-secondary-foreground border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={300}>
              <div className="mt-10">
                <PropertyActions propertyId={property.id} dict={dict} />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar — Inquiry Form */}
          <div className="lg:col-span-1">
            <ScrollReveal delay={200}>
              <div className="sticky top-28 border border-border bg-card p-6 sm:p-8">
                <h3 className="text-xl font-medium mb-6">{dict.properties.requestInfo}</h3>
                <InquiryForm dict={dict} propertyTitle={property.title[locale]} lang={locale} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
