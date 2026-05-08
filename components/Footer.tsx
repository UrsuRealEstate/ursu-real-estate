import { type Locale } from '@/lib/i18n'
import { getContactSettings, formatWorkHours } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'

export async function Footer({ lang }: { lang: Locale }) {
  const dict = await import(`@/app/[lang]/dictionaries/${lang}.json`).then(m => m.default)
  const settings = await getContactSettings()
  const currentYear = new Date().getFullYear()

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
            <p className="text-white/50 text-sm">{formatWorkHours(settings, lang)}</p>
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
        </div>
      </div>
    </footer>
  )
}
