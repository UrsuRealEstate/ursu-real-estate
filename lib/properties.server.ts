// Server-only: DB fetch functions

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { type Property, type PropertyRow, rowToProperty } from './properties'

export type { Property, PropertyRow }

export async function getPropertiesFromDB(): Promise<Property[]> {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('is_active', true)
      .order('position', { ascending: true })
      .order('created_at', { ascending: false })

    if (error || !data?.length) return []
    return data.map(row => rowToProperty(row as PropertyRow))
  } catch {
    return []
  }
}

export const getPropertyFromDB = cache(async function getPropertyFromDB(id: string): Promise<Property | undefined> {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return undefined
    return rowToProperty(data as PropertyRow)
  } catch {
    return undefined
  }
})

export async function getAllPropertiesAdmin(): Promise<PropertyRow[]> {
  const adminClient = createAdminClient()
  const { data } = await adminClient
    .from('properties')
    .select('*')
    .order('position', { ascending: true })
    .order('created_at', { ascending: false })
  return (data ?? []) as PropertyRow[]
}

export async function getPropertyAdmin(id: string): Promise<PropertyRow | null> {
  const adminClient = createAdminClient()
  const { data } = await adminClient
    .from('properties')
    .select('*')
    .eq('id', id)
    .single()
  return (data ?? null) as PropertyRow | null
}
