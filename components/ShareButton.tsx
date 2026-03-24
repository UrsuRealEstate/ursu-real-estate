'use client'

import { Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

interface ShareButtonProps {
  title: string
  text: string
  lang: Locale
}

export function ShareButton({ title, text, lang }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareTextBase = {
    en: 'Share',
    ru: 'Поделиться',
    it: 'Condividi'
  }[lang] || 'Share'

  const copiedText = {
    en: 'Copied!',
    ru: 'Скопировано!',
    it: 'Copiato!'
  }[lang] || 'Copied!'

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (err) {
        // If user canceled or failed, fallback to copy if desired, but native share handles it.
        console.error('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="h-12 uppercase tracking-widest text-sm gap-2"
      onClick={handleShare}
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4" />}
      {copied ? copiedText : shareTextBase}
    </Button>
  )
}
