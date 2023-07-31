export default interface TResponseError<T, R> {
    status: boolean
    errors: T
    message: string
    result: R
}