export type APICallResponse<T> = {
  data?: T,
  success: false
  errorType: string
  errorMessage: string
} | {
  data: T
  success: true
}