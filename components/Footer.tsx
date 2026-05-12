import { type Locale } from '@/lib/i18n'
import { getContactSettings } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'

export async function Footer({ lang }: { lang: Locale }) {
  const dict = await import(`@/app/[lang]/dictionaries/${lang}.json`).then(m => m.default)
  const settings = await getContactSettings()
  const currentYear = new Date().getFullYear()

  // Format WhatsApp number for wa.me link (remove spaces, dashes, etc.)
  const whatsappLink = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[\s\-()]/g, '')}`
    : null

  return (
    <footer className="bg-[#283027] text-white/90 py-12 lg:py-16 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          <div className="flex flex-col gap-6 items-start">
            <Image
              src="/ursu-logo5.png"
              alt="URSU Logo"
              width={657}
              height={264}
              className="w-auto h-19 object-contain"
            />
            <p className="text-white/50 max-w-sm">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-sm text-white/70 mb-2">
              {dict.contact.info}
            </h3>
            <p className="text-white/50 text-sm">{settings.address}</p>
            <p className="text-white/50 text-sm">{settings.email}</p>
            <p className="text-white/50 text-sm">{settings.phone}</p>
            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-sm hover:text-green-400 transition-colors inline-flex items-center gap-1.5"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="uppercase tracking-widest text-sm text-white/70 mb-2">
              Menu
            </h3>
            <nav className="flex flex-col gap-3">
              <Link href={`/${lang}`} className="text-white/50 text-sm hover:text-white transition-colors">
                {dict.nav.home}
              </Link>
              <Link href={`/${lang}/contacts`} className="text-white/50 text-sm hover:text-white transition-colors">
                {dict.nav.contacts}
              </Link>
            </nav>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} {dict.footer.company}. {dict.footer.rights}.
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/privacy`} className="text-white/30 text-xs hover:text-white/60 transition-colors">
              {dict.legal.privacyPolicy}
            </Link>
            <Link href={`/${lang}/cookies`} className="text-white/30 text-xs hover:text-white/60 transition-colors">
              {dict.legal.cookiePolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
