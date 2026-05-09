'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

const supabase = createClient()

function storagePath(url: string): string {
  const marker = '/properties/'
  const i = url.indexOf(marker)
  return i >= 0 ? url.slice(i + marker.length) : url
}

interface Props {
  name: string
  multiple?: boolean
  initialUrls?: string[]
}

export default function ImageUpload({ name, multiple = false, initialUrls = [] }: Props) {
  const [urls, setUrls] = useState<string[]>(initialUrls.filter(Boolean))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    setError(null)

    const newUrls: string[] = []
    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('properties')
        .upload(path, file, { upsert: false })

      if (upErr) { setError(upErr.message); continue }

      const { data } = supabase.storage.from('properties').getPublicUrl(path)
      newUrls.push(data.publicUrl)
    }

    setUrls(prev => {
      if (multiple) return [...prev, ...newUrls]
      if (prev[0]) supabase.storage.from('properties').remove([storagePath(prev[0])])
      return newUrls.slice(0, 1)
    })
    setUploading(false)
  }

  async function removeUrl(idx: number) {
    const url = urls[idx]
    setUrls(prev => prev.filter((_, i) => i !== idx))
    await supabase.storage.from('properties').remove([storagePath(url)])
  }

  function handleDragStart(idx: number) { setDragIndex(idx) }
  function handleDragOver(e: React.DragEvent, idx: number) { e.preventDefault(); setDragOver(idx) }
  function handleDragEnd() { setDragIndex(null); setDragOver(null) }
  function handleDrop(idx: number) {
    if (dragIndex === null || dragIndex === idx) { setDragIndex(null); setDragOver(null); return }
    setUrls(prev => {
      const next = [...prev]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(idx, 0, moved)
      return next
    })
    setDragIndex(null)
    setDragOver(null)
  }

  const displayValue = multiple ? JSON.stringify(urls) : (urls[0] ?? '')

  return (
    <div className="space-y-3">
      {/* Previews */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url, i) => (
            <div
              key={url}
              draggable={multiple}
              onDragStart={multiple ? () => handleDragStart(i) : undefined}
              onDragOver={multiple ? e => handleDragOver(e, i) : undefined}
              onDrop={multiple ? () => handleDrop(i) : undefined}
              onDragEnd={multiple ? handleDragEnd : undefined}
              className={[
                'relative group',
                multiple ? 'cursor-grab active:cursor-grabbing' : '',
                dragOver === i && dragIndex !== i ? 'ring-2 ring-blue-400 rounded' : '',
                dragIndex === i ? 'opacity-50' : '',
              ].join(' ')}
            >
              <div className="relative w-24 h-24 border border-gray-200 rounded overflow-hidden">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" />
              </div>
              <button
                type="button"
                onClick={() => removeUrl(i)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        variant="ghost"
        className="border border-dashed border-gray-300 w-full h-10 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : multiple ? '+ Add images' : urls.length ? 'Replace image' : '+ Upload image'}
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Hidden input carries value into FormData */}
      <input type="hidden" name={name} value={displayValue} />
    </div>
  )
}
