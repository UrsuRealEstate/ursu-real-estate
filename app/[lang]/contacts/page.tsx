import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import { getContactSettings, formatWorkHours } from '@/lib/settings'
import { InquiryForm } from '@/components/InquiryForm'
import { ScrollReveal } from '@/components/ScrollReveal'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default async function ContactsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const settings = await getContactSettings()

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4">
              {dict.contact.title}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {dict.contact.subtitle}
            </p>
            <div className="w-16 h-[2px] bg-primary mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <ScrollReveal>
              <h2 className="text-xl font-medium mb-8">{dict.contact.info}</h2>
            </ScrollReveal>

            <div className="flex flex-col gap-8">
              <ScrollReveal delay={100}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 uppercase tracking-wider text-sm">
                      {dict.properties.location}
                    </h3>
                    <p className="text-muted-foreground">{settings.address}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 uppercase tracking-wider text-sm">
                      {dict.contact.phone}
                    </h3>
                    <p className="text-muted-foreground">{settings.phone}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 uppercase tracking-wider text-sm">
                      {dict.contact.email}
                    </h3>
                    <p className="text-muted-foreground">{settings.email}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1 uppercase tracking-wider text-sm">
                      {dict.contact.workHours}
                    </h3>
                    <p className="text-muted-foreground">{formatWorkHours(settings, lang)}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Contact Form */}
          <ScrollReveal delay={200}>
            <div className="border border-border bg-card p-6 sm:p-8 lg:p-10">
              <InquiryForm dict={dict} lang={lang} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
