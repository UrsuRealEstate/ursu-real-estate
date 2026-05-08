'use client'

import { useState } from 'react'
import { deleteProperty } from '@/app/actions/properties'
import { Button } from '@/components/ui/button'

export default function DeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="ghost"
        className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm px-2"
        onClick={() => setConfirming(true)}
      >
        Delete
      </Button>
    )
  }

  return (
    <span className="flex items-center gap-2 text-sm">
      <span className="text-gray-600">Sure?</span>
      <form action={deleteProperty.bind(null, id)}>
        <Button type="submit" variant="ghost" className="text-red-600 hover:bg-red-50 px-2 h-7 text-sm">
          Yes
        </Button>
      </form>
      <Button
        type="button"
        variant="ghost"
        className="px-2 h-7 text-sm"
        onClick={() => setConfirming(false)}
      >
        No
      </Button>
    </span>
  )
}
