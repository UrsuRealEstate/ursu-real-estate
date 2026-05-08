import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin login</h1>
          <p className="text-sm text-gray-500 mt-1">URSU Real Estate</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
