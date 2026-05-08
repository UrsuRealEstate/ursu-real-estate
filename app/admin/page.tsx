import Link from 'next/link'
import { getRecentInquiries } from '@/lib/inquiries.server'

export default async function AdminDashboard() {
  const inquiries = await getRecentInquiries(5)

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>

      {/* Recent Inquiries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            View all →
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="border border-gray-200 rounded-lg p-8 text-center text-gray-400">
            No inquiries yet
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Property</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className={inq.is_read ? '' : 'bg-blue-50/40'}>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(inq.created_at).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{inq.name}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">
                        {inq.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{inq.property_title ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                      {inq.message ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
