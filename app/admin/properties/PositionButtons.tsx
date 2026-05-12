'use client'

import { useTransition } from 'react'
import { swapPropertyPositions } from '@/app/actions/properties'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface Props {
  id: string
  position: number
  prevItem?: { id: string; position: number } | null
  nextItem?: { id: string; position: number } | null
}

export default function PositionButtons({ id, position, prevItem, nextItem }: Props) {
  const [pending, startTransition] = useTransition()

  function moveUp() {
    if (!prevItem) return
    startTransition(() => {
      swapPropertyPositions(id, position, prevItem.id, prevItem.position)
    })
  }

  function moveDown() {
    if (!nextItem) return
    startTransition(() => {
      swapPropertyPositions(id, position, nextItem.id, nextItem.position)
    })
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        onClick={moveUp}
        disabled={!prevItem || pending}
        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Move up"
        title="Move up"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={moveDown}
        disabled={!nextItem || pending}
        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Move down"
        title="Move down"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <span className="text-xs text-gray-400 ml-1 tabular-nums w-6 text-center">{position}</span>
    </div>
  )
}
