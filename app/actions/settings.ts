'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

type State = { error?: string; success?: string } | undefined

export async function updateContactSettings(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const payload = {
    id: 1,
    email:    formData.get('email') as string,
    phone:    formData.get('phone') as string,
    address:  formData.get('address') as string,
    whatsapp: formData.get('whatsapp') as string || '',
    p_iva:   formData.get('pIva') as string || '',
    updated_at: new Date().toISOString(),
  }

  const adminClient = createAdminClient()
  const { error } = await adminClient
    .from('contact_settings')
    .upsert(payload, { onConflict: 'id' })

  if (error) return { error: error.message }

  revalidatePath('/admin/settings')
  revalidatePath('/', 'layout')

  return { success: 'Settings saved successfully' }
}
