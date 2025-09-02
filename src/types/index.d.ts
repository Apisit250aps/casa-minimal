type ApiResponse<T = unknown> = {
  data?: T
  error?: unknown
  message: string
  success: boolean
}

type Pagination<T = unknown> = {
  docs: T[]
  page: number
  limit: number
  total_page: number
  total_docs: number
}

type PaginatedResponse<T> = ApiResponse<Pagination<T>>
