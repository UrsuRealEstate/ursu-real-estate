import { notFound } from 'next/navigation'
import Link from 'next/link'
import { hasLocale, type Locale } from '../dictionaries'

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale

  const content = CONTENT[locale] ?? CONTENT.en

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">{content.title}</h1>
        <p className="text-sm text-muted-foreground mb-12">{content.updated}</p>

        <div className="prose-content space-y-10 text-muted-foreground leading-relaxed">
          {content.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-medium text-foreground mb-3">{s.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.body }} />
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href={`/${lang}/cookies`} className="text-primary hover:underline text-sm">
            {locale === 'ru' ? '→ Политика куки' : locale === 'it' ? '→ Informativa sui Cookie' : '→ Cookie Policy'}
          </Link>
        </div>
      </div>
    </div>
  )
}

const CONTENT: Record<Locale, { title: string; updated: string; sections: { heading: string; body: string }[] }> = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2025',
    sections: [
      {
        heading: '1. Data Controller',
        body: '<p>URSU Real Estate ("we", "us") is the controller of personal data collected through this website. Contact: <strong>info@ursurealestate.com</strong></p>',
      },
      {
        heading: '2. Data We Collect',
        body: '<p>When you submit an inquiry form, we collect:</p><ul><li>Full name</li><li>Email address</li><li>Phone number (optional)</li><li>Message content</li><li>Property of interest</li></ul><p>We do not collect any data through tracking or analytics technologies.</p>',
      },
      {
        heading: '3. Purpose & Legal Basis',
        body: '<p>We process your data to respond to your property inquiry. The legal basis is <strong>legitimate interest</strong> (Art. 6(1)(f) GDPR) — responding to a request you have explicitly submitted.</p>',
      },
      {
        heading: '4. Data Retention',
        body: '<p>Inquiry data is retained for a maximum of <strong>12 months</strong> from the date of submission, unless you request earlier deletion or a business relationship develops.</p>',
      },
      {
        heading: '5. Data Processors',
        body: '<p>We use <strong>Supabase</strong> (Supabase Inc.) as our database and infrastructure provider. Supabase processes data on servers within the EU. For details, see <a href="https://supabase.com/privacy" target="_blank" rel="noopener" class="underline hover:text-primary">Supabase Privacy Policy</a>.</p>',
      },
      {
        heading: '6. Your Rights',
        body: '<p>Under GDPR you have the right to:</p><ul><li><strong>Access</strong> — request a copy of your data</li><li><strong>Rectification</strong> — correct inaccurate data</li><li><strong>Erasure</strong> — request deletion of your data</li><li><strong>Portability</strong> — receive your data in a structured format</li><li><strong>Objection</strong> — object to processing based on legitimate interest</li></ul><p>To exercise these rights, contact us at <strong>info@ursurealestate.com</strong>. You also have the right to lodge a complaint with the Italian Data Protection Authority (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener" class="underline hover:text-primary">Garante</a>).</p>',
      },
      {
        heading: '7. Cookies',
        body: '<p>This website uses only essential functional cookies. No tracking, advertising or analytics cookies are used. See our <a href="/en/cookies" class="underline hover:text-primary">Cookie Policy</a> for details.</p>',
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: май 2025',
    sections: [
      {
        heading: '1. Оператор данных',
        body: '<p>URSU Real Estate является оператором персональных данных, собираемых через этот сайт. Контакт: <strong>info@ursurealestate.com</strong></p>',
      },
      {
        heading: '2. Собираемые данные',
        body: '<p>При заполнении формы обратной связи мы собираем:</p><ul><li>Полное имя</li><li>Адрес электронной почты</li><li>Номер телефона (необязательно)</li><li>Текст сообщения</li><li>Интересующий объект</li></ul><p>Мы не собираем данные с помощью технологий отслеживания или аналитики.</p>',
      },
      {
        heading: '3. Цели и правовое основание',
        body: '<p>Мы обрабатываем ваши данные для ответа на запрос о недвижимости. Правовое основание — <strong>законный интерес</strong> (ст. 6(1)(f) GDPR): ответ на запрос, который вы явно направили.</p>',
      },
      {
        heading: '4. Срок хранения данных',
        body: '<p>Данные из форм хранятся не более <strong>12 месяцев</strong> с даты отправки, если только вы не запросите более раннее удаление или не установятся деловые отношения.</p>',
      },
      {
        heading: '5. Обработчики данных',
        body: '<p>Мы используем <strong>Supabase</strong> (Supabase Inc.) как поставщика базы данных и инфраструктуры. Данные обрабатываются на серверах в ЕС. Подробнее: <a href="https://supabase.com/privacy" target="_blank" rel="noopener" class="underline hover:text-primary">Политика конфиденциальности Supabase</a>.</p>',
      },
      {
        heading: '6. Ваши права',
        body: '<p>По GDPR вы имеете право на:</p><ul><li><strong>Доступ</strong> — получить копию ваших данных</li><li><strong>Исправление</strong> — скорректировать неточные данные</li><li><strong>Удаление</strong> — запросить удаление ваших данных</li><li><strong>Переносимость</strong> — получить данные в структурированном формате</li><li><strong>Возражение</strong> — возразить против обработки на основании законного интереса</li></ul><p>Для реализации прав обращайтесь: <strong>info@ursurealestate.com</strong>. Вы также вправе подать жалобу в итальянский орган по защите данных (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener" class="underline hover:text-primary">Garante</a>).</p>',
      },
      {
        heading: '7. Куки',
        body: '<p>Сайт использует только необходимые функциональные куки. Куки для отслеживания, рекламы или аналитики не используются. Подробнее в нашей <a href="/ru/cookies" class="underline hover:text-primary">Политике куки</a>.</p>',
      },
    ],
  },
  it: {
    title: 'Informativa sulla Privacy',
    updated: 'Ultimo aggiornamento: maggio 2025',
    sections: [
      {
        heading: '1. Titolare del Trattamento',
        body: '<p>URSU Real Estate è il titolare del trattamento dei dati personali raccolti tramite questo sito. Contatto: <strong>info@ursurealestate.com</strong></p>',
      },
      {
        heading: '2. Dati Raccolti',
        body: '<p>Quando si compila il modulo di contatto, raccogliamo:</p><ul><li>Nome e cognome</li><li>Indirizzo email</li><li>Numero di telefono (facoltativo)</li><li>Testo del messaggio</li><li>Proprietà di interesse</li></ul><p>Non raccogliamo dati tramite tecnologie di tracciamento o analisi.</p>',
      },
      {
        heading: '3. Finalità e Base Giuridica',
        body: '<p>Trattiamo i suoi dati per rispondere alla sua richiesta immobiliare. La base giuridica è il <strong>legittimo interesse</strong> (art. 6(1)(f) GDPR): rispondere a una richiesta da Lei esplicitamente inviata.</p>',
      },
      {
        heading: '4. Conservazione dei Dati',
        body: '<p>I dati dei moduli sono conservati per un massimo di <strong>12 mesi</strong> dalla data di invio, salvo richiesta di cancellazione anticipata o instaurazione di un rapporto commerciale.</p>',
      },
      {
        heading: '5. Responsabili del Trattamento',
        body: '<p>Utilizziamo <strong>Supabase</strong> (Supabase Inc.) come fornitore di database e infrastruttura. I dati vengono elaborati su server all\'interno dell\'UE. Per i dettagli: <a href="https://supabase.com/privacy" target="_blank" rel="noopener" class="underline hover:text-primary">Privacy Policy di Supabase</a>.</p>',
      },
      {
        heading: '6. I Suoi Diritti',
        body: '<p>Ai sensi del GDPR, ha il diritto di:</p><ul><li><strong>Accesso</strong> — richiedere una copia dei Suoi dati</li><li><strong>Rettifica</strong> — correggere dati inesatti</li><li><strong>Cancellazione</strong> — richiedere la cancellazione dei Suoi dati</li><li><strong>Portabilità</strong> — ricevere i dati in formato strutturato</li><li><strong>Opposizione</strong> — opporsi al trattamento basato sul legittimo interesse</li></ul><p>Per esercitare questi diritti: <strong>info@ursurealestate.com</strong>. Ha anche il diritto di proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener" class="underline hover:text-primary">Garante</a>).</p>',
      },
      {
        heading: '7. Cookie',
        body: '<p>Questo sito utilizza solo cookie funzionali essenziali. Non vengono utilizzati cookie di tracciamento, pubblicità o analitici. Vedere la nostra <a href="/it/cookies" class="underline hover:text-primary">Informativa sui Cookie</a> per i dettagli.</p>',
      },
    ],
  },
}
