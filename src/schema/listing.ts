import { z } from 'zod'
import { uuidv4 } from '@/lib/uuid'
import { ListingTypeEnum, PropertyTypeEnum, ListingStatusEnum } from './enums'

const nowYear = new Date().getFullYear()

export const ListingSchema = z.object({
  id: z.uuid().default(() => uuidv4()),
  user_id: z.uuid(),

  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'slug must be URL-friendly (kebab-case)'
    )
    .brand('Slug'),
  description: z.string().nullable().optional(),

  listing_type: ListingTypeEnum,
  property_type: PropertyTypeEnum,

  // decimals stored in DB — accept string or number
  price: z.coerce.number().nonnegative().finite(),
  bedrooms: z.number().int().nonnegative().nullable().optional(),
  bathrooms: z.number().int().nonnegative().nullable().optional(),
  area_sqm: z.coerce.number().nonnegative().finite().nullable().optional(),

  year_built: z.number().int().min(1800).max(nowYear).nullable().optional(),
  parking_spaces: z.number().int().nonnegative().nullable().optional(),
  floor: z.number().int().nonnegative().nullable().optional(),
  total_floors: z.number().int().nonnegative().nullable().optional(),

  status: ListingStatusEnum.default('draft'),

  latitude: z.coerce.number().min(-90).max(90).nullable().optional(),
  longitude: z.coerce.number().min(-180).max(180).nullable().optional(),

  address_line: z.string().max(255).nullable().optional(),
  district: z.string().max(255).nullable().optional(),
  province: z.string().max(255).nullable().optional(),
  postal_code: z.string().max(10).nullable().optional(),

  contact_name: z.string().max(255).nullable().optional(),
  contact_phone: z.string().max(20).nullable().optional(),
  contact_line: z.string().max(255).nullable().optional(),
  contact_email: z.email().nullable().optional(),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().nullable().optional(), // softDeletes
})

export type Listing = z.infer<typeof ListingSchema>
