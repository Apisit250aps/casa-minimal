import client from '@/lib/db'
import {
  Amenity,
  Favorite,
  Listing,
  ListingAmenity,
  ListingImage,
  ListingTag,
  Tag,
} from '@/schema'
import { type User } from 'next-auth'
const db = client.db()

export const users = db.collection<User>('users')
export const listings = db.collection<Listing>('listings')
export const listingImages = db.collection<ListingImage>('listing_images')
export const amenities = db.collection<Amenity>('amenities')
export const listingAmenities =
  db.collection<ListingAmenity>('listing_amenities')
export const favorites = db.collection<Favorite>('favorites')
export const tags = db.collection<Tag>('tags')
export const listingTags = db.collection<ListingTag>('listing_tags')
