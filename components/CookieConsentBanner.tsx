'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  lang: string
  dict: {
    cookieBanner: { text: string; accept: string; learnMore: string }
  }
}

export function CookieConsentBanner({ lang, dict }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground flex-1">
          {dict.cookieBanner.text}{' '}
          <Link
            href={`/${lang}/cookies`}
            className="underline underline-offset-2 hover:text-primary transition-colors"
          >
            {dict.cookieBanner.learnMore}
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 bg-primary text-primary-foreground text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          {dict.cookieBanner.accept}
        </button>
      </div>
    </div>
  )
}
