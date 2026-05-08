import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export type ContactSettings = {
  email: string
  phone: string
  address: string
  work_days: string        // "Mon,Tue,Wed,Thu,Fri"
  work_time_open: string   // "09:00"
  work_time_close: string  // "18:00"
}

const DEFAULTS: ContactSettings = {
  email: 'info@ursurealestate.com',
  phone: '+39 02 1234 5678',
  address: 'Via Roma 15, 20121 Milano, Italy',
  work_days: 'Mon,Tue,Wed,Thu,Fri',
  work_time_open: '09:00',
  work_time_close: '18:00',
}

const DAY_LABELS: Record<string, Record<string, string>> = {
  en: { Mon: 'Mon', Tue: 'Tue', Wed: 'Wed', Thu: 'Thu', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun' },
  ru: { Mon: 'Пн',  Tue: 'Вт',  Wed: 'Ср',  Thu: 'Чт',  Fri: 'Пт',  Sat: 'Сб',  Sun: 'Вс'  },
  it: { Mon: 'Lun', Tue: 'Mar', Wed: 'Mer', Thu: 'Gio', Fri: 'Ven', Sat: 'Sab', Sun: 'Dom' },
}

export function formatWorkHours(s: ContactSettings, locale: string): string {
  if (!s.work_days) return ''
  const labels = DAY_LABELS[locale] ?? DAY_LABELS.en
  const translatedDays = s.work_days
    .split(',')
    .map(d => labels[d.trim()] ?? d.trim())
    .join(', ')
  return `${translatedDays}: ${s.work_time_open} — ${s.work_time_close}`
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase
      .from('contact_settings')
      .select('email, phone, address, work_days, work_time_open, work_time_close')
      .eq('id', 1)
      .single()

    if (error || !data) return DEFAULTS
    return data as ContactSettings
  } catch {
    return DEFAULTS
  }
}
