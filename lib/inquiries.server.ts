import { createAdminClient } from '@/utils/supabase/admin'

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  property_title: string | null
  lang: string
  is_read: boolean
  created_at: string
}

export async function getRecentInquiries(limit = 5): Promise<Inquiry[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Inquiry[]
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const admin = createAdminClient()
  const { data } = await admin
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false })
  return (data ?? []) as Inquiry[]
}
