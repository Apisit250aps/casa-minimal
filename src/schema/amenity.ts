import { z } from 'zod'

export const AmenitySchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(255),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type Amenity = z.infer<typeof AmenitySchema>
