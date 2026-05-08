import { createAdminClient } from '@/utils/supabase/admin'
import type { ContactSettings } from '@/lib/settings'
import SettingsForm from './SettingsForm'

const DEFAULTS: ContactSettings = {
  email: 'info@ursurealestate.com',
  phone: '+39 02 1234 5678',
  address: 'Via Roma 15, 20121 Milano, Italy',
  work_days: 'Mon,Tue,Wed,Thu,Fri',
  work_time_open: '09:00',
  work_time_close: '18:00',
}

export default async function SettingsPage() {
  const adminClient = createAdminClient()
  const { data } = await adminClient
    .from('contact_settings')
    .select('email, phone, address, work_days, work_time_open, work_time_close')
    .eq('id', 1)
    .single()

  const current: ContactSettings = (data as ContactSettings | null) ?? DEFAULTS

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Contact information shown on the public website.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <SettingsForm current={current} />
      </div>
    </div>
  )
}
