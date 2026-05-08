import { createAdminClient } from '@/utils/supabase/admin'
import AddUserForm from './AddUserForm'

export default async function UsersPage() {
  const adminClient = createAdminClient()
  const { data: { users }, error } = await adminClient.auth.admin.listUsers()

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-900">Users</h1>

      {/* Users table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {error && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-red-600">{error.message}</td>
              </tr>
            )}
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-gray-500">{user.role ?? 'user'}</td>
              </tr>
            ))}
            {!error && users?.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-gray-400">No users yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add user form */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-md">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Add user</h2>
        <AddUserForm />
      </div>
    </div>
  )
}
