import NextAuth, { NextAuthRequest } from 'next-auth'
import authConfig from './config/auth'
import { NextResponse } from 'next/server'
// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig)
export default auth(async (req: NextAuthRequest) => {
  // Your custom middleware logic goes here
  console.log(req.auth)
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
