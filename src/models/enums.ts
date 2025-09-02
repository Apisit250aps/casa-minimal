import { z } from "zod";


export const ListingTypeEnum = z.enum(["sale", "rent"]);
export type ListingType = z.infer<typeof ListingTypeEnum>;


export const PropertyTypeEnum = z.enum(["house", "condo", "townhome", "land"]);
export type PropertyType = z.infer<typeof PropertyTypeEnum>;


export const ListingStatusEnum = z.enum(["draft", "published", "archived"]);
export type ListingStatus = z.infer<typeof ListingStatusEnum>;


export const TagTypeEnum = z.enum(["general", "location", "feature", "condition"]);
export type TagType = z.infer<typeof TagTypeEnum>;