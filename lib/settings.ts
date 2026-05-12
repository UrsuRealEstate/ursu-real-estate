import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export type ContactSettings = {
  email: string
  phone: string
  address: string
  whatsapp: string
  pIva: string
}

const DEFAULTS: ContactSettings = {
  email: 'info@ursurealestate.com',
  phone: '+39 02 1234 5678',
  address: 'Via Roma 15, 20121 Milano, Italy',
  whatsapp: '',
  pIva: '',
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase
      .from('contact_settings')
      .select('email, phone, address, whatsapp, p_iva')
      .eq('id', 1)
      .single()

    if (error || !data) return DEFAULTS
    return { ...data, pIva: data.p_iva || '' } as ContactSettings
  } catch {
    return DEFAULTS
  }
}
