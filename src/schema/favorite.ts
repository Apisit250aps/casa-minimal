import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'

export const FavoriteSchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  user_id: z.uuid(),
  listing_id: z.uuid(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type Favorite = z.infer<typeof FavoriteSchema>
