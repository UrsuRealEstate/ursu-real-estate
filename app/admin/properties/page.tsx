import Link from 'next/link'
import { getAllPropertiesAdmin } from '@/lib/properties.server'
import { formatPrice } from '@/lib/properties'
import DeleteButton from './DeleteButton'
import PositionButtons from './PositionButtons'

export default async function PropertiesPage() {
  const rows = await getAllPropertiesAdmin()

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
        >
          + Add property
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left w-16">Pos</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Rooms</th>
              <th className="px-6 py-3 text-left">Area</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No properties yet.{' '}
                  <Link href="/admin/properties/new" className="text-gray-900 underline">Add one</Link>
                </td>
              </tr>
            )}
            {rows.map((row, idx) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <PositionButtons
                    id={row.id}
                    position={row.position ?? 0}
                    prevItem={idx > 0 ? { id: rows[idx - 1].id, position: rows[idx - 1].position ?? 0 } : null}
                    nextItem={idx < rows.length - 1 ? { id: rows[idx + 1].id, position: rows[idx + 1].position ?? 0 } : null}
                  />
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 truncate max-w-[220px]">{row.title_en || row.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{row.id}</p>
                </td>
                <td className="px-6 py-4 text-gray-700">{row.price ? formatPrice(row.price, row.currency) : '—'}</td>
                <td className="px-6 py-4 text-gray-500">{row.rooms}</td>
                <td className="px-6 py-4 text-gray-500">{row.area} m²</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    <span className={[
                      'inline-flex px-2 py-0.5 rounded text-xs font-medium',
                      row.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500',
                    ].join(' ')}>
                      {row.is_active ? 'Active' : 'Hidden'}
                    </span>
                    {row.is_sold && (
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                        Sold
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/properties/${row.id}/edit`}
                      className="text-gray-600 hover:text-gray-900 text-sm px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={row.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
