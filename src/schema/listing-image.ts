import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'

export const ListingImageSchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  listing_id: z.uuid(),

  path: z.string().min(1),
  is_cover: z.boolean().default(false),
  sort_order: z.number().int().nonnegative().default(0),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type ListingImage = z.infer<typeof ListingImageSchema>
