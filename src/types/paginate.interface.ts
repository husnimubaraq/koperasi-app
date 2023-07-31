export interface TPaginate<T> {
  current_page: number
  data: T[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface TPaginateRequest {
  page: number
  per_page: number
}
