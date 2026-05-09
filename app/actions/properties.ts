'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

type State = { error?: string } | undefined

async function requireAdmin() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
}

function buildPayload(formData: FormData, includeId = true) {
  const imagesRaw = formData.get('images') as string
  let images: string[] = []
  try { images = JSON.parse(imagesRaw || '[]') } catch { images = [] }

  return {
    ...(includeId ? { id: (formData.get('id') as string).trim() } : {}),
    title_en: formData.get('title_en') as string,
    title_ru: formData.get('title_ru') as string,
    title_it: formData.get('title_it') as string,
    description_en: formData.get('description_en') as string,
    description_ru: formData.get('description_ru') as string,
    description_it: formData.get('description_it') as string,
    location_en: formData.get('location_en') as string,
    location_ru: formData.get('location_ru') as string,
    location_it: formData.get('location_it') as string,
    city_en: formData.get('city_en') as string,
    city_ru: formData.get('city_ru') as string,
    city_it: formData.get('city_it') as string,
    features_en: formData.get('features_en') as string,
    features_ru: formData.get('features_ru') as string,
    features_it: formData.get('features_it') as string,
    price:    parseInt(formData.get('price')    as string, 10) || null,
    currency: formData.get('currency') as string || '€',
    area:     parseInt(formData.get('area')     as string, 10) || null,
    rooms:    parseInt(formData.get('rooms')    as string, 10) || null,
    bathrooms:parseInt(formData.get('bathrooms') as string, 10) || null,
    floors:    parseInt(formData.get('floors')    as string, 10) || null,
    lot_size:  parseInt(formData.get('lot_size')  as string, 10) || null,
    image: formData.get('image') as string || '',
    images,
    is_active: formData.get('is_active') === 'on',
    updated_at: new Date().toISOString(),
  }
}

export async function createProperty(_prevState: State, formData: FormData): Promise<State> {
  try { await requireAdmin() } catch { return { error: 'Unauthorized' } }

  const payload = buildPayload(formData, true)
  if (!payload.id) return { error: 'ID is required' }

  const adminClient = createAdminClient()
  const { error } = await adminClient.from('properties').insert(payload)
  if (error) return { error: error.message }

  revalidatePath('/admin/properties')
  revalidatePath('/', 'layout')
  redirect('/admin/properties')
}

export async function updateProperty(_prevState: State, formData: FormData): Promise<State> {
  try { await requireAdmin() } catch { return { error: 'Unauthorized' } }

  const id = formData.get('id') as string
  const payload = buildPayload(formData, false)

  const adminClient = createAdminClient()
  const { error } = await adminClient.from('properties').update(payload).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/properties')
  revalidatePath('/', 'layout')
  redirect('/admin/properties')
}

function storagePath(url: string): string {
  const marker = '/properties/'
  const i = url.indexOf(marker)
  return i >= 0 ? url.slice(i + marker.length) : url
}

export async function deleteProperty(id: string): Promise<void> {
  try { await requireAdmin() } catch { return }

  const adminClient = createAdminClient()

  const { data: prop } = await adminClient
    .from('properties')
    .select('image, images')
    .eq('id', id)
    .single()

  if (prop) {
    const paths: string[] = []
    if (prop.image) paths.push(storagePath(prop.image))
    if (prop.images?.length) paths.push(...prop.images.map(storagePath))
    if (paths.length) await adminClient.storage.from('properties').remove(paths)
  }

  await adminClient.from('properties').delete().eq('id', id)

  revalidatePath('/admin/properties')
  revalidatePath('/', 'layout')
  redirect('/admin/properties')
}
