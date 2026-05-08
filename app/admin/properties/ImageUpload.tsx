'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'

const supabase = createClient()

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

    setUrls(prev => multiple ? [...prev, ...newUrls] : newUrls.slice(0, 1))
    setUploading(false)
  }

  function removeUrl(idx: number) {
    setUrls(prev => prev.filter((_, i) => i !== idx))
  }

  const displayValue = multiple ? JSON.stringify(urls) : (urls[0] ?? '')

  return (
    <div className="space-y-3">
      {/* Previews */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {urls.map((url, i) => (
            <div key={i} className="relative group">
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
