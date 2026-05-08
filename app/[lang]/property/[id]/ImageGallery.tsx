'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Camera, X } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'

interface Props {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: Props) {
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(false)
  const n = images.length

  // Arrow key navigation inside lightbox
  useEffect(() => {
    if (!open || n === 0) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % n)
      else if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, n])

  if (!n) return null

  const goNext = () => setCurrent(i => (i + 1) % n)
  const goPrev = () => setCurrent(i => (i - 1 + n) % n)

  return (
    <div className="space-y-3">
      {/* Viewport — click opens lightbox */}
      <div
        className="relative w-full aspect-[16/7] overflow-hidden border border-border group cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        {/* Filmstrip */}
        <div
          className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${current * (100 / n)}%)`,
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / n}%` }}
            >
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {n > 1 && (
          <>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); goPrev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/65 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); goNext() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/65 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter badge */}
        <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full select-none pointer-events-none">
          <Camera className="h-3.5 w-3.5 flex-shrink-0" />
          {current + 1} / {n}
        </span>
      </div>

      {/* Thumbnail strip */}
      {n > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={[
                'relative flex-shrink-0 w-24 h-16 overflow-hidden border-2 transition-all',
                i === current
                  ? 'border-primary opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90',
              ].join(' ')}
            >
              <Image
                src={src}
                alt={`${title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen lightbox */}
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/92" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 outline-none"
            aria-describedby={undefined}
          >
            <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>

            <div className="relative w-full h-full overflow-hidden">
              {/* Filmstrip */}
              <div
                className="flex h-full transition-transform duration-500 ease-in-out will-change-transform"
                style={{
                  width: `${n * 100}%`,
                  transform: `translateX(-${current * (100 / n)}%)`,
                }}
              >
                {images.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-full flex-shrink-0"
                    style={{ width: `${100 / n}%` }}
                  >
                    <Image
                      src={src}
                      alt={`${title} ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>

              {/* Arrows */}
              {n > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Close */}
              <DialogPrimitive.Close
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>

              {/* Counter */}
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none">
                {current + 1} / {n}
              </span>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  )
}
