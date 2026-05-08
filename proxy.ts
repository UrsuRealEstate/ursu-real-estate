import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['it', 'en', 'ru']
const defaultLocale = 'it'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferred = acceptLanguage.split(',').map(l => l.split(';')[0].trim().toLowerCase())
  for (const lang of preferred) {
    const short = lang.substring(0, 2)
    if (locales.includes(short)) return short
  }
  return defaultLocale
}

function hasSupabaseSession(request: NextRequest): boolean {
  return request.cookies.getAll().some(
    ({ name }) => name.startsWith('sb-') && name.endsWith('-auth-token')
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Strip locale prefix if present, to get the canonical path
  const localePrefix = locales.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  const canonicalPath = localePrefix
    ? pathname.slice(`/${localePrefix}`.length) || '/'
    : pathname

  // Admin routes: locale-prefixed versions (/en/admin) → redirect to /admin
  if (canonicalPath.startsWith('/admin')) {
    if (localePrefix) {
      return NextResponse.redirect(new URL(canonicalPath, request.nextUrl))
    }
    if (!hasSupabaseSession(request)) {
      return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }
    return NextResponse.next()
  }

  // Auth routes: locale-prefixed versions (/en/auth/login) → redirect to /auth/login
  if (canonicalPath.startsWith('/auth')) {
    if (localePrefix) {
      return NextResponse.redirect(new URL(canonicalPath, request.nextUrl))
    }
    return NextResponse.next()
  }

  // Public routes: ensure locale prefix
  if (localePrefix) return  // already has locale, pass through

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|\\.well-known|favicon\\.ico|site\\.webmanifest|sitemap\\.xml|robots\\.txt|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.ico$|.*\\.webmanifest$|.*\\.json$).*)',
  ],
}
