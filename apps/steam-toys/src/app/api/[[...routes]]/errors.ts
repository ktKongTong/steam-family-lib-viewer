export class BizError extends Error {
  code?: number
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}


export class TokenInvalidError extends BizError {
  code?: number
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}