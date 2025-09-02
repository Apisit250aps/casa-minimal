import { z } from "zod";


export const ListingTagSchema = z.object({
id: z.string().uuid(),
listing_id: z.string().uuid(),
tag_id: z.string().uuid(),
created_at: z.date().optional(),
updated_at: z.date().optional(),
// unique([listing_id, tag_id]) at DB level
});


export type ListingTag = z.infer<typeof ListingTagSchema>;