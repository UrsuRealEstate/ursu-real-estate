import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPropertyAdmin } from '@/lib/properties.server'
import PropertyForm from '../../PropertyForm'

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const row = await getPropertyAdmin(id)
  if (!row) notFound()

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/properties" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Edit: {row.title_en || row.id}</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <PropertyForm current={row} />
      </div>
    </div>
  )
}
