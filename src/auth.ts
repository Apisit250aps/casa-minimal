
import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './lib/db'

import Google from 'next-auth/providers/google'
import { Role } from './types/next-auth'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt' },
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user.role as Role) ?? ('user' as Role)
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = (token.role ?? 'user') as Role
      }
      return session
    },
  },
})
