import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-gray-900 text-gray-100 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-700">
          <span className="font-semibold text-sm tracking-wide uppercase text-gray-400">Admin</span>
          <p className="text-white font-medium mt-1 text-sm truncate">{user.email}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/properties"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Inquiries
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Users
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            Settings
          </Link>
        </nav>

        <div className="px-3 py-4 border-t border-gray-700">
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700 text-sm"
            >
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
