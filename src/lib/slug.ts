/**
 * Create a URL-friendly slug from a string.
 * Rules:
 * - Lowercase
 * - Replace spaces & underscores with hyphens
 * - Remove non-alphanumeric (except hyphen)
 * - Collapse multiple hyphens
 * - Trim hyphens from start & end
 */
export function createSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-') // spaces → -
    .replace(/_/g, '-') // underscores → -
    .replace(/[^a-z0-9-]/g, '') // remove invalid chars
    .replace(/--+/g, '-') // collapse multiple -
    .replace(/^-+|-+$/g, '') // trim -
}

/**
 * Create a unique slug with optional suffix.
 * @param input string to slugify
 * @param existing array of existing slugs (optional)
 * @returns unique slug
 */
export function createUniqueSlug(
  input: string,
  existing: string[] = []
): string {
  const base = createSlug(input)
  let slug = base
  let counter = 1

  while (existing.includes(slug)) {
    slug = `${base}-${counter}`
    counter++
  }

  return slug
}
