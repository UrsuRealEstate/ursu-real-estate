'use client'

import { useActionState, useState } from 'react'
import { createProperty, updateProperty } from '@/app/actions/properties'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { PropertyRow } from '@/lib/properties'
import ImageUpload from './ImageUpload'
import RichTextEditor from './RichTextEditor'
import TagInput from './TagInput'

interface Props {
  current?: PropertyRow
}

type Locale = 'en' | 'ru' | 'it'

const TABS: { key: Locale; label: string }[] = [
  { key: 'en', label: 'EN' },
  { key: 'ru', label: 'RU' },
  { key: 'it', label: 'IT' },
]

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{title}</h3>
    {children}
  </div>
)

const LOCALE_LABELS: Record<Locale, { title: string; description: string; location: string; city: string; features: string; featuresPlaceholder: string }> = {
  en: {
    title: 'Title *',
    description: 'Description',
    location: 'Location',
    city: 'City',
    features: 'Features',
    featuresPlaceholder: 'Sea View, Terrace, Parking…',
  },
  ru: {
    title: 'Название',
    description: 'Описание',
    location: 'Расположение',
    city: 'Город',
    features: 'Характеристики',
    featuresPlaceholder: 'Вид на море, Терраса, Парковка…',
  },
  it: {
    title: 'Titolo',
    description: 'Descrizione',
    location: 'Posizione',
    city: 'Città',
    features: 'Caratteristiche',
    featuresPlaceholder: 'Vista Mare, Terrazza, Parcheggio…',
  },
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function PropertyForm({ current }: Props) {
  const isEdit = !!current
  const action = isEdit ? updateProperty : createProperty
  const [state, formAction, pending] = useActionState(action, undefined)
  const [activeLocale, setActiveLocale] = useState<Locale>('en')

  // Slug auto-generation (create mode only)
  const [titleEn, setTitleEn] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)

  function handleTitleEnChange(value: string) {
    setTitleEn(value)
    if (!slugEdited) setSlug(slugify(value))
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true)
    setSlug(value)
  }

  function resetSlug() {
    setSlugEdited(false)
    setSlug(slugify(titleEn))
  }

  return (
    <form action={formAction} className="space-y-8 max-w-3xl">
      {isEdit && <input type="hidden" name="id" value={current.id} />}

      {/* Basic */}
      <Section title="Basic">
        <div className="grid grid-cols-2 gap-4">
          {!isEdit ? (
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">ID (slug) *</label>
              <div className="flex gap-2">
                <Input
                  name="id"
                  value={slug}
                  onChange={e => handleSlugChange(e.target.value)}
                  placeholder="auto-generated from title"
                  required
                  pattern="[a-z0-9\-]+"
                  title="Lowercase letters, numbers and hyphens only"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={resetSlug}
                  title="Reset to auto-generated"
                  className="px-2.5 text-gray-400 hover:text-gray-700 border border-gray-300 rounded-md transition-colors text-base"
                >
                  ↺
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {slugEdited ? 'Manual — click ↺ to reset from title' : 'Auto-generated from Title EN'}
              </p>
            </div>
          ) : (
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">ID</label>
              <Input value={current.id} disabled className="bg-gray-50 text-gray-500" />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <Input name="price" type="number" min="0" defaultValue={current?.price ?? ''} placeholder="e.g. 1250000" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Currency</label>
            <Input name="currency" defaultValue={current?.currency ?? '€'} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Area (m²)</label>
            <Input name="area" type="number" min="0" defaultValue={current?.area ?? ''} placeholder="e.g. 185" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Rooms</label>
            <Input name="rooms" type="number" min="0" defaultValue={current?.rooms ?? ''} placeholder="e.g. 4" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Bathrooms</label>
            <Input name="bathrooms" type="number" min="0" defaultValue={current?.bathrooms ?? ''} placeholder="e.g. 2" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Floors <span className="text-gray-400 font-normal">(optional)</span></label>
            <Input name="floors" type="number" min="0" defaultValue={current?.floors ?? ''} placeholder="e.g. 3" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Lot Size (m²) <span className="text-gray-400 font-normal">(optional)</span></label>
            <Input name="lot_size" type="number" min="0" defaultValue={current?.lot_size ?? ''} placeholder="e.g. 1220" />
          </div>
          <div className="flex items-center gap-2 self-end pb-2 col-span-2">
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              defaultChecked={current?.is_active ?? true}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (visible on site)</label>
          </div>
        </div>
      </Section>

      {/* Localization — tabbed */}
      <div className="space-y-0">
        <div className="flex border-b border-gray-200">
          {TABS.map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveLocale(tab.key)}
              className={[
                'px-5 py-2.5 text-sm font-medium transition-colors -mb-px',
                activeLocale === tab.key
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {TABS.map(tab => {
          const lbl = LOCALE_LABELS[tab.key]
          const suffix = tab.key
          const isEnTab = suffix === 'en'
          return (
            <div key={tab.key} className={activeLocale === tab.key ? 'pt-5 space-y-3' : 'hidden'}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{lbl.title}</label>
                {isEnTab && !isEdit ? (
                  <Input
                    name="title_en"
                    value={titleEn}
                    onChange={e => handleTitleEnChange(e.target.value)}
                    required
                  />
                ) : (
                  <Input
                    name={`title_${suffix}`}
                    defaultValue={(current as any)?.[`title_${suffix}`] ?? ''}
                    required={isEnTab}
                  />
                )}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{lbl.description}</label>
                <RichTextEditor
                  name={`description_${suffix}`}
                  defaultValue={(current as any)?.[`description_${suffix}`] ?? ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">{lbl.location}</label>
                  <Input
                    name={`location_${suffix}`}
                    defaultValue={(current as any)?.[`location_${suffix}`] ?? ''}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">{lbl.city}</label>
                  <Input
                    name={`city_${suffix}`}
                    defaultValue={(current as any)?.[`city_${suffix}`] ?? ''}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">{lbl.features}</label>
                <TagInput
                  name={`features_${suffix}`}
                  defaultValue={(current as any)?.[`features_${suffix}`] ?? ''}
                  placeholder={lbl.featuresPlaceholder}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Images */}
      <Section title="Images">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Main Image</label>
            <ImageUpload name="image" initialUrls={current?.image ? [current.image] : []} />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Gallery</label>
            <ImageUpload name="images" multiple initialUrls={current?.images ?? []} />
          </div>
        </div>
      </Section>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : isEdit ? 'Save changes' : 'Create property'}
        </Button>
        <a href="/admin/properties" className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Cancel
        </a>
      </div>
    </form>
  )
}
