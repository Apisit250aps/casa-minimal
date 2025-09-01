import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import client from './lib/db'
import authConfig from './config/auth'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
