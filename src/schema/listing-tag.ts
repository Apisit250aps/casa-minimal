import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'

export const ListingTagSchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  listing_id: z.uuid(),
  tag_id: z.uuid(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type ListingTag = z.infer<typeof ListingTagSchema>
