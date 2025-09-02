import { DefaultSession } from 'next-auth'

type Role = 'admin' | 'user' | 'vendor'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: Role
    } & DefaultSession['user'],
  }

  interface User {
    role?: Role
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string
    role?: Role
  }
}
