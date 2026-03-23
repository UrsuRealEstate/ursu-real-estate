'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

interface InquiryFormProps {
  dict: any
  propertyTitle?: string
}

export function InquiryForm({ dict, propertyTitle }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-primary" />
        <p className="text-lg font-medium">{dict.contact.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium mb-2 uppercase tracking-wider text-muted-foreground">
          {dict.contact.name}
        </label>
        <Input
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
          placeholder={dict.contact.messagePlaceholder}
          rows={4}
          className="bg-background resize-none"
        />
      </div>

      <Button type="submit" size="lg" className="h-12 uppercase tracking-widest text-sm mt-2">
        {dict.contact.send}
      </Button>
    </form>
  )
}
