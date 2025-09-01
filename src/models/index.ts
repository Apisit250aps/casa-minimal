import client from '@/lib/db'
import { type User } from 'next-auth'

const db = client.db()

export const users = db.collection<User>('users')
