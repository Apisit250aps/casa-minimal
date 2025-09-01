import NextAuth, { NextAuthRequest } from 'next-auth'
import authConfig from './config/auth'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

const PROTECTED_PATHS = ['/admin', '/dashboard', '/profile']

export default auth(async (req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname
  const auth = req.auth

  if (pathname.startsWith('/login')) {
    if (auth) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    if (!auth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (pathname.startsWith('/admin')) {
      if (auth.user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
