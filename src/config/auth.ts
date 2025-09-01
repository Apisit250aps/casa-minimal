import { Role } from '@/types/next-auth';
import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'

export default {
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
} satisfies NextAuthConfig
