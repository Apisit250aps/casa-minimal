import {
  type Collection,
  type Document,
  type Filter,
  type FindOptions,
  type UpdateFilter,
  type UpdateOptions,
  type DeleteOptions,
  type OptionalUnlessRequiredId,
  type WithId,
  type InsertManyResult,
} from 'mongodb'
import { z } from 'zod'

export interface BaseDoc extends Document {
  id: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date | null
}

export abstract class BaseRepository<T extends BaseDoc> {
  protected collection: Collection<T>
  // ยอมรับทั้ง ZodObject และ ZodType เพื่อความยืดหยุ่น
  protected schema?: z.ZodObject<T> | z.ZodType<T>

  constructor(
    collection: Collection<T>,
    schema?: z.ZodObject<T> | z.ZodType<T>
  ) {
    this.collection = collection
    this.schema = schema
  }

  private now() {
    return new Date()
  }

  protected validate(data: unknown): T {
    return this.schema ? (this.schema.parse(data) as T) : (data as T)
  }

  protected validatePartial(data: unknown): Partial<T> {
    if (!this.schema) return data as Partial<T>
    // อนุญาต partial และเก็บคีย์ที่ schema ไม่รู้จัก (เช่น deleted_at)
    if (this.schema instanceof z.ZodObject) {
      return this.schema.partial().parse(data) as Partial<T>
    }
    // ถ้าไม่ใช่ object schema ให้ผ่านไป (เพื่อเลี่ยงบังคับ field ที่ไม่จำเป็น)
    return data as Partial<T>
  }

  async create(data: Omit<T, '_id'>): Promise<WithId<T>> {
    const payload = this.validate({
      ...data,
      created_at: this.now(),
      updated_at: this.now(),
    })
    const res = await this.collection.insertOne(
      payload as OptionalUnlessRequiredId<T>
    )
    return { ...(payload as T), _id: res.insertedId } as WithId<T>
  }

  async createMany(data: Omit<T, '_id'>[]): Promise<WithId<T>[]> {
    const docs = data.map((d) =>
      this.validate({ ...d, created_at: this.now(), updated_at: this.now() })
    )
    const res = await this.collection.insertMany(
      docs as OptionalUnlessRequiredId<T>[]
    )
    return docs.map((doc, i) => ({
      ...doc,
      _id: (res as InsertManyResult<T>).insertedIds[i],
    })) as WithId<T>[]
  }

  async findById(
    id: string,
    options?: FindOptions<T>
  ): Promise<WithId<T> | null> {
    return this.collection.findOne({ id } as Filter<T>, options)
  }

  async findOne(
    filter: Filter<T>,
    options?: FindOptions<T>
  ): Promise<WithId<T> | null> {
    return this.collection.findOne(filter, options)
  }

  async findMany(
    filter: Filter<T> = {} as Filter<T>,
    options?: FindOptions<T>
  ): Promise<WithId<T>[]> {
    return this.collection.find(filter, options).toArray()
  }

  async findManyPaginated(
    filter: Filter<T> = {} as Filter<T>,
    page = 1,
    limit = 10,
    options?: FindOptions<T>
  ): Promise<Pagination<WithId<T>>> {
    const safePage = Math.max(1, page)
    const safeLimit = Math.min(Math.max(1, limit), 100)
    const skip = (safePage - 1) * safeLimit

    const [docs, total_docs] = await Promise.all([
      this.collection
        .find(filter, options)
        .skip(skip)
        .limit(safeLimit)
        .toArray(),
      this.collection.countDocuments(filter),
    ])

    const total_page = Math.max(1, Math.ceil(total_docs / safeLimit))

    return { docs, page: safePage, limit: safeLimit, total_page, total_docs }
  }

  async updateById(
    id: string,
    data: Partial<Omit<T, '_id' | 'id' | 'created_at'>>,
    options?: UpdateOptions
  ): Promise<WithId<T> | null> {
    const $set = this.validatePartial({ ...data, updated_at: this.now() })
    const res = await this.collection.findOneAndUpdate(
      { id } as Filter<T>,
      { $set } as UpdateFilter<T>,
      {
        ...options,
        returnDocument: 'after',
        hint: options?.hint ? (options.hint as Document) : undefined,
      }
    )
    return (res as T).value ?? null
  }

  async updateOne(
    filter: Filter<T>,
    data: Partial<Omit<T, '_id' | 'created_at'>>,
    options?: UpdateOptions
  ): Promise<WithId<T> | null> {
    const $set = this.validatePartial({ ...data, updated_at: this.now() })
    const res = await this.collection.findOneAndUpdate(
      filter,
      { $set } as UpdateFilter<T>,
      {
        ...options,
        returnDocument: 'after',
        hint:
          typeof options?.hint === 'object'
            ? (options.hint as Document)
            : undefined,
      }
    )
    return (res as T).value ?? null
  }

  async updateMany(
    filter: Filter<T>,
    data: Partial<Omit<T, '_id' | 'created_at'>>,
    options?: UpdateOptions
  ) {
    const $set = this.validatePartial({ ...data, updated_at: this.now() })
    return this.collection.updateMany(
      filter,
      { $set } as UpdateFilter<T>,
      options
    )
  }

  async deleteById(id: string, options?: DeleteOptions): Promise<boolean> {
    const res = await this.collection.deleteOne({ id } as Filter<T>, options)
    return res.deletedCount > 0
  }

  async deleteOne(
    filter: Filter<T>,
    options?: DeleteOptions
  ): Promise<boolean> {
    const res = await this.collection.deleteOne(filter, options)
    return res.deletedCount > 0
  }

  async deleteMany(filter: Filter<T>, options?: DeleteOptions) {
    return this.collection.deleteMany(filter, options)
  }

  async softDeleteById(id: string): Promise<WithId<T> | null> {
    return this.updateById(id, { deleted_at: this.now() } as Partial<T>)
  }

  async count(filter: Filter<T> = {} as Filter<T>): Promise<number> {
    return this.collection.countDocuments(filter)
  }

  async exists(filter: Filter<T>): Promise<boolean> {
    const n = await this.collection.countDocuments(filter, { limit: 1 })
    return n > 0
  }

  /** ควรเรียกตอนบูตระบบ เพื่อ index ให้ id เป็น unique */
  async ensureIndexes() {
    await this.collection.createIndex(
      { id: 1 },
      { unique: true, name: 'uniq_id' }
    )
  }
}
