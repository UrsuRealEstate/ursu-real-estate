'use client'

import { useActionState, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updateContactSettings } from '@/app/actions/settings'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ContactSettings } from '@/lib/settings'

const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const MINUTES = ['00', '15', '30', '45']

function TimeSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [h, m] = value.split(':')
  const selectClass =
    'border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900'

  return (
    <div className="flex items-center gap-1">
      <select
        className={selectClass}
        value={h ?? '09'}
        onChange={e => onChange(`${e.target.value}:${m ?? '00'}`)}
      >
        {HOURS.map(hh => (
          <option key={hh} value={hh}>{hh}</option>
        ))}
      </select>
      <span className="text-gray-500 font-medium">:</span>
      <select
        className={selectClass}
        value={m ?? '00'}
        onChange={e => onChange(`${h ?? '09'}:${e.target.value}`)}
      >
        {MINUTES.map(mm => (
          <option key={mm} value={mm}>{mm}</option>
        ))}
      </select>
    </div>
  )
}

export default function SettingsForm({ current }: { current: ContactSettings }) {
  const router = useRouter()
  const [state, action, pending] = useActionState(updateContactSettings, undefined)

  const [selectedDays, setSelectedDays] = useState<Set<string>>(
    () => new Set(current.work_days ? current.work_days.split(',').map(d => d.trim()) : [])
  )
  const [timeOpen, setTimeOpen] = useState(current.work_time_open || '09:00')
  const [timeClose, setTimeClose] = useState(current.work_time_close || '18:00')

  useEffect(() => {
    setSelectedDays(new Set(current.work_days ? current.work_days.split(',').map(d => d.trim()) : []))
    setTimeOpen(current.work_time_open || '09:00')
    setTimeClose(current.work_time_close || '18:00')
  }, [current.work_days, current.work_time_open, current.work_time_close])

  useEffect(() => {
    if (state?.success) router.refresh()
  }, [state?.success, router])

  function toggleDay(day: string) {
    setSelectedDays(prev => {
      const next = new Set(prev)
      next.has(day) ? next.delete(day) : next.add(day)
      return next
    })
  }

  const workDaysValue = ALL_DAYS.filter(d => selectedDays.has(d)).join(',')

  return (
    <form action={action} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <Input id="email" name="email" type="email" defaultValue={current.email} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
        <Input id="phone" name="phone" type="tel" defaultValue={current.phone} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
        <Input id="address" name="address" type="text" defaultValue={current.address} required />
      </div>

      {/* Working days */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Working Days</span>
        <div className="flex gap-2 flex-wrap">
          {ALL_DAYS.map(day => {
            const active = selectedDays.has(day)
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors select-none',
                  active
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50',
                ].join(' ')}
              >
                {day}
              </button>
            )
          })}
        </div>
        <input type="hidden" name="work_days" value={workDaysValue} />
      </div>

      {/* Working hours — 24h selects */}
      <div className="space-y-3">
        <span className="text-sm font-medium text-gray-700">Working Hours (24h)</span>
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Open</p>
            <TimeSelect value={timeOpen} onChange={setTimeOpen} />
          </div>
          <span className="text-gray-400 mt-5">—</span>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Close</p>
            <TimeSelect value={timeClose} onChange={setTimeClose} />
          </div>
        </div>
        <input type="hidden" name="work_time_open" value={timeOpen} />
        <input type="hidden" name="work_time_close" value={timeClose} />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600">{state.success}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Saving…' : 'Save settings'}
      </Button>
    </form>
  )
}
