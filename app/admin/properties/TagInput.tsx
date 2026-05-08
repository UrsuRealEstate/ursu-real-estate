'use client'

import { useState, useRef } from 'react'
import { splitFeatures } from '@/lib/properties'

interface Props {
  name: string
  defaultValue?: string
  placeholder?: string
}

export default function TagInput({ name, defaultValue = '', placeholder }: Props) {
  const [tags, setTags] = useState<string[]>(() => splitFeatures(defaultValue))
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function addTag(v: string) {
    const t = v.trim()
    if (t && !tags.includes(t)) setTags(prev => [...prev, t])
    setInput('')
  }

  function removeTag(i: number) {
    setTags(prev => prev.filter((_, j) => j !== i))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <div>
      <div
        className="min-h-[42px] flex flex-wrap gap-1.5 border border-gray-300 px-2 py-1.5 cursor-text bg-white focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-gray-900 transition-shadow"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gray-900 text-white text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={e => { e.stopPropagation(); removeTag(i) }}
              className="opacity-60 hover:opacity-100 leading-none transition-opacity"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (input.trim()) addTag(input) }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[140px] outline-none text-sm bg-transparent py-0.5 text-gray-900 placeholder:text-gray-400"
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">Press Enter to add, Backspace to remove last</p>
      <input type="hidden" name={name} value={tags.join('\n')} />
    </div>
  )
}
