export class BizError extends Error {
  constructor(message: string) {
    super(message)
  }
}


export class TokenInvalidError extends BizError {
  constructor(message: string) {
    super(message)
  }
}