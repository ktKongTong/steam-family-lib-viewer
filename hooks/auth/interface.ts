
export interface AuthBasicInfo {
  qrInfo: {
    clientId: bigint,
    requestId: string,
    challengeUrl: string
  },
  sessionInfo: {
    sessionId: string,
    ak_bmsc: string
  }
}



export interface SteamToken {
  steamId: string
  accessToken: string
  refreshToken?: string
  valid?: boolean
  addedAt?: Date
}
export enum PollStatus {
  notScan,
  interactButNotAccept,
  accept,
  // reject,
  outdated
}