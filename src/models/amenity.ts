import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'

export const AmenitySchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  name: z.string().min(1).max(255),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type Amenity = z.infer<typeof AmenitySchema>
