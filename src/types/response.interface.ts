export interface TResponseSingle<E, R> {
    status: boolean
    errors: E
    message: string
    result: R
  }
  