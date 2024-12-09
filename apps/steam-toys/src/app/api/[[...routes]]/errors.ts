export class BizError extends Error {
  code?: number
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}


export class InvalidTokenError extends BizError {
  code?: number
  constructor(message: string, code?: number) {
    super(message)
    this.code = code
  }
}


export class InvalidSteamIDError extends BizError {
  constructor(message: string) {
    super(message)
  }
}