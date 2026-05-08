import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, type Locale } from '../dictionaries'

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale

  const c = CONTENT[locale] ?? CONTENT.en

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">{c.title}</h1>
        <p className="text-sm text-muted-foreground mb-12">{c.updated}</p>

        <div className="prose-content space-y-10 text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">{c.whatAreCookies.heading}</h2>
            <p>{c.whatAreCookies.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">{c.cookiesWeUse.heading}</h2>
            <p className="mb-4">{c.cookiesWeUse.intro}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border-b border-border font-medium text-foreground">{c.cookiesWeUse.colName}</th>
                    <th className="text-left p-3 border-b border-border font-medium text-foreground">{c.cookiesWeUse.colPurpose}</th>
                    <th className="text-left p-3 border-b border-border font-medium text-foreground">{c.cookiesWeUse.colType}</th>
                    <th className="text-left p-3 border-b border-border font-medium text-foreground">{c.cookiesWeUse.colDuration}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-xs">sb-*-auth-token</td>
                    <td className="p-3">{c.cookiesWeUse.row1Purpose}</td>
                    <td className="p-3">{c.cookiesWeUse.typeNecessary}</td>
                    <td className="p-3">{c.cookiesWeUse.durationSession}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">sb-*-auth-token.0/.1</td>
                    <td className="p-3">{c.cookiesWeUse.row2Purpose}</td>
                    <td className="p-3">{c.cookiesWeUse.typeNecessary}</td>
                    <td className="p-3">{c.cookiesWeUse.durationSession}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">{c.noTracking.heading}</h2>
            <p>{c.noTracking.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">{c.control.heading}</h2>
            <p>{c.control.body}</p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-foreground mb-3">{c.contact.heading}</h2>
            <p>{c.contact.body} <strong>info@ursurealestate.com</strong></p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href={`/${lang}/privacy`} className="text-primary hover:underline text-sm">
            {locale === 'ru' ? '→ Политика конфиденциальности' : locale === 'it' ? '→ Informativa sulla Privacy' : '→ Privacy Policy'}
          </Link>
        </div>
      </div>
    </div>
  )
}

const CONTENT: Record<Locale, {
  title: string; updated: string
  whatAreCookies: { heading: string; body: string }
  cookiesWeUse: { heading: string; intro: string; colName: string; colPurpose: string; colType: string; colDuration: string; row1Purpose: string; row2Purpose: string; typeNecessary: string; durationSession: string }
  noTracking: { heading: string; body: string }
  control: { heading: string; body: string }
  contact: { heading: string; body: string }
}> = {
  en: {
    title: 'Cookie Policy',
    updated: 'Last updated: May 2025',
    whatAreCookies: {
      heading: '1. What Are Cookies',
      body: 'Cookies are small text files stored on your device by your browser when you visit a website. They allow the site to remember information between page loads.',
    },
    cookiesWeUse: {
      heading: '2. Cookies We Use',
      intro: 'This website uses only strictly necessary cookies required for the site to function. These cookies do not require your consent under GDPR.',
      colName: 'Cookie Name', colPurpose: 'Purpose', colType: 'Type', colDuration: 'Duration',
      row1Purpose: 'Supabase authentication session token (admin area only)',
      row2Purpose: 'Supabase session token chunks (admin area only)',
      typeNecessary: 'Necessary', durationSession: 'Session',
    },
    noTracking: {
      heading: '3. No Tracking Cookies',
      body: 'We do not use any advertising, analytics, or third-party tracking cookies. Your browsing behaviour on this website is not tracked or shared with any third party.',
    },
    control: {
      heading: '4. How to Control Cookies',
      body: 'You can control and delete cookies through your browser settings. Note that disabling necessary cookies may affect the functionality of the admin area. For more information, visit your browser\'s help section.',
    },
    contact: {
      heading: '5. Contact',
      body: 'For any questions about our use of cookies, contact us at:',
    },
  },
  ru: {
    title: 'Политика куки',
    updated: 'Последнее обновление: май 2025',
    whatAreCookies: {
      heading: '1. Что такое куки',
      body: 'Куки — это небольшие текстовые файлы, сохраняемые на вашем устройстве браузером при посещении сайта. Они позволяют сайту запоминать информацию между загрузками страниц.',
    },
    cookiesWeUse: {
      heading: '2. Используемые куки',
      intro: 'Этот сайт использует только строго необходимые куки, без которых сайт не может функционировать. Такие куки не требуют вашего согласия по GDPR.',
      colName: 'Название', colPurpose: 'Назначение', colType: 'Тип', colDuration: 'Срок',
      row1Purpose: 'Токен сессии авторизации Supabase (только административная зона)',
      row2Purpose: 'Фрагменты токена сессии Supabase (только административная зона)',
      typeNecessary: 'Необходимый', durationSession: 'Сессия',
    },
    noTracking: {
      heading: '3. Куки для отслеживания',
      body: 'Мы не используем рекламные, аналитические или сторонние куки для отслеживания. Ваше поведение на сайте не отслеживается и не передаётся третьим лицам.',
    },
    control: {
      heading: '4. Управление куки',
      body: 'Вы можете управлять куки и удалять их через настройки браузера. Обратите внимание: отключение необходимых куки может повлиять на работу административной зоны.',
    },
    contact: {
      heading: '5. Контакт',
      body: 'По вопросам использования куки обращайтесь:',
    },
  },
  it: {
    title: 'Informativa sui Cookie',
    updated: 'Ultimo aggiornamento: maggio 2025',
    whatAreCookies: {
      heading: '1. Cosa Sono i Cookie',
      body: 'I cookie sono piccoli file di testo memorizzati sul dispositivo dal browser durante la visita a un sito web. Permettono al sito di ricordare informazioni tra un caricamento di pagina e l\'altro.',
    },
    cookiesWeUse: {
      heading: '2. Cookie Utilizzati',
      intro: 'Questo sito utilizza solo cookie strettamente necessari al funzionamento del sito. Questi cookie non richiedono il consenso ai sensi del GDPR.',
      colName: 'Nome Cookie', colPurpose: 'Finalità', colType: 'Tipo', colDuration: 'Durata',
      row1Purpose: 'Token di sessione di autenticazione Supabase (solo area amministrativa)',
      row2Purpose: 'Frammenti del token di sessione Supabase (solo area amministrativa)',
      typeNecessary: 'Necessario', durationSession: 'Sessione',
    },
    noTracking: {
      heading: '3. Nessun Cookie di Tracciamento',
      body: 'Non utilizziamo cookie pubblicitari, analitici o di tracciamento di terze parti. Il comportamento di navigazione su questo sito non viene tracciato né condiviso con terze parti.',
    },
    control: {
      heading: '4. Come Controllare i Cookie',
      body: 'È possibile controllare ed eliminare i cookie tramite le impostazioni del browser. Si noti che la disabilitazione dei cookie necessari potrebbe influire sulla funzionalità dell\'area amministrativa.',
    },
    contact: {
      heading: '5. Contatto',
      body: 'Per domande sull\'utilizzo dei cookie, contattarci a:',
    },
  },
}
