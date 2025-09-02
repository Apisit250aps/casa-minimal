import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'

export const ListingAmenitySchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  listing_id: z.uuid(),
  amenity_id: z.uuid(),
})

export type ListingAmenity = z.infer<typeof ListingAmenitySchema>
