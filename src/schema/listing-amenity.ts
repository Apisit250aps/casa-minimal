import { z } from 'zod'

export const ListingAmenitySchema = z.object({
  id: z.uuid(),
  listing_id: z.uuid(),
  amenity_id: z.uuid(),
})

export type ListingAmenity = z.infer<typeof ListingAmenitySchema>
