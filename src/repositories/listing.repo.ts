import 'server-only'
import { BaseRepository, type BaseDoc } from '@/lib/base-repo'

import { ListingSchema, type Listing } from '@/models'
import { mongodb } from '@/lib/db'

class ListingRepository extends BaseRepository<Listing & BaseDoc> {}

let _repo: ListingRepository | null = null
let _indexed = false

export const listings = async () => {
  const db = await mongodb()
  return db.collection<Listing>('listings')
}

export async function useListingRepo() {
  if (_repo) return _repo
  const col = await listings()
  _repo = new ListingRepository(col, ListingSchema)
  if (!_indexed) {
    await _repo.ensureIndexes()
    _indexed = true
  }
  return _repo
}
