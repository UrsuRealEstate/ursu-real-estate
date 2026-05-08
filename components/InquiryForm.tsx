'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { submitInquiry } from '@/app/actions/contact'

interface InquiryFormProps {
  dict: any
  propertyTitle?: string
  lang?: string
}

export function InquiryForm({ dict, propertyTitle, lang = 'en' }: InquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitInquiry, undefined)

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-primary" />
        <p className="text-lg font-medium">{dict.contact.success}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="lang" value={lang} />
      {propertyTitle && <input type="hidden" name="property_title" value={propertyTitle} />}

      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
          {dict.contact.name}
        </label>
        <Input
          name="name"
          placeholder={dict.contact.namePlaceholder}
          required
          className="h-12 bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
          {dict.contact.email}
        </label>
        <Input
          name="email"
          type="email"
          placeholder={dict.contact.emailPlaceholder}
          required
          className="h-12 bg-background"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
          {dict.contact.phone}
        </label>
        <Input
          name="phone"
          type="tel"
          placeholder={dict.contact.phonePlaceholder}
          className="h-12 bg-background"
        />
      </div>

      {propertyTitle && (
        <div>
          <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
            {dict.contact.property}
          </label>
          <Input
            value={propertyTitle}
            readOnly
            className="h-12 bg-muted"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
          {dict.contact.message}
        </label>
        <Textarea
          name="message"
          placeholder={dict.contact.messagePlaceholder}
          rows={4}
          className="bg-background resize-none"
        />
      </div>

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input type="checkbox" required className="mt-0.5 w-4 h-4 shrink-0 accent-primary" />
        <span className="text-sm text-muted-foreground">
          {dict.contact_ext?.privacyConsent ?? 'I agree to the'}{' '}
          <Link href={`/${lang}/privacy`} className="underline underline-offset-2 hover:text-primary transition-colors">
            {dict.legal?.privacyPolicy ?? 'Privacy Policy'}
          </Link>
        </span>
      </label>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" size="lg" className="h-12 uppercase tracking-widest text-sm mt-2" disabled={pending}>
        {pending ? '…' : dict.contact.send}
      </Button>
    </form>
  )
}
