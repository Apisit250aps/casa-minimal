import { z } from 'zod'
import { TagTypeEnum } from './enums'

export const TagSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'slug must be URL-friendly (kebab-case)'
    ),
  type: TagTypeEnum.default('general'),
  description: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
  usage_count: z.number().int().nonnegative().default(0),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
})

export type Tag = z.infer<typeof TagSchema>
