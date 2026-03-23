import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getDictionary, hasLocale, type Locale } from '../../dictionaries'
import { properties, getProperty, formatPrice } from '@/lib/properties'
import { PropertyActions } from './PropertyActions'
import { InquiryForm } from '@/components/InquiryForm'
import { ScrollReveal } from '@/components/ScrollReveal'
import { ArrowLeft, MapPin, Maximize, BedDouble, Bath } from 'lucide-react'

export async function generateStaticParams() {
  return properties.flatMap((p) =>
    ['en', 'ru', 'it'].map((lang) => ({ lang, id: p.id }))
  )
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  if (!hasLocale(lang)) notFound()

  const property = getProperty(id)
  if (!property) notFound()

  const dict = await getDictionary(lang as Locale)
  const locale = lang as Locale

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

      {/* Image */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative aspect-[16/7] overflow-hidden border border-border">
          <Image
            src={property.image}
            alt={property.title[locale]}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-wider mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                {property.location[locale]}
              </div>

              <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-6">
                {property.title[locale]}
              </h1>

              <p className="text-3xl font-semibold text-primary mb-8">
                {formatPrice(property.price, property.currency)}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-border mb-8">
                <div className="text-center">
                  <Maximize className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-light mb-1">{property.area}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{dict.properties.sqm}</p>
                </div>
                <div className="text-center">
                  <BedDouble className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-light mb-1">{property.rooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{dict.properties.rooms}</p>
                </div>
                <div className="text-center">
                  <Bath className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-light mb-1">{property.bathrooms}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{dict.properties.bathrooms}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-xl font-medium mb-4">{dict.properties.description}</h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {property.description[locale]}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="text-xl font-medium mb-4">{dict.properties.features}</h2>
              <div className="flex flex-wrap gap-3">
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

            {/* Favorite button (client) */}
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
                <InquiryForm dict={dict} propertyTitle={property.title[locale]} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
