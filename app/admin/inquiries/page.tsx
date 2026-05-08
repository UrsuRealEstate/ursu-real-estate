import { getAllInquiries } from '@/lib/inquiries.server'

export default async function InquiriesPage() {
  const inquiries = await getAllInquiries()
  const unread = inquiries.filter(i => !i.is_read).length

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
        {unread > 0 && (
          <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            {unread} new
          </span>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div className="border border-gray-200 rounded-lg p-12 text-center text-gray-400">
          No inquiries yet. They will appear here when visitors submit the contact form.
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Lang</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Property</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className={inq.is_read ? 'hover:bg-gray-50' : 'bg-blue-50/40 hover:bg-blue-50/70'}>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    <div>{new Date(inq.created_at).toLocaleDateString('it-IT')}</div>
                    <div className="text-xs text-gray-400">{new Date(inq.created_at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{inq.name}</td>
                  <td className="px-4 py-3">
                    <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">
                      {inq.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {inq.phone
                      ? <a href={`tel:${inq.phone}`} className="hover:text-gray-900">{inq.phone}</a>
                      : <span className="text-gray-300">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded uppercase">
                      {inq.lang}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate">
                    {inq.property_title ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs">
                    <p className="line-clamp-2">{inq.message ?? <span className="text-gray-300">—</span>}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
