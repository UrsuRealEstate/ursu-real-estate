'use client'

import { useActionState } from 'react'
import { createUser } from '@/app/actions/users'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddUserForm() {
  const [state, action, pending] = useActionState(createUser, undefined)

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="add-email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="add-email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="add-password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="add-password"
          name="password"
          type="password"
          placeholder="Min. 6 characters"
          required
          minLength={6}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-sm text-green-600">{state.success}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? 'Creating…' : 'Create user'}
      </Button>
    </form>
  )
}
