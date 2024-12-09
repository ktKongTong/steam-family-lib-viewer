export class BizError extends Error {
  constructor(message: string) {
    super(message)
  }
}


export class InvalidTokenError extends BizError {
  constructor(message: string) {
    super(message)
  }
}

export class InvalidSteamIDError extends BizError {
  constructor(message: string) {
    super(message)
  }
}