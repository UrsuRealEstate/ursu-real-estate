'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateContactSettings } from '@/app/actions/settings'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ContactSettings } from '@/lib/settings'

export default function SettingsForm({ current }: { current: ContactSettings }) {
  const router = useRouter()
  const [state, action, pending] = useActionState(updateContactSettings, undefined)

  useEffect(() => {
    if (state?.success) router.refresh()
  }, [state?.success, router])

  return (
    <form action={action} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <Input id="email" name="email" type="email" defaultValue={current.email} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
        <Input id="phone" name="phone" type="tel" defaultValue={current.phone} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
        <Input id="address" name="address" type="text" defaultValue={current.address} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
          WhatsApp <span className="text-gray-400 font-normal">(phone number with country code, e.g. +39123456789)</span>
        </label>
        <Input id="whatsapp" name="whatsapp" type="tel" defaultValue={current.whatsapp} placeholder="+39 000 000 0000" />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">{state.success}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save settings'}
      </Button>
    </form>
  )
}
